import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


export default function ReturnScreen({ navigation }: { navigation?: any }) {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);


  return (
    <View style={styles.container}>
      {/* Main Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Bookings</Text>
          <TouchableOpacity>
            <Ionicons name="filter-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>


        {/* Tabs */}
        <View style={styles.tabs}>
          {["Pending", "Ongoing", "Completed", "Cancelled", "Return"].map(
            (tab, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.tabButton,
                  tab === "Return" && styles.tabActive,
                ]}
                onPress={
                  tab === 'Pending'
                    ? () => router.push('/service-provider/before-pending')
                    : tab === 'Ongoing'
                    ? () => router.push('/service-provider/before-ongoing')
                    : tab === 'Completed'
                    ? () => router.push('/service-provider/booking-process-completed')
                    : tab === 'Cancelled'
                    ? () => router.push('/service-provider/booking-process-cancelled')
                    : undefined
                }
              >
                <Text
                  style={[
                    styles.tabText,
                    tab === "Return" && styles.tabTextActive,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>


        {/* Booking Card */}
        <View style={styles.card}>
          <Text style={styles.clientName}>Client: Jenn Bornilla</Text>
          <Text style={styles.serviceType}>Home Cleaning</Text>
          <Text style={styles.subType}>Bungalow - Basic Cleaning</Text>


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


          <View style={styles.section}>
            <Text style={styles.label}>Selected:</Text>
            <Text style={styles.value}>
              <Text style={{ fontWeight: "300" }}>
                Bungalow 80–150 sqm{"\n"}Basic Cleaning – 1 Cleaner
              </Text>
              {"\n\n"}Inclusions:{"\n"}Living Room: walls, mop, dusting
              furniture, trash removal{"\n"}Bedrooms: bed making, sweeping,
              dusting, trash removal{"\n"}Hallways: mop & sweep, remove
              cobwebs, Windows & Mirrors: quick wipe
            </Text>
          </View>


          <View style={styles.section}>
            <Text style={styles.label}>Notes:</Text>
            <TextInput
              style={styles.notesBox}
              placeholder=" "
              editable={false}
            />
          </View>


          <View style={styles.voucherBox}>
            <Ionicons name="pricetag-outline" size={18} color="#000" />
            <Text style={styles.voucherText}>No voucher added</Text>
          </View>


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
              Full payment will be collected directly by the service provider
              upon completion of service.
            </Text>
          </View>


          <View style={styles.blueDivider} />


          {/* RETURN SECTION */}
          <View style={styles.returnBox}>
            <View style={styles.returnHeader}>
              <Text style={styles.returnTitle}>RETURN</Text>
              <Text style={styles.pendingText}>Pending Review</Text>
            </View>


            <View style={styles.reasonSection}>
              <Text style={styles.reasonLabel}>Reason for Return</Text>
              <TextInput
                style={styles.reasonInput}
                value="Unsatisfactory Service Quality"
                editable={false}
              />


              <Text style={styles.reasonLabel}>Description</Text>
              <TextInput
                style={[styles.reasonInput, { height: 50 }]}
                multiline
                value="The quality of the service did not meet the expected standards or thoroughness."
                editable={false}
              />


              <Text style={styles.reasonLabel}>Return Request Date</Text>
              <TextInput
                style={styles.reasonInput}
                value="May 04, 2026"
                editable={false}
              />


              <Text style={styles.reasonLabel}>Return Request Time</Text>
              <TextInput
                style={styles.reasonInput}
                value="10:30 AM"
                editable={false}
              />
            </View>


            <TouchableOpacity style={styles.acceptBtn}>
              <Text style={styles.acceptText}>Accept Return</Text>
            </TouchableOpacity>


            <Text style={styles.returnNotice}>
              The service provider must complete the approved return within 7
              days from the admin’s approval date.{"\n"}
              Failure to do so will cancel the request and may result in{" "}
              <Text
                style={styles.penaltyText}
                onPress={() => setModalVisible(true)}
              >
                penalties.
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>


      {/* Modal for Return Policy and Penalties */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Return Policy and Penalties</Text>
            <ScrollView style={{ maxHeight: 400 }}>
              <Text style={styles.modalText}>
                Once a return request has been approved by the admin, the
                service provider must complete the re-service within seven (7)
                days from the approval date.{"\n\n"}
                Failure to comply within the allowed period will result in the
                following penalties, depending on the severity or frequency of
                non-compliance:
                {"\n\n"}Possible Penalties:{"\n\n"}
                <Text style={{ fontWeight: "600" }}>First Violation – </Text>
                Warning Notice{"\n"}A formal written warning will be sent to the
                provider as a reminder to comply with the return policy.{"\n\n"}
                <Text style={{ fontWeight: "600" }}>
                  Second Violation –{" "}
                </Text>
                Temporary Account Suspension{"\n"}The provider’s account will be
                suspended for 3 to 7 days, preventing them from accepting new
                bookings during this period.{"\n\n"}
                <Text style={{ fontWeight: "600" }}>
                  Severe or Repeated Violations –{" "}
                </Text>
                Account Termination{"\n"}Continued failure to complete approved
                return requests within the given timeframe may lead to permanent
                account suspension or removal from the platform.
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      {/* Fixed Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/service-provider')}>
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
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/service-provider/my-account')}>
          <Ionicons name="person-outline" size={22} color="#000" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  scrollContent: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 100 },


  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 22, fontWeight: "700" },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 15,
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
  clientName: { fontWeight: "700", fontSize: 15 },
  serviceType: { fontSize: 14, color: "#000" },
  subType: { fontSize: 13, color: "#000" },
  row: { flexDirection: "row", justifyContent: "space-between", marginVertical: 6 },
  half: { width: "40%" },
  label: { fontSize: 13, color: "#000" },
  value: { fontSize: 14, color: "#000" },
  section: { marginVertical: 2 },
  notesBox: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 6,
    height: 50,
    marginTop: 4,
    padding: 8,
    backgroundColor: "#F9F9F9",
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
  divider: { borderBottomWidth: 1, borderColor: "#E0E0E0", marginVertical: 10 },
  totalRow: { flexDirection: "row", justifyContent: "space-between" },
  totalLabel: { fontWeight: "700", fontSize: 15 },
  totalValue: { fontWeight: "700", fontSize: 15 },
  noteText: { fontSize: 11, color: "#777", marginTop: 6 },
  blueDivider: { height: 2, backgroundColor: "#00B0B9", marginVertical: 12, borderRadius: 2 },
  returnBox: {
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  returnHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  returnTitle: { fontWeight: "800", fontSize: 15, color: "#000" },
  pendingText: { fontSize: 13, color: "#00ABB1", fontWeight: "600" },
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
  acceptBtn: {
    backgroundColor: "#00B0B9",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16,
  },
  acceptText: { color: "#fff", fontWeight: "600" },
  returnNotice: {
    fontSize: 12,
    color: "#555",
    marginTop: 8,
    textAlign: "left",
    lineHeight: 17,
  },
  penaltyText: {
    color: "#007bff",
    textDecorationLine: "underline",
  },


  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "85%",
    elevation: 5,
  },
  modalTitle: { fontSize: 16, fontWeight: "700", marginBottom: 10, textAlign: "center" },
  modalText: { fontSize: 13, color: "#333", lineHeight: 20 },
  closeBtn: {
    backgroundColor: "#00B0B9",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
    marginTop: 16,
  },
  closeText: { color: "#fff", fontWeight: "600" },


  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, marginTop: 4 },
});