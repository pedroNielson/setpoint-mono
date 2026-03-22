import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuthStore } from "../../store/useAuthStore";

export default function SecondPage() {
  const { user, logout } = useAuthStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Segunda pagina</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 18, marginBottom: 4 },
  role: { fontSize: 14, color: "#666", marginBottom: 32 },
  button: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
