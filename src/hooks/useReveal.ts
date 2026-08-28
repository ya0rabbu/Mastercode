"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type RevealOptions = {
  y?: number;
  delay?: number;
  stagger?: number;
  target?: string;
  blur?: number;
};

function scoped(target: string) {
  const trimmed = target.trim();
  return /^[>+~]/.test(trimmed) ? `:scope ${trimmed}` : trimmed;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>({
  y = 32,
  delay = 0,
  stagger = 0.08,
  target,
  blur = 0,
}: RevealOptions = {}) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      // Pre-hide so nothing flashes at full opacity before GSAP takes over.
      root.classList.add("reveal-hidden");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        root.classList.remove("reveal-hidden");
        return;
      }

      const nodes = target
        ? gsap.utils.toArray<HTMLElement>(scoped(target), root)
        : [root];
      if (!nodes.length) {
        root.classList.remove("reveal-hidden");
        return;
      }

      gsap.from(nodes, {
        opacity: 0,
        y,
        ...(blur ? { filter: `blur(${blur}px)` } : {}),
        delay,
        duration: blur ? 1 : 0.8,
        ease: "power3.out",
        stagger: target ? stagger : 0,
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
        onStart: () => root.classList.remove("reveal-hidden"),
      });
    },
    { scope: ref, dependencies: [y, delay, stagger, target, blur] }
  );

  return ref;
}