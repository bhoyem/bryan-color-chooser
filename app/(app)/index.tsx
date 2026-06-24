import { Button } from "@/components/Button";
import { FormInput } from "@/components/FormInput";
import { Screen } from "@/components/Screen";
import { TextLink } from "@/components/TextLink";
import { Subtitle, Title } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { useInsertFriend } from "@/db/mutations";
import { useFriends, useUser } from "@/db/queries";
import { useState } from "react";
import { Alert, Share, View } from "react-native";

export default function Index() {
  // const [movieCount, setMovieCount] = useState(0);
  const [friendId, setFriendId] = useState("");
  const { logout } = useAuth();
  const { data: user, isLoading } = useUser();
  const { data: friends } = useFriends();
  const { mutateAsync: insertFriend, isPending } = useInsertFriend();

  console.log(user);

  // console.log("from tanstack", data?.length);

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

  const handleInsertFriend = async () => {
    try {
      const name = await insertFriend(friendId.trim());
      Alert.alert("Friend added", name);
      setFriendId("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to add friend right now.";
      Alert.alert("Add Friend Failed", message);
    }
  };

  const handleShareId = async () => {
    try {
      await Share.share({
        message: `My friend ID is ${user.id}`,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to share your ID right now.";
      Alert.alert("Share Failed", message);
    }
  };

  if (isLoading) {
    return (
      <Screen style={{ alignItems: "center", justifyContent: "center" }}>
        <Title>Loading</Title>
      </Screen>
    );
  }

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
            You have {friends?.length ?? 0} friends
          </Subtitle>
         
          <FormInput
            label="Friend ID"
            placeholder="Enter a friend's ID"
            value={friendId}
            onChangeText={setFriendId}
          />
          <Button
            label="Insert Friend"
            className="mb-6"
            onPress={handleInsertFriend}
            disabled={isPending}
          />
          <Button label="Share My ID" className="mb-6" onPress={handleShareId} />
          <TextLink href="/profile" label="View Profile" className="mb-6" />
          <Button onPress={handleLogout} label="Log Out" />
        </View>
      </View>

      <View className="items-center pb-6">
        <TextLink href="/about" label="About" className="mb-2" />
        <TextLink href="/contact" label="Contact" />
      </View>
    </Screen>
  );
}
