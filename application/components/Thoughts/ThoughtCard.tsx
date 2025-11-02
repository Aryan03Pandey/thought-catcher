import { Link, useRouter } from "expo-router";
import { Text, View } from "../Common/Themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Thought } from "@/constants/Types";
import TagBadge from "../Common/TagBadge";
import { TextStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export default function ThoughtCard({ data, style }: { data: Thought, style: any }) {
  const router = useRouter()
  
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.9}
      onPress={() => {
        router.push({
          pathname: '/(tabs)/(home)/[id]',
          params: {
            id: data.id,
            title: data.title,
          }
        })
      }}
      
    >
      <View style={[
        styles.itemContainer,
        {
          backgroundColor: 'white'
        }
      ]}>
          <Text>{data.text}</Text>
          
          <View style={styles.tagsContainer}>
            {
              data.tags && data.tags.map((tag, index) => (
                <TagBadge key={index} text={tag} deleteable={false}  />
              ))
            }
          </View>
      </View>
    
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 80,
    maxHeight: 80
  },
  tagsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4
  },
  itemContainer: {
    display: 'flex',
    borderWidth: 2,
    width: '100%',
    gap: 6,
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#1e1e1e', // 👈 REQUIRED for shadow visibility
    height: '100%', //remove unless absolutely needed (can clip shadow)
  
    // iOS shadow
    shadowColor: '#8da9c4',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.6,       // 0.9 was too harsh — this looks natural
    shadowRadius: 8,
  
    // Android shadow
    elevation: 6,             // increases depth of shadow
    borderColor: '#2a2a2a',
  },
})

