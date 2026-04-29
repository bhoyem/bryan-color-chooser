import { Alert, View } from "react-native";
import { Button } from "@/components/Button";
import { Screen } from "@/components/Screen";
import { TextLink } from "@/components/TextLink";
import { Body, Subtitle, Title } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";

export default function Profile() {
  const { session, logout } = useAuth();
  const email = session?.user.email ?? "Not available";

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
          <Title className="mb-2 text-center">Profile</Title>
          <Subtitle className="text-center mb-8">
            A basic account overview
          </Subtitle>

          <View className="rounded-xl bg-blue-50 p-4 mb-4">
            <Body className="font-semibold mb-1">Email</Body>
            <Body>{email}</Body>
          </View>

          <View className="rounded-xl bg-blue-50 p-4">
            <Body className="font-semibold mb-1">Status</Body>
            <Body>{session ? "Signed in" : "Guest"}</Body>
          </View>

          <TextLink href="/" label="Home" className="my-6" />

          <Button onPress={handleLogout} label="Log Out" />
        </View>
      </View>
    </Screen>
  );
}
