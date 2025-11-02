import { StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";

export default function ListToggleButtonGrp({selected, toggleView}: {selected: number, toggleView: React.Dispatch<React.SetStateAction<boolean>> }){
  const [selectedOption, setSelectedOption] = useState<number>(selected)
  
  const handleToggle = () => {
    setSelectedOption(selectedOption => selectedOption === 0 ? 1 : 0)
    toggleView(value => !value)
  }
  
  return (
    <View
      style={styles.container}
    >
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, selectedOption === 0 && styles.selectedButton]}
          onPress={() => handleToggle()}
        >
          <Entypo name="list" size={16} color={selectedOption === 0 ? 'black' : 'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedOption === 1 && styles.selectedButton]}
          onPress={() => handleToggle()}
        >
          <Entypo name="grid" size={16} color={selectedOption === 1 ? 'black' : 'white'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  selectedButton: {
    backgroundColor: '#ffffff',
    borderRadius: 14
  },
  buttonGroup: {
    display: 'flex',
    backgroundColor: '#c1c1c1',
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 2
  }
})