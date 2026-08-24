"use client";

import { useEffect, useState } from "react";

/** True once the page is past `offset` — drives the header's glass blur. */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const read = () => setScrolled(window.scrollY > offset);
    read();
    window.addEventListener("scroll", read, { passive: true });
    return () => window.removeEventListener("scroll", read);
  }, [offset]);

  return scrolled;
}
