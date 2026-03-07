
            {/*Button is used to seed the database*/}
            {/* <CustomButton title="Seed" onPress={() => seed().catch((error) => console.log(error))} /> */}


      {/* Button is used to seed the database */}
      {/* <TouchableOpacity
        className="border border-primary mx-6 mt-4 py-4 rounded-full items-center"
        onPress={() => seed().catch((error: any) => console.log(error))}
      >
        <Text className="text-primary font-bold text-base">
          Seed Database
        </Text>
      </TouchableOpacity> */}


import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { useRouter } from "expo-router";

export default function Profile() {

  const router = useRouter();
  const { logout } = useAuthStore();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const getUser = async () => {
    try {
      const res = await account.get();

      setUser(res);
      setName(res.name);
      setEmail(res.email);
    } catch (error) {
      console.log("User fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // ✅ LOGOUT FUNCTION
  const handleLogout = async () => {
    try {
      await logout();

      // redirect to signin
      router.replace("/(auth)/sign-in");

    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const openEditModal = () => {
    setErrorMessage("");
    setSuccessMessage("");
    setPassword("");
    setModalVisible(true);
  };

  const handleSaveProfile = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (email !== user.email && password === "") {
        setErrorMessage("Password required to change email.");
        return;
      }

      if (name !== user.name) {
        await account.updateName(name);
      }

      if (email !== user.email) {
        await account.updateEmail(email, password);
      }

      setSuccessMessage("Profile updated successfully");

      setTimeout(() => {
        setModalVisible(false);
        getUser();
      }, 1200);

    } catch (error: any) {

      console.log("Full error:", error);

      if (error?.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong");
      }

    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">

      {/* Header */}
      <View className="bg-orange-500 h-48 items-center justify-end pb-16 rounded-b-[40px]">
        <Text className="text-white text-xl font-bold">My Profile</Text>
      </View>

      {/* Avatar */}
      <View className="items-center -mt-16">
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${user?.name}&background=ff7a00&color=fff`,
          }}
          className="w-32 h-32 rounded-full border-4 border-white"
        />
      </View>

      {/* Name + Email */}
      <View className="items-center mt-3">
        <Text className="text-xl font-bold">{user?.name}</Text>
        <Text className="text-gray-400">{user?.email}</Text>
      </View>

      {/* Info Card */}
      <View className="mx-6 mt-8 bg-gray-50 rounded-2xl p-5">

        <View className="mb-5">
          <Text className="text-gray-400 text-sm">Full Name</Text>
          <Text className="text-base font-semibold">{user?.name}</Text>
        </View>

        <View>
          <Text className="text-gray-400 text-sm">Email Address</Text>
          <Text className="text-base font-semibold">{user?.email}</Text>
        </View>

      </View>

      {/* Edit Button */}
      <TouchableOpacity
        className="border border-orange-500 mx-6 mt-6 py-4 rounded-full items-center"
        onPress={openEditModal}
      >
        <Text className="text-orange-500 font-bold">Edit Profile</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        className="bg-orange-500 mx-6 mt-4 py-4 rounded-full items-center"
        onPress={handleLogout}
      >
        <Text className="text-white font-bold">Logout</Text>
      </TouchableOpacity>

      {/* Edit Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">

        <View className="flex-1 justify-center items-center bg-black/40">

          <View className="bg-white w-[85%] p-6 rounded-2xl">

            <Text className="text-lg font-bold mb-4">Edit Profile</Text>

            {errorMessage !== "" && (
              <View className="bg-red-100 p-3 rounded-lg mb-3">
                <Text className="text-red-600 text-center">
                  {errorMessage}
                </Text>
              </View>
            )}

            {successMessage !== "" && (
              <View className="bg-green-100 p-3 rounded-lg mb-3">
                <Text className="text-green-600 text-center">
                  {successMessage}
                </Text>
              </View>
            )}

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter Name"
              className="border border-gray-300 rounded-lg px-4 py-3 mb-3"
            />

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter Email"
              autoCapitalize="none"
              className="border border-gray-300 rounded-lg px-4 py-3 mb-3"
            />

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password (needed if email changes)"
              secureTextEntry
              className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
            />

            <TouchableOpacity
              className="bg-orange-500 py-3 rounded-lg items-center"
              onPress={handleSaveProfile}
            >
              <Text className="text-white font-bold">Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-3 items-center"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-gray-500">Cancel</Text>
            </TouchableOpacity>

          </View>

        </View>

      </Modal>

    </View>
  );
}