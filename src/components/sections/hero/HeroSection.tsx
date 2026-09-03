import Button from "@/components/ui/Button";
import HeroTitle from "./HeroTitle";
import { hero } from "@/data/hero";
import HeroPortrait from "./HeroPortrait";

export default function HeroSection() {
  return (
    <>
      {/* Title + CTA — unchanged */}
      <div id="home" className="w-full bg-white">
        <div className="flex flex-col items-center px-5 pt-[60px] sm:px-10 lg:px-[300px]">
          <HeroTitle />
          <div className="mt-12">
            <Button href={hero.cta.href}>{hero.cta.label}</Button>
          </div>
        </div>
      </div>

      {/* Sticky scroll — portrait reveal */}
      <div
        style={{
          position: "relative",
          height: "300vh",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <HeroPortrait />
        </div>
      </div>
    </>
  );
}