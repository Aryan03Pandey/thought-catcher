import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, View } from '@/components/Common/Themed';
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { SettingListItem as SettingListItemType } from '@/constants/Types';
import ConfirmDelete from '@/components/Common/ConfirmDialog'; 
import * as SecureStore from 'expo-secure-store'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import api from '@/api/axios';

export default function Settings() {
  const [user, setUser] = useState<Record<string, any> | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDeleteProfile = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setShowConfirm(false);
    // ✅ Perform delete logic here
    console.log('Profile deleted');
  };


  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length) {
      setUser({...user, picture: result.assets[0].uri});
     //TO DO: upload image to S3 and call update user api 
    }
  };

  useEffect(() => {
    
    GoogleSignin.configure({
          webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
          scopes: ['profile', 'email'],
          offlineAccess: true,
          forceCodeForRefreshToken: false,
          // iosClientId: process.env.EXPO_PUBLIC_IOS_ID,
        });
  }, [])
  
  const handleGoogleSingout = async () => {
    try{
      // initiates google sign out
      const refreshToken = await SecureStore.getItemAsync('refreshToken')
      if(!refreshToken){
        throw new Error("Invalid Operation, user not logged in")
      }
      
      const response = await api.post('/auth/logout', {
        refreshToken
      })
      
      if(response.status === 200){
        await GoogleSignin.signOut()
        await SecureStore.deleteItemAsync("user")
        await SecureStore.deleteItemAsync('accessToken')
        await SecureStore.deleteItemAsync('refreshToken')
        console.log("User logged out")
        router.replace('/(sign-in)')
      }
    }
    catch(error){
      console.log(error);
    }
  }
  
  const settingList: Array<SettingListItemType> = [
    { title: 'plans', link: '/(tabs)/(settings)/plans' },
    { title: 'preferences', link: '/(tabs)/(settings)/preferences' },
    { title: 'communications', link: '/(tabs)/(settings)/communications' },
    { title: 'logout', callback: () => handleGoogleSingout() },
    { title: 'delete profile', callback: handleDeleteProfile },
  ];
  
  const ListItem = ({ data }: { data: SettingListItemType }) => {
    const handlePress = () => {
      if (data.link) {
        router.push({ pathname: data.link as any });
      } else if (data.callback) {
        data.callback();
      }
    };

    const isDanger = data.title === 'delete profile';
    const isLogout = data.title === 'logout';

    return (
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={[
          styles.accordionItem,
          isDanger && { borderColor: '#dc2626' },
          isLogout && { borderColor: '#6b7280' },
        ]}
      >
        <View style={styles.itemContent}>
          <Text
            style={[
              styles.itemTitle,
              isDanger && { color: '#dc2626', fontWeight: 500 },
              isLogout && { color: '#6b7280', fontWeight: 500 },
            ]}
          >
            {data.title}
          </Text>
          {!isDanger && !isLogout && (
            <FontAwesome name="chevron-right" size={16} />
          )}
        </View>
      </TouchableOpacity>
    );
  };
  
  useEffect(() => {
    const getUser = async () => {
      const userString = await SecureStore.getItemAsync('user');
      if(userString){
        const userParsed = JSON.parse(userString)
        setUser(userParsed)
      }
    }
    
    getUser();
  }, [])

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'bottom']}>
      <View style={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={pickImage} activeOpacity={0.7}>
            {user && user.picture ? (
              <Image source={{ uri: user.picture }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.placeholder]}>
                <FontAwesome name="user" size={60} color="#888" />
              </View>
            )}
          </TouchableOpacity>

          <Text style={styles.userName}>{ user && user.name }</Text>
          <View style={styles.planTag}>
            <Text style={styles.planTagText}>FREE</Text>
          </View>
        </View>

        {/* Settings List */}
        <View style={styles.listContainer}>
          <FlatList
            data={settingList}
            renderItem={({ item }) => <ListItem data={item} />}
            keyExtractor={(item) => item.title}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          />
        </View>
      </View>

      <ConfirmDelete
        visible={showConfirm}
        confirmText="Delete Profile?"
        message="This action is irreversible. Are you sure you want to permanently delete your profile?"
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 32,
    paddingVertical: 60,
    paddingHorizontal: 18,
  },
  profileContainer: {
    alignItems: 'center',
    gap: 4,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
  },
  userName: {
    color: '#134074',
    fontWeight: 'bold',
    fontSize: 32,
  },
  planTag: {
    backgroundColor: '#8da9c4',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  planTagText: {
    color: 'white',
    fontSize: 14,
  },
  listContainer: {
    width: '100%',
  },
  accordionItem: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#1e1e1e',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    textTransform: 'capitalize',
    fontSize: 20,
  },
});
