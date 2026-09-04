"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { sampleImageCover } from "@/lib/imageSampler";

type ParticleDissolveImageProps = {
  src: string;
  progress: MotionValue<number>;
  className?: string;
  gridCols?: number;
};

const VERTEX_SHADER = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  attribute vec3 aColor;
  attribute vec3 aRandom;
  attribute float aDelay;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;

    float local = clamp((uProgress - aDelay * 0.5) / 0.5, 0.0, 1.0);
    float eased = local * local * (3.0 - 2.0 * local);

    vec3 pos = position;
    pos += aRandom * eased * 1.4;
    pos.z += eased * 0.6;
    pos.x += sin(uTime * 0.6 + aDelay * 10.0) * 0.002 * (1.0 - eased);

    vAlpha = 1.0 - eased;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (3.5 + eased * 2.0) * (1.0 / -mvPosition.z) * 220.0;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.1, d) * vAlpha;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

export default function ParticleDissolveImage({
  src,
  progress,
  className,
  gridCols = 96,
}: ParticleDissolveImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let points: THREE.Points | null = null;
    let rafId = 0;
    let resizeObserver: ResizeObserver | null = null;

    const setup = async () => {
      const rect = container.getBoundingClientRect();
      const aspect = rect.width / Math.max(1, rect.height);

      const pixels = await sampleImageCover(src, aspect, gridCols);
      if (disposed || pixels.length === 0) return;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(rect.width, rect.height);
      container.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(35, aspect, 0.1, 100);
      camera.position.z = 5;

      const planeWidth = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z * aspect;

      const positions = new Float32Array(pixels.length * 3);
      const colors = new Float32Array(pixels.length * 3);
      const randoms = new Float32Array(pixels.length * 3);
      const delays = new Float32Array(pixels.length);

      pixels.forEach((p, i) => {
        positions[i * 3] = p.x * planeWidth;
        positions[i * 3 + 1] = p.y * (planeWidth / aspect);
        positions[i * 3 + 2] = 0;

        colors[i * 3] = p.r;
        colors[i * 3 + 1] = p.g;
        colors[i * 3 + 2] = p.b;

        const angle = Math.random() * Math.PI * 2;
        const radius = 0.6 + Math.random() * 1.2;
        randoms[i * 3] = Math.cos(angle) * radius;
        randoms[i * 3 + 1] = Math.sin(angle) * radius * 0.6 + 0.5;
        randoms[i * 3 + 2] = (Math.random() - 0.5) * 1.5;

        delays[i] = Math.random();
      });

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 3));
      geometry.setAttribute("aDelay", new THREE.BufferAttribute(delays, 1));

      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        uniforms: {
          uProgress: { value: progress.get() },
          uTime: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });

      points = new THREE.Points(geometry, material);
      scene.add(points);

      const clock = new THREE.Clock();
      const tick = () => {
        if (disposed || !renderer || !scene || !camera || !points) return;
        const mat = points.material as THREE.ShaderMaterial;
        mat.uniforms.uProgress.value = progress.get();
        mat.uniforms.uTime.value = clock.getElapsedTime();
        renderer.render(scene, camera);
        rafId = requestAnimationFrame(tick);
      };
      tick();

      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (!renderer || !camera || width === 0 || height === 0) continue;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      });
      resizeObserver.observe(container);
    };

    setup();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      if (points) {
        points.geometry.dispose();
        (points.material as THREE.ShaderMaterial).dispose();
      }
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, [src, gridCols, progress]);

  return <div ref={containerRef} className={className} />;
}