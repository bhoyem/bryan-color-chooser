import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { Button } from "@/components/Button";
import { FormInput } from "@/components/FormInput";
import { Screen } from "@/components/Screen";
import { Subtitle, Title } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { session, login, logout } = useAuth();

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
          <Title className="mb-2 text-center">Welcome Back APP</Title>
          {session ? (
            <>
              <Subtitle className="text-center mb-8">
                Signed in as {session.user.email}
              </Subtitle>
              <Link href="/profile" asChild>
                <Text className="text-blue-600 text-center mb-6">View Profile</Text>
              </Link>
              <Button onPress={handleLogout} label="Log Out" />
            </>
          ) : (
            <>
              <Subtitle className="text-center mb-8">
                Sign in to your account
              </Subtitle>

              
            </>
          )}
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
