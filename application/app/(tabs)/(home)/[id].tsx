import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import OptionsDropdown from "@/components/Common/OptionsDropdown"; // import the component
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Thought } from "@/constants/Types";
import TagBadge from "@/components/Common/TagBadge";
import CreatableSelect from "@/components/Common/CreateableSelect";
import { maxTags } from "@/constants/Values";

export default function HomeScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [data, setData] = useState<Thought | undefined>( undefined )
  
  const [thoughtBoxList, setThoughtBoxList] = useState<string[]>(['Productivity', 'to-do', 'shopping'])
  const [tagsList, setTagsList] = useState<string[]>(['Productivity', 'to-do', 'shopping', 'op'])
  
  const handleEdit = () => {
    setMenuVisible(false);
    setIsEditing(true)
    console.log("Edit clicked for id:", id);
  };

  const handleDelete = () => {
    setMenuVisible(false);
    console.log("Delete clicked for id:", id);
  };

  const handleEditSubmit = () => {
    console.log(data)
    setIsEditing(false);
  }
  
   const handleThoughtboxChange = ( value : string ) => {
     if(!data) return
     
     setData({
       ...data, 
       thoughtBox: value
     })
     if(!thoughtBoxList.includes(value)){
       setThoughtBoxList([...thoughtBoxList,value])
       //logic to create a new thoughtbox in this condition will be called in the handlesubmit function
     }
     console.log(data);
   }
   
   const handleTagsChange = (value : string[]) => {
     if(!data) return
     
     setData({
       ...data,
       tags: value,
     })
     // console.log('value', value)
     // console.log('list', tagsList)
     const newTag = value.filter(tag => !tagsList.includes(tag))
     setTagsList([...tagsList, newTag[0]])
   }
   
   const removeTag = ( tag: string ) => {
     if(!data) return
     
     const newTagList = data.tags?.filter(inputTag => inputTag !== tag)
     setData({
       ...data, 
       tags: newTagList
     })
   }
   
   const handleSubmit = () => {
     
   }
  
  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerShown: true,
      headerStyle: {
        backgroundColor: "white",
      },
      headerTintColor: "black",
      headerRight: () => (
        <View style={styles.menuContainer}>
          {
            isEditing 
            ?
            (
              <TouchableOpacity onPress={handleEditSubmit} hitSlop={10}>
                <Entypo name="check" color='green' size={24} />
              </TouchableOpacity>
            )
            :
            ""
          }
          <TouchableOpacity onPress={() => setMenuVisible(true)} hitSlop={10}>
            <Entypo name="dots-three-vertical" size={18} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, isEditing]);
  
  useEffect(() => {
    const mock : Thought = {
      id: '123',
      title: 'Pick up groceries',
      tags: ['to-do'],
      thoughtBox: 'TO-DO',
      text: 'Pick up groceries from the supermarket while returning from office. Get milk, eggs, bread and condoms',
      createdAt: "16 Oct 2025 4:03 PM",
      updatedAt: "16 Oct 2025 4:03 PM",
    }
    
    setData(mock);
    
    
  }, [id])

  return (
    data === undefined 
    ? 
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView> 
    :
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "bottom"]}>
        <OptionsDropdown
          visible={menuVisible}
          onClose={() => setMenuVisible(false)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        
        
        <View style={styles.titleRow}>
          {isEditing ? (
            <TextInput
              style={styles.titleInput}
              value={data.title}
              onChangeText={(value) => setData({
                ...data, 
                title: value
              })}
              autoFocus
              onSubmitEditing={handleEditSubmit}
            />
          ) : (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text style={styles.title}>{data.title}</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <Text style={styles.date}>{data.createdAt}</Text>
        
        <View style={styles.thoughtBoxRow}>
          <Text style={styles.thoughtBoxText}>Thought Box</Text>
          
          {
            isEditing ? 
            (
              <CreatableSelect 
                options={thoughtBoxList}
                value={data.thoughtBox || ''}
                onChange={(val) => handleThoughtboxChange(val as string)}
                placeholder="Thought Box"
                mode="single"
                style={{
                  width: '48%',
                }}
              />            
            )
            :
            (
              data.thoughtBox !== undefined && <TagBadge text={data.thoughtBox} deleteable={false}  />
            )  
          }
        </View>
        
        <View style={styles.tagSelectorContainer}>
          <Text style={styles.thoughtBoxText}>Tags</Text>
          {
            isEditing 
            ?
            (
              <CreatableSelect 
                options={tagsList}
                value={data.tags || []}
                onChange={(val ) => handleTagsChange(val as string[])}
                placeholder="Tags"
                mode="multi"
                style={{
                  width: '48%'
                }}
                maxSelections={maxTags}
              />
            )
            : 
            ""
          }
        </View>
        
        <View style={styles.tagsRow}>
          {
            data.tags?.length !== undefined && data.tags?.length > 0  ? 
              data.tags.map((tag, i) => (
                <TagBadge key={i} text={tag} callbackFunction={() => removeTag(tag)} deleteable={isEditing} />
              ))
            : ''
          }
        </View>
        
        <View style={styles.contentContainer}>
          {isEditing ? (
            <TextInput
              style={styles.contentInput}
              value={data.text}
              multiline
              onChangeText={(val) => setData({ ...data, text : val})}
              autoFocus
              onSubmitEditing={handleEditSubmit}
            />
          ) : (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text style={styles.content}>{data.text}</Text>
            </TouchableOpacity>
          )}
        </View>
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
    gap: 12
  },
  titleRow: {
    
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 500,
  },
  title: {
   fontSize: 24,
   fontWeight: 500,
   
  },
  date: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)'
  },
  thoughtBoxRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center'
  },
  thoughtBoxText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)'
  },
  tagsRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2
  },
  tagSelectorContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', 
    gap: 8
  },
  contentContainer: {
    
  },
  contentInput: {
    fontSize: 16,
  },
  content: {
    fontSize: 16,
    
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 18
  }
  
})