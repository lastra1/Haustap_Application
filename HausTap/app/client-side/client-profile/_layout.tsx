// app/client-profile/_layout.tsx
import { Stack } from "expo-router";
import React from "react";

export default function ClientProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // We’ll use custom header on index.tsx
        animation: "slide_from_right", // Smooth transition
        gestureEnabled: true,
      }}
    />
  );
}
