import { Plus } from "lucide-react-native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  arena: string;
  titulo: string;
  onCriarEvento?: () => void;
}

const ORANGE = "#FF5C00";
const BLACK = "#111111";
const GRAY_500 = "#888888";
const WHITE = "#FFFFFF";

export function EventosHeader({ arena, titulo, onCriarEvento }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.info}>
        <Text style={styles.arena}>{arena}</Text>
        <Text style={styles.titulo}>{titulo}</Text>
      </View>

      <TouchableOpacity
        style={styles.criarBtn}
        onPress={onCriarEvento}
        activeOpacity={0.85}
      >
        <Plus color={"white"} />
        <Text style={styles.criarBtnText}>Criar evento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  info: {
    gap: 2,
  },
  arena: {
    fontSize: 12,
    color: GRAY_500,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "800",
    color: BLACK,
    letterSpacing: -0.5,
  },
  criarBtn: {
    backgroundColor: ORANGE,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  criarBtnText: {
    color: WHITE,
    fontSize: 15,
  },
});
