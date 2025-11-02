import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type DeleteOptions = {
  thoughts: boolean;
  boxes: boolean;
  widgets: boolean;
};

export default function PreferencesAccordion() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [saveSearch, setSaveSearch] = useState(true);
  const [showTimestamp, setShowTimestamp] = useState(true);
  const [askBeforeDelete, setAskBeforeDelete] = useState<DeleteOptions>({
    thoughts: true,
    boxes: false,
    widgets: true,
  });

  const toggleAccordion = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const toggleDeleteOption = (key: keyof DeleteOptions) => {
    setAskBeforeDelete((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Preferences</Text>

        {[
          { title: "Theme", key: "theme" },
          { title: "Save Search History", key: "saveSearch" },
          { title: "Ask Before Delete", key: "delete" },
          { title: "Show Timestamp", key: "timestamp" },
        ].map((item) => (
          <View key={item.key} style={styles.accordionItem}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => toggleAccordion(item.key)}
              activeOpacity={0.7}
            >
              <Text style={styles.accordionTitle}>{item.title}</Text>
              <Ionicons
                name={openSection === item.key ? "chevron-up" : "chevron-down"}
                size={22}
                color="black"
              />
            </TouchableOpacity>

            {openSection === item.key && (
              <View style={styles.accordionContent}>
                {/* Theme */}
                {item.key === "theme" && (
                  <View style={styles.rowBetween}>
                    <Text style={styles.label}>Dark Mode</Text>
                    <Switch
                      value={theme === "dark"}
                      onValueChange={(val) => setTheme(val ? "dark" : "light")}
                    />
                  </View>
                )}

                {/* Save Search History */}
                {item.key === "saveSearch" && (
                  <View style={styles.rowBetween}>
                    <Text style={styles.label}>Save search history</Text>
                    <Switch value={saveSearch} onValueChange={setSaveSearch} />
                  </View>
                )}

                {/* Ask Before Delete */}
                {item.key === "delete" && (
                  <View>
                    {[
                      { label: "Thoughts", key: "thoughts" },
                      { label: "Thought Boxes", key: "boxes" },
                      { label: "Widget Entry", key: "widgets" },
                    ].map((opt) => (
                      <TouchableOpacity
                        key={opt.key}
                        onPress={() =>
                          toggleDeleteOption(opt.key as keyof DeleteOptions)
                        }
                        style={styles.deleteOption}
                        activeOpacity={0.6}
                      >
                        <Text style={styles.label}>{opt.label}</Text>
                        <Ionicons
                          name={
                            askBeforeDelete[opt.key as keyof DeleteOptions]
                              ? "checkbox-outline"
                              : "square-outline"
                          }
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {/* Show Timestamp */}
                {item.key === "timestamp" && (
                  <View style={styles.rowBetween}>
                    <Text style={styles.label}>Show timestamps</Text>
                    <Switch
                      value={showTimestamp}
                      onValueChange={setShowTimestamp}
                    />
                  </View>
                )}
              </View>
            )}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    color: "#134074",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  accordionItem: {
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1e1e1e",
    overflow: "hidden",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  accordionTitle: {
    fontSize: 18,
  },
  accordionContent: {
    borderTopWidth: 1,
    borderTopColor: "#1e1e1e",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  label: {
    color: "black",
    fontSize: 16,
  },
  deleteOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
});