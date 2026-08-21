import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const cabinet = localFont({
  src: "../../public/fonts/CabinetGrotesk-Extrabold.otf",
  variable: "--font-cabinet",
  weight: "800",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${cabinet.variable}`}>
      <body>{children}</body>
    </html>
  );
}