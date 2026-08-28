"use client";

import { useRef } from "react";
import * as THREE from "three";
import { gsap, useGSAP } from "@/lib/gsap";
import { createLiquidMaterial } from "@/lib/liquidShader";

export function useLiquidHover(src: string) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      let cancelled = false; // guards the async texture callback below

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      } catch {
        return; // no WebGL — the base <img> stays
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const { material, uniforms } = createLiquidMaterial();
      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

      let loaded = false;
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

      new THREE.TextureLoader().load(src, (tex) => {
        if (cancelled) {
          // Effect already tore down (scrolled away / unmounted) before the
          // network resolved — don't touch disposed uniforms or a detached node.
          tex.dispose();
          return;
        }
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        uniforms.uTexture.value = tex;
        uniforms.uImageResolution.value.set(tex.image.width, tex.image.height);
        loaded = true;
        resize();
        render();
      });

      const enter = () => {
        if (!loaded) return; // never flash a black (textureless) canvas
        resize();
        render();
        gsap.ticker.add(render);
        gsap.to(canvas, { opacity: 1, duration: 0.3, overwrite: true });
        gsap.to(uniforms.uHover, { value: 1, duration: 0.6, ease: "power2.out", overwrite: true });
      };
      const leave = () => {
        gsap.to(uniforms.uHover, { value: 0, duration: 0.7, ease: "power2.out", overwrite: true });
        gsap.to(canvas, {
          opacity: 0,
          duration: 0.5,
          delay: 0.45,
          overwrite: true,
          onComplete: () => gsap.ticker.remove(render),
        });
      };
      const move = (e: PointerEvent) => {
        const b = container.getBoundingClientRect();
        target.set((e.clientX - b.left) / b.width, 1 - (e.clientY - b.top) / b.height);
      };

      container.addEventListener("pointerenter", enter);
      container.addEventListener("pointerleave", leave);
      container.addEventListener("pointermove", move);
      const ro = new ResizeObserver(resize);
      ro.observe(container);

      return () => {
        cancelled = true;
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

  return { containerRef, canvasRef };
}