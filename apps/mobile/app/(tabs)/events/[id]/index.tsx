import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const EventDetail = () => {
  const params = useLocalSearchParams();

  console.log("Event ID:", params.id);
  return (
    <View>
      <Text>EventDetail: {params.id}</Text>
    </View>
  );
};

export default EventDetail;
