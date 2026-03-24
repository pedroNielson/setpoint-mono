import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import { useAuthStore } from "../store/useAuthStore";
import { useFonts, FiraSans_700Bold } from "@expo-google-fonts/fira-sans";

export default function RootLayout() {
  const { token, isHydrated, hydrate } = useAuthStore();

  const [fontsLoaded] = useFonts({ FiraSans_700Bold });

  useEffect(() => {
    hydrate();
  }, []);

  if (!isHydrated || !fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0A0A0A",
        }}
      >
        <ActivityIndicator size="large" color="#FF5C00" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!token}>
        <Stack.Screen name="login" />
      </Stack.Protected>
      <Stack.Protected guard={!!token}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
    </Stack>
  );
}
