import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { EventosHeader } from "../../components/events/header";
import { FiltroBar, Filtro } from "../../components/events/filter";
import { EventoGrid } from "../../components/events/grid";
import { Evento } from "../../components/events/card";
import { BLACK, ORANGE, GRAY_500 } from "../../../constants/colors";

// ─── Dados mock — troca por fetch da API depois ──────────────────────────────

const FILTROS: Filtro[] = [
  { id: "beach-tennis", label: "Beach Tennis", icone: "🎾" },
  { id: "futvolei", label: "Futvolei", icone: "⚽" },
  { id: "volei", label: "Volei", icone: "🏐" },
  { id: "corrida", label: "Corrida", icone: "🏃" },
];

const EVENTOS_MOCK: Evento[] = [
  {
    id: "1",
    titulo: "Campeonato 4 Estações",
    status: "Confirmados",
    progresso: 0.4,
  },
  {
    id: "2",
    titulo: "Campeonato DropShot",
    status: "Confirmados",
    progresso: 0.6,
  },
  {
    id: "3",
    titulo: "Campeonato Gohan",
    status: "Confirmados",
    progresso: 0.3,
  },
  {
    id: "4",
    titulo: "Campeonato Arena 77",
    status: "Confirmados",
    progresso: 0.15,
  },
  {
    id: "5",
    titulo: "Campeonato Circuito Fogo",
    status: "Confirmados",
    progresso: 0.08,
  },
  {
    id: "6",
    titulo: "Campeonato Circuito Agua",
    status: "Confirmados",
    progresso: 0.5,
  },
  {
    id: "7",
    titulo: "Campeonato Pé na Areia",
    status: "Confirmados",
    progresso: 0.2,
  },
];

type Tab = "ativos" | "encerrados";

export default function EventosPage() {
  const [tab, setTab] = useState<Tab>("ativos");
  const [filtrosAtivos, setFiltrosAtivos] = useState<string[]>([
    "beach-tennis",
  ]);

  function toggleFiltro(id: string) {
    setFiltrosAtivos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  }

  function removeFiltro(id: string) {
    setFiltrosAtivos((prev) => prev.filter((f) => f !== id));
  }

  const eventosFiltrados = tab === "ativos" ? EVENTOS_MOCK : [];

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <EventosHeader
        arena="Arena"
        titulo="Praia Beach"
        onCriarEvento={() => console.log("criar evento")}
      />

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tab === "ativos" && styles.tabAtivo]}
          onPress={() => setTab("ativos")}
        >
          <Text
            style={[styles.tabLabel, tab === "ativos" && styles.tabLabelAtivo]}
          >
            Ativos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, tab === "encerrados" && styles.tabAtivo]}
          onPress={() => setTab("encerrados")}
        >
          <Text
            style={[
              styles.tabLabel,
              tab === "encerrados" && styles.tabLabelAtivo,
            ]}
          >
            Encerrados
          </Text>
        </TouchableOpacity>
      </View>
      <FiltroBar
        filtros={FILTROS}
        ativos={filtrosAtivos}
        onToggle={toggleFiltro}
        onRemove={removeFiltro}
      />
      <EventoGrid
        eventos={eventosFiltrados}
        total={eventosFiltrados.length}
        onEventoPress={(e) => console.log("abrir evento", e.id)}
        onMenuPress={(e) => console.log("menu evento", e.id)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 48,
  },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    marginBottom: 4,
  },
  tab: {
    paddingBottom: 10,
    paddingHorizontal: 2,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabAtivo: {
    borderBottomColor: ORANGE,
  },
  tabLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: GRAY_500,
  },
  tabLabelAtivo: {
    color: BLACK,
    fontWeight: "700",
  },
});
