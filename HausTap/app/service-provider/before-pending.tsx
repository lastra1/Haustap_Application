import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Animated, PanResponder, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function BookingsScreen() {
  const [expanded, setExpanded] = useState(false);
  const [arrived, setArrived] = useState(false);
  const pan = React.useRef(new Animated.Value(0)).current;
  const trackWidthRef = React.useRef(0);
  const pos = React.useRef(0);
  const startX = React.useRef(0);
  const KNOB_WIDTH = 60;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !arrived,
      onMoveShouldSetPanResponder: () => !arrived,
      onPanResponderGrant: () => {
        startX.current = pos.current;
      },
      onPanResponderMove: (_e, gesture) => {
        const max = Math.max(0, (trackWidthRef.current || 0) - KNOB_WIDTH);
        let newPos = Math.max(0, Math.min(startX.current + gesture.dx, max));
        pos.current = newPos;
        pan.setValue(newPos);
      },
      onPanResponderRelease: () => {
        const max = Math.max(0, (trackWidthRef.current || 0) - KNOB_WIDTH);
        const threshold = max * 0.7;
        if (pos.current >= threshold) {
          // complete
          Animated.timing(pan, { toValue: max, duration: 150, useNativeDriver: true }).start(() => {
            setArrived(true);
            try {
              // Navigate to the Ongoing screen after marking arrived
              router.push('/service-provider/before-ongoing');
            } catch (e) {
              console.log('nav failed', e);
            }
          });
        } else {
          // reset
          Animated.timing(pan, { toValue: 0, duration: 150, useNativeDriver: true }).start(() => {
            pos.current = 0;
            startX.current = 0;
          });
        }
      },
    })
  ).current;

  const handleTabPress = (tab: string) => {
    try {
      if (tab === "Pending") {
        router.push('/service-provider/before-pending');
      } else if (tab === "Ongoing") {
        router.push('/service-provider/before-ongoing');
      } else if (tab === "Completed") {
        router.push('/service-provider/booking-process-completed');
      } else if (tab === "Cancelled") {
        router.push('/service-provider/booking-process-cancelled');
      } else if (tab === "Return") {
        router.push('/service-provider/booking-process-return');
      }
    } catch (e) {
      console.error('Tab navigation failed', e);
    }
  };

  return (
    <View style={styles.page}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.header}>Bookings</Text>


        {/* Tabs */}
        <View style={styles.tabs}>
          {["Pending", "Ongoing", "Completed", "Cancelled", "Return"].map(
            (tab, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleTabPress(tab)}
                style={[styles.tab, tab === "Pending" && styles.tabActive]}
              >
                <Text
                  style={[styles.tabText, tab === "Pending" && styles.tabTextActive]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>


        {/* Booking Card */}
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.clientName}>
                <Text style={{ fontWeight: "700" }}>Client:</Text> Jenn Bornilla
              </Text>
              <Text style={styles.serviceTitle}>Home Cleaning</Text>
              <Text style={styles.serviceSubtitle}>Bungalow - Basic Cleaning</Text>
            </View>
            <TouchableOpacity onPress={() => setExpanded((s) => !s)} style={{ padding: 6 }} accessibilityLabel={expanded ? 'Collapse' : 'Expand'}>
              <Ionicons name="chevron-down" size={20} color="#000" style={{ transform: [{ rotate: expanded ? '180deg' : '0deg' }] }} />
            </TouchableOpacity>
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


          {/* Expanded details */}
          {expanded && (
            <>
              {/* Selected Section */}
              <View style={styles.section}>
                <Text style={styles.label}>Selected:</Text>
                <Text style={styles.valueBold}>Bungalow 80–150 sqm</Text>
                <Text style={styles.value}>Basic Cleaning – 1 Cleaner</Text>
              </View>

              {/* Inclusions */}
              <View style={styles.section}>
                <Text style={styles.label}>Inclusions:</Text>
                <Text style={styles.value}>
                  Living Room: walls, mop, dusting furniture, trash removal,{"\n"}
                  Bedrooms: bed making, sweeping, dusting, trash removal,{"\n"}
                  Hallways: mop & sweep, remove cobwebs,{"\n"}
                  Windows & Mirrors: quick wipe
                </Text>
              </View>

              {/* Notes */}
              <View style={styles.section}>
                <Text style={styles.label}>Notes:</Text>
                <TextInput style={styles.textArea} placeholder=" " multiline />
              </View>

              {/* Voucher */}
              <View style={styles.voucherBox}>
                <Ionicons name="ticket-outline" size={18} color="#666" />
                <Text style={styles.voucherText}>No voucher added</Text>
              </View>

              {/* Subtotal & Total */}
              <View style={styles.priceSection}>
                <View style={styles.rowBetween}>
                  <Text style={styles.subLabel}>Sub Total</Text>
                  <Text style={styles.subAmount}>₱1,000.00</Text>
                </View>
                <View style={styles.rowBetween}>
                  <Text style={styles.subLabel}>Voucher Discount</Text>
                  <Text style={styles.subAmount}>₱0</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.rowBetween}>
                  <Text style={styles.totalLabel}>TOTAL</Text>
                  <Text style={styles.totalAmount}>₱1,000.00</Text>
                </View>
              </View>


              {/* Note text */}
              <Text style={styles.noteInfo}>
                Full payment will be collected directly by the service provider upon completion of the service.
              </Text>


              {/* Accept Booking */}
              <View style={styles.acceptBox}>
                <Text style={styles.acceptTitle}>Accept Booking?</Text>
                <Text style={styles.acceptSubtitle}>Be the first one to accept</Text>

                {/* Animated Slide Button */}
                <View
                  style={[styles.sliderTrack, arrived && { opacity: 0.7 }]}
                  onLayout={(e) => {
                    trackWidthRef.current = e.nativeEvent.layout.width;
                  }}
                >
                  <Text style={styles.sliderCenterText}>{arrived ? 'Marked as arrived' : 'Slide to mark as arrived'}</Text>
                  <Animated.View
                    style={[
                      styles.knob,
                      { transform: [{ translateX: pan }] },
                    ]}
                    {...panResponder.panHandlers}
                  >
                    <Ionicons name="chevron-forward-outline" size={18} color="#fff" />
                  </Animated.View>
                </View>

                {/* Cancel Button */}
                <TouchableOpacity style={styles.cancelButton}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
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
          <Text style={[styles.navText, { color: '#00B0B9', fontWeight: '600' }]}>Bookings</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 60,
    marginBottom: 90,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tab: {
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
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  clientName: {
    fontSize: 14,
    color: "#000",
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  serviceSubtitle: {
    fontSize: 13,
    color: "#555",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  half: { width: "48%" },
  label: {
    fontSize: 12,
    color: "#666",
    marginBottom: 3,
  },
  value: {
    fontSize: 14,
    color: "#000",
    lineHeight: 20,
  },
  valueBold: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  section: { marginTop: 10 },
  textArea: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 6,
    height: 50,
    marginTop: 4,
    padding: 8,
    textAlignVertical: "top",
  },
  voucherBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
  },
  voucherText: { marginLeft: 8, fontSize: 13, color: "#555" },
  priceSection: { marginTop: 15 },
  subLabel: { fontSize: 13, color: "#666" },
  subAmount: { fontSize: 13, color: "#000" },
  divider: { borderBottomWidth: 1, borderColor: "#EEE", marginVertical: 6 },
  totalLabel: { fontWeight: "700", fontSize: 15 },
  totalAmount: { fontWeight: "700", fontSize: 15 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between" },
  noteInfo: { fontSize: 11, color: "#777", marginTop: 8, marginBottom: 12, lineHeight: 16 },
  acceptBox: { borderTopWidth: 1, borderColor: "#DDD", paddingTop: 10 },
  acceptTitle: { fontWeight: "700", fontSize: 14, color: "#000" },
  acceptSubtitle: { fontSize: 12, color: "#666", marginBottom: 8 },
  sliderButton: {
    flexDirection: "row",
    backgroundColor: "#00B0B9",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginBottom: 10,
  },
  sliderText: { color: "#fff", fontWeight: "600", marginLeft: 6 },
  /* Animated slider track and knob */
  sliderTrack: {
    height: 44,
    backgroundColor: '#00B0B9',
    borderRadius: 8,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sliderCenterText: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#fff',
    fontWeight: '600',
  },
  knob: {
    position: 'absolute',
    left: 0,
    width: 60,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#007A7D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: { borderWidth: 1, borderColor: "#999", borderRadius: 8, paddingVertical: 10, alignItems: "center" },
  cancelText: { fontWeight: "600", color: "#333" },
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
  navText: { fontSize: 12, color: "#000", marginTop: 3 },
});
