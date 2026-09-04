"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  clamp,
  type MotionValue,
} from "framer-motion";
import IconButton from "@/components/ui/IconButton";
import LiquidImagePlane from "@/components/three/LiquidImagePlane";
import ParticleDissolveImage from "@/components/three/ParticleDissolveImage";
import { featuredProject, projects } from "@/data/projects";

const TURNS = 2;
const TURN_VH = 90;
const STICKY_PIN_TOP_PX = 80;
const DECK_H_PX = 760;
const CONTAINER_MAX_W = 1320;
const TRACK_H_VH = TURNS * TURN_VH;

const LEAVE_Y_FACTOR = 1.4;
const LEAVE_X_FACTOR = 0.05;
const LEAVE_ROTATE_DEG = 2;
const LEAVE_SCALE_SHRINK = 0.03;
const LEAVE_BLUR_PX = 4;

const SPRING_CONFIG = { stiffness: 120, damping: 28, mass: 0.4 };

const DECK_SLOTS = [
  { y: 0, scale: 1.0, opacity: 1.0, shadow: "0 30px 80px -30px rgba(0,0,0,0.5)" },
  { y: 24, scale: 0.95, opacity: 0.85, shadow: "0 18px 45px -25px rgba(0,0,0,0.45)" },
  { y: 48, scale: 0.9, opacity: 0.7, shadow: "0 10px 25px -18px rgba(0,0,0,0.4)" },
];

const deck = [
  featuredProject,
  projects.find((p) => p.slug === "void-studio"),
  projects.find((p) => p.slug === "alpinevista"),
].filter(Boolean) as (typeof featuredProject)[];

function useCardTransforms(
  progress: ReturnType<typeof useScroll>["scrollYProgress"],
  cardIdx: number
) {
  const n = deck.length;
  const turns = n - 1;
  const neverLeave = cardIdx >= turns;

  const leaveStart = cardIdx / turns;
  const leaveEnd = (cardIdx + 1) / turns;
  const leaveP = useTransform(progress, [leaveStart, leaveEnd], [0, 1]);
  const leavePSpring = useSpring(leaveP, SPRING_CONFIG);

  const floatSlot = useTransform(progress, (p) => {
    const eff = cardIdx - p * turns;
    return clamp(0, n - 1, eff);
  });

  const slotInputs = DECK_SLOTS.map((_, i) => i);
  const slotY = useTransform(floatSlot, slotInputs, DECK_SLOTS.map((s) => s.y));
  const slotScale = useTransform(floatSlot, slotInputs, DECK_SLOTS.map((s) => s.scale));
  const slotOpacity = useTransform(floatSlot, slotInputs, DECK_SLOTS.map((s) => s.opacity));

  const leaveY = useTransform(leavePSpring, (lv) =>
    neverLeave ? 0 : -lv * LEAVE_Y_FACTOR * DECK_H_PX
  );

  const y = useTransform<number>([slotY, leaveY], ([sy, ly]) => sy + ly);
  const x = useTransform(leavePSpring, (lv) => (neverLeave ? 0 : -lv * LEAVE_X_FACTOR * CONTAINER_MAX_W));
  const rotate = useTransform(leavePSpring, (lv) => (neverLeave ? 0 : -lv * LEAVE_ROTATE_DEG));
  const scale = useTransform<number>([slotScale, leavePSpring], ([sc, lv]) => sc * (1 - lv * LEAVE_SCALE_SHRINK));
  const opacity = useTransform<number>([slotOpacity, leavePSpring], ([op, lv]) => op * (1 - lv));
  const filter = useTransform(leavePSpring, (lv) => (neverLeave ? "blur(0px)" : `blur(${lv * LEAVE_BLUR_PX}px)`));

  const staticZ = n - cardIdx;
  const zIndex: MotionValue<number> | number = neverLeave
    ? staticZ
    : useTransform(leavePSpring, (lv) => (lv > 0 && lv < 1 ? n + 1 : staticZ));

  const boxShadow = useTransform(floatSlot, (f) => {
    const idx = Math.min(n - 1, Math.round(f));
    return DECK_SLOTS[idx].shadow;
  });

  const liquidLayerOpacity = useTransform(leavePSpring, [0, 0.15], [1, 0]);
  const particleLayerOpacity = useTransform(leavePSpring, [0, 0.12, 0.85, 1], [0, 1, 1, 0]);

  return {
    y, x, rotate, scale, opacity, filter, zIndex, boxShadow,
    leaveProgress: leavePSpring,
    liquidLayerOpacity,
    particleLayerOpacity,
  };
}

export default function ProjectFeature() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"],
  });

  const cards = deck.map((project, i) => ({
    project,
    idx: i,
    t: useCardTransforms(scrollYProgress, i),
  }));

  return (
    <div
      ref={trackRef}
      className="relative mx-auto w-full"
      style={{
        maxWidth: CONTAINER_MAX_W,
        height: `calc(${TRACK_H_VH}vh + ${DECK_H_PX}px)`,
      }}
    >
      <section
        className="sticky mx-auto flex w-full items-start justify-center"
        style={{ top: STICKY_PIN_TOP_PX, height: DECK_H_PX, perspective: "1400px" }}
      >
        {cards.map(({ project, idx, t }) => (
          <motion.div
            key={project.slug}
            className="absolute inset-0 origin-bottom overflow-hidden rounded-frame"
            style={{
              zIndex: t.zIndex,
              y: t.y,
              x: t.x,
              rotate: t.rotate,
              scale: t.scale,
              opacity: t.opacity,
              boxShadow: t.boxShadow,
              filter: t.filter,
              outline: "1px rgba(255,255,255,0.08) solid",
              willChange: "transform, opacity, filter",
            }}
            initial={false}
          >
            <div className="relative h-full w-full bg-bg-slate">
              <motion.div
                className="absolute inset-0"
                style={{ opacity: t.liquidLayerOpacity }}
              >
                <LiquidImagePlane src={project.image} className="h-full w-full" />
              </motion.div>

              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: t.particleLayerOpacity }}
              >
                <ParticleDissolveImage
                  src={project.image}
                  progress={t.leaveProgress}
                  className="h-full w-full"
                />
              </motion.div>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div
                  className="flex items-center justify-between gap-6 rounded-card bg-bg-slate p-5"
                  style={{ outline: "1px rgba(232,216,208,0.20) solid" }}
                >
                  <div className="flex flex-1 flex-col gap-4">
                    <h3 className="font-display text-[28px] font-bold capitalize leading-none text-on-cta">
                      {project.title}
                    </h3>
                    {"description" in project && project.description && (
                      <p className="font-body text-[16px] font-medium capitalize leading-[1.6] text-on-brand line-clamp-2">
                        {project.description}
                      </p>
                    )}
                  </div>

                  <IconButton
                    label={`Open ${project.title}`}
                    href={project.href}
                    size="lg"
                    variant="deep"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}