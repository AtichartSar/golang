import { Inter, Noto_Sans_Thai } from "next/font/google";

export const noto = Noto_Sans_Thai({
  subsets: ["latin"],
  variable: "--font-noto",
});

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
