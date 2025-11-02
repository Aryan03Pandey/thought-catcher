import { FlatList, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Text, View } from '@/components/Common/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import CreateThoughtBox from '@/components/Thought_Box/CreateThoughtBox';
import { ThoughtBox as ThoughtBoxType } from '@/constants/Types';
import { selectRandomColor } from '@/utils/selectRandomColor';
import ThoughtBoxCard from '@/components/Thought_Box/ThoughtBoxCard';
import ListToggleButtonGrp from '@/components/Common/ListViewToggleButtonGrp';
import { useState } from 'react';
import ThoughtBoxList from '@/components/Thought_Box/ThoughtBoxList';

export default function ThoughtBox() {
  
  const thoughtBoxList: Array<ThoughtBoxType> =  [
    {
      id: 1,
      name: 'Productivity',
      color: selectRandomColor(),
    },
    
    {
      id: 2,
      name: 'Productivity',
      color: selectRandomColor(),
    },
    
    {
      id: 3,
      name: 'Productivity',
      color: selectRandomColor(),
    },
  ]
  
  const [isListView, setIsListView] = useState<boolean>(true)
  
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'bottom']}>
      <CreateThoughtBox />
      
      <ThoughtBoxList data={[]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor:"white",
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 12,
    marginTop: 12
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
    gap: 16
  }
});
