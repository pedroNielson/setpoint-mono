import { Info } from "lucide-react-native";
import { View, Text, StyleSheet } from "react-native";
import { BLACK, GRAY_200, GRAY_600, WHITE } from "../../../../constants/colors";

interface MetricCardProps {
  label: string;
  value: string;
  isEmpty?: boolean;
}

export function MetricCard({ label, value, isEmpty }: MetricCardProps) {
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <Text style={styles.metricLabel}>{label}</Text>
        <Info size={13} color={GRAY_600} />
      </View>
      <Text style={[styles.metricValue, isEmpty && styles.metricValueEmpty]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  metricCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: WHITE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: GRAY_200,
    padding: 14,
    gap: 6,
  },
  metricHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  metricLabel: {
    fontSize: 12,
    color: GRAY_600,
    fontWeight: "500",
  },
  metricValue: {
    fontSize: 22,
    fontWeight: "700",
    color: BLACK,
    letterSpacing: -0.5,
  },
  metricValueEmpty: {
    color: "#CCCCCC",
  },
});
