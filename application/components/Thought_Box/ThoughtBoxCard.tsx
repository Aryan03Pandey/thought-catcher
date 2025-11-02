import { ThoughtBox as ThoughtBoxType } from "@/constants/Types";
import { Text, View } from "../Common/Themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useRouter } from "expo-router";

export default function ThoughtBoxCard({
  data,
  style,
}: {
  data: ThoughtBoxType;
  style: any;
}) {
  const numThoughts = 4;

  const router = useRouter()
  
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() =>
        router.push({
          pathname: "/(tabs)/(thought_box)/[id]",
          params: {
            id: data.id?.toString() || '1234',
            name: data.name,
            thoughtCount: numThoughts,
            color: data.color
          },
        })
      }
      activeOpacity={0.9}
    >
      <View style={[styles.itemContainer, { backgroundColor: data.color }]}>
        <Text style={styles.nameText}>{data.name}</Text>
        <Text style={styles.sizeText}>{numThoughts} Thoughts</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
  },
  itemContainer: {
    display: "flex",
    borderWidth: 2,
    width: "100%",
    gap: 6,
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#1e1e1e",

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,

    // Android shadow
    elevation: 6,
  },
  nameText: {
    backgroundColor: "transparent",
    fontWeight: "500",
    fontSize: 18,
  },
  sizeText: {
    fontSize: 14,
    color: "black",
    opacity: 0.6,
  },
});
