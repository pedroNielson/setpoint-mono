import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { BLACK, GRAY_600, WHITE } from "../../../../constants/colors";

const ORANGE = "#F4622A";

const TABS = [
  { key: "performance", label: "Performance" },
  { key: "edicao", label: "Edição" },
  { key: "organizador", label: "Organizador" },
  { key: "insights", label: "Insights", pro: true },
];

interface Props {
  active: string;
  onChange: (tab: string) => void;
}

export function TabBar({ active, onChange }: Props) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {TABS.map((tab) => {
          const isActive = active === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => onChange(tab.key)}
              style={styles.tab}
              activeOpacity={0.7}
            >
              <View style={styles.tabInner}>
                <Text
                  style={[
                    styles.label,
                    isActive ? styles.labelActive : styles.labelInactive,
                  ]}
                >
                  {tab.label}
                </Text>
                {tab.pro && (
                  <View style={styles.proBadge}>
                    <Text style={styles.proText}>PRO</Text>
                  </View>
                )}
              </View>
              {isActive && <View style={styles.indicator} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  container: {
    paddingHorizontal: 16,
    flexDirection: "row",
    gap: 4,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginRight: 16,
  },
  tabInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  labelActive: {
    color: BLACK,
  },
  labelInactive: {
    color: GRAY_600,
  },
  indicator: {
    height: 2,
    backgroundColor: BLACK,
    borderRadius: 1,
    marginTop: 10,
  },
  proBadge: {
    backgroundColor: BLACK,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  proText: {
    fontSize: 9,
    fontWeight: "700",
    color: WHITE,
    letterSpacing: 0.5,
  },
});
