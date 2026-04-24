import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronRight, Pencil } from "lucide-react-native";
import { BLACK, GRAY_600, WHITE } from "../../../../constants/colors";
import { Evento } from "../../../../constants/types";

const ORANGE = "#F4622A";
const GRAY_200 = "#EEEEEE";
const GRAY_100 = "#F5F5F5";

interface SectionRowProps {
  label: string;
  value?: string;
  empty?: boolean;
  onPress?: () => void;
}

function SectionRow({ label, value, empty, onPress }: SectionRowProps) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.rowLeft}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={[styles.rowValue, empty && styles.rowValueEmpty]}>
          {empty ? "Não informado" : value}
        </Text>
      </View>
      <Pencil size={14} color={empty ? ORANGE : GRAY_600} />
    </TouchableOpacity>
  );
}

interface Props {
  evento: Evento;
}

export function EdicaoTab({ evento }: Props) {
  const isPending = evento.status === "pending";

  return (
    <View style={styles.container}>
      {isPending && (
        <View style={styles.pendingBanner}>
          <Text style={styles.pendingText}>
            Complete as informações do evento para publicá-lo.
          </Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações gerais</Text>
        <View style={styles.card}>
          <SectionRow label="Nome" value={evento.name} />
          <View style={styles.divider} />
          <SectionRow label="Modalidade" value="Beach Tênis" />
          <View style={styles.divider} />
          <SectionRow label="Data" empty />
          <View style={styles.divider} />
          <SectionRow label="Local" empty />
          <View style={styles.divider} />
          <SectionRow label="Descrição" empty />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Inscrições</Text>
        <View style={styles.card}>
          <SectionRow label="Valor da inscrição" empty />
          <View style={styles.divider} />
          <SectionRow label="Limite de participantes" empty />
          <View style={styles.divider} />
          <SectionRow label="Prazo de inscrição" empty />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categorias</Text>
        <View style={styles.card}>
          <SectionRow label="Categorias disponíveis" empty />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  pendingBanner: {
    backgroundColor: "#FEF0EA",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FDDACB",
    padding: 12,
  },
  pendingText: {
    fontSize: 13,
    color: "#C04A1A",
    lineHeight: 18,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: GRAY_600,
    letterSpacing: 0.4,
    textTransform: "uppercase",
    paddingHorizontal: 2,
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: GRAY_200,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  rowLeft: {
    flex: 1,
    gap: 2,
  },
  rowLabel: {
    fontSize: 11,
    color: GRAY_600,
    fontWeight: "500",
    letterSpacing: 0.1,
  },
  rowValue: {
    fontSize: 14,
    color: BLACK,
    fontWeight: "500",
  },
  rowValueEmpty: {
    color: "#CCCCCC",
    fontStyle: "italic",
    fontWeight: "400",
  },
  divider: {
    height: 1,
    backgroundColor: GRAY_200,
    marginHorizontal: 14,
  },
});
