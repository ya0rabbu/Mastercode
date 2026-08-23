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
  const isFirstRun = useRef(true);

  useGSAP(() => {
    const el = bodyRef.current;
    if (!el) return;

    const state = { height: open ? "auto" : 0, opacity: open ? 1 : 0 };

    if (isFirstRun.current) {
      isFirstRun.current = false;
      gsap.set(el, state);
      return;
    }

    gsap.to(el, { ...state, duration: 0.45, ease: "power2.inOut" });
  }, [open]);

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
            "font-display text-[20px] leading-tight text-ink transition-colors sm:text-[24px] lg:text-h4",
            open ? "font-bold" : "font-medium",
          )}
        >
          {faq.question}
        </span>
        <ToggleIcon open={open} />
      </button>

      <div ref={bodyRef} className="h-0 overflow-hidden opacity-0">
        <Prose size="base" className="pt-4 font-medium">
          {faq.answer}
        </Prose>
      </div>
    </div>
  );
}