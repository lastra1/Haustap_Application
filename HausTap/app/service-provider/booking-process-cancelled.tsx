import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CancelledScreen() {
  const [expanded, setExpanded] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <Text style={styles.headerTitle}>Bookings</Text>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tabButton]}
            onPress={() => router.push("/service-provider/before-pending")}
          >
            <Text style={styles.tabText}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton]}
            onPress={() => router.push("/service-provider/before-ongoing")}
          >
            <Text style={styles.tabText}>Ongoing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton]}
            onPress={() => router.push("./booking-process-completed")}
          >
            <Text style={styles.tabText}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabButton, styles.tabActive]}>
            <Text style={[styles.tabText, styles.tabTextActive]}>
              Cancelled
            </Text>
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
          {/* Card Header with toggle arrow */}
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.clientName}>Client: Jenn Bornilla</Text>
              <Text style={styles.serviceType}>Home Cleaning</Text>
              <Text style={styles.subType}>Bungalow - Basic Cleaning</Text>
            </View>

            <TouchableOpacity
              onPress={() => setExpanded((s) => !s)}
              style={{ padding: 6 }}
              accessibilityLabel={expanded ? "Collapse details" : "Expand details"}
            >
              <Ionicons
                name="chevron-down"
                size={20}
                color="#000"
                style={{ transform: [{ rotate: expanded ? "180deg" : "0deg" }] }}
              />
            </TouchableOpacity>
          </View>

          {/* Basic info always visible */}
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

          <View style={styles.section}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>
              B1 L50 Mango st. Phase 1 Saint Joseph Village 10{"\n"}
              Barangay Langgam, City of San Pedro, Laguna 4023
            </Text>
          </View>

          {/* Show expanded cancellation details when expanded === true */}
          {expanded && (
            <>
              {/* Selected Service */}
              <View style={styles.section}>
                <Text style={styles.label}>Selected:</Text>
                <Text style={styles.value}>
                  <Text style={{ fontWeight: "600" }}>
                    Bungalow 80–150 sqm{"\n"}Basic Cleaning – 1 Cleaner
                  </Text>
                  {"\n\n"}Inclusions:{"\n"}Living Room: mopping, dusting furniture,
                  trash removal{"\n"}Bedroom: bed making, mopping, dusting, trash
                  removal{"\n"}Hallways: mop & sweep, remove cobwebs, Windows &
                  Mirrors: quick wipe
                </Text>
              </View>

              {/* Notes */}
              <View style={styles.section}>
                <Text style={styles.label}>Notes:</Text>
                <TextInput style={styles.notesBox} placeholder=" " />
              </View>

              {/* Voucher */}
              <View style={styles.voucherBox}>
                <Ionicons name="pricetag-outline" size={18} color="#000" />
                <Text style={styles.voucherText}>No voucher added</Text>
              </View>

              {/* Total */}
              <View style={styles.priceSection}>
                <View style={styles.priceRow}>
                  <Text style={styles.subLabel}>Sub Total</Text>
                  <Text style={styles.subValue}>₱1,000.00</Text>
                </View>
                <View style={styles.priceRow}>
                  <Text style={styles.subLabel}>Voucher Discount</Text>
                  <Text style={styles.subValue}>₱0</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>TOTAL</Text>
                  <Text style={styles.totalValue}>₱1,000.00</Text>
                </View>
                <Text style={styles.noteText}>
                  All payment shall be collected directly by the service provider upon
                  completion of service.
                </Text>
              </View>

              {/* Blue Divider */}
              <View style={styles.blueDivider} />

              {/* Cancelled Info */}
              <View style={styles.cancelledBox}>
                <View style={styles.cancelledHeader}>
                  <Text style={styles.cancelledTitle}>CANCELLED</Text>
                  <Text style={styles.approveTextStatic}>Approve</Text>
                </View>

                <View style={styles.reasonSection}>
                  <Text style={styles.reasonLabel}>Reason for Cancellation</Text>
                  <TextInput
                    style={styles.reasonInput}
                    value="No need service"
                    editable={false}
                  />

                  <Text style={styles.reasonLabel}>Requested by</Text>
                  <TextInput
                    style={styles.reasonInput}
                    value="Jenn Bornilla"
                    editable={false}
                  />

                  <Text style={styles.reasonLabel}>Submission Date</Text>
                  <TextInput
                    style={styles.reasonInput}
                    value="May 04, 2025"
                    editable={false}
                  />

                  <Text style={styles.reasonLabel}>Submission Time</Text>
                  <TextInput
                    style={styles.reasonInput}
                    value="12:00 AM"
                    editable={false}
                  />
                </View>
              </View>

              {/* Buttons removed: Rebook and View Cancellation Details */}
            </>
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/service-provider")}
        >
          <Ionicons name="home-outline" size={22} color="#000" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar-outline" size={22} color="#00B0B9" />
          <Text style={[styles.navText, { color: "#00B0B9" }]}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/service-provider/chatbox")}
        >
          <Ionicons name="chatbubble-outline" size={22} color="#000" />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/service-provider/my-account")}
        >
          <Ionicons name="person-outline" size={22} color="#000" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 120,
  },
  headerTitle: { fontSize: 22, fontWeight: "700", marginBottom: 15 },
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
  tabActive: { borderColor: "#00B0B9" },
  tabText: { fontSize: 13, color: "#666" },
  tabTextActive: { color: "#00B0B9", fontWeight: "600" },
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
  clientName: { fontWeight: "700", fontSize: 14 },
  serviceType: { fontSize: 14, color: "#000" },
  subType: { fontSize: 13, color: "#555" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  half: { width: "48%" },
  label: { fontSize: 13, color: "#666", marginBottom: 2 },
  value: { fontSize: 14, color: "#000" },
  section: { marginVertical: 8 },
  notesBox: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 6,
    height: 50,
    marginTop: 4,
    padding: 8,
  },

  voucherBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  voucherText: { fontSize: 13, color: "#333", marginLeft: 6 },

  priceSection: { marginTop: 10 },
  priceRow: { flexDirection: "row", justifyContent: "space-between" },
  subLabel: { fontSize: 13, color: "#666" },
  subValue: { fontSize: 13, color: "#000" },
  divider: {
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
    marginVertical: 10,
  },
  totalRow: { flexDirection: "row", justifyContent: "space-between" },
  totalLabel: { fontWeight: "700", fontSize: 15 },
  totalValue: { fontWeight: "700", fontSize: 15 },
  noteText: { fontSize: 11, color: "#777", marginTop: 6 },

  blueDivider: {
    height: 2,
    backgroundColor: "#00B0B9",
    marginVertical: 12,
    borderRadius: 2,
  },

  cancelledBox: {
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  cancelledHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cancelledTitle: { fontWeight: "700", fontSize: 14, color: "#E53935" },
  approveTextStatic: { fontSize: 13, color: "#00B0B9", fontWeight: "600" },
  reasonSection: { marginTop: 10 },
  reasonLabel: { fontSize: 13, color: "#666", marginTop: 6 },
  reasonInput: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 6,
    padding: 8,
    color: "#000",
    fontSize: 13,
    backgroundColor: "#F9F9F9",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  rebookBtn: {
    backgroundColor: "#00B0B9",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  rebookText: { color: "#fff", fontWeight: "600" },
  detailsBtn: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  detailsText: { color: "#333", fontWeight: "600", fontSize: 13 },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, marginTop: 4 },
});

