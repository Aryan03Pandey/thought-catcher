import { StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { View, Text, TextInput,  } from "@/components/Common/Themed"
import { StrictMode, useState } from "react"
import { ThoughtBox as ThoughtBoxType } from "@/constants/Types"
import { Picker } from "@react-native-picker/picker"
import { lightColors } from "@/utils/selectRandomColor"

export default function CreateThoughtBox(){
  const [input, setInput] = useState<ThoughtBoxType>({
    name: '',
    color: ''
  }) 
  
  const handleSubmit = () => {
    console.log(input)
    return;
  }
  
  const maxInputLength = 24;
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create new thought box</Text>
      
        <TextInput 
          value={input.name} 
          placeholder="Name your box" 
          onChangeText={(text) => {setInput({...input, name: text})}} 
          style={styles.input}
          maxLength={24}
        />
        
        <View style={styles.lengthCounterContainer}>
          <Text style={styles.lengthCounter}>{input.name.length}/{maxInputLength}</Text>
        </View>   
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.colorsRow}
        >
          {lightColors.map((color) => {
            const selected = input.color === color.hex;
            return (
              <TouchableOpacity
                key={color.hex}
                style={[
                  styles.colorWrap,
                ]}
                activeOpacity={0.8}
                onPress={() => setInput({ ...input, color: color.hex })}
                accessibilityLabel={`Select color ${color.name}`}
                accessibilityRole="button"
              >
                <View
                  style={[
                    styles.colorCircle,
                    { backgroundColor: color.hex },
                    selected && styles.colorCircleSelected,
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
     
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleSubmit}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const CIRCLE_SIZE = 24;
const SELECTED_BORDER = 2;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#8da9c4',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2
  },
  text: {
    backgroundColor: 'transparent',
    borderRadius: 16
  },
  input: {
    borderRadius: 16,
    padding: 12,
    height: 48,
    borderWidth: 2
  },
  buttonContainer: {
    width: '100%',
    // backgroundColor: '#13315c',
    padding: 12,
    borderRadius: 16,
    borderWidth: 2
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttonText: {
    // color: 'white',
    fontWeight:'semibold',
    alignSelf: 'center',
    fontSize: 16,
  },
  lengthCounterContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    backgroundColor: "transparent",
  },
  lengthCounter: {
    // color: "white",
    opacity: 0.7,
    fontSize: 12,
    alignSelf: "flex-end",
  },
  colorsRow: {
    paddingHorizontal: 4,
    alignItems: "center",
    gap: 4,
  },
  colorWrap: {
    marginRight: 10,
    padding: 2,
    borderRadius: (CIRCLE_SIZE + SELECTED_BORDER * 2) / 2,
  },
  colorCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
  },
  colorCircleSelected: {
    // highlight selected with thicker white border or dark depending on background:
    borderWidth: SELECTED_BORDER,
    borderColor: "#0b2545",
  },
})