import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Fragment, useState } from "react";
import cn from "clsx";
import { router } from "expo-router";

import CartButton from "@/components/CartButton";
import { images, offers } from "@/constants";
import useAuthStore from "@/store/auth.store";

export default function Index() {
  const { user } = useAuthStore();

  const cities = [
    "Mumbai",
    "Thane",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Surat",
  ];

  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <FlatList
        data={offers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;

          return (
            <Pressable
              onPress={(e) => {
                if (typeof e?.currentTarget?.blur === "function") {
                  e.currentTarget.blur(); // fix aria-hidden warning on web
                }

                if (item.category === "all") {
                  router.push("/(tabs)/search");
                } else {
                  router.push({
                    pathname: "/(tabs)/search",
                    params: { category: item.category },
                  });
                }
              }}
              className={cn(
                "rounded-3xl overflow-hidden mb-5 flex-row items-center",
                isEven ? "flex-row-reverse" : "flex-row"
              )}
              style={{
                backgroundColor: item.color,
                height: 150,
              }}
              android_ripple={{ color: "#ffffff22" }}
            >
              <Fragment>
                <View className="w-1/2 h-full justify-center items-center">
                  <Image
                    source={item.image}
                    style={{
                      width: "90%",
                      height: "90%",
                    }}
                    resizeMode="contain"
                  />
                </View>

                <View
                  className={cn(
                    "w-1/2 justify-center",
                    isEven ? "pl-14 pr-4" : "pr-14 pl-4"
                  )}
                >
                  <Text className="text-white text-xl font-bold leading-tight">
                    {item.title}
                  </Text>

                  <View className="mt-4 w-12 h-10 justify-center items-center">
                    <Image
                      source={images.arrowRight}
                      className="w-5 h-5"
                      resizeMode="contain"
                      tintColor="#fff"
                    />
                  </View>
                </View>
              </Fragment>
            </Pressable>
          );
        }}
        contentContainerStyle={{
          paddingBottom: 120,
          paddingHorizontal: 20,
        }}
        ListHeaderComponent={() => (
          <View className="w-full my-5">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-primary font-bold text-xs">
                  DELIVER TO
                </Text>

                <TouchableOpacity
                  className="flex-row items-center gap-x-1 mt-1"
                  onPress={() => setOpenDropdown(!openDropdown)}
                >
                  <Text className="font-bold text-base text-gray-800">
                    {selectedCity}
                  </Text>

                  <Image
                    source={images.arrowDown}
                    className="w-3 h-3"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <CartButton />
            </View>

            {openDropdown && (
              <View className="bg-white mt-3 rounded-xl shadow p-2 border border-gray-200">
                {cities.map((city) => (
                  <TouchableOpacity
                    key={city}
                    className="py-2 px-3"
                    onPress={() => {
                      setSelectedCity(city);
                      setOpenDropdown(false);
                    }}
                  >
                    <Text className="text-gray-700">{city}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}