import { View, Text, StyleSheet } from "react-native";
import { getStatusConfig } from "../../../constants/event-status";

interface Props {
  status: string;
  style?: object;
  textStyle?: object;
}

export function StatusBadge({ status, style, textStyle }: Props) {
  const config = getStatusConfig(status);

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: config.backgroundColor,
          borderColor: config.borderColor,
        },
        style,
      ]}
    >
      <View style={[styles.dot, { backgroundColor: config.dotColor }]} />
      <Text style={[styles.label, { color: config.textColor }, textStyle]}>
        {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
  },
});
