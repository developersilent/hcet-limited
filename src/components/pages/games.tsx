import { GamesData } from "@/lib/games-data";
import { Button } from "../ui/button";
import { CarouselGames } from "../carousel-game";
import { currentGameInfo } from "@/state/games";

export function YourGames() {
  const { current } = currentGameInfo();
  return (
    <div className="w-full h-svh overflow-clip flex items-center justify-center relative">
      <div
        key={current?.title}
        className="absolute inset-0 animate-in fade-in duration-500"
      >
        <video
          key={current?.src}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={current?.src?.replace(/\.(mp4|webm)$/, ".jpg")}
          onLoadedData={(e) => {
            const video = e.currentTarget;
            video.currentTime = 7;
          }}
          onCanPlay={(e) => {
            e.currentTarget.play();
          }}
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        >
          {current?.src?.endsWith(".webm") ? (
            <source src={current.src} type="video/webm" />
          ) : (
            <source src={current?.src} type="video/mp4" />
          )}
          Your browser does not support the video tag.
        </video>

        {/* Enhanced gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 40%, transparent 15%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.8) 100%),
              linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 25%, transparent 55%, rgba(0,0,0,0.4) 100%),
              linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.9) 100%)
            `,
          }}
        />

        {/* Main content area */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-2xl ml-16 space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000">
            {/* Game title */}
            <h1 className="text-8xl font-clash-display font-bold text-white leading-[85px] tracking-tight">
              {current?.title}
            </h1>

            {/* Game description */}
            {/* <p className="text-xl text-gray-300 leading-relaxed max-w-xl font-light">
                {current?.description}
              </p> */}

            {/* Action buttons */}
            <div className="flex items-center space-x-4 pt-6">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-none font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
              >
                Play Now
              </Button>
            </div>

            {/* Additional info */}
            <div className="flex items-center space-x-8 pt-4 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <span>Released:</span>
                <span className="text-white">{current?.releaseYear}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Developer:</span>
                <span className="text-white">{current?.developer}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Platform:</span>
                <span className="text-white">
                  {current?.platforms?.join(", ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel with enhanced positioning */}
      <div className="absolute w-[1000px] h-[300px] top-[60%] left-[50%] z-10">
        <div className="h-full mx-auto pl-[150px] overflow-clip">
          <CarouselGames slides={GamesData} />
        </div>
      </div>
    </div>
  );
}
