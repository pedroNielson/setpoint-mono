import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useState } from "react";
import { EventoCard, Evento } from "./card";
import { LayoutGrid, Rows3 } from "lucide-react-native";

interface Props {
  eventos: Evento[];
  total: number;
  onEventoPress?: (evento: Evento) => void;
  onMenuPress?: (evento: Evento) => void;
}

const ORANGE = "#FF5C00";
const ORANGE_BG = "#FFF2EC";
const GRAY_500 = "#888888";
const BLACK = "#111111";
const GAP = 16;
const MIN_CARD = 255;
const MAX_CARD = 300;
const PADDING = 48;

type Layout = "grid" | "list";

export function EventoGrid({
  eventos,
  total,
  onEventoPress,
  onMenuPress,
}: Props) {
  const { width } = useWindowDimensions();
  const [layout, setLayout] = useState<Layout>("grid");

  const availableWidth = width - PADDING;
  const cols = Math.max(
    1,
    Math.floor((availableWidth + GAP) / (MIN_CARD + GAP)),
  );
  const cardWidth = Math.min(
    MAX_CARD,
    (availableWidth - GAP * (cols - 1)) / cols,
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.topBar}>
        <Text style={styles.secaoTitulo}>Eventos</Text>
        <View style={styles.viewToggle}>
          <Text style={styles.total}>{total} eventos</Text>

          <TouchableOpacity
            style={[
              styles.toggleBtn,
              layout === "grid" && styles.toggleBtnAtivo,
            ]}
            onPress={() => setLayout("grid")}
          >
            <LayoutGrid
              size={14}
              color={layout === "grid" ? ORANGE : GRAY_500}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleBtn,
              layout === "list" && styles.toggleBtnAtivo,
            ]}
            onPress={() => setLayout("list")}
          >
            <Rows3 size={14} color={layout === "list" ? ORANGE : GRAY_500} />
          </TouchableOpacity>
        </View>
      </View>

      {layout === "grid" ? (
        <View style={styles.grid}>
          {eventos.map((evento) => (
            <View key={evento.id} style={{ width: cardWidth }}>
              <EventoCard
                evento={evento}
                onPress={() => onEventoPress?.(evento)}
                onMenuPress={() => onMenuPress?.(evento)}
              />
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.list}>
          {eventos.map((evento) => (
            <View key={evento.id} style={styles.listItem}>
              <EventoCard
                evento={evento}
                onPress={() => onEventoPress?.(evento)}
                onMenuPress={() => onMenuPress?.(evento)}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  total: {
    fontSize: 13,
    color: GRAY_500,
    fontWeight: "500",
    marginRight: 16,
    alignSelf: "center",
  },
  viewToggle: {
    flexDirection: "row",
    gap: 4,
  },
  toggleBtn: {
    width: 30,
    height: 30,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  toggleBtnAtivo: {
    backgroundColor: ORANGE_BG,
    borderColor: ORANGE,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
  },
  list: {
    flexDirection: "column",
    gap: GAP,
  },
  listItem: {
    width: "100%",
  },
  secaoTitulo: {
    fontSize: 20,
    fontWeight: "700",
    color: BLACK,
    letterSpacing: -0.3,
    marginBottom: 0,
    marginTop: 8,
  },
});
