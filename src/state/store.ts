import { GamesData } from "@/lib/games-data";
import { create } from "zustand";

export interface StoreCurrentGame {
  title: string;
  src: string;
  description?: string;
  price?: number;
  releaseYear?: string;
  developer?: string;
  platforms?: string[];
  currentPrice?: number;
  rating?: number;
  bgImg?: string;
}

interface GameActions {
  current: StoreCurrentGame;
  setCurrentStoreGame: (game: StoreCurrentGame) => void;
}

export const currentStoreGameInfo = create<GameActions>()((set) => ({
  current: {
    title: GamesData[0]?.title as string,
    src: GamesData[0]?.src as string,
    description: GamesData[0]?.description as string,
    price: GamesData[0]?.price as number,
    releaseYear: GamesData[0]?.releaseYear as string,
    developer: GamesData[0]?.developer as string,
    platforms: GamesData[0]?.platforms as string[],
    currentPrice: GamesData[0]?.currentPrice as number,
    rating: GamesData[0]?.rating as number,
    bgImg: GamesData[0]?.bgImg as string,
  },
  setCurrentStoreGame: (game) => set(() => ({ current: game })),
}));
