import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import CategoryButton from "./components/CategoryButton";

export default function ClientHomeScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Section */}
        <View style={styles.headerWrapper}>
          <Image
            source={require("../../assets/images/homepage.jpg")}
            style={styles.headerImage}
          />

          {/* Notification Icon */}
          <TouchableOpacity style={styles.notificationIcon}>
            <Ionicons name="notifications-outline" size={24} color="#3DC1C6" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>

          {/* Search Bar Overlay */}
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search services"
              placeholderTextColor="#888"
              style={styles.searchInput}
            />
            <Ionicons name="search" size={20} color="#888" />
          </View>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesContainer}>
          {[
            "Cleaning Services",
            "Indoor Services",
            "Outdoor Services",
            "Beauty Services",
            "Wellness Services",
            "Tech & Gadget Services",
          ].map((category) => (
            <CategoryButton
              key={category}
              title={category}
              onPress={() => {
                if (category === "Cleaning Services") {
                  router.push("/client-side/booking");
                } else if (category === "Indoor Services") {
                  // Open booking with Indoor Services preselected and default to Handyman
                  router.push(
                    `/client-side/booking?service=${encodeURIComponent("Indoor Services")}&sub=${encodeURIComponent("Handyman")}`
                  );
                }
              }}
            />
          ))}
        </View>

        {/* Loyalty Section */}
        <Text style={styles.sectionTitle}>Unlock your Loyalty Bonus</Text>
        <Text style={styles.description}>
          Once you complete the remaining bookings you can enjoy a ₱50 voucher
        </Text>

        <View style={styles.loyaltyBox}>
          <Text style={styles.loyaltyTitle}>Complete 10 Bookings</Text>
          <View style={styles.loyaltyContainer}>
            {Array.from({ length: 10 }).map((_, i) => (
              <View
                key={i}
                style={i < 3 ? styles.loyaltyFilled : styles.loyaltyCircle}
              />
            ))}
          </View>
          <Text style={styles.loyaltyCondition}>
            Complete within 3 months to earn your ₱50 voucher
          </Text>
        </View>

        <Text style={styles.remainingText}>
          Complete your 10 remaining bookings to earn a ₱50 voucher
        </Text>

        {/* Reward Cards Section */}
        <View style={styles.rewardsWrapper}>
          <View style={styles.rowCards}>
            {/* Welcome Voucher */}
            <LinearGradient
              colors={["#ffffff", "#A0EBF3"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <Text style={styles.cardTitle}>WELCOME VOUCHER</Text>
              <Text style={styles.cardSub}>{"\n\n"}AND GET ₱50 VOUCHER</Text>
              <Text style={styles.cardText}>
                {"\n\n"}New Here? Book your first service today and enjoy ₱50
                voucher as our welcome gift.
              </Text>
              <Text style={styles.cardCondition}>
                Conditions: First time users only
              </Text>
            </LinearGradient>

            {/* Referral Bonus */}
            <LinearGradient
              colors={["#ffffff", "#A0EBF3"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <Text style={styles.cardTitle}>REFERRAL BONUS</Text>
              <Text style={styles.cardSub}>{"\n\n"}AND GET ₱10 VOUCHER</Text>
              <Text style={styles.cardText}>
                {"\n\n"}Share HAUSTAP with friends! Once your friend completes
                their first booking, you earn ₱10 voucher.
              </Text>
              <Text style={styles.cardCondition}>
                Conditions: Voucher will be credited after your friend's first
                complete booking.
              </Text>
            </LinearGradient>
          </View>

          {/* Loyalty Bonus (square card same size as others) */}
          <View style={styles.singleCardWrapper}>
            <LinearGradient
              colors={["#ffffff", "#A0EBF3"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.card, styles.singleCard]}
            >
              <Text style={styles.cardTitle}>UNLOCK YOUR{"\n"}LOYALTY BONUS</Text>
              <Text style={styles.cardSub}>{"\n\n"}AND GET ₱50 VOUCHER</Text>
              <Text style={styles.cardText}>
                {"\n\n"}After 10 completed bookings, enjoy a ₱50 voucher as a
                thank you for staying with HAUSTAP.
              </Text>
              <Text style={styles.cardCondition}>
                Conditions: Must be completed within 3 months
              </Text>
            </LinearGradient>
          </View>
        </View>

        {/* Features above footer */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Ionicons name="diamond-outline" size={18} color="#000" />
            <Text style={styles.featureText}>Fair and upfront prices</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle-outline" size={18} color="#000" />
            <Text style={styles.featureText}>Verified and trusted providers</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer Navigation Bar */}
      <View style={styles.footerNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={22} color="#3DC1C6" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar-outline" size={22} color="#3DC1C6" />
          <Text style={styles.navText}>Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-outline" size={22} color="#3DC1C6" />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={22} color="#3DC1C6" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
  },
  headerWrapper: {
    width: "100%",
    marginBottom: 25,
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: 180,
    borderRadius: 15,
  },
  notificationIcon: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    elevation: 4,
  },
  notificationDot: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    elevation: 4,
    position: "absolute",
    bottom: -20,
    alignSelf: "center",
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    width: "100%",
    marginTop: 30,
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  loyaltyBox: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    marginBottom: 10,
  },
  loyaltyTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  loyaltyContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  loyaltyCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#3DC1C6",
    marginHorizontal: 3,
  },
  loyaltyFilled: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#3DC1C6",
    marginHorizontal: 3,
  },
  loyaltyCondition: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
  },
  remainingText: {
    fontSize: 12,
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  rewardsWrapper: {
    width: "100%",
    alignItems: "center",
  },
  rowCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  singleCardWrapper: {
    alignItems: "center",
    marginTop: 15,
    width: "100%",
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#555",
    shadowOffset: { width: 5, height: 7 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 8,
  },
  singleCard: {
    width: "47%",
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#3DC1C6",
    textAlign: "left",
  },
  cardSub: {
    fontSize: 14,
    color: "#000",
    textAlign: "left",
  },
  cardText: {
    fontSize: 13,
    color: "#000",
    textAlign: "left",
  },
  cardCondition: {
    fontSize: 12,
    color: "#000",
    marginTop: 10,
    textAlign: "left",
    opacity: 0.9,
  },

  // Features above footer
  featuresContainer: {
    marginTop: 30,
    width: "100%",
    padding: 15,
    backgroundColor: "#D9F7FA",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  featureText: {
    fontSize: 13,
    color: "#000",
    marginLeft: 6,
  },

  // Footer Nav
  footerNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#E0F7F9",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#3DC1C6",
    marginTop: 4,
  },
});
