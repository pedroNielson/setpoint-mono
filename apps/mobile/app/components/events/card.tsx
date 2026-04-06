import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Evento } from "../../../constants/types";
import {
  BLACK,
  GRAY_400,
  GRAY_600,
  GREEN,
  WHITE,
} from "../../../constants/colors";

interface Props {
  evento: Evento;
  onPress?: () => void;
  onMenuPress?: () => void;
}

const GRAY_100 = "#F5F5F5";

const MODALIDADE_LABEL: Record<string, string> = {
  "beach-tenis": "Beach Tênis",
  futevolei: "Futevolei",
  "volei-de-areia": "Vôlei de Areia",
};

export function EventoCard({ evento, onPress, onMenuPress }: Props) {
  const progresso = evento.progress ?? 0;
  const label = MODALIDADE_LABEL[evento.type] ?? evento.type;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Imagem */}
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder} />

        {/* Menu */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={onMenuPress}
          activeOpacity={0.7}
        >
          <Text style={styles.menuDots}>•••</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <Text style={styles.titulo} numberOfLines={1}>
          {evento.name}
        </Text>

        <View style={styles.statusRow}>
          <View style={styles.statusIcon} />
          <Text style={styles.statusText}>{label}</Text>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${progresso * 100}%` as any },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: WHITE,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  imageContainer: {
    position: "relative",
    height: 140,
    backgroundColor: GRAY_100,
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: GRAY_100,
  },
  menuButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  menuDots: {
    fontSize: 10,
    color: GRAY_600,
    letterSpacing: 1,
  },
  content: {
    padding: 12,
    gap: 6,
  },
  titulo: {
    fontSize: 14,
    fontWeight: "700",
    color: BLACK,
    letterSpacing: -0.2,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  statusIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: GRAY_100,
    borderWidth: 1,
    borderColor: GRAY_400,
  },
  statusText: {
    fontSize: 12,
    color: GRAY_600,
  },
  progressTrack: {
    height: 4,
    backgroundColor: GRAY_100,
    borderRadius: 2,
    marginTop: 2,
  },
  progressFill: {
    height: "100%",
    backgroundColor: GREEN,
    borderRadius: 2,
  },
});
