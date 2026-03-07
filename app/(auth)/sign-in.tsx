import { View, Text, Alert } from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { signIn } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const { fetchAuthenticatedUser } = useAuthStore();

  const submit = async () => {
    const { email, password } = form;

    if (!email || !password) {
      return Alert.alert("Error", "Please enter valid email & password.");
    }

    setIsSubmitting(true);

    try {
      await signIn({ email, password });

      await fetchAuthenticatedUser();

      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-white">

      {/* Header */}
      <View className="bg-primary pt-20 pb-16 px-6 rounded-b-[40px] items-center">

        <Text className="text-white text-4xl font-extrabold">
          QuickBite
        </Text>

        <Text className="text-white/80 mt-3 text-lg">
          Welcome Back 👋
        </Text>

        <Text className="text-white/70 mt-1 text-center">
          Sign in to continue ordering your favorite food
        </Text>

      </View>

      {/* Form Section */}
      <View className="px-6 -mt-10">

        <View className="bg-white p-6 rounded-2xl shadow">

          <View className="gap-6">

            <CustomInput
              placeholder="Enter your email"
              value={form.email}
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, email: text }))
              }
              label="Email"
              keyboardType="email-address"
            />

            <CustomInput
              placeholder="Enter your password"
              value={form.password}
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, password: text }))
              }
              label="Password"
              secureTextEntry
            />

            <CustomButton
              title="Sign In"
              isLoading={isSubmitting}
              onPress={submit}
            />

          </View>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center gap-2 mt-8">
          <Text className="text-gray-500">
            Don't have an account?
          </Text>

          <Link href="/sign-up" className="text-primary font-semibold">
            Sign Up
          </Link>
        </View>

      </View>

    </View>
  );
};

export default SignIn;