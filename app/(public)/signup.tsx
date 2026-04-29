import { Button } from "@/components/Button";
import { FormInput } from "@/components/FormInput";
import { Screen } from "@/components/Screen";
import { TextLink } from "@/components/TextLink";
import { Subtitle, Title } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Alert, View } from "react-native";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Missing Information", "Please complete every field.");
      return;
    }

    try {
      await signup(email, password, name);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to create an account right now.";
      Alert.alert("Signup Failed", message);
    }
  };

  return (
    <Screen className="px-6">
      <View className="flex-1 w-full justify-center items-center">
        <View className="w-full bg-white rounded-2xl shadow-lg p-8">
          <Title className="mb-2 text-center">Create Account</Title>
          <Subtitle className="text-center mb-8">
            Sign up to save your colors
          </Subtitle>

          <FormInput
            label="Name"
            placeholder="Your name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            editable
          />

          <FormInput
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
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

          <Button onPress={handleSignup} label="Sign Up" />

          <TextLink
            href="/"
            label="Already have an account? Sign in"
            className="mt-6"
          />
        </View>
      </View>
    </Screen>
  );
}
