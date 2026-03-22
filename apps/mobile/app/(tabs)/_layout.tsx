import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Home",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="page_2"
        options={{
          drawerLabel: "Second Page",
          title: "overview",
        }}
      />
    </Drawer>
  );
}
