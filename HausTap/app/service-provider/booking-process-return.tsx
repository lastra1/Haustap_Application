import { Ionicons } from "@expo/vector-icons";
// Native date picker (install with: npm install @react-native-community/datetimepicker)
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from "expo-router";
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
  const [showFilter, setShowFilter] = useState(false);
  const [preset, setPreset] = useState<"Last7" | "ThisMonth" | "Custom">(
    "ThisMonth"
  );
  const [showPicker, setShowPicker] = useState<"from" | "to" | null>(null);
  const [fromDate, setFromDate] = useState<string>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .slice(0, 10)
  );
  const [returnDate, setReturnDate] = useState<string>(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
      .toISOString()
      .slice(0, 10)
  );
  const [appliedFilter, setAppliedFilter] = useState<null | { from: string; to: string }>(
    null
  );

  return (
    <View style={styles.container}>
      {/* Scrollable Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Bookings</Text>
          <TouchableOpacity onPress={() => setShowFilter((s) => !s)}>
            <Ionicons name="filter-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Filter Panel */}
        {showFilter && (
          <View style={styles.filterPanel}>
            <Text style={styles.filterTitle}>Filter by Date</Text>

            <View style={styles.filterRow}>
              <Text style={{ marginRight: 8 }}>Preset:</Text>
              <TouchableOpacity
                style={[
                  styles.presetBtn,
                  preset === "Last7" && styles.presetActive,
                ]}
                onPress={() => {
                  const today = new Date();
                  const prev = new Date();
                  prev.setDate(today.getDate() - 6);
                  setFromDate(prev.toISOString().slice(0, 10));
                  setReturnDate(today.toISOString().slice(0, 10));
                  setPreset("Last7");
                }}
              >
                <Text>Last 7 days</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.presetBtn,
                  preset === "ThisMonth" && styles.presetActive,
                ]}
                onPress={() => {
                  const now = new Date();
                  const first = new Date(now.getFullYear(), now.getMonth(), 1);
                  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                  setFromDate(first.toISOString().slice(0, 10));
                  setReturnDate(last.toISOString().slice(0, 10));
                  setPreset("ThisMonth");
                }}
              >
                <Text>This month</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.presetBtn,
                  preset === "Custom" && styles.presetActive,
                ]}
                onPress={() => setPreset("Custom")}
              >
                <Text>Custom</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dateRow}>
              <View style={styles.dateBlock}>
                <Text style={styles.label}>From:</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.datePickerBox}
                  onPress={() => setShowPicker('from')}
                >
                  <Text style={styles.datePickerText}>{fromDate}</Text>
                  <Ionicons name="chevron-down" size={18} color="#666" />
                </TouchableOpacity>
              </View>

              <View style={styles.dateBlock}>
                <Text style={styles.label}>Return:</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.datePickerBox}
                  onPress={() => setShowPicker('to')}
                >
                  <Text style={styles.datePickerText}>{returnDate}</Text>
                  <Ionicons name="chevron-down" size={18} color="#666" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ alignItems: "center", marginTop: 6 }}>
              <TouchableOpacity
                style={styles.applyLarge}
                onPress={() => {
                  // Validate dates
                  const from = new Date(fromDate);
                  const to = new Date(returnDate);
                  if (isNaN(from.getTime()) || isNaN(to.getTime())) {
                    // eslint-disable-next-line no-alert
                    alert("Please enter valid dates in YYYY-MM-DD format.");
                    return;
                  }
                  if (from > to) {
                    // eslint-disable-next-line no-alert
                    alert("'From' date cannot be after 'Return' date.");
                    return;
                  }
                  setAppliedFilter({ from: fromDate, to: returnDate });
                  setShowFilter(false);
                  console.log("Applied filter:", fromDate, returnDate);
                }}
              >
                <Text style={styles.applyLargeText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Applied filter summary */}
        {appliedFilter && (
          <View style={{ marginBottom: 10 }}>
            <Text style={{ color: "#444", fontSize: 13 }}>
              Showing results from {appliedFilter.from} to {appliedFilter.to}
            </Text>
          </View>
        )}

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
                  tab === "Pending"
                    ? () => router.push("/service-provider/before-pending")
                    : tab === "Ongoing"
                    ? () => router.push("/service-provider/before-ongoing")
                    : tab === "Completed"
                    ? () =>
                        router.push(
                          "/service-provider/booking-process-completed"
                        )
                    : tab === "Cancelled"
                    ? () =>
                        router.push(
                          "/service-provider/booking-process-cancelled"
                        )
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
              B1 L50 Mango St. Phase 1 Saint Joseph Village 10{"\n"}Barangay
              Langgam, City of San Pedro, Laguna 4023
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

          {/* Price Summary */}
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
                style={[styles.reasonInput, { height: 55 }]}
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

      {/* Modal */}
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
                Failure to comply within the allowed period will result in:
                {"\n\n"}• Warning notice for first violation{"\n"}• Temporary
                suspension (3–7 days) for second violation{"\n"}• Permanent
                account termination for repeated non-compliance.
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

      {/* Native DateTimePicker (shared) */}
      {showPicker && (
        <DateTimePicker
          value={
            showPicker === "from" ? new Date(fromDate) : new Date(returnDate)
          }
          mode="date"
          display="default"
          onChange={(event: any, selected?: Date) => {
            // On Android, event.type === 'dismissed' when cancelled
            if (!selected) {
              setShowPicker(null);
              return;
            }
            const yyyy = selected.getFullYear();
            const mm = String(selected.getMonth() + 1).padStart(2, "0");
            const dd = String(selected.getDate()).padStart(2, "0");
            const iso = `${yyyy}-${mm}-${dd}`;
            if (showPicker === "from") {
              setFromDate(iso);
            } else {
              setReturnDate(iso);
            }
            setPreset("Custom");
            setShowPicker(null);
          }}
        />
      )}

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

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/service-provider/chatbox')} accessibilityLabel="Open Chat">
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
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  scrollContent: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 120 },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: { fontSize: 22, fontWeight: "700" },

  filterPanel: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EEE",
    marginBottom: 12,
  },
  filterTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  filterRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  presetBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    marginRight: 8,
    backgroundColor: "#F6F6F6",
  },
  presetActive: { backgroundColor: "#DFF6F6", borderColor: "#00B0B9" },
  dateRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  dateBlock: { width: "48%" },
  dateInput: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#FFF",
  },
  applyBtn: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DDD",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  applyText: { color: "#000", fontWeight: "600" },
  datePickerBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    backgroundColor: "#FFF",
  },
  datePickerText: { color: "#333", fontSize: 14 },
  applyLarge: {
    width: "60%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DDD",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  applyLargeText: { color: "#000", fontSize: 16, fontWeight: "600" },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
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
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    marginBottom: 30,
  },

  clientName: { fontWeight: "700", fontSize: 15, marginBottom: 3 },
  serviceType: { fontSize: 14, color: "#000", marginBottom: 2 },
  subType: { fontSize: 13, color: "#000", marginBottom: 10 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  half: { width: "45%" },
  label: { fontSize: 13, color: "#444", marginBottom: 2 },
  value: { fontSize: 14, color: "#000", lineHeight: 20 },
  section: { marginVertical: 8 },

  notesBox: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 6,
    height: 45,
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
    marginVertical: 14,
  },
  voucherText: { fontSize: 13, color: "#333", marginLeft: 6 },

  priceSection: { marginTop: 10, marginBottom: 14 },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  subLabel: { fontSize: 13, color: "#666" },
  subValue: { fontSize: 13, color: "#000" },
  divider: { borderBottomWidth: 1, borderColor: "#E0E0E0", marginVertical: 10 },
  totalRow: { flexDirection: "row", justifyContent: "space-between" },
  totalLabel: { fontWeight: "700", fontSize: 15 },
  totalValue: { fontWeight: "700", fontSize: 15 },
  noteText: { fontSize: 11, color: "#777", marginTop: 6, lineHeight: 16 },

  blueDivider: {
    height: 2,
    backgroundColor: "#00B0B9",
    marginVertical: 14,
    borderRadius: 2,
  },

  returnBox: {
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    padding: 14,
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
    marginTop: 4,
  },

  acceptBtn: {
    backgroundColor: "#00B0B9",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 18,
  },
  acceptText: { color: "#fff", fontWeight: "600" },

  returnNotice: {
    fontSize: 12,
    color: "#555",
    marginTop: 10,
    textAlign: "left",
    lineHeight: 18,
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
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
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
