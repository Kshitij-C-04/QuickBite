import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { databases, appwriteConfig } from "@/lib/appwrite";
import { useEffect, useState } from "react";
import { Query } from "react-native-appwrite";
import { Ionicons } from "@expo/vector-icons";
import { useCartStore } from "@/store/cart.store";

export default function FoodDetails() {

  const params = useLocalSearchParams();

  const id = params.id as string;
  const addonsParam = params.addons as string | undefined;
  const cartKey = params.cartKey as string | undefined;

  const [item, setItem] = useState<any>(null);
  const [selectedAddons, setSelectedAddons] = useState<any[]>(
    addonsParam ? JSON.parse(addonsParam) : []
  );

  const { addItem, removeItem } = useCartStore();

  useEffect(() => {

    const fetchItem = async () => {

      try {

        const menuItem = await databases.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.menuCollectionId,
          id
        );

        const relations = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.menuCustomizationsCollectionId,
          [Query.equal("menu", id)]
        );

        // ✅ Fetch actual customization documents safely
        const customizations = await Promise.all(
          relations.documents.map(async (doc: any) => {

            const customizationId =
              typeof doc.customizations === "string"
                ? doc.customizations
                : doc.customizations?.$id;

            if (!customizationId) return null;

            const customization = await databases.getDocument(
              appwriteConfig.databaseId,
              appwriteConfig.customizationsCollectionId,
              customizationId
            );

            return customization;

          })
        );

        const filteredCustomizations = customizations.filter(Boolean);

        setItem({
          ...menuItem,
          customizations: filteredCustomizations
        });

      } catch (error) {
        console.log("Error loading item:", error);
      }

    };

    fetchItem();

  }, [id]);

  if (!item) return null;

  const toggleAddon = (addon: any) => {

    const exists = selectedAddons.find(a => a.$id === addon.$id);

    if (exists) {
      setSelectedAddons(selectedAddons.filter(a => a.$id !== addon.$id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }

  };

  const totalPrice =
    Number(item.price) +
    selectedAddons.reduce(
      (sum, addon) => sum + Number(addon.price || 0),
      0
    );

  return (
    <SafeAreaView className="flex-1 bg-white">

      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        <Image
          source={{ uri: item.image_url }}
          className="w-full h-72"
          resizeMode="contain"
        />

        <View className="px-6 py-5">

          <Text className="text-2xl font-bold text-dark-100">
            {item.name}
          </Text>

          <Text className="text-xl text-primary font-bold mt-2">
            ${totalPrice.toFixed(2)}
          </Text>

          <Text className="text-gray-500 mt-3">
            {item.description}
          </Text>

          <View className="flex-row mt-4 gap-x-6">
            <Text>⭐ {item.rating}</Text>
            <Text>{item.calories} cal</Text>
            <Text>{item.protein}g protein</Text>
          </View>

          <View className="mt-6">

            <Text className="text-lg font-semibold mb-3">
              Add-ons
            </Text>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={item.customizations}
              keyExtractor={(addon: any, index) =>
  addon?.$id ? addon.$id : index.toString()
}
              contentContainerStyle={{ gap: 12 }}
              renderItem={({ item: addon }: any) => {

                const selected = selectedAddons.find(
                  a => a.$id === addon.$id
                );

                return (
                  <TouchableOpacity
                    onPress={() => toggleAddon(addon)}
                    style={{ minWidth: 130 }}
                    className={`border rounded-xl px-4 py-3 ${
                      selected
                        ? "border-primary bg-primary/10"
                        : "border-gray-200"
                    }`}
                  >

                    <Text numberOfLines={1} className="font-semibold text-dark-100">
                      {addon.name || "Addon"}
                    </Text>

                    <Text className="text-primary font-bold mt-1">
                      +${Number(addon.price || 0)}
                    </Text>

                  </TouchableOpacity>
                );

              }}
            />

          </View>

          <TouchableOpacity
            onPress={() => {

              if (cartKey && addonsParam) {
                removeItem(id, JSON.parse(addonsParam));
              }

              addItem({
                id: item.$id,
                name: item.name,
                price: item.price,
                image_url: item.image_url,
                customizations: selectedAddons
              });

              router.back();

            }}
            className="bg-primary mt-8 py-4 rounded-full items-center"
          >

            <Text className="text-white font-bold text-lg">
              Add to Cart • ${totalPrice.toFixed(2)}
            </Text>

          </TouchableOpacity>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}