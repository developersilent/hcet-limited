"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { GamesData } from "@/lib/games-data";
import Image from "next/image";
import { cartInfo, CurrentGame } from "@/state/cart";

export default function Store() {
  const [selectedGame, setSelectedGame] = useState<CurrentGame>({
    title: GamesData[0]?.title as string,
    src: GamesData[0]?.src as string,
    description: GamesData[0]?.description,
    price: GamesData[0]?.price as number,
  });
  const { AddToCart } = cartInfo();

  const activities = [
    {
      user: "Friend 1",
      action: "is playing right now",
      game: "Lethal Company",
      avatar: "/api/placeholder/32/32",
    },
    {
      user: "Friend 2",
      action: "have played previously",
      game: "Lethal Company",
      avatar: "/api/placeholder/32/32",
    },
  ];

  const friends = [
    {
      name: "Friend 1",
      status: "playing right now",
      avatar: "/api/placeholder/32/32",
    },
    {
      name: "Friend 2",
      status: "online",
      avatar: "/api/placeholder/32/32",
    },
    {
      name: "Friend 3",
      status: "Last seen earlier on their steam deck",
      avatar: "/api/placeholder/32/32",
    },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Top Navigation */}
      {/* <nav className="bg-[#171A21] border-b border-gray-700 px-4 py-2">
        <div className="flex items-center space-x-6 text-sm">
          <span className="text-white">Store</span>
          <span className="text-gray-400 hover:text-white cursor-pointer">
            View
          </span>
          <span className="text-gray-400 hover:text-white cursor-pointer">
            Friends
          </span>
          <span className="text-gray-400 hover:text-white cursor-pointer">
            Games
          </span>
          <span className="text-gray-400 hover:text-white cursor-pointer">
            Help
          </span>
        </div>
      </nav> */}

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Featured Game */}
          <div className="relative overflow-hidden mb-5">
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex justify-center flex-col pl-14">
                <h1 className="text-4xl font-bold font-clash-display animate-in fade-in duration-1000">
                  {selectedGame?.title}
                </h1>
                <p className="text-sm text-gray-300 max-w-md animate-in fade-in duration-1000">
                  {selectedGame?.description}
                </p>

                <div className="flex items-center space-x-4 mt-6">
                  <Button className="bg-purple-600 hover:bg-purple-700 rounded-none text-white px-8">
                    BUY
                  </Button>
                  <Button
                    onClick={() => AddToCart(selectedGame)}
                    className="bg-purple-600 hover:bg-purple-700 rounded-none text-white px-8"
                  >
                    Add to Cart
                  </Button>
                  <span className="text-2xl font-bold">
                    ${selectedGame?.price}
                  </span>
                </div>
              </div>
              {/* Hero Image Placeholder */}
              <div
                key={selectedGame?.title}
                className="w-[70%] h-full relative animate-in fade-in slide-in-from-right-4 duration-700"
              >
                <Image
                  alt="banner"
                  src={selectedGame?.src}
                  height={300}
                  width={500}
                  className="w-full object-cover aspect-video"
                />
                {/* Lighter gradient mask overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 via-15% to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent via-15% to-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent via-15% to-black/20"></div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-8 mb-6 border-b border-gray-600">
            <button className="pb-2 border-b-2 border-blue-400 text-blue-400">
              For You
            </button>
            <button className="pb-2 text-gray-400 hover:text-white">
              Community Hub
            </button>
            <button className="pb-2 text-gray-400 hover:text-white">
              Find Groups
            </button>
            <button className="pb-2 text-gray-400 hover:text-white">
              Discussions
            </button>
            <button className="pb-2 text-gray-400 hover:text-white">
              Guides
            </button>
            <button className="pb-2 text-gray-400 hover:text-white">
              Support
            </button>
          </div>

          {/* Game Updates */}
          <div className="space-y-4 overflow-y-auto max-h-[60vh]">
            {GamesData.map((g, i) => (
              <div
                className="bg-card/40"
                key={i}
                onClick={() => {
                  setSelectedGame(g);
                }}
              >
                <div>
                  <div className="flex items-center">
                    <div className="flex items-center justify-center animate-in fade-in duration-100">
                      <Image
                        src={g.src}
                        alt={g.title}
                        width={300}
                        height={300}
                        className="object-cover aspect-video size-full"
                      />
                    </div>
                    <div className="flex flex-col p-5 gap-1">
                      <h3 className="text-white/95 font-semibold font-clash-display text-xl">
                        {g?.title}
                      </h3>
                      <p className="text-gray-400/90 text-sm max-w-md">
                        {g.description}
                      </p>
                      <div className="flex flex-col">
                        <span className="text-green-500/95 text-lg font-bold">
                          ${g.price}
                        </span>
                        <Button
                          onClick={() => AddToCart(g)}
                          className="bg-purple-600 mt-1 max-w-[130px] hover:bg-purple-700 rounded-none text-white px-8"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-black p-4 border">
          {/* Activity Section */}
          <div className="">
            <h3 className="text-white font-semibold mb-3">ACTIVITY</h3>
            <div className="space-y-3">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback>{activity.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <span className="text-blue-400">{activity.user}</span>
                    <span className="text-gray-400"> {activity.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Friends Section */}
          <div>
            <h3 className="text-white font-semibold mb-3">FRIENDS WHO PLAY</h3>
            <div className="space-y-3">
              {friends.map((friend, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback>{friend.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <div className="text-blue-400">{friend.name}</div>
                    <div className="text-gray-400 text-xs">{friend.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
