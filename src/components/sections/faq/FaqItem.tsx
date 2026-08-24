"use client";

import { useRef } from "react";

import Prose from "@/components/ui/Prose";
import ToggleIcon from "@/components/ui/ToggleIcon";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { Faq } from "@/data/faq";

type FaqItemProps = {
  faq: Faq;
  open: boolean;
  onToggle: () => void;
};

export default function FaqItem({ faq, open, onToggle }: FaqItemProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const isFirstRun = useRef(true);

  useGSAP(
    () => {
      const el = bodyRef.current;
      const inner = innerRef.current;
      if (!el || !inner) return;

      // First paint + reduced motion: jump straight to the resting state.
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isFirstRun.current || reduce) {
        isFirstRun.current = false;
        gsap.set(el, { height: open ? "auto" : 0 });
        gsap.set(inner, { opacity: open ? 1 : 0, y: open ? 0 : 8 });
        return;
      }

      const tl = gsap.timeline();
      if (open) {
        tl.to(el, { height: "auto", duration: 0.5, ease: "power3.inOut" }).to(
          inner,
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.3"
        );
      } else {
        tl.to(inner, { opacity: 0, y: 8, duration: 0.25, ease: "power2.in" }).to(
          el,
          { height: 0, duration: 0.45, ease: "power3.inOut" },
          "-=0.1"
        );
      }
    },
    { dependencies: [open] }
  );

  return (
    <div className="flex w-full flex-col border-b border-hair-dark pb-6 pt-4">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 text-left"
      >
        <span
          className={cn(
            "font-display text-[20px] leading-tight text-ink transition-colors duration-300 sm:text-[24px] lg:text-h4",
            open ? "font-bold" : "font-medium"
          )}
        >
          {faq.question}
        </span>
        <ToggleIcon open={open} />
      </button>

      <div ref={bodyRef} className="h-0 overflow-hidden">
        <div ref={innerRef}>
          <Prose size="base" className="pt-4 font-medium">
            {faq.answer}
          </Prose>
        </div>
      </div>
    </div>
  );
}
