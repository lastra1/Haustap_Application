import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function ServiceProviderDashboard() {
  const [notes, setNotes] = useState("");

  const handleNotificationPress = () => {
    router.push("/service-provider/notification");
  };

  const handleBookingsPress = () => {
    router.push("/service-provider/before-pending");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>On Duty</Text>
            </View>
            <TouchableOpacity onPress={handleNotificationPress}>
              <Ionicons name="notifications-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <Text style={styles.welcomeText}>Welcome, Ana Santos</Text>

          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={14} color="#f1c40f" />
            <Text style={styles.ratingText}>Ratings: 4.8</Text>
          </View>

          <Text style={styles.subText}>Bookings nearby you</Text>

          {/* Booking Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Home Cleaning</Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={22}
                color="#333"
              />
            </View>

            <Text style={styles.serviceText}>Bungalow - Basic Cleaning</Text>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Date</Text>
                <Text style={styles.value}>May 21, 2025</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>Time</Text>
                <Text style={styles.value}>8:00 AM</Text>
              </View>
            </View>

            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>
              B1 L50 Mango St. Phase 1 Saint Joseph Village 10{"\n"}
              Barangay Langgam, City of San Pedro, Laguna 4023
            </Text>

            {/* Text box area */}
            <View style={styles.notesContainer}>
              <Text style={styles.label}>Notes:</Text>
              <TextInput
                style={styles.notesInput}
                placeholder="Enter notes here..."
                multiline
                value={notes}
                onChangeText={setNotes}
                blurOnSubmit={true}
                returnKeyType="done"
              />
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TOTAL</Text>
              <Text style={styles.totalAmount}>₱1,000.00</Text>
            </View>

            <TouchableOpacity
              style={styles.openQueueBtn}
              onPress={() => router.replace("/service-provider/booking-queue")}
            >
              <Text style={styles.openQueueText}>Open Booking Queue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      {/* Bottom Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={22} color="#333" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={handleBookingsPress}>
          <MaterialIcons name="list-alt" size={22} color="#333" />
          <Text style={styles.navText}>Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/service-provider/chatbox")}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={22} color="#333" />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/service-provider/my-account")}
        >
          <Ionicons name="person-outline" size={22} color="#333" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { padding: 20, paddingBottom: 100 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  statusBadge: {
    backgroundColor: "#E3F2FD",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  statusText: { color: "#1976D2", fontSize: 12, fontWeight: "600" },
  welcomeText: { fontSize: 18, fontWeight: "600", color: "#222" },
  ratingContainer: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  ratingText: { marginLeft: 5, color: "#444", fontSize: 13 },
  subText: { marginTop: 15, marginBottom: 10, color: "#777", fontSize: 12 },
  card: {
    backgroundColor: "#fdfdfd",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#222" },
  serviceText: { color: "#555", marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  col: { width: "48%" },
  label: { color: "#666", fontSize: 12, marginBottom: 2 },
  value: { color: "#333", fontSize: 13, marginBottom: 5 },
  notesContainer: { marginTop: 10, marginBottom: 10 },
  notesInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    height: 70,
    padding: 8,
    textAlignVertical: "top",
    fontSize: 13,
    backgroundColor: "#fff",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
  },
  totalLabel: { fontWeight: "700", fontSize: 14, color: "#222" },
  totalAmount: { fontWeight: "700", fontSize: 14, color: "#222" },
  openQueueBtn: {
    marginTop: 12,
    backgroundColor: "#1976D2",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  openQueueText: { color: "#fff", fontWeight: "600" },
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 11, color: "#333", marginTop: 3 },
});
