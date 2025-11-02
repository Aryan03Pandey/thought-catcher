import { Button, FlatList, StyleSheet } from "react-native";
import { View } from "../Common/Themed";
import { useEffect, useState } from "react";
import ListToggleButtonGrp from "../Common/ListViewToggleButtonGrp";
import { ThoughtBox as ThoughtBoxType } from "@/constants/Types";
import { selectRandomColor } from "@/utils/selectRandomColor";
import ThoughtBoxCard from "./ThoughtBoxCard";

export default function ThoughtBoxList({data} : {data : Array<ThoughtBoxType>}){
  const [isListView, setIsListView] = useState<boolean>(true)
  
  const thoughtBoxList: Array<ThoughtBoxType> =  [
      {
        id: 1,
        name: 'Productivity',
        color: selectRandomColor(),
      },
      
      {
        id: 2,
        name: 'Self Talk',
        color: selectRandomColor(),
      },
      
      {
        id: 3,
        name: 'Gym notes',
        color: selectRandomColor(),
      },
    ]

  let cardWidth = isListView ? '100%' : '46%'
  let margin = isListView ? 0 : 8
  useEffect(() => {
    if(isListView){
      cardWidth = '100%'
      margin = 0
    }
    else{
      cardWidth = '48%'
      margin = 4
    }
  }, [isListView])
  
  
  return (
    <View style={styles.container}>
      
      <ListToggleButtonGrp selected={isListView ? 0 : 1} toggleView={setIsListView}  />
      
      <FlatList
        data={thoughtBoxList}
        keyExtractor={(item) => item.id?.toString() || ''}
        numColumns={isListView ? 1 : 2}
        renderItem={({item}) => 
          <ThoughtBoxCard 
            key={item.id} 
            data={item} 
            style={{width: cardWidth, margin: margin}} 
          />
        }
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={<View style={{height: 70, width: '100%'}}></View>}
        key={isListView ? 'list' : 'grid'}
      />
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 4,
  },
  listContainer: {
    display: 'flex',
    gap: 18,
    padding: 4,
  }
 })