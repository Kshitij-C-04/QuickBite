import { Text, TouchableOpacity, Image, Platform, View } from "react-native";
import { MenuItem, CartItemType } from "@/type";
import { appwriteConfig } from "@/lib/appwrite";
import { useCartStore } from "@/store/cart.store";
import { router } from "expo-router";

const MenuCard = ({ item }: { item: MenuItem }) => {
  const { $id, image_url, name, price } = item;

  const imageUrl = `${image_url}?project=${appwriteConfig.projectId}`;

  const addItem = useCartStore((state) => state.addItem);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const items = useCartStore((state) => state.items);

  const cartItem = items.find((i: CartItemType) => i.id === $id);
  const quantity = cartItem?.quantity || 0;

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/food/[id]",
          params: { id: $id },
        })
      }
      className="menu-card"
      style={
        Platform.OS === "android"
          ? { elevation: 10, shadowColor: "black" }
          : {}
      }
    >
      <Image
        source={{ uri: imageUrl }}
        className="size-32 absolute -top-10"
        resizeMode="contain"
      />

      <Text
        className="text-center base-bold text-dark-100 mb-2"
        numberOfLines={1}
      >
        {name}
      </Text>

      <Text className="text-gray-400 mb-4">
        <Text className="text-dark-100 font-bold text-base">${price}</Text>
      </Text>

      {quantity === 0 ? (
        <TouchableOpacity
          onPress={() =>
            addItem({
              id: $id,
              name,
              price,
              image_url: imageUrl,
              customizations: [],
            })
          }
          className="bg-primary px-4 py-2 rounded-full"
        >
          <Text className="text-white font-bold text-sm">
            Add to Cart +
          </Text>
        </TouchableOpacity>
      ) : (
        <View className="flex-row items-center bg-primary rounded-full px-3 py-1">
          <TouchableOpacity onPress={() => decreaseQty($id, [])}>
            <Text className="text-white text-lg font-bold px-2">−</Text>
          </TouchableOpacity>

          <Text className="text-white font-bold px-2">{quantity}</Text>

          <TouchableOpacity onPress={() => increaseQty($id, [])}>
            <Text className="text-white text-lg font-bold px-2">+</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MenuCard;