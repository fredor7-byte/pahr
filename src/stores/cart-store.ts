"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProductVariant, ProductWithDetails } from "@/types/product";

export interface CartItem {
  variant: ProductVariant;
  product: {
    id: string;
    name: string;
    slug: string;
    base_price_usd: number;
    category_name: string;
  };
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  sessionId: string;

  // Actions
  addItem: (product: ProductWithDetails, variant: ProductVariant, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed-like helpers
  totalItems: () => number;
  totalUSD: () => number;
}

function generateSessionId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      sessionId: generateSessionId(),

      addItem: (product, variant, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.variant.id === variant.id
          );

          if (existingIndex >= 0) {
            const updated = [...state.items];
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + quantity,
            };
            return { items: updated, isOpen: true };
          }

          return {
            items: [
              ...state.items,
              {
                variant,
                product: {
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  base_price_usd: product.base_price_usd,
                  category_name: product.category?.name ?? "",
                },
                quantity,
              },
            ],
            isOpen: true,
          };
        });
      },

      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter((item) => item.variant.id !== variantId),
        }));
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.variant.id === variantId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      totalUSD: () =>
        get().items.reduce((sum, item) => {
          const price =
            item.variant.price_override_usd ?? item.product.base_price_usd;
          return sum + price * item.quantity;
        }, 0),
    }),
    {
      name: "pahr-cart",
      partialize: (state) => ({
        items: state.items,
        sessionId: state.sessionId,
      }),
    }
  )
);
