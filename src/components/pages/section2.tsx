import Image from "next/image";
import img1 from "@/../public/Image.svg";
import img2 from "@/../public/img2.svg";
import img3 from "@/../public/Image3.svg";

interface CardData {
  image: string;
  title: string;
  description: string;
}

export type CardDataType = CardData;

const cardData: CardData[] = [
  {
    image: img1.src as string,
    title: "New releases",
    description:
      "Check out this month's biggest new titles, including Tony Hawk's Pro Skater 1+2.",
  },
  {
    image: img2.src as string,
    title: "HECTEC Indies",
    description:
      "Discover the month's most exciting and unique indie releases including Ninja Gaiden Ragebound.",
  },
  {
    image: img3.src as string,
    title: "Latest updates",
    description:
      "Keep up to date with the month's biggest new events, including Destiny 2's The Edge of Fate expansion.",
  },
];

const Section2 = () => {
  return (
    <div className="min-h-screen text-white bg-black px-3">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex justify-center flex-col pl-20">
            <h1 className="text-6xl font-bold font-clash-display">
              THIS JULY
              <br />
              <span className="text-purple-300 px-2">ON HECTEC</span>
            </h1>
            <p className="text-lg text-gray-300">
              Check out this month's biggest releases along with dedicated
              features, guides and more.
            </p>
          </div>
          {/* Hero Image Placeholder */}
          <div className="w-[70%] h-full relative">
            <Image
              alt="banner"
              src={
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperbat.com%2Fimg%2F9872663-gta-vi-video-game-ultra-hd-desktop.jpg&f=1&nofb=1&ipt=dbfdbbf62df36db58831a09c735c92f1b59507f7686c5022e5dfe7f74db1d1b7"
              }
              //   layout="fill"
              width={600}
              height={300}
              objectFit="cover"
              className="w-full rounded-r-2xl"
            />
            {/* Lighter gradient mask overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 via-25% to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent via-30% to-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent via-30% to-black/20"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="text-white rounded-2xl px-2 bg-black border-none"
            >
              <div>
                <div className="aspect-video rounded-xl bg-gray-800 mb-1 overflow-hidden">
                  <Image
                    width={300}
                    height={200}
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-white grid mt-2 gap-1">
                  <span className="font-clash-display text-xl tracking-wide font-bold">
                    {card.title}
                  </span>
                  <div className="text-gray-300 text-base">
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
};

export default Section2;
