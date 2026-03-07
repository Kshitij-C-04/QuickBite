import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import { Redirect, Slot } from "expo-router";
import useAuthStore from "@/store/auth.store";

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuthStore();

  // 🔥 WAIT until auth check finishes
  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  // If logged in → go to main app
  if (isAuthenticated) {
    return <Redirect href="/" />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="bg-white h-full"
        keyboardShouldPersistTaps="handled"
      >
        

        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}