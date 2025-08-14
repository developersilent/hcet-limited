"use client";
import { Carousel } from "@/components/carousel";
import { LandingPage } from "@/components/pages/landing-page";
import Section2 from "@/components/pages/section2";
import { Button } from "@/components/ui/button";
import { GamesData } from "@/lib/games-data";
import { currentGameInfo } from "@/state/games";
import { useState } from "react";

type AllTabs = "home" | "games";

export default function Page() {
  const [activeTab, setActiveTab] = useState<AllTabs>("home");
  const { current } = currentGameInfo();
  console.log("Current game:", current);
  return (
    <div className="relative w-full min-h-screen">
      <header className="fixed top-0 left-0 right-0 p-2 bg-black w-full z-50 relative">
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#000000]/80 via-60% to-transparent pointer-events-none"></div>
      </header>
      {activeTab === "home" && (
        <>
          <LandingPage />
          <Section2 />
          {/* <Section3 /> */}
        </>
      )}
      {activeTab === "games" && (
        <>
          <div className="w-full h-svh overflow-clip flex items-center justify-center p-8 relative">
            <div
              key={current?.title} // This will trigger re-render when title changes
              className="absolute inset-0 animate-in fade-in duration-1000"
              style={{
                backgroundImage: `
                  radial-gradient(ellipse 80% 60% at 60% 50%, transparent 40%, #000000 100%),
                  linear-gradient(to right, #000000 0%, transparent 25%, transparent 75%, #000000 100%),
                  linear-gradient(to bottom, #000000 0%, transparent 20%, transparent 80%, #000000 100%),
                  url(${current?.src})
                `,
                opacity: current.title ? 1 : 0.5,
                transition: "opacity 0.3s ease-in-out",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundBlendMode: "darken",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              }}
            />
            <div className="relative z-10">
              <Carousel slides={GamesData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
