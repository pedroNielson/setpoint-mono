import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { FiltroChip } from "./chip";
import { Settings2 } from "lucide-react-native";
import { GRAY_500 } from "../../../constants/colors";

export interface Filtro {
  id: string;
  label: string;
  icone?: string;
}

interface Props {
  filtros: Filtro[];
  ativos: string[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function FiltroBar({ filtros, ativos, onToggle, onRemove }: Props) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {filtros.map((f) => (
          <FiltroChip
            key={f.id}
            label={f.label}
            icone={f.icone}
            ativo={ativos.includes(f.id)}
            onPress={() => onToggle(f.id)}
            onRemove={() => onRemove(f.id)}
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.filtrosBtn} activeOpacity={0.7}>
        <Settings2 color={GRAY_500} size={16} />
        <Text style={styles.filtrosBtnText}>Filtros</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
  },
  scroll: {
    gap: 8,
    paddingRight: 8,
    flex: 1,
  },
  filtrosBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    backgroundColor: "#fff",
  },
  filtrosBtnText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
});
