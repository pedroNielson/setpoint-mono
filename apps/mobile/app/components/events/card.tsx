import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Evento } from "../../../constants/types";
import { BLACK, GRAY_600, GREEN, WHITE } from "../../../constants/colors";
import BeachImage from "../../../constants/images";
import { StatusBadge } from "../events/status-badge";
import { Ellipsis } from "lucide-react-native";
import { AnchorMenu } from "../utils/anchorMenu";
import { router } from "expo-router";

interface Props {
  evento: Evento;
  onPress?: () => void;
  handleDelete?: () => void;
}

const GRAY_100 = "#F5F5F5";

const MODALIDADE_LABEL: Record<string, string> = {
  "beach-tenis": "Beach Tênis",
  futevolei: "Futevolei",
  "volei-de-areia": "Vôlei de Areia",
};

export function EventoCard({ evento, onPress, handleDelete }: Props) {
  const progresso = evento.progress ?? 0;
  const modalidadeLabel = MODALIDADE_LABEL[evento.type] ?? evento.type;

  const menuButtonRef = useRef<View>(null);
  const [menuAnchor, setMenuAnchor] = useState<{ x: number; y: number } | null>(
    null,
  );

  const openMenu = () => {
    menuButtonRef.current?.measure((_fx, _fy, width, height, px, py) => {
      setMenuAnchor({ x: px + width, y: py + height });
    });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.imageContainer}>
        <BeachImage width="100%" height={140} />
        <TouchableOpacity
          ref={menuButtonRef}
          style={styles.menuButton}
          onPress={openMenu}
          activeOpacity={0.7}
        >
          <Ellipsis size={16} color={GRAY_600} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.titulo} numberOfLines={1}>
          {evento.name}
        </Text>

        <View style={styles.statusRow}>
          <Text style={styles.modalidadeText}>{modalidadeLabel}</Text>
          <StatusBadge status={evento.status} />
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

      {menuAnchor && (
        <AnchorMenu
          visible={!!menuAnchor}
          onDismiss={() => setMenuAnchor(null)}
          anchor={menuAnchor}
          options={[
            // {
            //   label: "Editar",
            //   onPress: () => router.push(`/events/${evento._id}`),
            // },
            {
              label: "Cancelar evento",
              onPress: () => console.log("cancelar"),
            },
            { isDivider: true, label: "", onPress: () => {} },
            {
              label: "Excluir evento",
              icon: "trash-can",
              onPress: () => {
                if (handleDelete) {
                  handleDelete();
                }
              },
              labelStyle: { color: "red" },
            },
          ]}
        />
      )}
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
    height: 140,
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
    justifyContent: "space-between",
  },
  modalidadeText: {
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
