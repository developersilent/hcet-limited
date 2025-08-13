import { ThreeDMarquee } from "@/components/marquee";
import { auth } from "@/server/lucia/lucia";
import { redirect } from "next/navigation";
import { SignUpForm } from "../_ui_/sign-up-form";

const images = [
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.uhdpaper.com%2Fwallpaper%2Fgrand-theft-auto-6-video-game-logo-285%401%40n-pc-4k.jpg&f=1&nofb=1&ipt=5c9d3595df5fe486dc02ade9bdcb5525cb9d4c3f3bbfb4180cdc0dd12b895614",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rockstarmag.fr%2Fwp-content%2Fuploads%2F2023%2F05%2Fventes-rdr-2-2023.jpg&f=1&nofb=1&ipt=4175565a7c5b5ef0b5572627bf0f34e98f4cf3f0b1731c76811f53ddb9cd7235",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.xboxservices.com%2Fassets%2Fdb%2F88%2Fdb8834a9-115d-45e7-a9b5-fa4216b2aac2.jpg%3Fn%3DCoD-Warzone_GLP-Page-Hero-1084_1920x1080_04.jpg&f=1&nofb=1&ipt=b487c88004d52bda7153fe2e208c8df205f3963fcac5d86a6692dac2d851752b",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fglobal-img.gamergen.com%2Fvalorant-29-05-2020-key-art-2_0900953382.jpg&f=1&nofb=1&ipt=618017047e4f3402bdf9539af4afaf9e98326a371ab23bc58f0aa0f23345c7a1",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fce%2Ff7%2F7f%2Fcef77fe4479051818e74847f23c8a6db.png&f=1&nofb=1&ipt=3c1dffd261595663623e0b47b1a287c0e10a426e3fb8b559be379f575923b5ce",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.uhdpaper.com%2Fwallpaper%2Fgrand-theft-auto-6-video-game-logo-285%401%40n-pc-4k.jpg&f=1&nofb=1&ipt=5c9d3595df5fe486dc02ade9bdcb5525cb9d4c3f3bbfb4180cdc0dd12b895614",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rockstarmag.fr%2Fwp-content%2Fuploads%2F2023%2F05%2Fventes-rdr-2-2023.jpg&f=1&nofb=1&ipt=4175565a7c5b5ef0b5572627bf0f34e98f4cf3f0b1731c76811f53ddb9cd7235",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.xboxservices.com%2Fassets%2Fdb%2F88%2Fdb8834a9-115d-45e7-a9b5-fa4216b2aac2.jpg%3Fn%3DCoD-Warzone_GLP-Page-Hero-1084_1920x1080_04.jpg&f=1&nofb=1&ipt=b487c88004d52bda7153fe2e208c8df205f3963fcac5d86a6692dac2d851752b",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fglobal-img.gamergen.com%2Fvalorant-29-05-2020-key-art-2_0900953382.jpg&f=1&nofb=1&ipt=618017047e4f3402bdf9539af4afaf9e98326a371ab23bc58f0aa0f23345c7a1",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fce%2Ff7%2F7f%2Fcef77fe4479051818e74847f23c8a6db.png&f=1&nofb=1&ipt=3c1dffd261595663623e0b47b1a287c0e10a426e3fb8b559be379f575923b5ce",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.uhdpaper.com%2Fwallpaper%2Fgrand-theft-auto-6-video-game-logo-285%401%40n-pc-4k.jpg&f=1&nofb=1&ipt=5c9d3595df5fe486dc02ade9bdcb5525cb9d4c3f3bbfb4180cdc0dd12b895614",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rockstarmag.fr%2Fwp-content%2Fuploads%2F2023%2F05%2Fventes-rdr-2-2023.jpg&f=1&nofb=1&ipt=4175565a7c5b5ef0b5572627bf0f34e98f4cf3f0b1731c76811f53ddb9cd7235",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.xboxservices.com%2Fassets%2Fdb%2F88%2Fdb8834a9-115d-45e7-a9b5-fa4216b2aac2.jpg%3Fn%3DCoD-Warzone_GLP-Page-Hero-1084_1920x1080_04.jpg&f=1&nofb=1&ipt=b487c88004d52bda7153fe2e208c8df205f3963fcac5d86a6692dac2d851752b",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fglobal-img.gamergen.com%2Fvalorant-29-05-2020-key-art-2_0900953382.jpg&f=1&nofb=1&ipt=618017047e4f3402bdf9539af4afaf9e98326a371ab23bc58f0aa0f23345c7a1",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fce%2Ff7%2F7f%2Fcef77fe4479051818e74847f23c8a6db.png&f=1&nofb=1&ipt=3c1dffd261595663623e0b47b1a287c0e10a426e3fb8b559be379f575923b5ce",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.uhdpaper.com%2Fwallpaper%2Fgrand-theft-auto-6-video-game-logo-285%401%40n-pc-4k.jpg&f=1&nofb=1&ipt=5c9d3595df5fe486dc02ade9bdcb5525cb9d4c3f3bbfb4180cdc0dd12b895614",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rockstarmag.fr%2Fwp-content%2Fuploads%2F2023%2F05%2Fventes-rdr-2-2023.jpg&f=1&nofb=1&ipt=4175565a7c5b5ef0b5572627bf0f34e98f4cf3f0b1731c76811f53ddb9cd7235",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.xboxservices.com%2Fassets%2Fdb%2F88%2Fdb8834a9-115d-45e7-a9b5-fa4216b2aac2.jpg%3Fn%3DCoD-Warzone_GLP-Page-Hero-1084_1920x1080_04.jpg&f=1&nofb=1&ipt=b487c88004d52bda7153fe2e208c8df205f3963fcac5d86a6692dac2d851752b",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fglobal-img.gamergen.com%2Fvalorant-29-05-2020-key-art-2_0900953382.jpg&f=1&nofb=1&ipt=618017047e4f3402bdf9539af4afaf9e98326a371ab23bc58f0aa0f23345c7a1",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fce%2Ff7%2F7f%2Fcef77fe4479051818e74847f23c8a6db.png&f=1&nofb=1&ipt=3c1dffd261595663623e0b47b1a287c0e10a426e3fb8b559be379f575923b5ce",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.uhdpaper.com%2Fwallpaper%2Fgrand-theft-auto-6-video-game-logo-285%401%40n-pc-4k.jpg&f=1&nofb=1&ipt=5c9d3595df5fe486dc02ade9bdcb5525cb9d4c3f3bbfb4180cdc0dd12b895614",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rockstarmag.fr%2Fwp-content%2Fuploads%2F2023%2F05%2Fventes-rdr-2-2023.jpg&f=1&nofb=1&ipt=4175565a7c5b5ef0b5572627bf0f34e98f4cf3f0b1731c76811f53ddb9cd7235",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.xboxservices.com%2Fassets%2Fdb%2F88%2Fdb8834a9-115d-45e7-a9b5-fa4216b2aac2.jpg%3Fn%3DCoD-Warzone_GLP-Page-Hero-1084_1920x1080_04.jpg&f=1&nofb=1&ipt=b487c88004d52bda7153fe2e208c8df205f3963fcac5d86a6692dac2d851752b",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fglobal-img.gamergen.com%2Fvalorant-29-05-2020-key-art-2_0900953382.jpg&f=1&nofb=1&ipt=618017047e4f3402bdf9539af4afaf9e98326a371ab23bc58f0aa0f23345c7a1",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fce%2Ff7%2F7f%2Fcef77fe4479051818e74847f23c8a6db.png&f=1&nofb=1&ipt=3c1dffd261595663623e0b47b1a287c0e10a426e3fb8b559be379f575923b5ce",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.uhdpaper.com%2Fwallpaper%2Fgrand-theft-auto-6-video-game-logo-285%401%40n-pc-4k.jpg&f=1&nofb=1&ipt=5c9d3595df5fe486dc02ade9bdcb5525cb9d4c3f3bbfb4180cdc0dd12b895614",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rockstarmag.fr%2Fwp-content%2Fuploads%2F2023%2F05%2Fventes-rdr-2-2023.jpg&f=1&nofb=1&ipt=4175565a7c5b5ef0b5572627bf0f34e98f4cf3f0b1731c76811f53ddb9cd7235",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.xboxservices.com%2Fassets%2Fdb%2F88%2Fdb8834a9-115d-45e7-a9b5-fa4216b2aac2.jpg%3Fn%3DCoD-Warzone_GLP-Page-Hero-1084_1920x1080_04.jpg&f=1&nofb=1&ipt=b487c88004d52bda7153fe2e208c8df205f3963fcac5d86a6692dac2d851752b",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fglobal-img.gamergen.com%2Fvalorant-29-05-2020-key-art-2_0900953382.jpg&f=1&nofb=1&ipt=618017047e4f3402bdf9539af4afaf9e98326a371ab23bc58f0aa0f23345c7a1",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fce%2Ff7%2F7f%2Fcef77fe4479051818e74847f23c8a6db.png&f=1&nofb=1&ipt=3c1dffd261595663623e0b47b1a287c0e10a426e3fb8b559be379f575923b5ce",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.uhdpaper.com%2Fwallpaper%2Fgrand-theft-auto-6-video-game-logo-285%401%40n-pc-4k.jpg&f=1&nofb=1&ipt=5c9d3595df5fe486dc02ade9bdcb5525cb9d4c3f3bbfb4180cdc0dd12b895614",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rockstarmag.fr%2Fwp-content%2Fuploads%2F2023%2F05%2Fventes-rdr-2-2023.jpg&f=1&nofb=1&ipt=4175565a7c5b5ef0b5572627bf0f34e98f4cf3f0b1731c76811f53ddb9cd7235",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.xboxservices.com%2Fassets%2Fdb%2F88%2Fdb8834a9-115d-45e7-a9b5-fa4216b2aac2.jpg%3Fn%3DCoD-Warzone_GLP-Page-Hero-1084_1920x1080_04.jpg&f=1&nofb=1&ipt=b487c88004d52bda7153fe2e208c8df205f3963fcac5d86a6692dac2d851752b",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fglobal-img.gamergen.com%2Fvalorant-29-05-2020-key-art-2_0900953382.jpg&f=1&nofb=1&ipt=618017047e4f3402bdf9539af4afaf9e98326a371ab23bc58f0aa0f23345c7a1",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fce%2Ff7%2F7f%2Fcef77fe4479051818e74847f23c8a6db.png&f=1&nofb=1&ipt=3c1dffd261595663623e0b47b1a287c0e10a426e3fb8b559be379f575923b5ce",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.uhdpaper.com%2Fwallpaper%2Fgrand-theft-auto-6-video-game-logo-285%401%40n-pc-4k.jpg&f=1&nofb=1&ipt=5c9d3595df5fe486dc02ade9bdcb5525cb9d4c3f3bbfb4180cdc0dd12b895614",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rockstarmag.fr%2Fwp-content%2Fuploads%2F2023%2F05%2Fventes-rdr-2-2023.jpg&f=1&nofb=1&ipt=4175565a7c5b5ef0b5572627bf0f34e98f4cf3f0b1731c76811f53ddb9cd7235",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.xboxservices.com%2Fassets%2Fdb%2F88%2Fdb8834a9-115d-45e7-a9b5-fa4216b2aac2.jpg%3Fn%3DCoD-Warzone_GLP-Page-Hero-1084_1920x1080_04.jpg&f=1&nofb=1&ipt=b487c88004d52bda7153fe2e208c8df205f3963fcac5d86a6692dac2d851752b",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fglobal-img.gamergen.com%2Fvalorant-29-05-2020-key-art-2_0900953382.jpg&f=1&nofb=1&ipt=618017047e4f3402bdf9539af4afaf9e98326a371ab23bc58f0aa0f23345c7a1",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fce%2Ff7%2F7f%2Fcef77fe4479051818e74847f23c8a6db.png&f=1&nofb=1&ipt=3c1dffd261595663623e0b47b1a287c0e10a426e3fb8b559be379f575923b5ce",
];
export default async function Page() {
  const session = await auth();
  if (session && session?.session?.id) {
    redirect("/");
  }
  return (
    <main className="flex min-h-svh items-center justify-center gap-10 bg-[#000000]">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
      <div className="max-w-[60%] relative border-[#1f1f1f]">
        <ThreeDMarquee images={images} />
        <div
          className="absolute inset-0"
          style={{
            background: `
                    radial-gradient(ellipse 80% 60% at 60% 50%, transparent 40%, #000000 100%),
                    linear-gradient(to right, #000000 0%, transparent 25%, transparent 75%, #000000 100%),
                    linear-gradient(to bottom, #000000 0%, transparent 20%, transparent 80%, #000000 100%)
                  `,
          }}
        ></div>
      </div>
    </main>
  );
}
