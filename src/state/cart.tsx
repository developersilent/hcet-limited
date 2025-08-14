import { create } from "zustand";

interface CartItem {
  id: number;
  gameName: string;
  description: string;
  price: number;
}

interface Cart {
  items: CartItem[];
  setCartItems: (items: CartItem[]) => void;
}

export const cartStore = create<Cart>((set) => ({
  items: [],
  setCartItems: (items) => set({ items }),
}));
