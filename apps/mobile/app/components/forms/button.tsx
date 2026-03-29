import { View, Button } from "react-native";
import React from "react";

type ButtonProps = {
  title: string;
  onPress: () => void;
  style: object;
  color?: string;
};

const BasicButton = ({ title, onPress, style, color }: ButtonProps) => {
  return (
    <View style={style}>
      <Button title={title} onPress={onPress} color={color} />
    </View>
  );
};

export default BasicButton;
