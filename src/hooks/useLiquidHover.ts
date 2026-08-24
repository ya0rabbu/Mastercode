"use client";

import { useRef, useState } from "react";
import * as THREE from "three";
import { gsap, useGSAP } from "@/lib/gsap";
import { createLiquidMaterial } from "@/lib/liquidShader";

/**
 * Ripples `src` around the pointer on a WebGL quad. Attach `containerRef` to the
 * frame (sizing + pointer events) and `canvasRef` to the <canvas>; `ready` flips
 * true after the first paint so the caller can hide its fallback <img>. Bails —
 * leaving the fallback — on touch, reduced-motion, or a missing WebGL context.
 */
export function useLiquidHover(src: string) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useGSAP(
    () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      } catch {
        return; // no WebGL — keep the fallback image
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const { material, uniforms } = createLiquidMaterial();
      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

      const target = new THREE.Vector2(0.5, 0.5);
      const resize = () => {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        renderer.setSize(w, h, false);
        uniforms.uResolution.value.set(w, h);
      };
      const render = () => {
        uniforms.uTime.value += 0.016;
        uniforms.uMouse.value.lerp(target, 0.12);
        renderer.render(scene, camera);
      };
      const resizeAndRender = () => {
        resize();
        render();
      };

      new THREE.TextureLoader().load(src, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        uniforms.uTexture.value = tex;
        uniforms.uImageResolution.value.set(tex.image.width, tex.image.height);
        resizeAndRender();
        setReady(true);
      });

      const enter = () => {
        gsap.to(uniforms.uHover, { value: 1, duration: 0.6, ease: "power2.out" });
        gsap.ticker.add(render);
      };
      const leave = () =>
        gsap.to(uniforms.uHover, {
          value: 0,
          duration: 0.9,
          ease: "power2.out",
          onComplete: () => gsap.ticker.remove(render),
        });
      const move = (e: PointerEvent) => {
        const b = container.getBoundingClientRect();
        target.set((e.clientX - b.left) / b.width, 1 - (e.clientY - b.top) / b.height);
      };

      container.addEventListener("pointerenter", enter);
      container.addEventListener("pointerleave", leave);
      container.addEventListener("pointermove", move);
      const ro = new ResizeObserver(resizeAndRender);
      ro.observe(container);

      return () => {
        gsap.ticker.remove(render);
        ro.disconnect();
        container.removeEventListener("pointerenter", enter);
        container.removeEventListener("pointerleave", leave);
        container.removeEventListener("pointermove", move);
        uniforms.uTexture.value?.dispose();
        material.dispose();
        renderer.dispose();
      };
    },
    { scope: containerRef, dependencies: [src] }
  );

  return { containerRef, canvasRef, ready };
}
