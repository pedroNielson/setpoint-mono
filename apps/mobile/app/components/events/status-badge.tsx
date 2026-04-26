import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { getStatusConfig } from "../../../constants/event-status";
import Animated, {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  useAnimatedStyle,
} from "react-native-reanimated";

interface Props {
  status: string;
  style?: object;
  textStyle?: object;
  info?: string;
}

export function StatusBadge({ status, style, textStyle, info }: Props) {
  const config = getStatusConfig(status);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const pulse = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 700, easing: Easing.out(Easing.ease) }),
        withTiming(0.3, { duration: 700, easing: Easing.in(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, []);

  const animatedDotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: opacity.value,
  }));

  return (
    <Pressable
      onHoverIn={() => info && setTooltipVisible(true)}
      onHoverOut={() => setTooltipVisible(false)}
      style={styles.wrapper}
    >
      {tooltipVisible && info && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>{info}</Text>
          <View style={styles.tooltipArrow} />
        </View>
      )}

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
        <Animated.View
          style={[
            styles.dot,
            { backgroundColor: config.dotColor },
            animatedDotStyle,
          ]}
        />
        <Text style={[styles.label, { color: config.textColor }, textStyle]}>
          {config.label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "flex-start",
    position: "relative",
    zIndex: 999,
    overflow: "visible",
  },
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
  tooltip: {
    position: "absolute",
    right: "100%",
    top: "50%",
    transform: [{ translateY: -50 }],
    marginRight: 8,
    backgroundColor: "#1e1e2e",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 99,
  },
  tooltipArrow: {
    position: "absolute",
    right: -4,
    top: "50%",
    marginTop: -5,
    width: 10,
    height: 10,
    backgroundColor: "#1e1e2e",
    transform: [{ rotate: "45deg" }],
    borderRadius: 2,
  },
  tooltipText: {
    color: "#f4f4f5",
    fontSize: 12,
    lineHeight: 17,
  },
});
