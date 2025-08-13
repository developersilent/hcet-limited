import React from "react";
import { Button } from "@/components/ui/button";
import { CardDataType } from "./section2";
import Image from "next/image";
import img from "@/../public/console.jpeg";

const cardData: CardDataType[] = [
  {
    image: img.src as string,
    title: "Console 1",
    description: "Description for Console 1",
  },
  {
    image: img.src as string,
    title: "Console 2",
    description: "Description for Console 2",
  },
  {
    image: img.src as string,
    title: "Console 3",
    description: "Description for Console 3",
  },
];

function Section3() {
  return (
    <div className="min-h-screen bg-black text-white px-8 py-16">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 font-clash-display leading-14">
          Discover all <span className="text-purple-300">HCET</span>
          <br />
          consoles and accessories
        </h1>

        <div className="flex justify-center gap-4 mb-4">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full">
            Shop
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-3 rounded-full"
          >
            Learn More
          </Button>
        </div>

        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Experience an all-new generation of
          <br />
          incredible SAMPLE.
        </p>
      </div>

      {/* Console Showcase */}
      <div className="relative flex items-center justify-center">
        {/* Console Cards Row */}
        <div className="flex items-center justify-center gap-12 relative z-10">
          {cardData.map((console, index) => (
            <div key={index} className="flex flex-col items-center group">
              {/* Console Image Container with Glow */}
              <div className="relative mb-6">
                {/* Console Image */}
                <div className="relative ">
                  <Image
                    src={console.image}
                    alt={console.title}
                    width={160}
                    height={200}
                    className="object-cover rounded-lg filter brightness-110 contrast-110"
                  />
                </div>

                {/* Additional glow effect */}
                <div className="absolute -inset-2 bg-blue-500/20 rounded-xl blur-md opacity-60"></div>
              </div>

              {/* Console Name */}
              <p className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                {console.title}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced Central Diamond/Crystal Element */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-purple-400/30 via-blue-400/20 to-transparent transform rotate-45 rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl"></div>
          </div>
          <div className="absolute w-48 h-48 opacity-15">
            <div className="w-full h-full bg-gradient-to-tl from-blue-400/30 via-purple-400/20 to-transparent transform -rotate-45 rounded-2xl backdrop-blur-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section3;
