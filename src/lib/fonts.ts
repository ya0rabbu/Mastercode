import { Manrope } from "next/font/google";
import localFont from "next/font/local";

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const cabinet = localFont({
  src: "../../public/fonts/CabinetGrotesk-Variable.woff2",
  weight: "100 800",
  variable: "--font-cabinet",
  display: "swap",
});

export const satoshi = localFont({
  src: "../../public/fonts/Satoshi-Variable.woff2",
  weight: "300 900",
  variable: "--font-satoshi",
  display: "swap",
});

/** Spread onto <html> so all three CSS variables are available globally. */
export const fontVariables = [
  manrope.variable,
  cabinet.variable,
  satoshi.variable,
].join(" ");