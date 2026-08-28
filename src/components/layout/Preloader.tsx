"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const text = textRef.current;
    const zoom = zoomRef.current;
    const scroll = scrollRef.current;
    if (!overlay || !text || !zoom || !scroll) return;

    document.body.style.overflow = "hidden";

    const chars = text.querySelectorAll("[data-char]");

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        overlay.style.display = "none";
      },
    });

    tl
      // letters slide up
      .fromTo(
        chars,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.035,
        }
      )
      // scroll hint
      .fromTo(
        scroll,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.2"
      )
      // pause
      .to({}, { duration: 0.7 })
      // text + scroll fade out
      .to([text, scroll], { opacity: 0, duration: 0.35 })
      // zoom element fade in
      .set(zoom, { opacity: 1 })
      // zoom in — screen ভরে যায়
      .fromTo(
        zoom,
        { scale: 1 },
        { scale: 50, duration: 0.9, ease: "power3.in" }
      )
      // overlay fade out
      .to(overlay, { opacity: 0, duration: 0.2 }, "-=0.15");
  }, []);

  const name = "Yasir Abed Rabbu";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg-deep overflow-hidden"
    >
      {/* name */}
      <div ref={textRef} className="flex">
        {[...name].map((char, i) =>
          char === " " ? (
            <span key={i} className="inline-block w-[0.28em]" />
          ) : (
            <span
              key={i}
              className="inline-block overflow-hidden"
              style={{ lineHeight: 1 }}
            >
              <span
                data-char
                className="inline-block font-display text-[48px] font-medium text-on-brand sm:text-[64px] lg:text-[86px]"
                style={{ lineHeight: 1 }}
              >
                {char}
              </span>
            </span>
          )
        )}
      </div>

      {/* zoom — "Y" */}
      <div
        ref={zoomRef}
        className="pointer-events-none absolute"
        style={{ opacity: 0 }}
      >
        <span
          className="font-display text-[86px] font-bold text-bg-deep"
          style={{
            lineHeight: 1,
            display: "block",
            width: "1em",
            height: "1em",
            borderRadius: "50%",
            background: "var(--color-on-brand)",
          }}
        />
      </div>

      {/* scroll */}
      <p
        ref={scrollRef}
        className="absolute bottom-10 font-ui text-[11px] tracking-[0.25em] text-ink-muted uppercase"
        style={{ opacity: 0 }}
      >
        Scroll
      </p>
    </div>
  );
}