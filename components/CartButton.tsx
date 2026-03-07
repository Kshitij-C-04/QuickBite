import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { router } from "expo-router";

const CartButton = () => {
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <TouchableOpacity
      onPress={() => router.push("/cart")}
      style={{
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#f2f2f2",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Cart Icon */}
      <Image
        source={images.bag}
        resizeMode="contain"
        style={{
          width: 22,
          height: 22,
          tintColor: "#333", // 👈 makes white icon visible
        }}
      />

      {totalItems > 0 && (
        <View
          style={{
            position: "absolute",
            top: -4,
            right: -4,
            backgroundColor: "#ff6b00",
            minWidth: 18,
            height: 18,
            borderRadius: 9,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 4,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 10,
              fontWeight: "bold",
            }}
          >
            {totalItems}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;