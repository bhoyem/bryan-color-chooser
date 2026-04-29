import { useState } from "react";
import { Alert, View } from "react-native";
import { Button } from "@/components/Button";
import { FormInput } from "@/components/FormInput";
import { Screen } from "@/components/Screen";
import { TextLink } from "@/components/TextLink";
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
          <Title className="mb-2 text-center">Welcome Back, {session?.user.user_metadata.name}</Title>
          {session ? (
            <>
              <Subtitle className="text-center mb-8">
                Signed in with email {session.user.email}
              </Subtitle>
              <TextLink href="/profile" label="View Profile" className="mb-6" />
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
        <TextLink href="/about" label="About" className="mb-2" />
        <TextLink href="/contact" label="Contact" />
      </View>
    </Screen>
  );
}
