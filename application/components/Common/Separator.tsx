import { StyleSheet } from "react-native";
import { View } from "./Themed";

export default function Separator(){
  return (
    <View style={styles.separator}>
      
    </View>
  )
}

const styles = StyleSheet.create({
  separator:{
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})