import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-center gap-2.5 bg-white px-6 py-5 md:px-16 lg:px-72">
      <button className="p-2 rounded-xl border border-border-strong flex items-center justify-center">
        <Image src="/icons/menu.svg" alt="Menu" width={32} height={32} />
      </button>

      <div className="flex-1 h-px bg-rose-950/20" />

      <div className="flex items-center gap-2">
        <Image src="/icons/logo.svg" alt="Logo" width={24} height={20} />
        <span className="text-brand-primary-active text-xl md:text-2xl font-extrabold font-cabinet leading-6">
          Yasir Abed Rabbu
        </span>
      </div>

      <div className="flex-1 h-px bg-rose-950/20" />

      <div className="flex items-center gap-2 text-text-secondary text-xl md:text-2xl font-semibold font-manrope tracking-wide">
        <span>{"{"}</span>
        <span>Contact</span>
        <span>{"}"}</span>
      </div>
    </header>
  );
}