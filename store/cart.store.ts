import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartCustomization, CartItemType, CartStore } from "@/type";

let currentUserId: string | null = null;

function getId(c: CartCustomization) {
  return c.id || "";
}

function areCustomizationsEqual(
  a: CartCustomization[] = [],
  b: CartCustomization[] = []
): boolean {
  if (a.length !== b.length) return false;

  const aSorted = [...a].sort((x, y) => getId(x).localeCompare(getId(y)));
  const bSorted = [...b].sort((x, y) => getId(x).localeCompare(getId(y)));

  return aSorted.every((item, idx) => getId(item) === getId(bSorted[idx]));
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  // LOAD CART FOR USER
  setUserCart: async (userId: string) => {
    currentUserId = userId;

    const storedCart = await AsyncStorage.getItem(`cart_${userId}`);

    if (storedCart) {
      set({ items: JSON.parse(storedCart) });
    } else {
      set({ items: [] });
    }
  },

  // SAVE CART
  saveCart: async () => {
    if (!currentUserId) return;

    const items = get().items;

    await AsyncStorage.setItem(
      `cart_${currentUserId}`,
      JSON.stringify(items)
    );
  },

  addItem: (item) => {
    const customizations = item.customizations ?? [];

    const existing = get().items.find(
      (i) =>
        i.id === item.id &&
        areCustomizationsEqual(i.customizations ?? [], customizations)
    );

    let updated;

    if (existing) {
      updated = get().items.map((i) =>
        i.id === item.id &&
        areCustomizationsEqual(i.customizations ?? [], customizations)
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    } else {
      updated = [...get().items, { ...item, quantity: 1, customizations }];
    }

    set({ items: updated });
    get().saveCart();
  },

  increaseQty: (id, customizations = []) => {
    const updated = get().items.map((i) =>
      i.id === id &&
      areCustomizationsEqual(i.customizations ?? [], customizations)
        ? { ...i, quantity: i.quantity + 1 }
        : i
    );

    set({ items: updated });
    get().saveCart();
  },

  decreaseQty: (id, customizations = []) => {
    const updated = get()
      .items.map((i) =>
        i.id === id &&
        areCustomizationsEqual(i.customizations ?? [], customizations)
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
      .filter((i) => i.quantity > 0);

    set({ items: updated });
    get().saveCart();
  },

  removeItem: (id, customizations = []) => {
    const updated = get().items.filter(
      (i) =>
        !(
          i.id === id &&
          areCustomizationsEqual(i.customizations ?? [], customizations)
        )
    );

    set({ items: updated });
    get().saveCart();
  },

  clearCart: () => {
    set({ items: [] });
    get().saveCart();
  },

  getTotalItems: () =>
    get().items.reduce((total, item) => total + item.quantity, 0),

  getTotalPrice: () =>
    get().items.reduce((total, item) => {
      const base = item.price;
      const customPrice =
        item.customizations?.reduce((s, c) => s + c.price, 0) ?? 0;

      return total + item.quantity * (base + customPrice);
    }, 0),
}));