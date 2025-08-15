"use client";
import CartListPopup from "@/components/cartlist-popup";
import { YourGames } from "@/components/pages/games";
import { LandingPage } from "@/components/pages/landing-page";
import Section2 from "@/components/pages/section2";
import Section3 from "@/components/pages/section3";
import { Store2 } from "@/components/pages/store2";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type AllTabs = "home" | "games" | "store";

export default function Page() {
  const [activeTab, setActiveTab] = useState<AllTabs>("home");
  return (
    <div className="relative w-full min-h-screen">
      <header className="top-0 left-0 right-0 p-2 bg-black w-full z-50 relative flex items-center justify-between">
        <div className="pt-5">
          <Button
            onClick={() => setActiveTab("home")}
            variant={"link"}
            className={`${activeTab === "home" ? "text-purple-400/90" : "text-white/80"} relative z-10`}
          >
            Home
          </Button>
          <Button
            onClick={() => setActiveTab("games")}
            variant={"link"}
            className={`${activeTab === "games" ? "text-purple-400/90" : "text-white/80"} relative z-10`}
          >
            Games
          </Button>
          <Button
            onClick={() => setActiveTab("store")}
            variant={"link"}
            className={`${activeTab === "store" ? "text-purple-400/90" : "text-white/80"} relative z-10`}
          >
            Store
          </Button>
        </div>
        <div className="px-5">
          <CartListPopup />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#000000]/80 via-60% to-transparent pointer-events-none"></div>
      </header>
      {activeTab === "home" && (
        <>
          <LandingPage />
          <Section2 />
          <Section3 />
        </>
      )}
      {activeTab === "games" && (
        <>
          <YourGames />
        </>
      )}
      {activeTab === "store" && (
        <>
          <Store2 />
        </>
      )}
    </div>
  );
}
