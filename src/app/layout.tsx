import type { Metadata } from "next";
import { Providers } from "@/server/rpc/client.provider";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";

const localFont = LocalFont({
  src: "../../public/ClashDisplay-Variable.ttf",
  display: "swap",
  variable: "--font-clash-display",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "App",
  description: "Created by SiLENT 101",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} ${localFont.variable} antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
