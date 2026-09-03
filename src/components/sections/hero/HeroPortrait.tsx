"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function HeroPortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9;
      const end = -container.clientHeight * 0.1;
      const raw = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));

      // ease out cubic
      const progress = 1 - Math.pow(1 - raw, 3);

      img.style.opacity = String(progress);
      img.style.clipPath = `inset(${(1 - progress) * 100}% 0% 0% 0%)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <img
        ref={imgRef}
        src="/images/halftone-portrait.png"
        alt="Yasir Abed Rabbu"
        style={{
          width: "100%",
          maxWidth: "756px",
          height: "auto",
          opacity: 0,
          transition: "opacity 0.1s ease",
          display: "block",
        }}
      />
    </div>
  );
}