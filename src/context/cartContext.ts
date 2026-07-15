import { createContext } from "react";
import type { Product, CartItem } from "../lib/types";

export interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

export const CartContext = createContext<CartContextValue | undefined>(
  undefined,
);
