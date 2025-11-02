import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, View } from "@/components/Common/Themed";
import { useState } from "react";
import { ThoughtInput as InputType } from "@/constants/Types";
import { Picker } from "@react-native-picker/picker";
import TagBadge from "../Common/TagBadge";
import { maxInputLength, maxTags } from "@/constants/Values";
import CreatableSelect from "../Common/CreateableSelect";


export default function ThoughtInput() {
  const [input, setInput] = useState<InputType>({
    inputText: "",
    tags: [],
    thoughtBox: "",
  });

  const [thoughtBoxList, setThoughtBoxList] = useState<string[]>(['Productivity', 'to-do', 'shopping'])
  const [tagsList, setTagsList] = useState<string[]>(['Productivity', 'to-do', 'shopping', 'op'])
  
  const handleThoughtboxChange = ( value : string ) => {
    setInput({
      ...input, 
      thoughtBox: value
    })
    if(!thoughtBoxList.includes(value)){
      setThoughtBoxList([...thoughtBoxList,value])
      //logic to create a new thoughtbox in this condition will be called in the handlesubmit function
    }
  }
  
  const handleTagsChange = (value : string[]) => {
    setInput({
      ...input,
      tags: value,
    })
    console.log('value', value)
    console.log('list', tagsList)
    const newTag = value.filter(tag => !tagsList.includes(tag))
    setTagsList([...tagsList, newTag[0]])
  }
  
  const removeTag = ( tag: string ) => {
    const newTagList = input.tags?.filter(inputTag => inputTag !== tag)
    setInput({
      ...input, 
      tags: newTagList
    })
  }
  
  const handleSubmit = () => {
    
  }
  
  return (
    <View style={styles.container}>
      <TextInput
        value={input.inputText}
        onChangeText={(text) => setInput({ ...input, inputText: text })}
        style={styles.textArea}
        multiline={true}
        textAlignVertical="top"
        maxLength={maxInputLength}
      />

      <View style={styles.lengthCounterContainer}>
        <Text style={styles.lengthCounter}>{input.inputText.length}/{maxInputLength}</Text>
      </View>

      <View
        style={styles.pickerContainer}
      >
        <CreatableSelect 
          options={thoughtBoxList}
          value={input.thoughtBox || ''}
          onChange={(val) => handleThoughtboxChange(val as string)}
          placeholder="Thought Box"
          mode="single"
          style={{
            width: '48%'
          }}
        />
        
        <CreatableSelect 
          options={tagsList}
          value={input.tags || []}
          onChange={(val) => handleTagsChange(val as string[])}
          placeholder="Tags"
          mode="multi"
          style={{
            width: '48%'
          }}
          maxSelections={maxTags}
        />
      </View>
      
      <View style={styles.tagsContainer}>
          {
            input.tags?.length !== undefined && input.tags?.length > 0  ? 
              input.tags.map((tag, i) => (
                <TagBadge key={i} text={tag} callbackFunction={() => removeTag(tag)} />
              ))
            : ''
          }
      </View>
      
      
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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 16,
    display: 'flex',
    gap: 8,
    borderWidth: 2,
  },
  textArea: {
    minHeight: 200,
    maxHeight: 200,
    borderRadius: 12,
    padding: 12,
    paddingTop: 12,
    borderWidth: 2
  },
  lengthCounterContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    backgroundColor: "transparent",
  },
  lengthCounter: {
    color: "white",
    opacity: 0.7,
    fontSize: 12,
    alignSelf: "flex-end",
  },
  selectorText: {
    color: 'white'
  },
  selectorContainer: {
    backgroundColor: "transparent",
  },
  pickerContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    width: '100%',
    padding: 12,
    borderRadius: 16,
    borderWidth: 2
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight:'semibold',
    alignSelf: 'center'
  },
  tagsContainer: {
    backgroundColor: 'transparent',
    display: 'flex',
    gap: 4,
    flexDirection: 'row',
  }
});
