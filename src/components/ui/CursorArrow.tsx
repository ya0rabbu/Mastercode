import type { Ref } from "react";
import { cn } from "@/lib/utils";
import ArrowIcon from "./ArrowIcon";

type CursorArrowProps = {
  ref?: Ref<HTMLSpanElement>;
  className?: string;
};

/**
 * Julian's `project-arrow`: opacity 0 at rest, fades in on hover and trails
 * the pointer. The negative margins centre the disc on the cursor.
 */
export default function CursorArrow({ ref, className }: CursorArrowProps) {
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute left-0 top-0 z-[15] -ml-7 -mt-7 flex size-14",
        "items-center justify-center rounded-full bg-on-cta text-ink opacity-0",
        "transition-opacity duration-300 group-hover:opacity-100",
        className
      )}
    >
      <ArrowIcon className="size-6" />
    </span>
  );
}
