import { Stack, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import { Thought as ThoughtType } from "../../../constants/Types";
import { SafeAreaView } from "react-native-safe-area-context";
import ThoughtsList from "@/components/Thoughts/ThoughtsList";
import { Entypo } from "@expo/vector-icons";
import ConfirmDialog from "@/components/Common/ConfirmDialog";
import OptionsDropdown from "@/components/Common/OptionsDropdown"; // <-- new import

export default function ThoughtBoxScreen() {
  const { id, name: initialName } = useLocalSearchParams<{
    id: string;
    name: string;
  }>();

  const [thoughts, setThoughts] = useState<ThoughtType[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(initialName || "");

  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const mockThoughts: ThoughtType[] = [
          { id: "1", text: "This is the first thought.", tags: [] },
          { id: "2", text: "This is the second thought.", tags: [] },
        ];
        setThoughts(mockThoughts);
      } catch (error) {
        console.error("Failed to fetch thoughts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThoughts();
  }, [id]);

  const handleEdit = () => {
    setMenuVisible(false);
    setIsEditingName(true);
  };

  const handleDelete = () => {
    setMenuVisible(false);
    setConfirmVisible(true);
  };

  const confirmDelete = () => {
    setConfirmVisible(false);
    console.log("Deleted ThoughtBox:", id);
  };

  const handleNameSubmit = () => {
    setIsEditingName(false);
    console.log("Updated ThoughtBox name:", name);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "bottom"]}>
      <Stack.Screen options={{ title: name }} />

      <View style={styles.headerRow}>
        {isEditingName ? (
          <TextInput
            value={name}
            onChangeText={setName}
            autoFocus
            onSubmitEditing={handleNameSubmit}
            onBlur={handleNameSubmit}
            style={styles.nameInput}
          />
        ) : (
          <Text style={styles.name}>{name}</Text>
        )}

        <TouchableOpacity onPress={() => setMenuVisible(true)} hitSlop={10}>
          <Entypo name="dots-three-vertical" size={18} color="black" />
        </TouchableOpacity>
      </View>

      {/* New reusable dropdown */}
      <OptionsDropdown
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ConfirmDialog
        visible={confirmVisible}
        message="Are you sure you want to delete this Thought Box?"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmVisible(false)}
      />

      {loading ? <Text>Loading thoughts...</Text> : <ThoughtsList data={thoughts} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    padding: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: "900",
    color: "black",
  },
  nameInput: {
    fontSize: 24,
    fontWeight: "900",
    color: "black",
    borderBottomWidth: 1,
    borderBottomColor: "#8da9c4",
    minWidth: 150,
  },
});