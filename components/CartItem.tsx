import { useCartStore } from "@/store/cart.store";
import { CartItemType } from "@/type";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { images } from "@/constants";
import { router } from "expo-router";

const CartItem = ({ item }: { item: CartItemType }) => {
  const { increaseQty, decreaseQty, removeItem } = useCartStore();

  const openItem = () => {
    router.push({
      pathname: "/food/[id]",
      params: { id: item.id },
    });
  };

  return (
    <TouchableOpacity
      onPress={openItem}
      activeOpacity={0.9}
      className="cart-item"
    >
      <View className="flex flex-row items-center gap-x-3">
        {/* IMAGE */}
        <View className="cart-item__image">
          <Image
            source={{ uri: item.image_url }}
            className="size-4/5 rounded-lg"
            resizeMode="cover"
          />
        </View>

        <View className="flex-1">
          {/* NAME */}
          <Text className="base-bold text-dark-100">{item.name}</Text>

          {/* ADDON CHIPS */}
          {item.customizations && item.customizations.length > 0 && (
            <View className="flex-row flex-wrap gap-1 mt-1">
              {item.customizations.map((addon: any) => (
                <View
                  key={addon.$id}
                  className="bg-gray-100 px-2 py-1 rounded-md"
                >
                  <Text className="text-gray-500 text-xs">
                    {addon.name}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* PRICE */}
          <Text className="paragraph-bold text-primary mt-1">
            ${item.price}
          </Text>

          {/* QUANTITY CONTROLS */}
          <View className="flex flex-row items-center gap-x-4 mt-2">

            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                decreaseQty(item.id, item.customizations!);
              }}
              className="cart-item__actions"
            >
              <Image
                source={images.minus}
                className="size-1/2"
                resizeMode="contain"
                tintColor={"#FF9C01"}
              />
            </TouchableOpacity>

            <Text className="base-bold text-dark-100">
              {item.quantity}
            </Text>

            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                increaseQty(item.id, item.customizations!);
              }}
              className="cart-item__actions"
            >
              <Image
                source={images.plus}
                className="size-1/2"
                resizeMode="contain"
                tintColor={"#FF9C01"}
              />
            </TouchableOpacity>

          </View>
        </View>
      </View>

      {/* DELETE BUTTON */}
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          removeItem(item.id, item.customizations!);
        }}
        className="flex-center"
      >
        <Image
          source={images.trash}
          className="size-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default CartItem;