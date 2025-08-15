import { LandingPage } from "@/components/pages/landing-page";
import Section2 from "@/components/pages/section2";
import Section3 from "@/components/pages/section3";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="relative w-full min-h-screen">
      <header className="top-0 left-0 right-0 p-2 bg-black w-full z-50 relative flex items-center justify-between">
        <div className="pt-5">
          <Button variant={"link"}>
            <Link href="/explore">Explore</Link>
          </Button>
        </div>
      </header>
      <LandingPage />
      <Section2 />
      <Section3 />
    </div>
  );
}
