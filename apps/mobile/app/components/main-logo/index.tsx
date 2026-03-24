import { Text, StyleSheet } from "react-native";

export function SetpointTitle() {
  return <Text style={styles.title}>Setpoint</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "FiraSans_700Bold",
    fontWeight: "700",
    fontSize: 32,
    lineHeight: 32,
    letterSpacing: 0,
    color: "#FF5C00",
  },
});
