import Link from "next/link";
import { cn } from "@/lib/utils";

/** Two offset bars — Figma IconPart (0,0) and IconPart03 (19.2, 6.4). */
function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 20"
      fill="none"
      aria-hidden="true"
      className={cn("size-5 shrink-0 text-accent", className)}
    >
      <rect
        x="0.54" y="0.54" width="3.2" height="11.73"
        fill="var(--color-bg)" stroke="currentColor" strokeWidth="1.07"
      />
      <rect
        x="19.74" y="6.94" width="3.2" height="11.73"
        fill="var(--color-bg)" stroke="currentColor" strokeWidth="1.07"
      />
    </svg>
  );
}

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex shrink-0 items-center gap-2", className)}
    >
      <LogoMark />
      <span className="font-display text-[18px] font-extrabold leading-none text-brand-active sm:text-h5">
        Yasir Abed Rabbu
      </span>
    </Link>
  );
}