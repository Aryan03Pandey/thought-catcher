import { Button, FlatList, StyleSheet } from "react-native";
import { View } from "../Common/Themed";
import { useEffect, useState } from "react";
import ListToggleButtonGrp from "../Common/ListViewToggleButtonGrp";
import { Thought } from "@/constants/Types";
import ThoughtCard from "./ThoughtCard";

export default function ThoughtsList({data} : {data : Array<Thought>}){
  const [isListView, setIsListView] = useState<boolean>(true)
  
  if(!data || !data.length){
    data = [
      {
        id: 1,
        text: "Let's see how it turns out to be. ",
        tags: ['health', 'care']
      },
      {
        id: 2,
        text: 'Aryan is my name, Pandey is my Surname'
      },
      {
        id: 3,
        text: 'Aryan is my name, Pandey is my Surname'
      },
      {
        id: 4,
        text: 'Aryan is my name, Pandey is my Surname'
      },
    ]
  }

  let cardWidth = isListView ? '100%' : '48%'
  let margin = isListView ? 0 : 4
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
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={isListView ? 1 : 2}
        renderItem={({item}) => <ThoughtCard key={item.id} data={item} style={{width: cardWidth, margin: margin}} />}
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