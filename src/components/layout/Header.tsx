"use client";

import Link from "next/link";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";
import RollingText from "@/components/ui/RollingText";
import { navContact } from "@/data/nav";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

const contactClass = cn(
  "group hidden shrink-0 items-center gap-1.5 font-body text-[14px]",
  "font-semibold leading-none tracking-[0.3px] text-ink-soft",
  "transition-colors duration-300 hover:text-cta sm:flex sm:text-[16px] sm:tracking-[0.4px] md:text-h5 md:tracking-[0.48px] md:gap-[7.2px]"
);

function ContactLink() {
  return (
    <Link
      href={navContact.href}
      className={contactClass}
    >
      <span className="text-ink-soft" aria-hidden="true">&#123;</span>
      <span className="text-cta group-hover:text-cta-hover transition-colors duration-300">
        <RollingText>{navContact.label}</RollingText>
      </span>
      <span className="text-ink-soft" aria-hidden="true">&#125;</span>
    </Link>
  );
}

export default function Header() {
  const scrolled = useScrolled();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={cn(
          "w-full transition-all duration-500",
          "p-3 sm:py-5",
          scrolled
            ? "sm:px-[20%] lg:px-[26%]"
            : "sm:px-8 lg:px-10"
        )}
      >
        <div
          className={cn(
            "flex w-full items-center gap-2.5",
            "rounded-[12px] border border-[#E8D8D0] bg-[#FAF4F0]",
            "px-3 py-4 sm:px-8 sm:py-5",
            scrolled && "shadow-[0_4px_24px_0_rgba(0,0,0,0.06)] backdrop-blur-xl"
          )}
        >
          <MobileMenu />

          <span aria-hidden="true" className="h-px flex-1 bg-[rgba(72,8,24,0.20)]" />

          <Logo />

          <span
            aria-hidden="true"
            className={cn(
              "h-px bg-[rgba(72,8,24,0.20)] transition-all duration-500",
              scrolled ? "hidden" : "hidden sm:block sm:flex-1"
            )}
          />

          <div className={cn(
            "transition-all duration-500 overflow-hidden",
            scrolled ? "w-0 opacity-0 pointer-events-none" : "opacity-100"
          )}>
            <ContactLink />
          </div>

        </div>
      </div>
    </header>
  );
}