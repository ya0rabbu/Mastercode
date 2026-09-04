"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";

type Dot = {
  nx: number;
  ny: number;
  darkness: number;
  radius: number;
  seed: number;
};

interface RevealPortraitProps {
  src: string;
  className?: string;
  dotColor?: string;
  grid?: number;
  maxDots?: number;
  revealStart?: number;
  revealEnd?: number;
  dotMinSize?: number;
  dotMaxSize?: number;
}

export default function RevealPortrait({
  src,
  className = "",
  dotColor = "#18252b",
  grid = 4,
  maxDots = 70000,
  revealStart = 0,
  revealEnd = 1,
  dotMinSize = 0.7,
  dotMaxSize = 3.8,
}: RevealPortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [loaded, setLoaded] = useState(false);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const dotsRef = useRef<Dot[]>([]);

  const animationFrameRef = useRef<number | null>(null);

  /**
   * Framer Motion scroll progress
   */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 15%"],
  });

  /**
   * Smooth the scroll value
   */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.35,
  });

  /**
   * Keep latest progress without React re-rendering
   */
  const progressRef = useRef(0);

  useMotionValueEvent(smoothProgress, "change", (value) => {
    progressRef.current = value;
  });

  /**
   * Deterministic pseudo-random function.
   * Prevents dots from flickering every frame.
   */
  const randomFromSeed = (seed: number) => {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };

  /**
   * Setup canvas
   */
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
    });

    if (!ctx) return;

    const image = new Image();

    image.crossOrigin = "anonymous";
    image.src = src;

    imageRef.current = image;

    image.onload = () => {
      /**
       * Sample image at a fixed size.
       * This keeps dot generation manageable.
       */
      const SAMPLE_WIDTH = 900;

      const aspectRatio =
        image.naturalHeight / image.naturalWidth;

      const SAMPLE_HEIGHT = Math.round(
        SAMPLE_WIDTH * aspectRatio
      );

      const offscreen = document.createElement("canvas");

      offscreen.width = SAMPLE_WIDTH;
      offscreen.height = SAMPLE_HEIGHT;

      const offCtx = offscreen.getContext("2d", {
        willReadFrequently: true,
      });

      if (!offCtx) return;

      /**
       * White background
       */
      offCtx.fillStyle = "#ffffff";
      offCtx.fillRect(
        0,
        0,
        SAMPLE_WIDTH,
        SAMPLE_HEIGHT
      );

      offCtx.drawImage(
        image,
        0,
        0,
        SAMPLE_WIDTH,
        SAMPLE_HEIGHT
      );

      const imageData = offCtx.getImageData(
        0,
        0,
        SAMPLE_WIDTH,
        SAMPLE_HEIGHT
      );

      const pixels = imageData.data;

      const dots: Dot[] = [];

      /**
       * Generate halftone dots
       */
      for (
        let y = 0;
        y < SAMPLE_HEIGHT;
        y += grid
      ) {
        for (
          let x = 0;
          x < SAMPLE_WIDTH;
          x += grid
        ) {
          const index =
            (y * SAMPLE_WIDTH + x) * 4;

          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];
          const alpha = pixels[index + 3];

          if (alpha < 30) continue;

          /**
           * Perceived brightness
           */
          const brightness =
            (0.299 * r +
              0.587 * g +
              0.114 * b) /
            255;

          /**
           * Convert brightness to darkness
           */
          const darkness = 1 - brightness;

          /**
           * Ignore almost-white pixels
           */
          if (darkness < 0.08) continue;

          /**
           * Stable seed for this exact dot
           */
          const seed =
            x * 73856093 +
            y * 19349663;

          /**
           * Slight variation
           */
          const variation =
            0.85 +
            randomFromSeed(seed) * 0.3;

          const radius =
            dotMinSize +
            darkness *
              (dotMaxSize - dotMinSize) *
              variation;

          dots.push({
            nx: x / SAMPLE_WIDTH,
            ny: y / SAMPLE_HEIGHT,
            darkness,
            radius,
            seed,
          });

          /**
           * Safety limit
           */
          if (dots.length >= maxDots) {
            break;
          }
        }

        if (dots.length >= maxDots) {
          break;
        }
      }

      dotsRef.current = dots;

      setLoaded(true);
    };

    return () => {
      image.onload = null;
    };
  }, [
    src,
    grid,
    maxDots,
    dotMinSize,
    dotMaxSize,
  ]);

  /**
   * Resize canvas according to container
   */
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const resize = () => {
      const rect =
        container.getBoundingClientRect();

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width =
        Math.max(1, Math.floor(rect.width * dpr));

      canvas.height =
        Math.max(1, Math.floor(rect.height * dpr));

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    };

    resize();

    const observer = new ResizeObserver(resize);

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  /**
   * Main canvas renderer
   */
  useEffect(() => {
    if (!loaded) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let visible = true;

    /**
     * Don't render when outside viewport
     */
    const intersectionObserver =
      new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        {
          threshold: 0,
        }
      );

    intersectionObserver.observe(container);

    const render = () => {
      if (!visible) {
        animationFrameRef.current =
          requestAnimationFrame(render);

        return;
      }

      const rect =
        container.getBoundingClientRect();

      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      const image = imageRef.current;

      if (!image) {
        animationFrameRef.current =
          requestAnimationFrame(render);

        return;
      }

      /**
       * Calculate image size.
       *
       * "contain" style positioning.
       */
      const imageRatio =
        image.naturalWidth /
        image.naturalHeight;

      const containerRatio =
        width / height;

      let imageWidth: number;
      let imageHeight: number;

      if (imageRatio > containerRatio) {
        imageWidth = width;
        imageHeight =
          width / imageRatio;
      } else {
        imageHeight = height;
        imageWidth =
          height * imageRatio;
      }

      /**
       * Center image
       */
      const imageX =
        (width - imageWidth) / 2;

      const imageY =
        (height - imageHeight) / 2;

      /**
       * Current scroll progress
       */
      let progress =
        progressRef.current;

      /**
       * Normalize progress
       */
      progress =
        Math.max(
          0,
          Math.min(1, progress)
        );

      /**
       * Map custom start/end
       */
      progress =
        (progress - revealStart) /
        (revealEnd - revealStart);

      progress =
        Math.max(
          0,
          Math.min(1, progress)
        );

      /**
       * Smooth easing
       */
      const eased =
        1 -
        Math.pow(1 - progress, 3);

      /**
       * Draw dots
       */
      ctx.fillStyle = dotColor;

      const dots = dotsRef.current;

      for (const dot of dots) {
        /**
         * Each dot has a slightly different
         * reveal threshold.
         */
        const threshold =
          randomFromSeed(dot.seed) * 0.55;

        /**
         * Darkness controls how early
         * darker areas appear.
         */
        const localProgress =
          Math.max(
            0,
            Math.min(
              1,
              (eased -
                threshold *
                  (1 - dot.darkness)) /
                0.45
            )
          );

        if (localProgress <= 0) {
          continue;
        }

        /**
         * Tiny scale animation
         */
        const scale =
          0.35 +
          localProgress * 0.65;

        const radius =
          dot.radius * scale;

        const cx =
          imageX +
          dot.nx * imageWidth;

        const cy =
          imageY +
          dot.ny * imageHeight;

        /**
         * Very subtle opacity
         */
        const opacity =
          Math.min(
            1,
            localProgress * 1.25
          );

        ctx.globalAlpha = opacity;

        ctx.beginPath();

        ctx.arc(
          cx,
          cy,
          radius,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      ctx.globalAlpha = 1;

      animationFrameRef.current =
        requestAnimationFrame(render);
    };

    render();

    return () => {
      intersectionObserver.disconnect();

      if (
        animationFrameRef.current !== null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }
    };
  }, [
    loaded,
    dotColor,
    revealStart,
    revealEnd,
  ]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
      />
    </motion.div>
  );
}

/**
 * Reusable deterministic random
 * outside render effects.
 */
function randomFromSeed(seed: number) {
  const x =
    Math.sin(seed * 12.9898) *
    43758.5453;

  return x - Math.floor(x);
}