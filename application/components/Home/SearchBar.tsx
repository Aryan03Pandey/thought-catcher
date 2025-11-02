import React, { useState } from "react";
import { View, TextInput } from '@/components/Common/Themed'
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

interface SearchBarProps {
  placeholder?: string; 
  onChangeText?: (text: string) => void;
  value?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  onChangeText, 
  value,
}) => {
  const [text, setText] = useState(value || "");
  
  const handleChange = (input: string) => {
    setText(input);
    if (onChangeText) onChangeText(input);
  };
  
  const clearText = () => {
    setText("");
    if (onChangeText) onChangeText("");
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={text}
        onChangeText={handleChange}
        returnKeyType="search"
        style={styles.textinput}
      />
      <FontAwesome
        name="search" 
        size={16} 
        style={styles.searchIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#13315c',
    borderRadius: 100,
    display: 'flex',
    flexWrap: 'nowrap',
    paddingInline: 10,
    paddingBlock: 4,
    maxWidth: 500,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2
  },
  textinput: {
    backgroundColor: 'transparent',
    width: '95%',
  },
  searchIcon: {
    
  }
})