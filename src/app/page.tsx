"use client";
import { Carousel } from "@/components/carousel";
import { LandingPage } from "@/components/pages/landing-page";
import Section2 from "@/components/pages/section2";
import Section3 from "@/components/pages/section3";
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
      <header className="top-0 left-0 right-0 p-2 bg-black w-full z-50 relative">
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
          <Section3 />
        </>
      )}
      {activeTab === "games" && (
        <>
          <div className="w-full h-svh overflow-clip flex items-center justify-center p-8 relative">
            <div
              key={current?.title}
              className="absolute inset-0 animate-in fade-in duration-1000"
            >
              <video
                key={current?.src}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={(e) => {
                  const video = e.currentTarget;
                  video.currentTime = 7;
                }}
              >
                <source src={current?.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(ellipse 70% 50% at 20% 40%, transparent 20%, rgba(0,0,0,0.4) 60%, #000000 100%),
                    linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 30%, transparent 60%, rgba(0,0,0,0.3) 100%),
                    linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 25%, transparent 75%, #000000 100%)
                  `,
                }}
              />
              <div className="absolute top-10 left-10 animate-in fade-in duration-1000 flex flex-col justify-center items-start p-16 rounded-r-2xl">
                <h2 className="text-white/80 text-7xl max-w-lg font-clash-display font-bold mb-1.5 drop-shadow-2xl">
                  {current?.title}
                </h2>
                <Button className="mt-2 rounded-none bg-purple-600 border-white/60 text-white w-[30%] px-10">
                  Play Now
                </Button>
              </div>
            </div>
            <div className="relative z-10">
              <Carousel slides={GamesData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
