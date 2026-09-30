import type { Metadata, Viewport } from "next";
import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-sans",
  preload: false,
});

const serif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  variable: "--font-serif",
  preload: false,
});

export const metadata: Metadata = {
  title: "粤北到湘南 · 10/2–10/6",
  description: "韶关、高椅岭、东江湖、郴州、仰天湖五日行程。按天看路线、吃饭、充电和天气。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f4efe6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
