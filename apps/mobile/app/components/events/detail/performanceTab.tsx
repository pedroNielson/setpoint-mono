import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Evento } from "../../../../constants/types";
import { FaturamentoPlaceholder } from "./chartPlaceholder";
import { MetricCard } from "./metricCard";
import { Filtro, FiltroBar } from "../filter";

const CATEGORIAS: Filtro[] = [
  { id: "todos", label: "Todos" },
  { id: "categoria-a", label: "Categoria A" },
  { id: "categoria-b", label: "Categoria B" },
  { id: "categoria-c", label: "Categoria C" },
  { id: "categoria-d", label: "Categoria D" },
];

interface Props {
  evento: Evento;
}

export function PerformanceTab({ evento }: Props) {
  const [ativos, setAtivos] = useState<string[]>(["todos"]);

  const handleToggle = (id: string) => {
    setAtivos((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  };

  const handleRemove = (id: string) => {
    setAtivos((prev) => prev.filter((a) => a !== id));
  };
  return (
    <View style={styles.container}>
      <FiltroBar
        filtros={CATEGORIAS}
        ativos={ativos}
        onToggle={handleToggle}
        onRemove={handleRemove}
      />

      <View style={styles.metricsGrid}>
        <MetricCard
          label="Receita"
          value={evento.payed_receipt?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        />
        <MetricCard
          label="Projeção"
          value={evento.receipt?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        />
        <MetricCard
          label="Confirmados"
          value={evento.confirmed_players?.toString()}
        />
        <MetricCard
          label="Pendentes"
          value={
            evento.max_slots
              ? (evento.max_slots - evento.confirmed_players).toString()
              : "0"
          }
        />
      </View>

      <FaturamentoPlaceholder />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
