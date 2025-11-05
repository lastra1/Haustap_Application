import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home when an unmatched route is accessed.
    // This keeps users inside the app instead of showing the Unmatched Route page.
    router.replace('/');
  }, [router]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Redirecting…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 16, color: 'gray' },
});
