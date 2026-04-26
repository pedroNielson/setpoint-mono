import { View, StyleSheet } from "react-native";
import { MotiView } from "moti";

function SkeletonBox({
  width,
  height,
  borderRadius = 8,
}: {
  width: number | `${number}%`;
  height: number;
  borderRadius?: number;
}) {
  return (
    <MotiView
      from={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "timing",
        duration: 700,
        loop: true,
        repeatReverse: true,
      }}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: "#E0E0E0",
      }}
    />
  );
}

export function PerformanceTabSkeleton() {
  return (
    <View style={styles.container}>
      {/* FiltroBar */}
      <View style={styles.filtroBar}>
        {[80, 60, 90, 70, 80].map((w, i) => (
          <SkeletonBox key={i} width={w} height={32} borderRadius={20} />
        ))}
      </View>

      {/* MetricCards */}
      <View style={styles.metricsGrid}>
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={styles.metricCard}>
            <SkeletonBox width={60} height={12} borderRadius={4} />
            <SkeletonBox width={90} height={26} borderRadius={6} />
          </View>
        ))}
      </View>

      {/* Chart */}
      <View
        style={{
          marginTop: 12,
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          padding: 16,
        }}
      >
        <SkeletonBox width="100%" height={300} borderRadius={12} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  filtroBar: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 12,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  metricCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    padding: 14,
    gap: 10,
  },
});
