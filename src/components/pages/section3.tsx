import React from "react";
import { CardDataType } from "./section2";
import Image from "next/image";
import img1 from "@/../public/img2.jpeg";
import img2 from "@/../public/console.jpeg";
import img3 from "@/../public/prod3.jpeg";
const cardData: CardDataType[] = [
  {
    image: img1.src as string,
    title: "Quasar",
    description:
      "The balanced mid-tier model featuring the same Snapdragon G3 Gen 2 chip with RX 6700-level graphics, but upgraded with 32GB RAM and a 512GB SSD (expandable). Ideal for gamers wanting stronger performance and storage flexibility.",
  },
  {
    image: img2.src as string,
    title: "Quasar Pro",
    description:
      "The high-end flagship console with a Snapdragon G3 Gen 3 processor, RX 6700-level graphics, massive 64GB RAM, and a 2TB expandable SSD. Built for hardcore gamers and heavy multitasking.",
  },
  {
    image: img3.src as string,
    title: "Quasar Home",
    description:
      "An affordable entry-level gaming console powered by the Snapdragon G3 Gen 2 processor with RX 6700-level graphics, 16GB RAM, and 256GB SSD storage. Perfect for casual and mid-range gaming.",
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

        {/* <div className="flex justify-center gap-4 mb-4">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full">
            Shop
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-3 rounded-full"
          >
            Learn More
          </Button>
        </div> */}

        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Experience an all-new generation of
          <br />
          incredible SAMPLE.
        </p>
      </div>

      {/* Console Showcase */}
      <div className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="text-white rounded-2xl p-4 bg-[#101010]/20"
            >
              <div>
                <div className="aspect-square rounded-xl mb-4 overflow-hidden">
                  <Image
                    width={300}
                    height={300}
                    src={card.image}
                    alt={card.title}
                    className={`w-full h-full object-cover`}
                    style={{
                      objectPosition:
                        card.title === "Quasar" ? "center 70%" : "center",
                    }}
                  />
                </div>
                <div className="text-white grid mt-2 gap-1">
                  <span className="font-clash-display text-xl tracking-wide font-bold">
                    {card.title}
                  </span>
                  <div className="text-gray-300 text-sm">
                    {card.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        {/* <div className="text-center mt-12">
               <Button
                 variant="outline"
                 className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
               >
                 Find out more
               </Button>
             </div> */}
      </div>
    </div>
  );
}

export default Section3;
