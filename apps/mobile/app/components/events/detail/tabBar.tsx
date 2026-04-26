import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { BLACK, GRAY_600, WHITE } from "../../../../constants/colors";
import { StatusBadge } from "../status-badge";

const TABS = [
  { key: "performance", label: "Performance" },
  { key: "edicao", label: "Edição" },
  { key: "organizador", label: "Organizador" },
  { key: "insights", label: "Insights", pro: true },
];

interface Props {
  active: string;
  onChange: (tab: string) => void;
  status: string | string[];
}

export function TabBar({ active, onChange, status }: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.headerRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.container}
          style={styles.tabsScroll}
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

        <View style={styles.headerRight}>
          <StatusBadge
            status={Array.isArray(status) ? status[0] : status}
            info={
              "Informações pendentes de preenchimento. Complete os dados para publicar o evento e liberar as inscricoes."
            }
            style={{
              alignSelf: "flex-end",
              marginBottom: 4,
              width: 100,
              height: 30,
              justifyContent: "center",
            }}
            textStyle={{
              fontSize: 15,
              fontWeight: "600",
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  tabsScroll: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    gap: 4,
  },
  headerRight: {
    flexShrink: 1,
    alignItems: "flex-end",
    marginLeft: 16,
  },
  headerRightText: {
    fontSize: 12,
    color: GRAY_600,
    textAlign: "right",
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
