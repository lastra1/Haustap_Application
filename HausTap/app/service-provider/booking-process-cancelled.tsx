import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";


export default function CancelledScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.headerTitle}>Bookings</Text>


      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tabButton]}
          onPress={() => router.push('/service-provider/before-pending')}
        >
          <Text style={styles.tabText}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton]}
          onPress={() => router.push('/service-provider/before-ongoing')}
        >
          <Text style={styles.tabText}>Ongoing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton]}
          onPress={() => router.push("./booking-process-completed")}
        >
          <Text style={styles.tabText}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, styles.tabActive]}
        >
          <Text style={[styles.tabText, styles.tabTextActive]}>Cancelled</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton]}
          onPress={() => router.push("./booking-process-return")}
        >
          <Text style={styles.tabText}>Return</Text>
        </TouchableOpacity>
      </View>


      {/* Booking Card */}
      <View style={styles.card}>
        {/* Card Header */}
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.clientName}>Client: Jenn Bornilla</Text>
            <Text style={styles.serviceType}>Home Cleaning</Text>
            <Text style={styles.subType}>Bungalow - Basic Cleaning</Text>
          </View>
          <Ionicons name="chevron-up" size={20} color="#000" />
        </View>


        {/* Date & Time */}
        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>May 21, 2025</Text>
          </View>
          <View style={styles.half}>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.value}>8:00 AM</Text>
          </View>
        </View>


        {/* Address */}
        <View style={styles.section}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>
            B1 L50 Mango st. Phase 1 Saint Joseph Village 10{"\n"}
            Barangay Langgam, City of San Pedro, Laguna 4023
          </Text>
        </View>


        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.label}>Notes:</Text>
          <TextInput style={styles.notesBox} placeholder=" " />
        </View>


        <View style={styles.divider} />


        {/* Total */}
        <View style={styles.rowBetween}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalValue}>₱1,000.00</Text>
        </View>


        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.rebookBtn}>
            <Text style={styles.rebookText}>Rebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.detailsBtn}
            onPress={() => router.push("./cancellation-details")}
          >
            <Text style={styles.detailsText}>View Cancellation Details</Text>
          </TouchableOpacity>
        </View>
      </View>


      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={22} color="#000" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar-outline" size={22} color="#00B0B9" />
          <Text style={[styles.navText, { color: "#00B0B9" }]}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-outline" size={22} color="#000" />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={22} color="#000" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderColor: "transparent",
  },
  tabActive: {
    borderColor: "#00B0B9",
  },
  tabText: {
    fontSize: 13,
    color: "#666",
  },
  tabTextActive: {
    color: "#00B0B9",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    marginBottom: 25,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  clientName: {
    fontWeight: "700",
    fontSize: 14,
  },
  serviceType: {
    fontSize: 14,
    color: "#000",
  },
  subType: {
    fontSize: 13,
    color: "#555",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  half: {
    width: "48%",
  },
  label: {
    fontSize: 13,
    color: "#666",
  },
  value: {
    fontSize: 14,
    color: "#000",
  },
  section: {
    marginVertical: 8,
  },
  notesBox: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 6,
    height: 50,
    marginTop: 4,
    padding: 8,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
    marginVertical: 10,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  totalLabel: {
    fontWeight: "700",
    fontSize: 15,
  },
  totalValue: {
    fontWeight: "700",
    fontSize: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  rebookBtn: {
    backgroundColor: "#00B0B9",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  rebookText: {
    color: "#fff",
    fontWeight: "600",
  },
  detailsBtn: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  detailsText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 13,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
    marginTop: 230,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#000",
    marginTop: 4,
  },
});
