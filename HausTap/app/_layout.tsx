import { AuthProvider } from "@/app/context/AuthContext";
import { BookingSelectionProvider } from "@/app/context/BookingSelectionContext";
import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <AuthProvider>
      <BookingSelectionProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { flex: 1 },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </BookingSelectionProvider>
    </AuthProvider>
  );
}
