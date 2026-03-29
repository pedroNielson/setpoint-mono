import { Stack } from "expo-router";

const EventsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Events" }} />
    </Stack>
  );
};

export default EventsLayout;
