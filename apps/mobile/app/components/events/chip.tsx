import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import {
  GRAY_100,
  GRAY_700,
  ORANGE,
  ORANGE_SUPER_LIGHT,
} from "../../../constants/colors";
import { X } from "lucide-react-native";

interface Props {
  label: string;
  ativo?: boolean;
  onPress?: () => void;
  onRemove?: () => void;
  icone?: string;
}

export function FiltroChip({ label, ativo, onPress, onRemove, icone }: Props) {
  return (
    <TouchableOpacity
      style={[styles.chip, ativo && styles.chipAtivo]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {icone ? <Text style={styles.icone}>{icone}</Text> : null}

      <Text style={[styles.label, ativo && styles.labelAtivo]}>{label}</Text>

      {ativo && onRemove ? (
        <TouchableOpacity
          onPress={onRemove}
          hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
        >
          <View style={styles.removeBtn}>
            <X color={"white"} size={12} />
          </View>
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: GRAY_100,
    borderWidth: 1,
    borderColor: "transparent",
  },
  chipAtivo: {
    backgroundColor: ORANGE_SUPER_LIGHT,
    borderColor: ORANGE,
  },
  icone: {
    fontSize: 13,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: GRAY_700,
  },
  labelAtivo: {
    color: ORANGE,
    fontWeight: "700",
  },
  removeBtn: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: ORANGE,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 2,
  },
  removeX: {
    fontSize: 12,
    color: "#fff",
    lineHeight: 16,
    fontWeight: "700",
  },
});
