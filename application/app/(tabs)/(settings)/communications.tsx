import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function CommunicationsAccordion() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Notification States
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notifDaily, setNotifDaily] = useState(true);
  const [notifWeekly, setNotifWeekly] = useState(false);
  const [notifAI, setNotifAI] = useState(true);
  const [notifPromo, setNotifPromo] = useState(false);

  // Email States
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [emailDaily, setEmailDaily] = useState(true);
  const [emailWeekly, setEmailWeekly] = useState(false);
  const [emailPromo, setEmailPromo] = useState(true);
  const [emailFeatures, setEmailFeatures] = useState(true);

  const toggleAccordion = (key: string) => {
    setOpenSection(openSection === key ? null : key);
  };

  const grayIfDisabled = (enabled: boolean) => ({
    color: enabled ? "#ccc" : "black",
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Communications</Text>

        {/* Accordion Sections */}
        {[
          { title: "Notifications", key: "notifications" },
          { title: "Email", key: "email" },
        ].map((item) => (
          <View key={item.key} style={styles.accordionItem}>
            <TouchableOpacity
              style={styles.accordionHeader}
              activeOpacity={0.7}
              onPress={() => toggleAccordion(item.key)}
            >
              <Text style={styles.accordionTitle}>{item.title}</Text>
              <Ionicons
                name={openSection === item.key ? "chevron-up" : "chevron-down"}
                size={22}
              />
            </TouchableOpacity>

            {openSection === item.key && (
              <View style={styles.accordionContent}>
                {/* Notifications Section */}
                {item.key === "notifications" && (
                  <>
                    <View style={styles.rowBetween}>
                      <Text style={styles.label}>Enable</Text>
                      <Switch
                        value={notificationsEnabled}
                        onValueChange={setNotificationsEnabled}
                      />
                    </View>

                    <View
                      style={[
                        styles.subOptionContainer,
                        !notificationsEnabled && styles.disabledContainer,
                      ]}
                    >
                      <View style={styles.rowBetween}>
                        <Text style={[styles.label, grayIfDisabled(!notificationsEnabled)]}>
                          Daily Reminders
                        </Text>
                        <Switch
                          value={notifDaily}
                          onValueChange={setNotifDaily}
                          disabled={!notificationsEnabled}
                        />
                      </View>
                      <View style={styles.rowBetween}>
                        <Text style={[styles.label, grayIfDisabled(!notificationsEnabled)]}>
                          Weekly Reminders
                        </Text>
                        <Switch
                          value={notifWeekly}
                          onValueChange={setNotifWeekly}
                          disabled={!notificationsEnabled}
                        />
                      </View>
                      <View style={styles.rowBetween}>
                        <Text style={[styles.label, grayIfDisabled(!notificationsEnabled)]}>
                          AI Suggestions
                        </Text>
                        <Switch
                          value={notifAI}
                          onValueChange={setNotifAI}
                          disabled={!notificationsEnabled}
                        />
                      </View>
                      <View style={styles.rowBetween}>
                        <Text style={[styles.label, grayIfDisabled(!notificationsEnabled)]}>
                          Promotional
                        </Text>
                        <Switch
                          value={notifPromo}
                          onValueChange={setNotifPromo}
                          disabled={!notificationsEnabled}
                        />
                      </View>
                    </View>
                  </>
                )}

                {/* Email Section */}
                {item.key === "email" && (
                  <>
                    <View style={styles.rowBetween}>
                      <Text style={styles.label}>Enable</Text>
                      <Switch
                        value={emailEnabled}
                        onValueChange={setEmailEnabled}
                      />
                    </View>

                    <View
                      style={[
                        styles.subOptionContainer,
                        !emailEnabled && styles.disabledContainer,
                      ]}
                    >
                      <View style={styles.rowBetween}>
                        <Text style={[styles.label, grayIfDisabled(!emailEnabled)]}>
                          Daily Reminders
                        </Text>
                        <Switch
                          value={emailDaily}
                          onValueChange={setEmailDaily}
                          disabled={!emailEnabled}
                        />
                      </View>
                      <View style={styles.rowBetween}>
                        <Text style={[styles.label, grayIfDisabled(!emailEnabled)]}>
                          Weekly Reminders
                        </Text>
                        <Switch
                          value={emailWeekly}
                          onValueChange={setEmailWeekly}
                          disabled={!emailEnabled}
                        />
                      </View>
                      <View style={styles.rowBetween}>
                        <Text style={[styles.label, grayIfDisabled(!emailEnabled)]}>
                          Promotional
                        </Text>
                        <Switch
                          value={emailPromo}
                          onValueChange={setEmailPromo}
                          disabled={!emailEnabled}
                        />
                      </View>
                      <View style={styles.rowBetween}>
                        <Text style={[styles.label, grayIfDisabled(!emailEnabled)]}>
                          New Feature Releases
                        </Text>
                        <Switch
                          value={emailFeatures}
                          onValueChange={setEmailFeatures}
                          disabled={!emailEnabled}
                        />
                      </View>
                    </View>
                  </>
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
  subOptionContainer: {
    marginTop: 8,
  },
  disabledContainer: {
  },
  label: {
    fontSize: 16,
  },
});