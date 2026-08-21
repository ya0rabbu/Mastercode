// src/components/Header.tsx
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between gap-4 bg-white px-8 py-6 md:px-16 lg:px-72">
      <button className="p-2 rounded-lg border border-border-strong">
        <Image src="/icons/menu.svg" alt="Menu" width={24} height={24} />
      </button>

      <div className="flex-1 h-px bg-rose-950/20" />

      <div className="flex items-center gap-3">
        <Image src="/icons/logo.svg" alt="Logo" width={140} height={24} priority />
      </div>

      <div className="flex-1 h-px bg-rose-950/20" />

      <button className="flex items-center gap-2 text-text-secondary font-semibold text-sm md:text-base">
        <span>{`{`}</span>
        <span>Contact</span>
        <span>{`}`}</span>
      </button>
    </header>
  );
}