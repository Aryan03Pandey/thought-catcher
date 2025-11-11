import React, { useEffect, useState } from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Common/Themed';
import api from '@/api/axios';

export default function GoogleLoginScreen() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
      scopes: ['profile', 'email'],
      offlineAccess: true,
      forceCodeForRefreshToken: false,
      // iosClientId: process.env.EXPO_PUBLIC_IOS_ID,
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const { idToken } = userInfo.data ?? {};

      if (idToken) {
        
        try{
          const response = await api.post('/auth/login', {
            token: idToken
          })
          
          const { accessToken, refreshToken, user } = response.data.data;
          
          if (!accessToken || !refreshToken || !user) {
            console.error("Missing required fields in login response:", response.data);
            return;
          }
        
          await SecureStore.setItemAsync("accessToken", String(accessToken));
          await SecureStore.setItemAsync("refreshToken", String(refreshToken));
          await SecureStore.setItemAsync("user", JSON.stringify(user));
        
          router.replace('/(tabs)/(home)');
        }catch(e){
          await GoogleSignin.signOut();
          if (e.response) {
              console.log('\n')
              console.log('🧾 Response error:', e.response.data);
              console.log('🔢 Status:', e.response.status);
            } else if (e.request) {
              console.log('\n')
              console.log('🌐 Request made but no response:', e.request);
            } else {
              console.log('\n')
              console.log('❌ Error message:', e.message);
            }
            console.log('\n')
            console.log('⚙️ Config:', e.config);
        }
        
      }
    } catch (err) {
      setError("Error Signing In, Try Again")
      console.log('Google Sign-In Error:', err);

      if (isErrorWithCode(err)) {
        switch (err.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.log('User cancelled the login');
            setError("User cancelled the login")
            break;
          case statusCodes.IN_PROGRESS:
            setError("Sign-in already in progress")
            console.log('Sign-in already in progress');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            setError("Play service is not available or outdated")
            console.log('Play services not available or outdated');
            break;
          default:
            setError("Error signing in, Try again")
            console.log('Some other error:', err);
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome</Text>
        <GoogleSigninButton
          onPress={handleGoogleSignIn}
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
        />
      
        <View>
          {
            error !== null && error.length > 0 ? 
              <Text>{error}</Text>
            : 
              ""
          }
        </View>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8
  },
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    fontSize: 20,
    fontWeight: 600
  },
  
})