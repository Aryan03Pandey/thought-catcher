import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Text, View } from '@/components/Common/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Feed() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'bottom']}>
      <View>
        <Text>Feed</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white'
  }
});
