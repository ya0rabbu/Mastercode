import * as THREE from "three";

/**
 * Full-screen quad shaders for the image liquid-hover.
 * Vertex stage bypasses the camera (clip-space quad); fragment stage does a
 * `background-size: cover` fit, then a cursor-radial ripple whose amplitude is
 * driven by `uHover` (0 = untouched image, 1 = live).
 */
export const liquidVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const liquidFragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec2 uResolution;       // canvas px
  uniform vec2 uImageResolution;  // texture px
  uniform vec2 uMouse;            // 0..1, y up
  uniform float uHover;           // eased 0..1
  uniform float uTime;

  // Fit the texture so it covers the frame and crops the overflow.
  vec2 coverUv(vec2 uv) {
    float rRes = uResolution.x / uResolution.y;
    float rImg = uImageResolution.x / uImageResolution.y;
    vec2 ratio = vec2(min(rRes / rImg, 1.0), min(rImg / rRes, 1.0));
    return uv * ratio + (1.0 - ratio) * 0.5;
  }

  void main() {
    vec2 uv = coverUv(vUv);

    // Concentric ripple radiating from the pointer, fading with distance.
    float dist = distance(vUv, uMouse);
    float ripple = sin(dist * 26.0 - uTime * 3.2) * exp(-dist * 6.0);
    vec2 dir = normalize(vUv - uMouse + 1e-4);
    vec2 disp = dir * ripple * 0.032 * uHover;

    // Chromatic split so the wobble reads as "liquid", strongest near the cursor.
    float ca = 0.006 * uHover * (1.0 - clamp(dist, 0.0, 1.0));
    float r = texture2D(uTexture, uv + disp + dir * ca).r;
    float g = texture2D(uTexture, uv + disp).g;
    float b = texture2D(uTexture, uv + disp - dir * ca).b;
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

export type LiquidUniforms = {
  uTexture: { value: THREE.Texture | null };
  uResolution: { value: THREE.Vector2 };
  uImageResolution: { value: THREE.Vector2 };
  uMouse: { value: THREE.Vector2 };
  uHover: { value: number };
  uTime: { value: number };
};

/** Builds the ripple material + its uniform handles (no DOM needed). */
export function createLiquidMaterial() {
  const uniforms: LiquidUniforms = {
    uTexture: { value: null },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uImageResolution: { value: new THREE.Vector2(1, 1) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uHover: { value: 0 },
    uTime: { value: 0 },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: liquidVertexShader,
    fragmentShader: liquidFragmentShader,
  });
  return { material, uniforms };
}
