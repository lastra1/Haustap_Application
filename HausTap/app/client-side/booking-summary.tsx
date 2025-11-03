import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function BookingSummary() {
  const router = useRouter();
  const { categoryTitle, categoryPrice, categoryDesc } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking Summary</Text>

      <View style={styles.summaryBox}>
        <Text style={styles.label}>Selected Category:</Text>
        <Text style={styles.value}>{categoryTitle}</Text>

        {categoryPrice && (
          <>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.value}>{categoryPrice}</Text>
          </>
        )}

        <Text style={styles.label}>Inclusions:</Text>
        <Text style={styles.desc}>{categoryDesc}</Text>
      </View>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => router.push("/bookingStatus")} // you can change this later
      >
        <Text style={styles.nextButtonText}>Confirm Booking</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "black" },
  summaryBox: {
    backgroundColor: "#DEE1E0",
    padding: 20,
    borderRadius: 12,
    marginBottom: 40,
  },
  label: { fontSize: 16, fontWeight: "600", color: "black", marginTop: 8 },
  value: { fontSize: 16, color: "black", marginTop: 4 },
  desc: { fontSize: 14, color: "black", marginTop: 8, lineHeight: 20 },
  nextButton: {
    backgroundColor: "#3DC1C6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  nextButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  backButton: {
    borderColor: "#3DC1C6",
    borderWidth: 1.5,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  backButtonText: { color: "#3DC1C6", fontSize: 16, fontWeight: "600" },
});
