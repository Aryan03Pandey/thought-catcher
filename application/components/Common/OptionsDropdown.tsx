import React from "react";
import {
  Modal,
  Pressable,
  View,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

type OptionsDropdownProps = {
  visible: boolean;
  onClose: () => void;
  onEdit: (event: GestureResponderEvent) => void;
  onDelete: (event: GestureResponderEvent) => void;
};

export default function OptionsDropdown({
  visible,
  onClose,
  onEdit,
  onDelete,
}: OptionsDropdownProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.dropdown}>
          <Pressable onPress={onEdit} style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>Edit</Text>
          </Pressable>

          <View style={styles.separator}></View>

          <Pressable onPress={onDelete} style={styles.dropdownItem}>
            <Text style={[styles.dropdownText, { color: "red" }]}>Delete</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 40,
    marginRight: 32,
    width: 100,
    paddingVertical: 4,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 16,
    color: "black",
  },
  separator: {
    width: "90%",
    alignSelf: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "gray",
  },
});