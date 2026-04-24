import { useState } from "react";
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
import { StatusBadge } from "../../../components/events/status-badge";

const ORANGE = "#F4622A";

type Tab = "performance" | "edicao" | "organizador" | "insights";

export default function EventoDetailScreen() {
  const router = useRouter();
  const {
    name,
    _id,
    description,
    type,
    date,
    hour,
    progress,
    duration,
    categories,
    owner,
    status,
  } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>("performance");

  const evento = { id: _id, name, type, status, progress };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft size={22} color={BLACK} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.breadcrumb}>Eventos</Text>
          <Text style={styles.titulo} numberOfLines={1}>
            {evento.name}
          </Text>
        </View>

        <View style={styles.headerRight}>
          <StatusBadge
            status={
              Array.isArray(evento.status) ? evento.status[0] : evento.status
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
          <Text style={styles.headerRightText} numberOfLines={2}>
            Informacoes pendentes de preenchimento. Complete os dados para
            publicar o evento e liberar as inscricoes.
          </Text>
        </View>
      </View>
      <TabBar active={activeTab} onChange={(t) => setActiveTab(t as Tab)} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === "performance" && <PerformanceTab evento={evento} />}
        {activeTab === "edicao" && <EdicaoTab evento={evento} />}
        {activeTab === "organizador" && <OrganizadorTab evento={evento} />}
        {activeTab === "insights" && (
          <View style={styles.proPlaceholder}>
            <Text style={styles.proText}>Disponível no plano PRO</Text>
          </View>
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
