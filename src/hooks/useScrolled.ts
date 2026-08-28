"use client";

import { useEffect, useState } from "react";

/** True once the page is scrolled past `offset`. Consumers use this to
 *  switch the header into its glass/scrolled state (blur + shadow). */
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