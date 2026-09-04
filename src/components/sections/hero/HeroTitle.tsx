import Image from "next/image";
import { hero } from "@/data/hero";

export default function HeroTitle() {
  return (
    <div className="flex w-full flex-col items-center gap-4">

      {/* eyebrow */}
      <p className="self-stretch text-center font-body text-base font-medium leading-4 text-ink">
        {hero.eyebrow}
      </p>

      {/* 514px block on desktop, full width on mobile */}
      <div className="flex w-full max-w-[514px] flex-col items-start gap-4">

        {/* User-centric */}
        <p className="w-full text-center font-display text-[48px] sm:text-[92px] font-medium leading-[48px] sm:leading-[92px] text-ink">
          {hero.titleTop}
        </p>

        {/* row: avatar | Product \n Designer */}
        <div className="flex w-full items-start justify-center gap-4">

          {/* avatar pill — mobile 86.24×112, desktop 154×200 */}
          <div className="relative h-[112px] w-[86.24px] sm:h-[200px] sm:w-[154px] shrink-0 overflow-hidden rounded-[72.8px] sm:rounded-[130px]">
            <Image
              src={hero.avatar.src}
              alt={hero.avatar.alt}
              fill
              sizes="(max-width: 640px) 86px, 154px"
              className="object-cover"
              priority
            />
          </div>

          {/* Product + Designer stacked */}
          <div className="flex flex-col items-start">
            <span className="font-display text-[48px] sm:text-[92px] font-medium leading-[48px] sm:leading-[92px] text-cta">
              {hero.titleRole}
            </span>
            <span className="font-display text-[48px] sm:text-[92px] font-medium leading-[48px] sm:leading-[92px] text-ink">
              {hero.titleCraft}
            </span>
          </div>

        </div>
      </div>

      {/* location */}
      <p className="w-full max-w-[514px] text-right font-body text-xl sm:text-2xl font-medium leading-5 sm:leading-6 text-ink-soft">
        {hero.location}
      </p>

    </div>
  );
}