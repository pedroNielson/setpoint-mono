import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TrendingUp, Lock } from "lucide-react-native";
import { BLACK, GRAY_600, WHITE } from "../../../../constants/colors";

const ORANGE = "#F4622A";
const GRAY_100 = "#F5F5F5";
const GRAY_200 = "#EEEEEE";

interface Props {
  isPending: boolean;
}

export function FaturamentoPlaceholder({ isPending }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Faturamento</Text>
      </View>

      {isPending ? (
        <View style={styles.emptyState}>
          <View style={styles.iconCircle}>
            <TrendingUp size={24} color={GRAY_600} />
          </View>
          <Text style={styles.emptyTitle}>Nenhum dado ainda</Text>
          <Text style={styles.emptyDescription}>
            Os dados de faturamento aparecerão aqui assim que o evento for
            publicado e as inscrições começarem.
          </Text>
          <View style={styles.gridMock}>
            {[...Array(4)].map((_, i) => (
              <View key={i} style={[styles.gridBar, { height: 20 + i * 14 }]} />
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.chartSpace}>{/* Gráfico real virá aqui */}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: WHITE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: GRAY_200,
    padding: 16,
    gap: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: BLACK,
    letterSpacing: -0.2,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 24,
    gap: 10,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: GRAY_100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: BLACK,
  },
  emptyDescription: {
    fontSize: 13,
    color: GRAY_600,
    textAlign: "center",
    lineHeight: 19,
    maxWidth: 260,
  },
  gridMock: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
    marginTop: 16,
    opacity: 0.12,
  },
  gridBar: {
    width: 28,
    backgroundColor: GRAY_600,
    borderRadius: 4,
  },
  chartSpace: {
    height: 200,
    backgroundColor: GRAY_100,
    borderRadius: 8,
  },
});
