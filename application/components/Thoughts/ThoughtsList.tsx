import { Button, DimensionValue, FlatList, StyleSheet } from "react-native";
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

  let cardWidth : DimensionValue = isListView ? '100%' : '48%'
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
        key={isListView ? "list" : "grid"}
        contentContainerStyle={{
          padding: 4,
          paddingBottom: 80,
        }}
        columnWrapperStyle={
          isListView ? undefined : { justifyContent: "space-between" }
        }
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16, width: cardWidth }}>
            <ThoughtCard
              data={item}
              style={{
                width: "100%",
              }}
            />
          </View>
        )}
        ListFooterComponent={<View style={{ height: 70 }} />}
      />

      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 12,
  },
  listContainer: {
    display: 'flex',
    gap: 18,
    padding: 4,
    
  }
 })