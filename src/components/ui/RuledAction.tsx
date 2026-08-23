import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type RuledActionProps = {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/** Figma runs a full-width hairline through the section-closing button. */
const rules = { light: "bg-line", dark: "bg-hair-light" } as const;

export default function RuledAction({ children, tone = "dark", className }: RuledActionProps) {
  return (
    <div className={cn("relative flex w-full items-center justify-center", className)}>
      <span aria-hidden="true"
        className={cn("absolute left-0 top-1/2 h-px w-full -translate-y-1/2", rules[tone])}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
