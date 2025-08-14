import { GamesData } from "@/lib/games-data";
import { create } from "zustand";

interface CurrentGame {
  title: string;
  src: string;
}

interface GameActions {
  current: CurrentGame;
  setCurrentGame: (game: CurrentGame) => void;
}

export const currentGameInfo = create<GameActions>()((set) => ({
  current: {
    title: GamesData[0]?.title as string,
    src: GamesData[0]?.bgImg as string,
  },
  setCurrentGame: (game) => set(() => ({ current: game })),
}));
