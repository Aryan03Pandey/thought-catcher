import { ScrollView, StyleSheet, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { Text, View } from '@/components/Common/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from '@/components/Home/SearchBar';
import { useState } from 'react';
import ThoughtInput from '@/components/Thoughts/ThoughtInput';
import Separator from '@/components/Common/Separator';
import ThoughtsList from '@/components/Thoughts/ThoughtsList';
export default function Home() {
  const [query, setQuery] = useState("")
  
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'bottom']}>
      <FlatList
        data={[]}
        renderItem={null}
        keyExtractor={() => "key"}
        ListHeaderComponent={
          <View style={{ gap: 18, paddingBottom: 12 }}>
            <View style={styles.stickyHeader}>
              <SearchBar
                value={query}
                onChangeText={setQuery}
                placeholder="Search..."
              />
            </View>
        
            <ThoughtInput />
        
            <Separator />
          </View>
        }
        // stickyHeaderIndices={[0]}
        ListFooterComponent={
          <ThoughtsList data={[]} />
        }
        showsVerticalScrollIndicator={false}
      />   
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"transparent",
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8
  },
  stickyHeader: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingTop: 4,
    paddingBottom: 8, // 👈 adds space between SearchBar and scrollables
    zIndex: 10, 
  }
});
