import { use, useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Evento } from "../../../../constants/types";
import { BLACK, GRAY_600, WHITE } from "../../../../constants/colors";
import { PerformanceTab } from "../../../components/events/detail/performanceTab";
import { EdicaoTab } from "../../../components/events/detail/editionTab";
import { OrganizadorTab } from "../../../components/events/detail/organizationTab";
import { TabBar } from "../../../components/events/detail/tabBar";
import { useAuthStore } from "../../../../services/useAuthStore";
import { api } from "../../../../services/api";
import { PerformanceTabSkeleton } from "../../../components/events/detail/skeleton/performanceSkeleton";

const ORANGE = "#F4622A";

type Tab = "performance" | "edicao" | "organizador" | "insights";

export default function EventoDetailScreen() {
  const { token } = useAuthStore();
  const router = useRouter();
  const { name, id, status } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>("performance");

  const paramEvent = { id, name, status };

  const [evento, setEvento] = useState<Evento>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchEventos = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      console.log("Buscando evento com id:", paramEvent.id);
      const data = await api.events.getById(token, paramEvent.id as string);
      setEvento(data);
    } catch (err: any) {
      console.error("Erro ao buscar evento:", err);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchEventos();
  }, [fetchEventos]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft size={22} color={BLACK} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.breadcrumb}>Eventos</Text>
          <Text style={styles.titulo} numberOfLines={1}>
            {paramEvent.name}
          </Text>
        </View>
      </View>
      <TabBar
        active={activeTab}
        onChange={(t) => setActiveTab(t as Tab)}
        status={paramEvent.status}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <PerformanceTabSkeleton />
        ) : (
          <>
            {activeTab === "performance" && <PerformanceTab evento={evento} />}
            {activeTab === "edicao" && <EdicaoTab evento={evento} />}
            {activeTab === "organizador" && <OrganizadorTab evento={evento} />}
            {activeTab === "insights" && (
              <View style={styles.proPlaceholder}>
                <Text style={styles.proText}>Disponível no plano PRO</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F7F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: WHITE,
    gap: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    flexShrink: 0,
  },
  headerCenter: {
    flex: 1,
    gap: 2,
  },
  breadcrumb: {
    fontSize: 11,
    color: GRAY_600,
    letterSpacing: 0.2,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "700",
    color: BLACK,
    letterSpacing: -0.4,
  },
  headerRight: {
    alignItems: "flex-end",
    flexShrink: 0,
    maxWidth: 300,
    gap: 4,
    marginTop: 2,
  },
  headerRightText: {
    fontSize: 11,
    color: GRAY_600,
    textAlign: "right",
    lineHeight: 15,
  },
  headerText: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 12,
    paddingBottom: 32,
  },
  proPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  proText: {
    fontSize: 14,
    color: GRAY_600,
  },
});
