import Image from "next/image";
import { hero } from "@/data/hero";

export default function HeroTitle() {
  return (
    <div className="flex w-full flex-col items-center gap-4">

      {/* eyebrow — center */}
      <p className="text-fill-left font-body text-[16px] font-medium leading-[16px] text-ink w-full max-w-[514px]">
        {hero.eyebrow}
      </p>

      {/* 514px block */}
      <div className="flex w-full max-w-[514px] flex-col items-center gap-4">

        {/* User-centric */}
        <p className="text-center font-display text-[92px] font-medium leading-[92px] text-ink">
          {hero.titleTop}
        </p>

        {/* row: avatar | Product \n Designer */}
        <div className="flex w-full items-center gap-4">

          {/* avatar pill — 154×200 */}
          <div className="relative h-[200px] w-[154px] shrink-0 overflow-hidden rounded-[73px]">
            <Image
              src={hero.avatar.src}
              alt={hero.avatar.alt}
              fill
              sizes="154px"
              className="object-cover"
              priority
            />
          </div>

          {/* Product + Designer stacked */}
          <div className="flex flex-col">
            <span className="font-display text-[92px] font-medium leading-[92px] text-cta">
              {hero.titleRole}
            </span>
            <span className="font-display text-[92px] font-medium leading-[92px] text-ink">
              {hero.titleCraft}
            </span>
          </div>

        </div>
      </div>

      {/* location — right */}
      <p className="w-full max-w-[514px] text-right font-display text-[24px] font-medium leading-[24px] text-ink-soft"> 
        {hero.location}
      </p>

    </div>
  );
}