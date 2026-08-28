"use client";

import { useEffect, useId, useState } from "react";

import MenuButton from "./MenuButton";
import MenuOverlay from "./MenuOverlay";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

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
      <MenuButton open={open} onToggle={() => setOpen((value) => !value)} menuId={menuId} />
      <MenuOverlay open={open} onNavigate={() => setOpen(false)} menuId={menuId} />
    </>
  );
}