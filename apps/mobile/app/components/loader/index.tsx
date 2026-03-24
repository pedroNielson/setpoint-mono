import { View, Text } from "react-native";
import React from "react";
import {
  Volleyball,
  Sun,
  Rocket,
  BicepsFlexed,
  Medal,
  Trophy,
} from "lucide-react-native";

const Loader = ({ size, color }: { size?: number; color?: string }) => {
  const icons = [Volleyball, Sun, Rocket, BicepsFlexed, Medal, Trophy];
  const [iconIndex, setIconIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % icons.length);
    }, 260);
    return () => clearInterval(interval);
  }, [icons.length]);

  const Icon = icons[iconIndex];

  return (
    <View>
      <Icon size={size || 24} color={color || "#000"} />
    </View>
  );
};

export default Loader;
