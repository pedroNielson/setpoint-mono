import { View, Text, TextInput } from "react-native";
import React from "react";

type AreaInsertProps = {
  title: string;
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
};

const AreaInsert = ({
  title,
  placeholder,
  value,
  onChange,
}: AreaInsertProps) => {
  return (
    <View>
      <Text style={{ fontWeight: "bold", marginBottom: 8 }}>{title}</Text>
      <TextInput
        placeholder={placeholder || "Insira o valor"}
        value={value}
        onChangeText={onChange}
        style={{
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 4,
          padding: 10,
        }}
        multiline
        numberOfLines={5}
      />
    </View>
  );
};

export default AreaInsert;
