import { Button } from "@/components/Button";
import { FormInput } from "@/components/FormInput";
import { Screen } from "@/components/Screen";
import { Subtitle, Title } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { session, login, logout } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(
        "Missing Information",
        "Please enter both email and password.",
      );
      return;
    }

    try {
      await login(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to sign in right now.";
      Alert.alert("Login Failed", message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to sign out right now.";
      Alert.alert("Logout Failed", message);
    }
  };

  return (
    <Screen className="px-6">
      <View className="flex-1 w-full justify-center items-center">
        <View className="w-full bg-white rounded-2xl shadow-lg p-8">
          <Title className="mb-2 text-center">Welcome Public</Title>
          {
            <>
              <Subtitle className="text-center mb-8">
                Sign in to your account
              </Subtitle>

              <FormInput
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="sentences"
                editable
              />

              <FormInput
                label="Password"
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable
              />

              <Button onPress={handleLogin} label="Sign In" />
            </>
          }
        </View>
      </View>

      <View className="items-center pb-6">
        <Link href="/about" asChild>
          <Text className="text-blue-600 mb-2">About</Text>
        </Link>
        <Link href="/contact" asChild>
          <Text className="text-blue-600">Contact</Text>
        </Link>
      </View>
    </Screen>
  );
}
