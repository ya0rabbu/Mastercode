import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

const title = "Yasir Abed Rabbu — User-centric Product Designer";
const description =
  "Product designer based in Dhaka, Bangladesh. Clear, friction-free products across SaaS, healthcare and fintech, built around real user needs.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="bg-bg-white font-body text-ink antialiased">
        {children}
      </body>
    </html>
  );
}