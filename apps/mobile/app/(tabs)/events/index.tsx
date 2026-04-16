import { useState, useEffect, useCallback } from "react";
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
import { BLACK, ORANGE, GRAY_500 } from "../../../constants/colors";
import { CreateEventDrawer } from "../../components/modals/create-event";
import { useAuthStore } from "../../../services/useAuthStore";
import { api } from "../../../services/api";
import { Evento } from "../../../constants/types";
import Loader from "../../components/loader";
import { router } from "expo-router";

const FILTROS: Filtro[] = [
  { id: "beach-tenis", label: "Beach Tennis", icone: "🎾" },
  { id: "futevolei", label: "Futvolei", icone: "⚽" },
  { id: "volei-de-areia", label: "Volei", icone: "🏐" },
];

type Tab = "ativos" | "encerrados";

export default function EventosPage() {
  const { token } = useAuthStore();

  const [tab, setTab] = useState<Tab>("ativos");
  const [filtrosAtivos, setFiltrosAtivos] = useState<string[]>([]);
  const [drawerAberta, setDrawerAberta] = useState(false);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEventos = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.events.getAll(token);
      setEventos(data);
    } catch (err: any) {
      setError(err.message ?? "Erro ao buscar eventos");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchEventos();
  }, [fetchEventos]);

  function toggleFiltro(id: string) {
    setFiltrosAtivos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  }

  function removeFiltro(id: string) {
    setFiltrosAtivos((prev) => prev.filter((f) => f !== id));
  }

  const eventosFiltrados = eventos.filter((e) => {
    if (filtrosAtivos.length > 0 && !filtrosAtivos.includes(e.type))
      return false;
    return tab === "ativos";
  });

  function handleEventoCriado() {
    setDrawerAberta(false);
    fetchEventos();
  }

  function renderGrid() {
    if (isLoading) {
      return (
        <View style={styles.gridLoader}>
          <Loader size={32} color={ORANGE} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.gridEmpty}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={fetchEventos}>
            <Text style={styles.retryText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (eventosFiltrados.length === 0) {
      return (
        <View style={styles.gridEmpty}>
          <Text style={styles.emptyText}>Nenhum evento encontrado</Text>
        </View>
      );
    }

    return (
      <EventoGrid
        eventos={eventosFiltrados}
        total={eventosFiltrados.length}
        onEventoPress={(e) => router.push(`/events/${e._id}`)}
        onMenuPress={(e) => console.log("menu evento", e._id)}
      />
    );
  }

  return (
    <>
      <ScrollView style={styles.root} contentContainerStyle={styles.content}>
        <EventosHeader
          arena="Arena"
          titulo="Praia Beach"
          onCriarEvento={() => setDrawerAberta(true)}
        />

        <View style={styles.tabs}>
          {(["ativos", "encerrados"] as Tab[]).map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.tab, tab === t && styles.tabAtivo]}
              onPress={() => setTab(t)}
            >
              <Text
                style={[styles.tabLabel, tab === t && styles.tabLabelAtivo]}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FiltroBar
          filtros={FILTROS}
          ativos={filtrosAtivos}
          onToggle={toggleFiltro}
          onRemove={removeFiltro}
        />

        {renderGrid()}
      </ScrollView>

      <CreateEventDrawer visible={drawerAberta} onClose={handleEventoCriado} />
    </>
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
  gridLoader: {
    paddingVertical: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  gridEmpty: {
    paddingVertical: 60,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  errorText: {
    fontSize: 14,
    color: "#E24B4A",
    textAlign: "center",
  },
  retryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: ORANGE,
  },
  retryText: {
    fontSize: 13,
    color: ORANGE,
    fontWeight: "600",
  },
  emptyText: {
    fontSize: 14,
    color: GRAY_500,
  },
});
