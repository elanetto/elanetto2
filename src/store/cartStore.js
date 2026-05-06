import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          // 🔥 Unik key: bundles må ikke krasje med produkter
          const itemKey = item.isBundle
            ? `bundle-${item._id}`
            : `product-${item._id}`;

          const existing = state.cart.find(
            (i) => i.cartKey === itemKey
          );

          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.cartKey === itemKey
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }

          return {
            cart: [
              ...state.cart,
              {
                ...item,
                cartKey: itemKey, // 🔑 viktig!
                quantity: 1,
              },
            ],
          };
        }),

      removeFromCart: (cartKey) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.cartKey !== cartKey),
        })),

      updateQuantity: (cartKey, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.cartKey === cartKey
              ? { ...item, quantity }
              : item
          ),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);