import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react-native";
import { useCartStore } from "@/store/cart.store";
import { CartItemType, CartCustomization } from "@/type";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const AddonChip = ({ addon, key }: { addon: CartCustomization, key?: React.Key }) => (
  <View className="bg-orange-50 border border-orange-200 px-2 py-1 rounded-lg mr-1 mb-1">
    <Text className="text-xs text-orange-600 font-medium">
      {addon.name} +${addon.price}
    </Text>
  </View>
);

const CartItem = ({ item }: { item: CartItemType }) => {
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const removeItem = useCartStore((state) => state.removeItem);

  const cartKey = `${item.id}-${JSON.stringify(item.customizations ?? [])}`;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        router.push({
          pathname: "/food/[id]",
          params: {
            id: item.id,
            addons: JSON.stringify(item.customizations ?? []),
            cartKey,
          },
        })
      }
      className="flex-row items-center bg-white rounded-2xl shadow-sm p-3 mb-4 border border-gray-100"
    >
      <Image
        source={{ uri: item.image_url }}
        className="w-20 h-20 rounded-xl"
        resizeMode="cover"
      />

      <View className="flex-1 ml-4">
        <Text className="text-lg font-semibold text-dark-100">
          {item.name}
        </Text>

        {item.customizations && item.customizations.length > 0 && (
          <View className="flex-row flex-wrap mt-2">
            {item.customizations.map((addon: CartCustomization) => (
              <AddonChip key={addon.id} addon={addon} />
            ))}
          </View>
        )}

        <Text className="text-orange-500 font-bold mt-1">
          ${item.price.toFixed(2)}
        </Text>

        <View className="flex-row items-center mt-3 gap-4">

          <TouchableOpacity
            className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
            onPress={() => decreaseQty(item.id, item.customizations ?? [])}
          >
            <Minus size={18} color="#333" />
          </TouchableOpacity>

          <Text className="text-base font-bold">{item.quantity}</Text>

          <TouchableOpacity
            className="w-9 h-9 rounded-full bg-orange-500 items-center justify-center"
            onPress={() => increaseQty(item.id, item.customizations ?? [])}
          >
            <Plus size={18} color="#fff" />
          </TouchableOpacity>

        </View>
      </View>

      <TouchableOpacity
        onPress={() => removeItem(item.id, item.customizations ?? [])}
        className="p-2"
      >
        <Trash2 size={22} color="#ef4444" />
      </TouchableOpacity>

    </TouchableOpacity>
  );
};

const Cart = () => {
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalPrice = getTotalPrice();

  return (
    <SafeAreaView className="flex-1 bg-white">

      <View className="flex-1 px-5 pt-5">

        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-dark-100">
            Your Cart
          </Text>

          {items.length > 0 && (
            <TouchableOpacity onPress={clearCart}>
              <Text className="text-red-500 font-semibold">
                Clear All
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={items}
          renderItem={({ item }) => <CartItem item={item} />}
          keyExtractor={(item) =>
            `${item.id}-${JSON.stringify(item.customizations ?? [])}`
          }
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-40"
          ListEmptyComponent={() => (
            <View className="flex-1 items-center justify-center mt-20">
              <Text className="text-lg text-gray-400">
                Your cart is empty
              </Text>
            </View>
          )}
        />

      </View>

      {items.length > 0 && (
        <View className="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-t-3xl shadow-lg border-t border-gray-100">

          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-500 text-lg">Total</Text>

            <Text className="text-2xl font-bold text-orange-500">
              ${totalPrice.toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity className="bg-orange-500 py-4 rounded-2xl items-center">
            <Text className="text-white text-lg font-bold">
              Checkout
            </Text>
          </TouchableOpacity>

        </View>
      )}

    </SafeAreaView>
  );
};

export default Cart;