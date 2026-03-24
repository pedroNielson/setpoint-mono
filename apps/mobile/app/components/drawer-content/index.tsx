import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
import { Home, Calendar, MessageSquare, HelpCircle } from "lucide-react-native";
import { useAuthStore } from "../../../store/useAuthStore";
import {
  GRAY_500,
  ORANGE,
  WHITE,
  BLACK,
  GRAY_100,
} from "../../../constants/colors";

const NAV_ITEMS = [
  { label: "Home", icon: Home, route: "/", match: "/" },
  {
    label: "Eventos",
    icon: Calendar,
    route: "/page_2",
    match: "/page_2",
  },
];

const FOOTER_ITEMS = [
  { label: "Feedback", icon: MessageSquare, route: "/feedback" },
  { label: "Ajuda", icon: HelpCircle, route: "/ajuda" },
];

export default function DrawerContent(props: DrawerContentComponentProps) {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();

  function isActive(match: string) {
    if (match === "/") return pathname === "/";
    return pathname === match || pathname.startsWith(match);
  }

  function navigate(route: string) {
    router.push(route as any);
    props.navigation.closeDrawer();
  }

  return (
    <View style={styles.root}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.username?.charAt(0).toUpperCase() ?? "U"}
            </Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>Boa tarde, {user?.username}!</Text>
            <Text style={styles.headerEmail} numberOfLines={1}>
              {user?.username}@setpoint.com
            </Text>
          </View>
        </View>

        {/* Search */}
        <TouchableOpacity style={styles.searchBar} activeOpacity={0.7}>
          <Text style={styles.searchText}>Eventos, times, arenas</Text>
          <View style={styles.searchIcon}>
            <Text style={styles.searchIconText}>⌕</Text>
          </View>
        </TouchableOpacity>

        {/* Nav items */}
        <View style={styles.navSection}>
          {NAV_ITEMS.map(({ label, icon: Icon, route, match }) => {
            const active = isActive(match);
            return (
              <TouchableOpacity
                key={route}
                style={[styles.navItem, active && styles.navItemActive]}
                onPress={() => navigate(route)}
                activeOpacity={0.7}
              >
                <Icon
                  size={20}
                  color={active ? ORANGE : GRAY_500}
                  strokeWidth={active ? 2.5 : 1.8}
                />
                <Text
                  style={[styles.navLabel, active && styles.navLabelActive]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </DrawerContentScrollView>

      {/* Footer fixo */}
      <View style={styles.footer}>
        {FOOTER_ITEMS.map(({ label, icon: Icon, route }) => {
          const active = isActive(route);
          return (
            <TouchableOpacity
              key={route}
              style={[styles.navItem, active && styles.navItemActive]}
              onPress={() => navigate(route)}
              activeOpacity={0.7}
            >
              <Icon
                size={20}
                color={active ? ORANGE : GRAY_500}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <Text style={[styles.navLabel, active && styles.navLabelActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Upgrade block */}
        <View style={styles.upgradeBlock}>
          <Text style={styles.upgradeTitle}>Faça o upgrade, vá além</Text>
          <Text style={styles.upgradeDesc}>
            Crie campeonatos, acesse relatórios e fidelize atletas
          </Text>
          <TouchableOpacity style={styles.upgradeButton} activeOpacity={0.85}>
            <Text style={styles.upgradeButtonText}>Upgrade</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: WHITE,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ORANGE,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: WHITE,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 15,
    fontWeight: "700",
    color: BLACK,
    letterSpacing: -0.2,
  },
  headerEmail: {
    fontSize: 12,
    color: GRAY_500,
    marginTop: 1,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: GRAY_100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  searchText: {
    fontSize: 13,
    color: GRAY_500,
  },
  searchIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  searchIconText: {
    fontSize: 16,
    color: GRAY_500,
  },
  navSection: {
    paddingHorizontal: 10,
    gap: 2,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  navItemActive: {
    backgroundColor: "#FFF2EC",
  },
  navLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: GRAY_500,
  },
  navLabelActive: {
    color: ORANGE,
    fontWeight: "700",
  },
  footer: {
    paddingHorizontal: 10,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingTop: 12,
    gap: 2,
  },
  upgradeBlock: {
    marginTop: 16,
    marginHorizontal: 6,
    padding: 16,
    backgroundColor: GRAY_100,
    borderRadius: 14,
    gap: 4,
  },
  upgradeTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: BLACK,
    letterSpacing: -0.2,
  },
  upgradeDesc: {
    fontSize: 12,
    color: GRAY_500,
    lineHeight: 17,
    marginBottom: 4,
  },
  upgradeButton: {
    backgroundColor: ORANGE,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 4,
  },
  upgradeButtonText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: "700",
  },
});
