"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/nav";

const items = navLinks
  .filter((l) => l.href.startsWith("#"))
  .map((l) => ({
    label: l.label.toUpperCase(),
    href: l.href,
    id: l.href.replace("#", ""),
  }));

export default function SideNav() {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const visibleMap = new Map<string, number>();
    const observers: IntersectionObserver[] = [];

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          visibleMap.set(id, entry.intersectionRatio);
          let maxRatio = 0;
          let maxId = items[0]?.id ?? "";
          visibleMap.forEach((ratio, sid) => {
            if (ratio > maxRatio) { maxRatio = ratio; maxId = sid; }
          });
          setActiveId(maxId);
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-5 pr-4 xl:pr-6 lg:flex"
    >
      {items.map(({ id, label, href }) => {
        const isActive = activeId === id;

        return (
          <a
            key={id}
            href={href}
            className="flex items-center gap-3 group"
            aria-label={`Go to ${label}`}
          >
            {/* Label — active section এ only দেখাবে */}
            <span
              className={cn(
                "font-ui text-[9px] font-semibold tracking-[0.18em] text-ink",
                "[writing-mode:vertical-rl] rotate-180",
                "transition-all duration-500 overflow-hidden",
                isActive ? "opacity-100 max-w-[20px]" : "opacity-0 max-w-0"
              )}
            >
              {label}
            </span>

            {/* 3 dash lines — active এ last line longer */}
            <div className="flex flex-col items-end gap-[5px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "block h-px transition-all duration-500",
                    isActive
                      ? i === 2
                        ? "w-8 bg-ink"
                        : "w-3 bg-ink-faint"
                      : "w-3 bg-ink-faint"
                  )}
                />
              ))}
            </div>
          </a>
        );
      })}
    </nav>
  );
}