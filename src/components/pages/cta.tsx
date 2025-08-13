import React from "react";
import { Button } from "@/components/ui/button";
import img2 from "@/../public/bg-1.svg";
import Image from "next/image";
import graph from "@/../public/graph.svg";
import Link from "next/link";

function CTA() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        backgroundImage: `url(${img2.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Main content */}
      <div className="relative z-10 py-5 flex items-center justify-evenly h-full">
        <div className="px-14">
          <h1 className="text-5xl px-3 font-bold mt-10 text-white mb-2 font-clash-display">
            Get Into The Future Of
            <br />
            Gaming .
          </h1>

          <h2 className="text-3xl px-4 font-semibold text-white font-clash-display">
            Sign-Up Today!
          </h2>

          <p className="text-gray-200 mb-8 px-4 max-w-md">
            Next-gen processing speeds, zero lag cloud gaming and AI-powered
            gameplay optimization.
          </p>

          <div className="flex gap-4 px-4">
            <Link href="/signin">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg cursor-pointer">
                SIGN IN
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white px-8 py-3 rounded-lg"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="mt-10">
          <Image
            src={graph.src}
            alt="Background Image"
            width={400}
            height={300}
            objectFit="cover"
            className="z-0 aspect-video"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 via-25% to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 via-25% to-transparent"></div>
    </div>
  );
}

export default CTA;
