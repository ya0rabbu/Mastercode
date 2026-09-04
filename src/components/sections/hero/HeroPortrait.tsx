"use client";

import Image from "next/image";
import { MotionValue, motion, useTransform } from "framer-motion";

interface Props {
  scrollProgress: MotionValue<number>;
}

export default function HeroPortrait({ scrollProgress }: Props) {
  // ════════════════════════════════════════════════════════════
  // ৪টি scroll-linked effect — সব sticky track এর progress-
  // এর সাথে directly sync করা।
  //
  // Track progress range map:
  //   0.0  → 0.7  :  REVEAL PHASE (mask + fade + settle)
  //   0.7  → 1.0  :  CHILL / PARALLAX PHASE (subtle drift)
  // ════════════════════════════════════════════════════════════

  // 1. CLIP-PATH MASK REVEAL
  //    inset(100% 0 0 0) = top থেকে 100% কাটা (শুধু bottom strip)
  //    inset(0% 0 0 0)   = fully visible
  //    → ছবি নিচ থেকে উঠে এলোমেলো না, একটা clean "curtain" হিসেবে
  //      reveal হবে — আপনার portrait-এর bottom halftone fade-
  //      out-এর সাথে PERFECT match করে।
  const maskClip = useTransform(scrollProgress, [0, 0.7], [100, 0]);
  const clipPath = useTransform(maskClip, (v) => `inset(${v}% 0 0 0 round 8px)`);

  // 2. SCALE "DOLLY-BACK" EFFECT
  //    1.1 → 1 = শুরুতে zoomed-in, reveal এর সময় ধীরে ধীরে pull back।
  //    0.9 → 1 এর চেয়ে অনেক বেশি cinematic কারণ মনে হয় ক্যামেরা
  //    ছবির দিকে dolly করছে।
  const scale = useTransform(scrollProgress, [0, 0.7], [1.12, 1]);

  // 3. OPACITY LAYER
  //    mask reveal-এর slightly আগে-পরে fade করে depth দেয়।
  const opacity = useTransform(scrollProgress, [0, 0.5], [0, 1]);

  // 4. COMBINED Y-MOTION (settle + post-reveal parallax)
  //    • Phase 1: y: 80 → 0  (reveal settle)
  //    • Phase 2: y: 0 → -30 (fully reveal হবার পরও ধীরে drift করে
  //      parallax depth দেয়। 60% track আর বাকি থাকলে এটা
  //      ছবিকে "alive" অনুভূতি করায়।)
  const y = useTransform(
    scrollProgress,
    [0, 0.7, 1],
    [80, 0, -30]
  );

  return (
    <section className="relative h-full w-full flex items-end justify-center pb-0">
      <motion.div
        style={{ opacity, y, scale, clipPath }}
        className="relative w-full max-w-[7000px] h-[850px]"
      >
        <Image
          src="/images/halftone-portrait2.png"
          alt="Portrait"
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          className="object-contain object-bottom"
          priority
        />
      </motion.div>
    </section>
  );
}