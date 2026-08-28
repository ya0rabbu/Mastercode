"use client";

import Link from "next/link";
import { useRef } from "react";

import Container from "@/components/ui/Container";
import RollingText from "@/components/ui/RollingText";
import { navContact, navLinks } from "@/data/nav";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type MenuOverlayProps = {
  open: boolean;
  onNavigate: () => void;
  menuId: string;
};

const items = [...navLinks, navContact];

const itemClass = cn(
  "group w-fit font-display text-h2 font-medium text-ink",
  "transition-colors duration-300 hover:text-cta sm:text-h1-tight"
);

const panelClass = cn(
  "invisible fixed inset-0 z-40 flex flex-col justify-center opacity-0",
  "bg-bg-white/70 backdrop-blur-2xl"
);

export default function MenuOverlay({ open, onNavigate, menuId }: MenuOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(ref.current, { autoAlpha: open ? 1 : 0, duration: 0.4, ease: "power2.out" });
      if (!open) return;
      gsap.fromTo(
        "[data-menu-item]",
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.06, delay: 0.1, ease: "power3.out" }
      );
    },
    { scope: ref, dependencies: [open] }
  );

  return (
    <div
      ref={ref}
      id={menuId}
      aria-hidden={!open}
      className={cn(panelClass, !open && "pointer-events-none")}
    >
      <Container as="nav" className="flex flex-col gap-1">
        {items.map((link) => (
          <Link key={link.href} href={link.href} onClick={onNavigate} data-menu-item className={itemClass}>
            <RollingText>{link.label}</RollingText>
          </Link>
        ))}
      </Container>
    </div>
  );
}