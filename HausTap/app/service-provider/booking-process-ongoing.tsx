import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Animated,
    PanResponder,
    PanResponderGestureState,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";


export default function OngoingScreen() {
  const [isCompleted, setIsCompleted] = useState(false);
  const pan = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture: PanResponderGestureState) => {
      const maxSlide = 240;
      const newValue = Math.max(0, Math.min(gesture.dx, maxSlide));
      pan.setValue(newValue);
    },
    onPanResponderRelease: (_, gesture: PanResponderGestureState) => {
      const maxSlide = 240;
      if (gesture.dx >= maxSlide * 0.8) {
        Animated.spring(pan, {
          toValue: maxSlide,
          useNativeDriver: true,
          friction: 8,
          tension: 40,
        }).start(() => {
          if (!isCompleted) {
            setIsCompleted(true);
            // Handle completion logic here
          }
        });
      } else {
        Animated.spring(pan, {
          toValue: 0,
          useNativeDriver: true,
          friction: 8,
          tension: 40,
        }).start();
      }
    },
  });

  return (
    <ScrollView style={styles.container}>
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
          style={[styles.tabButton, styles.tabActive]}
        >
          <Text style={[styles.tabText, styles.tabTextActive]}>Ongoing</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => router.push("/service-provider/booking-process-completed")}
        >
          <Text style={styles.tabText}>Completed</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => router.push("/service-provider/booking-process-cancelled")}> 
          <Text style={styles.tabText}>Cancelled</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => router.push("/service-provider/booking-process-return")}> 
          <Text style={styles.tabText}>Return</Text>
        </TouchableOpacity>
      </View>


      {/* Booking Card */}
      <View style={styles.card}>
        {/* Client Info */}
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.clientName}>Client: Jenn Bornilla</Text>
            <Text style={styles.serviceType}>Home Cleaning</Text>
            <Text style={styles.subType}>Bungalow - Basic Cleaning</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="#000" />
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
            B1 L50 Mango St. Phase 1 Saint Joseph Village 10{"\n"}
            Barangay Langgam, City of San Pedro, Laguna 4023
          </Text>
        </View>


        {/* Subtotal Info */}
        <View style={styles.section}>
          <Text style={styles.valueBold}>Bungalow 80–150 sqm</Text>
          <Text style={styles.value}>Basic Cleaning – 1 Cleaner</Text>
        </View>


        {/* Inclusions */}
        <View style={styles.section}>
          <Text style={[styles.label, { marginBottom: 4 }]}>Inclusions</Text>
          <Text style={styles.inclusions}>
            <Text style={styles.bold}>Living Room: </Text>walls, mop, dusting
            furniture, trash removal{"\n"}
            <Text style={styles.bold}>Bedrooms: </Text>bed making, sweeping,
            dusting, trash removal{"\n"}
            <Text style={styles.bold}>Hallway: </Text>mop & sweep, remove
            cobwebs{"\n"}
            <Text style={styles.bold}>Windows & Mirrors: </Text>quick wipe
          </Text>
        </View>


        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.label}>Notes:</Text>
          <TextInput
            style={styles.notesBox}
            placeholder="Type additional notes here..."
            multiline
          />
        </View>


        {/* Voucher */}
        <View style={styles.voucherBox}>
          <Ionicons name="pricetag-outline" size={18} color="#555" />
          <Text style={styles.voucherText}>No voucher added</Text>
        </View>


        {/* Total Section */}
        <View style={styles.totalBox}>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Sub Total</Text>
            <Text style={styles.value}>₱1,000.00</Text>
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Voucher Discount</Text>
            <Text style={styles.value}>₱0</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.rowBetween}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalValue}>₱1,000.00</Text>
          </View>
          <Text style={styles.footnote}>
            Full payment in cash will be collected by the service provider upon
            completion of the service.
          </Text>
        </View>


        {/* Upload Photos */}
        <View style={styles.section}>
          <Text style={styles.uploadLabel}>Upload Photo</Text>
          <View style={styles.rowBetween}>
            {["Before", "After"].map((label, i) => (
              <View key={i} style={styles.uploadBox}>
                <Ionicons
                  name="camera-outline"
                  size={20}
                  color="#AAA"
                  style={{ marginBottom: 4 }}
                />
                <Text style={styles.uploadText}>{label}</Text>
              </View>
            ))}
          </View>
        </View>


        {/* Slide Button */}
        <View style={styles.sliderContainer}>
          <View style={styles.sliderTrack}>
            <Text style={styles.slideText}>
              {isCompleted ? "Service Completed!" : "Slide to mark as completed"}
            </Text>
          </View>
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.slider,
              {
                transform: [{
                  translateX: pan
                }]
              }
            ]}
          >
            <Ionicons name="arrow-forward" size={24} color="#fff" />
          </Animated.View>
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
  valueBold: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
  },
  section: {
    marginVertical: 8,
  },
  bold: {
    fontWeight: "600",
    color: "#000",
  },
  inclusions: {
    fontSize: 13,
    color: "#444",
    lineHeight: 20,
  },
  notesBox: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 6,
    height: 60,
    marginTop: 4,
    padding: 8,
  },
  voucherBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  voucherText: {
    fontSize: 13,
    color: "#555",
    marginLeft: 6,
  },
  totalBox: {
    marginTop: 12,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
    marginVertical: 8,
  },
  totalLabel: {
    fontWeight: "700",
    fontSize: 15,
  },
  totalValue: {
    fontWeight: "700",
    fontSize: 15,
  },
  footnote: {
    fontSize: 11,
    color: "#888",
    marginTop: 4,
  },
  uploadLabel: {
    fontWeight: "600",
    marginBottom: 8,
    fontSize: 12,
  },
  uploadBox: {
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    height: 50,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
  },
  uploadText: {
    fontSize: 13,
    color: "#555",
  },
  sliderContainer: {
    width: '100%',
    height: 60,
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 20,
  },
  slider: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00B0B9',
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderTrack: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
  },
  cancelText: {
    color: "#333",
    fontWeight: "600",
  },
  // removed cancel button styles (button removed from JSX)
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
    marginTop: 60,
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
