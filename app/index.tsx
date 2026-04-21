// import { Link } from "expo-router";
// import { Text, View, Button, TextInput } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";

// export default function Index() {
//   return (
//     <View className="flex-1 items-center justify-center bg-white">
//       <Text className="text-xl font-bold text-blue-500">
//         Welcome to Nativewind!
//       </Text>
//       <Link href="/about" className="p-4 bg-blue-500 text-white rounded-md">
//         Go to About
//       </Link>
//     </View>
//   );
// }
import { Linking } from 'react-native';
import { Link } from 'expo-router';
import { Text } from 'react-native';
import { Button, TextInput } from 'react-native';
import { View } from 'react-native';

export default function Index() {
  const handleLogin = async () => {
    const email = 'user@example.com';
    const password = 'password123';
    // TODO: validate email and password
    await Linking.openURL('https://example.com/login?email=' + email + '&password=' + password);
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-bold mb-8">Login</Text>
      <TextInput
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Email"
        onChangeText={(text) => { /* TODO: set email state */ }}
      />
      <TextInput
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => { /* TODO: set password state */ }}
      />
      <Button title="Login" onPress={handleLogin} />
      <Link href="/about" className="mt-8 text-blue-500 underline">
        Don't have an account? Sign up
      </Link>
    </View>
  );
}