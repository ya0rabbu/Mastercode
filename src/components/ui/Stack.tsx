import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Gap = "xs" | "sm" | "md" | "lg" | "xl";

/** Figma's nested vertical rhythm inside a section. lg: values are the Figma px. */
const gaps: Record<Gap, string> = {
  xs: "gap-2.5",
  sm: "gap-3 lg:gap-4",
  md: "gap-6 lg:gap-8",
  lg: "gap-8 lg:gap-12",
  xl: "gap-10 lg:gap-block",
};

type StackProps = {
  children: ReactNode;
  gap?: Gap;
  align?: "start" | "center";
  className?: string;
};

/** A centered vertical group for when a Section needs more than one gap level. */
export default function Stack({
  children,
  gap = "md",
  align = "center",
  className,
}: StackProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col",
        align === "center" ? "items-center" : "items-start",
        gaps[gap],
        className
      )}
    >
      {children}
    </div>
  );
}
