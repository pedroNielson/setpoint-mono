import { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { router } from "expo-router";
import SetpointTitle from "../components/main-logo";
import DrawerContent from "../components/drawer-content";
import { useAuthStore } from "../../services/useAuthStore";

export default function Layout() {
  const token = useAuthStore((s) => s.token);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  useEffect(() => {
    if (isHydrated && !token) {
      router.replace("/login");
    }
  }, [token, isHydrated]);

  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerTitle: () => <SetpointTitle />,
        headerStyle: { backgroundColor: "#FFFFFF" },
        headerShadowVisible: false,
        drawerStyle: { width: 300 },
      }}
    >
      <Drawer.Screen name="index" options={{ drawerLabel: "Home" }} />
      <Drawer.Screen name="eventos" options={{ drawerLabel: "Eventos" }} />
      <Drawer.Screen
        name="feedback"
        options={{
          drawerLabel: "Feedback",
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="ajuda"
        options={{ drawerLabel: "Ajuda", drawerItemStyle: { display: "none" } }}
      />
    </Drawer>
  );
}
