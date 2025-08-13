"use client";
import CTA from "@/components/pages/cta";
import { LandingPage } from "@/components/pages/landing-page";
import Section2 from "@/components/pages/section2";
import Section3 from "@/components/pages/section3";

export default function Page() {
  return (
    <>
      <LandingPage />
      <Section2 />
      <Section3 />
      <CTA />
    </>
  );
}
