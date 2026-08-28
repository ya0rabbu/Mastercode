import Image from "next/image";
import Button from "@/components/ui/Button";
import HeroTitle from "./HeroTitle";
import { hero } from "@/data/hero";
import HeroPortrait from "./HeroPortrait";

export default function HeroSection() {
  return (
    <div id="home" className="w-full bg-bg-white">
      <div className="flex flex-col items-center px-5 pt-[60px] sm:px-10 lg:px-[300px]">
        {/* text */}
        <HeroTitle />
        <div className="mt-12">
          <Button href={hero.cta.href}>{hero.cta.label}</Button>
        </div>

        {/* portrait — 756×792, centered, bottom aligned */}
        <div className="mt-12 flex w-full justify-center">
          <HeroPortrait />
        </div>
      </div>
    </div>
  );
}