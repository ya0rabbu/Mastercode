"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const zoomLetterRef = useRef<HTMLSpanElement>(null);
  const scrollRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const text = textRef.current;
    const zoomLetter = zoomLetterRef.current;
    const scroll = scrollRef.current;
    if (!overlay || !text || !zoomLetter || !scroll) return;

    document.body.style.overflow = "hidden";

    const chars = text.querySelectorAll("[data-char]");

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        overlay.style.display = "none";
      },
    });

    tl
      // letters slide up from bottom
      .fromTo(
        chars,
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.04,
        }
      )
      // scroll hint
      .fromTo(
        scroll,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.3"
      )
      // pause
      .to({}, { duration: 0.8 })
      // text fade out
      .to(text, { opacity: 0, duration: 0.3 })
      .to(scroll, { opacity: 0, duration: 0.3 }, "<")
      // "Y" zoom — screen ভরে যায়
      .set(zoomLetter, { opacity: 1, scale: 1 })
      .to(zoomLetter, {
        scale: 80,
        duration: 1,
        ease: "power3.in",
      })
      // overlay fade
      .to(overlay, { opacity: 0, duration: 0.25 }, "-=0.2");
  }, []);

  const name = "Yasir Abed Rabbu";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-bg-deep"
    >
      {/* name — each letter wrapped in overflow:hidden */}
      <div ref={textRef} className="flex items-end">
        {[...name].map((char, i) =>
          char === " " ? (
            <span key={i} style={{ display: "inline-block", width: "0.28em" }} />
          ) : (
            <span
              key={i}
              style={{ display: "inline-block", overflow: "hidden", lineHeight: 1.1 }}
            >
              <span
                data-char
                className="font-display font-medium text-on-brand"
                style={{
                  display: "inline-block",
                  fontSize: "clamp(36px, 6vw, 86px)",
                  lineHeight: 1.1,
                }}
              >
                {char}
              </span>
            </span>
          )
        )}
      </div>

      {/* zoom letter "Y" — absolutely centered */}
      <span
        ref={zoomLetterRef}
        className="pointer-events-none absolute font-display font-bold text-on-brand"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(36px, 6vw, 86px)",
          lineHeight: 1,
          opacity: 0,
          transformOrigin: "center center",
        }}
      >
        Y
      </span>

      {/* scroll */}
      <p
        ref={scrollRef}
        className="absolute bottom-10 font-ui text-[11px] uppercase tracking-[0.25em] text-ink-muted"
        style={{ opacity: 0 }}
      >
        Scroll
      </p>
    </div>
  );
}