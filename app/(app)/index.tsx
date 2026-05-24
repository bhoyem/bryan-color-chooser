import { Button } from "@/components/Button";
import { Screen } from "@/components/Screen";
import { TextLink } from "@/components/TextLink";
import { Subtitle, Title } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { useInsertMovie } from "@/db/mutations";
import { useMovies, useUser } from "@/db/queries";
import { Alert, View } from "react-native";

export default function Index() {
  // const [movieCount, setMovieCount] = useState(0);
  const { logout } = useAuth();
  const { data } = useMovies();
  const { mutateAsync } = useInsertMovie();
  const { data: user, isLoading } = useUser();

  console.log(user);

  console.log("from tanstack", data?.length);

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

  if (isLoading) {
    return (
      <Screen style={{ alignItems: "center", justifyContent: "center" }}>
        <Title>Loading</Title>
      </Screen>
    );
  }

  const insertMovie = async () => {
    try {
      await mutateAsync({
        name: "Barbie",
        description: "The world turns pink",
      });
      // await loadMovies();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to insert movie right now.";
      Alert.alert("Insert Movie Failed", message);
    }
  };

  if (!user) {
    return (
      <Screen style={{ alignItems: "center", justifyContent: "center" }}>
        <Title> No user found </Title>
      </Screen>
    );
  }

  return (
    <Screen className="px-6">
      <View className="flex-1 w-full justify-center items-center">
        <View className="w-full bg-white rounded-2xl shadow-lg p-8">
          <Title className="mb-2 text-center">Welcome back, {user?.name}</Title>
          <Subtitle className="text-center mb-8">
            Signed in with email {user?.email}
          </Subtitle>
          <Subtitle className="text-center mb-6">
            Movies: {data?.length}
          </Subtitle>
          <TextLink href="/profile" label="View Profile" className="mb-6" />
          <Button onPress={handleLogout} label="Log Out" />
          <Button onPress={insertMovie} label="Insert Movie" />
        </View>
      </View>

      <View className="items-center pb-6">
        <TextLink href="/about" label="About" className="mb-2" />
        <TextLink href="/contact" label="Contact" />
      </View>
    </Screen>
  );
}
