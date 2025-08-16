import { LandingPage } from "@/components/pages/landing-page";
import Section2 from "@/components/pages/section2";
import Section3 from "@/components/pages/section3";

export default function Page() {
  return (
    <div className="relative w-full min-h-screen">
      <LandingPage />
      <Section2 />
      <Section3 />
    </div>
  );
}
