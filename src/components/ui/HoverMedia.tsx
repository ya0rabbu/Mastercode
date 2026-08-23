"use client";

import type { ReactNode } from "react";
import MediaFrame from "./MediaFrame";
import ColorWipe from "./ColorWipe";
import CursorArrow from "./CursorArrow";
import { useCursorFollow } from "@/hooks/useCursorFollow";
import { cn } from "@/lib/utils";

type HoverMediaProps = {
  src: string;
  alt: string;
  children?: ReactNode;
  size?: "feature" | "thumb";
  scrim?: boolean;
  priority?: boolean;
  /** A bg utility for the wipe, e.g. "bg-cta/80". */
  wipeTone?: string;
  className?: string;
};

/** MediaFrame plus Julian's project-card motion: cursor arrow + colour wipe. */
export default function HoverMedia({
  wipeTone,
  className,
  children,
  ...frame
}: HoverMediaProps) {
  const { hostRef, followerRef } = useCursorFollow();

  return (
    <MediaFrame
      {...frame}
      ref={hostRef}
      className={cn("group", className)}
      overlay={
        <>
          <ColorWipe tone={wipeTone} />
          <CursorArrow ref={followerRef} />
        </>
      }
    >
      {children}
    </MediaFrame>
  );
}
