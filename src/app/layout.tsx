import type { Metadata } from "next";
import { Providers } from "@/server/rpc/client.provider";
import "@/styles/globals.css";
import { Roboto } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "App",
  description: "Created by SiLENT 101",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const roboto = Roboto({
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
      <body className={`${roboto.className} antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
