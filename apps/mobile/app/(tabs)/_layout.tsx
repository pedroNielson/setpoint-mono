import { Drawer } from "expo-router/drawer";
import { SetpointTitle } from "../components/main-logo";
import { DrawerContent } from "../components/drawer-content";

export default function Layout() {
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
