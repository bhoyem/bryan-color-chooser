import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import "../global.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerTitle: "Home" }} />
        <Stack.Screen name="about" options={{ headerTitle: "About" }} />
        <Stack.Screen name="contact" options={{ headerTitle: "Contact" }} />
      </Stack>
    </AuthProvider>
  );
}
