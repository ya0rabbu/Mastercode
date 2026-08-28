import Link from "next/link";

import AssetIcon from "@/components/ui/AssetIcon";
import { cn } from "@/lib/utils";

/**
 * /icons/logo.svg already holds the full lockup — the two offset bars plus the
 * wordmark — at 223x24, so it is masked once and tinted per surface. The text
 * stays in the DOM for screen readers and search. Figma sizes the wordmark at
 * 24px on every breakpoint, so the lockup renders at its native 223x24.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("shrink-0 text-brand-active", className)}>
      <span className="sr-only">Yasir Abed Rabbu</span>
      <AssetIcon
        src="/icons/logo.svg"
        className="xl:h-5 w-[186px] sm:h-6 sm:w-[223px]"
      />
    </Link>
  );
}