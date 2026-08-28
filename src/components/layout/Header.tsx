"use client";

import Link from "next/link";

import Container from "@/components/ui/Container";
import RollingText from "@/components/ui/RollingText";
import { navContact } from "@/data/nav";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

const contactClass = cn(
  "group hidden shrink-0 items-center gap-1.5 font-body text-[14px]",
  "font-semibold leading-none tracking-[0.3px] text-ink-soft",
  "transition-colors duration-300 hover:text-cta sm:flex sm:text-[16px] sm:tracking-[0.4px] md:text-h5 md:tracking-[0.48px] md:gap-[7.2px]"
);

function ContactLink() {
  return (
    <Link href={navContact.href} className={contactClass}>
      <span aria-hidden="true">&#123;</span>
      <RollingText>{navContact.label}</RollingText>
      <span aria-hidden="true">&#125;</span>
    </Link>
  );
}

export default function Header() {
  const scrolled = useScrolled();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,backdrop-filter,box-shadow] duration-500",
        scrolled
          ? "bg-bg-white/70 shadow-[0_1px_0_0_var(--color-hair)] backdrop-blur-xl"
          : "bg-bg-white backdrop-blur-none"
      )}
    >
      <Container className="flex items-center gap-2.5 py-5">
        <MobileMenu />
        <span aria-hidden="true" className="h-px flex-1 bg-hair" />
        <Logo />
        <span aria-hidden="true" className="hidden h-px flex-1 bg-hair sm:block" />
        <ContactLink />
      </Container>
    </header>
  );
}