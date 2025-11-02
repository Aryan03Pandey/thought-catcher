import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import { selectRandomColor } from "@/utils/selectRandomColor";
import { FontAwesome } from "@expo/vector-icons";

export default function TagBadge({text, callbackFunction = () => {}, deleteable = true}: { text: string, callbackFunction?: () => void, deleteable?: boolean }){
  
  const color = selectRandomColor()
  
  return (
    <View style={[styles.badge, {backgroundColor: color}]}>
      <Text>{text}</Text>
      {deleteable && <TouchableOpacity
        onPress={callbackFunction}
      >
        <FontAwesome name="times-circle-o" size={16} />
      </TouchableOpacity>}
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
  },
  badge: {
    width: 'auto',
    borderRadius: 8,
    overflow: 'hidden',
    paddingInline: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4
  }
})