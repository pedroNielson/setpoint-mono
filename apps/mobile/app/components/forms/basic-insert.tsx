import { View, Text, TextInput } from "react-native";
import React from "react";

type BasicInsertProps = {
  title: string;
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
};

const BasicInsert = ({
  title,
  placeholder,
  value,
  onChange,
}: BasicInsertProps) => {
  return (
    <View style={{ paddingHorizontal: 10 }}>
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
      />
    </View>
  );
};

export default BasicInsert;
