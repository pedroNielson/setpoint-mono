import { View, Text, StyleSheet } from "react-native";
import { GRAY_600 } from "../../../../constants/colors";

export function OrganizadorTab({ evento }: { evento: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>
        Informações do organizador em breve.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 60,
  },
  placeholder: {
    fontSize: 14,
    color: GRAY_600,
  },
});
