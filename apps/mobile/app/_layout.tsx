import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import { useAuthStore } from "../store/useAuthStore";

export default function RootLayout() {
  const { token, isHydrated, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, []);

  if (!isHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!token}>
        <Stack.Screen name="login" />
      </Stack.Protected>

      <Stack.Protected guard={!!token}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
    </Stack>
  );
}
