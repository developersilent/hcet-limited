import { create } from "zustand";

export interface CurrentGame {
  title: string;
  src: string;
  description?: string;
  price?: number;
}

interface GameActions {
  current: CurrentGame[];
  AddToCart: (game: CurrentGame) => void;
}

export const cartInfo = create<GameActions>()((set) => ({
  current: [],
  AddToCart: (game) =>
    set((state) => {
      const exists = state.current.some((item) => item.title === game.title);
      if (exists) return state;
      return { current: [...state.current, game] };
    }),
}));
