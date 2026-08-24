"use client";

import { useEffect, useState } from "react";

import MenuButton from "./MenuButton";
import MenuOverlay from "./MenuOverlay";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <MenuButton open={open} onToggle={() => setOpen((value) => !value)} />
      <MenuOverlay open={open} onNavigate={() => setOpen(false)} />
    </>
  );
}
