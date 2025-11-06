import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


export default function CompletedDetailsScreen() {
  const [expanded, setExpanded] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [fromDate, setFromDate] = useState<Date>(new Date('2025-10-01'));
  const [toDate, setToDate] = useState<Date>(new Date('2025-10-31'));
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  // sample bookings (replace with real data source)
  const sampleBookings = [
    { id: '1', client: 'Jenn Bornilla', date: '2025-10-05', time: '08:00', service: 'Home Cleaning', subtype: 'Bungalow - Basic Cleaning', address: 'B1 L50 Mango st. Phase 1 Saint Joseph Village 10, Barangay Langgam, City of San Pedro, Laguna 4023' },
    { id: '2', client: 'Alex Cruz', date: '2025-11-02', time: '10:00', service: 'Deep Cleaning', subtype: 'Condo - Deep Clean', address: 'Unit 12, Some Condo, City' },
  ];
  const [bookings, setBookings] = useState(sampleBookings);
  const [filteredBookings, setFilteredBookings] = useState(sampleBookings);

  const formatDate = (d: Date) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const onChangeFrom = (_event: any, selected?: Date) => {
    setShowFromPicker(false);
    if (selected) setFromDate(selected);
  };

  const onChangeTo = (_event: any, selected?: Date) => {
    setShowToPicker(false);
    if (selected) setToDate(selected);
  };

  const applyFilter = () => {
    const start = new Date(fromDate);
    start.setHours(0,0,0,0);
    const end = new Date(toDate);
    end.setHours(23,59,59,999);
    const filtered = bookings.filter(b => {
      const d = new Date(b.date + 'T00:00:00');
      return d.getTime() >= start.getTime() && d.getTime() <= end.getTime();
    });
    setFilteredBookings(filtered);
    setShowFilter(false);
  };
  return (
    <ScrollView style={styles.container}>
        {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Bookings</Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilter(true)}>
          <Ionicons name="filter-outline" size={18} color="#000" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {showFilter && (
        <View style={styles.filterPanel}>
          <Text style={styles.filterLabel}>Filter by Date</Text>
          <View style={styles.dateRow}>
            <Text style={styles.dateLabel}>From:</Text>
            <TouchableOpacity style={styles.dateBtn} onPress={() => setShowFromPicker(true)}>
              <Text style={styles.dateBtnText}>{formatDate(fromDate)}</Text>
            </TouchableOpacity>
            {showFromPicker && (
              <DateTimePicker value={fromDate} mode="date" display="default" onChange={onChangeFrom} />
            )}
          </View>

          <View style={styles.dateRow}>
            <Text style={styles.dateLabel}>Return:</Text>
            <TouchableOpacity style={styles.dateBtn} onPress={() => setShowToPicker(true)}>
              <Text style={styles.dateBtnText}>{formatDate(toDate)}</Text>
            </TouchableOpacity>
            {showToPicker && (
              <DateTimePicker value={toDate} mode="date" display="default" onChange={onChangeTo} />
            )}
          </View>

          <View style={styles.filterActions}>
            <TouchableOpacity style={styles.applyBtn} onPress={applyFilter}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeFilterBtn} onPress={() => setShowFilter(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}


      {/* Tabs */}
      <View style={styles.tabs}>
  <TouchableOpacity style={[styles.tabButton]} onPress={() => router.push('/service-provider/before-pending')}>
          <Text style={styles.tabText}>Pending</Text>
        </TouchableOpacity>

  <TouchableOpacity style={[styles.tabButton]} onPress={() => router.push('/service-provider/before-ongoing')}>
          <Text style={styles.tabText}>Ongoing</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.tabButton, styles.tabActive]} onPress={() => router.push('/service-provider/booking-process-completed')}>
          <Text style={[styles.tabText, styles.tabTextActive]}>Completed</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => router.push('/service-provider/booking-process-cancelled')}>
          <Text style={styles.tabText}>Cancelled</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => router.push('/service-provider/booking-process-return')}>
          <Text style={styles.tabText}>Return</Text>
        </TouchableOpacity>
      </View>


        {/* Booking Card */}
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.clientName}>Client: Jenn Bornilla</Text>
            <Text style={styles.serviceType}>Home Cleaning</Text>
            <Text style={styles.subType}>Bungalow - Basic Cleaning</Text>
          </View>
          {/* chevron starts down; when expanded rotates to up */}
          <TouchableOpacity onPress={() => setExpanded((s) => !s)} style={{ padding: 6 }} accessibilityLabel={expanded ? 'Collapse details' : 'Expand details'}>
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
            {/* Selected Package */}
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
                Hallways: mop & sweep, remove cobwebs,{"\n"}Windows & Mirrors:
                quick wipe
              </Text>
            </View>

            {/* Notes */}
            <View style={styles.section}>
              <Text style={styles.label}>Notes:</Text>
              <TextInput style={styles.notesBox} />
            </View>

            {/* Voucher Section */}
            <View style={styles.voucherBox}>
              <Ionicons name="pricetag-outline" size={20} color="#000" />
              <Text style={styles.voucherText}>No voucher added</Text>
            </View>

            {/* Pricing Section */}
            <View style={styles.section}>
              <View style={styles.rowBetween}>
                <Text style={styles.label}>Sub Total</Text>
                <Text style={styles.value}>₱1,000.00</Text>
              </View>
              <View style={styles.rowBetween}>
                <Text style={styles.label}>Voucher Discount</Text>
                <Text style={styles.value}>₱0</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.rowBetween}>
              <Text style={styles.totalLabel}>TOTAL</Text>
              <Text style={styles.totalValue}>₱1,000.00</Text>
            </View>

            <Text style={styles.footerNote}>
              Full payment will be collected directly by the service provider upon
              completion of the service.
            </Text>

            {/* Report Button */}
            <TouchableOpacity style={styles.reportBtn} onPress={() => router.push('/service-provider/report-page')}>
              <Text style={styles.reportText}>Report Client</Text>
            </TouchableOpacity>
          </>
        )}
      </View>


      {/* Bottom Navigation removed */}
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterText: {
    marginLeft: 4,
    fontSize: 13,
    color: "#000",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
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
  section: {
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    borderColor: "#EEE",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FAFAFA",
    marginVertical: 8,
  },
  voucherText: {
    marginLeft: 8,
    color: "#444",
    fontSize: 13,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
    marginVertical: 10,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontWeight: "700",
    fontSize: 15,
  },
  totalValue: {
    fontWeight: "700",
    fontSize: 15,
  },
  footerNote: {
    fontSize: 11,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
  },
  reportBtn: {
    backgroundColor: "#00B0B9",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 15,
  },
  reportText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
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
  /* Filter panel styles */
  filterPanel: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  filterLabel: { fontWeight: '700', marginBottom: 8 },
  dateRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  dateLabel: { width: 70, color: '#555' },
  dateBtn: { borderWidth: 1, borderColor: '#DDD', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 6 },
  dateBtnText: { color: '#000' },
  filterActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 },
  applyBtn: { backgroundColor: '#00B0B9', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 6, marginRight: 8 },
  applyText: { color: '#fff', fontWeight: '600' },
  closeFilterBtn: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 6, borderWidth: 1, borderColor: '#CCC' },
  closeText: { color: '#333' },
});
