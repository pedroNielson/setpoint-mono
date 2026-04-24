import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Info, SlidersHorizontal, ChevronDown } from "lucide-react-native";
import { BLACK, GRAY_600, WHITE } from "../../../../constants/colors";
import { Evento } from "../../../../constants/types";
import { FaturamentoPlaceholder } from "./chartPlaceholder";

const ORANGE = "#F4622A";
const GRAY_100 = "#F5F5F5";
const GRAY_200 = "#EEEEEE";

const CATEGORIAS = [
  "Todos",
  "Categoria A",
  "Categoria B",
  "Categoria C",
  "Categoria D",
];

interface MetricCardProps {
  label: string;
  value: string;
  isEmpty?: boolean;
}

function MetricCard({ label, value, isEmpty }: MetricCardProps) {
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <Text style={styles.metricLabel}>{label}</Text>
        <Info size={13} color={GRAY_600} />
      </View>
      <Text style={[styles.metricValue, isEmpty && styles.metricValueEmpty]}>
        {isEmpty ? "—" : value}
      </Text>
    </View>
  );
}

interface Props {
  evento: Evento;
}

export function PerformanceTab({ evento }: Props) {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const isPending = evento.status === "pending";

  return (
    <View style={styles.container}>
      {/* Filtros */}
      <View style={styles.filtrosRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsScroll}
        >
          {CATEGORIAS.map((cat) => {
            const isActive = categoriaAtiva === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => setCategoriaAtiva(cat)}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.chipText, isActive && styles.chipTextActive]}
                >
                  {cat}
                </Text>
                {isActive && <Text style={styles.chipX}>✕</Text>}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.filtrosDireita}>
          <TouchableOpacity style={styles.dropdown} activeOpacity={0.7}>
            <Text style={styles.dropdownText}>Gênero</Text>
            <ChevronDown size={13} color={GRAY_600} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdown} activeOpacity={0.7}>
            <Text style={styles.dropdownText}>Status</Text>
            <ChevronDown size={13} color={GRAY_600} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterIcon} activeOpacity={0.7}>
            <SlidersHorizontal size={16} color={GRAY_600} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Métricas */}
      <View style={styles.metricsGrid}>
        <MetricCard label="Receita" value="R$3.000" isEmpty={isPending} />
        <MetricCard label="Projeção" value="R$12.000" isEmpty={isPending} />
        <MetricCard label="Confirmados" value="20" isEmpty={isPending} />
        <MetricCard label="Pendentes" value="40" isEmpty={isPending} />
      </View>

      {/* Gráfico */}
      <FaturamentoPlaceholder isPending={isPending} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  filtrosRow: {
    gap: 8,
  },
  chipsScroll: {
    flexDirection: "row",
    gap: 6,
    paddingRight: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: GRAY_200,
  },
  chipActive: {
    backgroundColor: "#FEF0EA",
    borderColor: ORANGE,
  },
  chipText: {
    fontSize: 13,
    color: GRAY_600,
    fontWeight: "500",
  },
  chipTextActive: {
    color: ORANGE,
    fontWeight: "600",
  },
  chipX: {
    fontSize: 10,
    color: ORANGE,
    fontWeight: "700",
  },
  filtrosDireita: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: GRAY_200,
  },
  dropdownText: {
    fontSize: 12,
    color: GRAY_600,
    fontWeight: "500",
  },
  filterIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: GRAY_200,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
  },
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
