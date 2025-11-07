import { Ionicons } from "@expo/vector-icons";
import { Slot, useRouter } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ClientLayout() {
	const router = useRouter();

	const FOOTER_HEIGHT = 64;

	return (
		<View style={{ flex: 1 }}>
			{/* Content area — add bottom padding so content doesn't get hidden under footer */}
			<View style={{ flex: 1, paddingBottom: FOOTER_HEIGHT }}>
				<Slot />
			</View>

			{/* Persistent Footer Navigation (fixed) */}
			<View style={styles.footerNav}>
				<TouchableOpacity style={styles.navItem} onPress={() => router.push('/client-side' as any)}>
					<Ionicons name="home" size={22} color="#3DC1C6" />
					<Text style={styles.navText}>Home</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.navItem} onPress={() => router.push('/client-side/client-booking-summary/booking-pending' as any)}>
					<Ionicons name="calendar-outline" size={22} color="#3DC1C6" />
					<Text style={styles.navText}>Bookings</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.navItem} onPress={() => router.push('/client-side/chat' as any)}>
					<Ionicons name="chatbubble-outline" size={22} color="#3DC1C6" />
					<Text style={styles.navText}>Chat</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.navItem} onPress={() => router.push('/client-side/client-profile' as any)}>
					<Ionicons name="person-outline" size={22} color="#3DC1C6" />
					<Text style={styles.navText}>My Account</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
		footerNav: {
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0,
			flexDirection: "row",
			justifyContent: "space-around",
			backgroundColor: "#E0F7F9",
			paddingVertical: Platform.OS === 'ios' ? 14 : 10,
			borderTopWidth: 1,
			borderTopColor: "#ccc",
			// ensure footer sits above other content
			zIndex: 20,
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
