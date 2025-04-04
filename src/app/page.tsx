"use client"
import { LandingPage } from "@/components/pages/landing-page";
import { LogOut } from "./(auth)/_ui_/logout-button";

export default function Page() {
  return (
    <>
      <LogOut />
      <LandingPage />
    </>
  );
}
