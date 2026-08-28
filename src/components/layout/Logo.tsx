import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("shrink-0", className)}>
      <span className="sr-only">Yasir Abed Rabbu</span>

      {/* Mobile: < sm — 192×28 */}
      <Image
        src="/icons/logo.svg"
        alt="Yasir Abed Rabbu"
        width={192}
        height={28}
        className="block h-7 w-[192px] sm:hidden"
        priority
      />

      {/* Desktop: sm+ — 254×36 */}
      <Image
        src="/icons/logo.svg"
        alt="Yasir Abed Rabbu"
        width={254}
        height={36}
        className="hidden h-9 w-[254px] sm:block"
        priority
      />
    </Link>
  );
}