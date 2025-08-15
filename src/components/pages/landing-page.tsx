import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import img1 from "@/../public/graph.svg";
import img2 from "@/../public/bg-1.svg";
import console from "@/../public/img5.jpeg";
import ctrll from "@/../public/img1.jpeg";
import Image from "next/image";
export function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white p-3 grid">
      {/* Main Content */}
      <main className="flex flex-col items-center gap-2 z-0">
        {/* Hero Section */}
        <div className="w-full">
          <div className="flex gap-2 h-fit">
            <div className="w-[40%] flex flex-col items-center justify-center">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 font-clash-display px-3">
                The Future of Gaming
                <br />
                Starts Here.
              </h2>
              <div className="flex gap-2 self-start px-[10%]">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm">
                  Pre-Order Now
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800 px-6 py-2 rounded-full text-sm bg-transparent"
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div className="w-[60%] h-full">
              <Card className="bg-[#101010] relative overflow-hidden border-0 p-6 rounded-2xl w-full">
                <h3 className="text-[22px] font-custom font-semibold leading-tight mb-4 font-clash-display z-99">
                  Experience power, speed,
                  <br />
                  and design without compromise.
                </h3>
                <div className="h-24"></div> {/* Spacer for image placement */}
                <p className="text-gray-400 text-sm max-w-md z-99">
                  Gaming has been stagnant for too long. HCET's new home console
                  breaks the mold, fusing cutting-edge performance, a sleek
                  modern form, and features that outclass PlayStation and Xbox.
                </p>
                <div className="absolute right-0 top-0 w-[60%] h-full">
                  <div className="relative w-full h-full">
                    <Image
                      className="w-full h-full object-cover object-center"
                      alt="Gaming console"
                      src={ctrll.src as string}
                      width={600}
                      height={500}
                    />
                    {/* Lighter gradient mask overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#101010] via-[#101010]/40 via-20% to-transparent"></div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="flex gap-2 w-full h-full">
          {/* Raw Power Card - 30% */}
          <Card className="w-[20%] bg-[#101010] border-0 p-4 rounded-2xl flex flex-col items-center justify-center -gap-7">
            <h3 className="text-xl font-semibold text-white font-clash-display text-center">
              Raw Power
            </h3>
            <div className="w-full h-fit mx-auto -mt-5">
              <Image
                alt="Raw Power Image"
                src={img1.src as string}
                className="w-full aspect-square scale-90"
                width={600}
                height={600}
              />
            </div>
            <p className="text-gray-400 text-sm -mt-3">
              Next-gen processing speeds, zero lag, and ultra-realistic graphics
              that push the limits of immersion.
            </p>
          </Card>

          {/* Design Meets Performance Card - 40% */}
          <Card className="bg-[#101010] relative overflow-hidden border-0 p-6 rounded-2xl w-[60%]">
            <h3 className="text-[22px] font-custom font-semibold leading-tight font-clash-display z-99">
              Design Meets Performance
            </h3>
            <p className="text-gray-400 text-sm max-w-md z-99 -mt-5">
              Crafted for your living room and your lifestyle, minimal, bold,
              and undeniably premium.
            </p>
            <div className="absolute right-0 top-0 w-[60%] h-full">
              <div className="relative w-full h-full">
                <Image
                  className="w-full h-full object-cover object-center"
                  alt="Gaming console"
                  src={console.src as string}
                  width={600}
                  height={500}
                />
                {/* Lighter gradient mask overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#101010] via-[#101010]/40 via-20% to-transparent"></div>
              </div>
            </div>
          </Card>

          {/* More Than Gaming Card - 30% */}
          <Card
            className="w-[20%] relative border-0 p-6 rounded-2xl flex flex-col min-h-[280px] overflow-hidden"
            style={{
              backgroundImage: `url(${img2.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-xl font-semibold text-white font-clash-display">
                More Than Gaming
              </h3>

              <p className="text-white/90 text-sm flex-grow">
                A connected ecosystem, multiplayer, media, cloud gaming, and
                social features, all in one seamless interface.
              </p>

              <div className="mt-8 self-end">
                <Button className="bg-white text-purple-900 hover:bg-gray-100 rounded-full px-4 py-2 text-sm">
                  Find more Devices
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
