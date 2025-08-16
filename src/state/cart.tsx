import { create } from "zustand";
import { StoreCurrentGame } from "./store";

interface GameActions {
  current: StoreCurrentGame[];
  AddToCart: (game: StoreCurrentGame) => void;
  RemoveFromCart: (game: StoreCurrentGame) => void;
  ClearCart: () => void;
}

export const cartInfo = create<GameActions>()((set) => ({
  current: [],
  AddToCart: (game) =>
    set((state) => {
      const exists = state.current.some((item) => item.title === game.title);
      if (exists) return state;
      return { current: [...state.current, game] };
    }),
  RemoveFromCart: (game) =>
    set((state) => {
      const exists = state.current.some((item) => item.title === game.title);
      if (!exists) return state;
      return {
        current: state.current.filter((item) => item.title !== game.title),
      };
    }),
  ClearCart: () => set({ current: [] }),
}));
