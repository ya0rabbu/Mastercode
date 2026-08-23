"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Julian's `project-arrow`: an element that trails the pointer inside a card.
 * Attach `hostRef` to the hover area, `followerRef` to the thing that moves.
 * No generics on purpose — the shape is always div host / span follower.
 * Skipped on touch devices, where there is no pointer to follow.
 */
export function useCursorFollow() {
  const hostRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const host = hostRef.current;
      const follower = followerRef.current;
      if (!host || !follower) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const moveX = gsap.quickTo(follower, "x", {
        duration: 0.5,
        ease: "power3.out",
      });
      const moveY = gsap.quickTo(follower, "y", {
        duration: 0.5,
        ease: "power3.out",
      });

      const onMove = (event: PointerEvent) => {
        const box = host.getBoundingClientRect();
        moveX(event.clientX - box.left);
        moveY(event.clientY - box.top);
      };

      host.addEventListener("pointermove", onMove);
      return () => host.removeEventListener("pointermove", onMove);
    },
    { scope: hostRef }
  );

  return { hostRef, followerRef };
}
