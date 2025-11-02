import React from "react";
import { Modal, Pressable, View, Text, StyleSheet } from "react-native";

interface ConfirmDialogProps {
  visible: boolean;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  visible,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={styles.overlay} onPress={onCancel}>
        <View style={styles.dialogBox}>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonRow}>
            <Pressable
              onPress={onCancel}
              style={[styles.button, { backgroundColor: "#ccc" }]}
            >
              <Text>{cancelText}</Text>
            </Pressable>
            <Pressable
              onPress={onConfirm}
              style={[styles.button, { backgroundColor: "red" }]}
            >
              <Text style={{ color: "white" }}>{confirmText}</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogBox: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    alignItems: "center",

    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
});