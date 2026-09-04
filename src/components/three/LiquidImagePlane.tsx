"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type LiquidImagePlaneProps = {
  src: string;
  className?: string;
  strength?: number;
};

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uInfluence;
  uniform float uTime;
  uniform vec2 uCoverScale;
  uniform vec2 uCoverOffset;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    float dist = distance(uv, uMouse);
    float radius = 0.35;
    float falloff = smoothstep(radius, 0.0, dist);

    float ripple = sin(dist * 40.0 - uTime * 4.0) * 0.5 + 0.5;
    vec2 dir = normalize(uv - uMouse + 0.0001);

    vec2 distortedUv = uv + dir * falloff * ripple * 0.05 * uInfluence;
    vec2 coveredUv = distortedUv * uCoverScale + uCoverOffset;

    gl_FragColor = texture2D(uTexture, coveredUv);
  }
`;

export default function LiquidImagePlane({
  src,
  className,
  strength = 0.05,
}: LiquidImagePlaneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let rafId = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.OrthographicCamera | null = null;
    let mesh: THREE.Mesh | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const targetMouse = new THREE.Vector2(0.5, 0.5);
    const currentMouse = new THREE.Vector2(0.5, 0.5);
    let targetInfluence = 0;
    let currentInfluence = 0;

    const loader = new THREE.TextureLoader();
    loader.load(src, (texture) => {
      if (disposed) return;
      texture.colorSpace = THREE.SRGBColorSpace;

      const rect = container.getBoundingClientRect();

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(rect.width, rect.height);
      container.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
      camera.position.z = 1;

      const { scale, offset } = coverUv(rect.width, rect.height, texture.image.width, texture.image.height);

      const geometry = new THREE.PlaneGeometry(1, 1);
      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        uniforms: {
          uTexture: { value: texture },
          uMouse: { value: targetMouse },
          uInfluence: { value: 0 },
          uTime: { value: 0 },
          uCoverScale: { value: scale },
          uCoverOffset: { value: offset },
        },
        transparent: true,
      });

      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const onPointerMove = (e: PointerEvent) => {
        const r = container.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = 1 - (e.clientY - r.top) / r.height;
        targetMouse.set(x, y);
      };
      const onPointerEnter = () => { targetInfluence = 1; };
      const onPointerLeave = () => { targetInfluence = 0; };

      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerenter", onPointerEnter);
      container.addEventListener("pointerleave", onPointerLeave);

      const clock = new THREE.Clock();
      const tick = () => {
        if (disposed || !renderer || !scene || !camera || !mesh) return;
        currentMouse.lerp(targetMouse, 0.08);
        currentInfluence += (targetInfluence - currentInfluence) * 0.08;

        const mat = mesh.material as THREE.ShaderMaterial;
        mat.uniforms.uMouse.value = currentMouse;
        mat.uniforms.uInfluence.value = currentInfluence * strength * 20;
        mat.uniforms.uTime.value = clock.getElapsedTime();

        renderer.render(scene, camera);
        rafId = requestAnimationFrame(tick);
      };
      tick();

      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (!renderer || !mesh || width === 0 || height === 0) continue;
          renderer.setSize(width, height);
          const { scale: s, offset: o } = coverUv(width, height, texture.image.width, texture.image.height);
          const mat = mesh.material as THREE.ShaderMaterial;
          mat.uniforms.uCoverScale.value = s;
          mat.uniforms.uCoverOffset.value = o;
        }
      });
      resizeObserver.observe(container);

      (container as any).__liquidCleanup = () => {
        container.removeEventListener("pointermove", onPointerMove);
        container.removeEventListener("pointerenter", onPointerEnter);
        container.removeEventListener("pointerleave", onPointerLeave);
      };
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      (container as any).__liquidCleanup?.();
      if (mesh) {
        mesh.geometry.dispose();
        (mesh.material as THREE.ShaderMaterial).dispose();
      }
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, [src, strength]);

  return <div ref={containerRef} className={className} />;
}

function coverUv(containerW: number, containerH: number, imgW: number, imgH: number) {
  const containerAspect = containerW / containerH;
  const imgAspect = imgW / imgH;
  let scaleX = 1, scaleY = 1, offsetX = 0, offsetY = 0;

  if (imgAspect > containerAspect) {
    scaleX = containerAspect / imgAspect;
    offsetX = (1 - scaleX) / 2;
  } else {
    scaleY = imgAspect / containerAspect;
    offsetY = (1 - scaleY) / 2;
  }

  return {
    scale: new THREE.Vector2(scaleX, scaleY),
    offset: new THREE.Vector2(offsetX, offsetY),
  };
}