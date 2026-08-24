import type { CSSProperties } from "react";

/** Figma StyledBG — a dark radial sweep behind the whole card. */
const gradient =
  "radial-gradient(ellipse 225.89% 269.63% at 8.88% 3.17%, " +
  "#1F1E1E 29%, #333333 62%, #1E1E1E 89%)";

/** StyledVector / 01 — two red ambient glows. Figma's layer blur doesn't
 * export as CSS, so the soften is reproduced with filter: blur here. */
const glowStyle: CSSProperties = { background: "rgba(255,45,32,0.12)", filter: "blur(28px)" };
const glows = [
  { left: "-1.35%", top: "55.37%" },
  { left: "80.89%", top: "46.6%" },
];

/** StyledVector02–05 — cream UI blocks that peek from the clipped top edge,
 * plus one small red accent. Percentages are relative to StyledFrame. */
const shapes: Array<CSSProperties> = [
  { left: "0.03%", top: "0%", width: "18.62%", height: "99.01%", background: "rgba(240,235,224,0.12)" },
  { left: "20.79%", top: "1.37%", width: "22.94%", height: "96.25%", background: "rgba(240,235,224,0.12)" },
  { left: "45.55%", top: "0%", width: "47.33%", height: "99.01%", background: "rgba(240,235,224,0.12)" },
  { left: "94.77%", top: "59.08%", width: "5.2%", height: "36.72%", background: "rgba(255,45,32,0.1)" },
];

/** The static, non-photographic scenery inside the service mockup card. */
export default function ServiceMockupBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0">
      <div className="absolute inset-0" style={{ background: gradient }} />
      {glows.map((g, i) => (
        <span
          key={i}
          className="absolute h-[43.7%] w-[29.4%] rounded-full"
          style={{ ...glowStyle, left: g.left, top: g.top }}
        />
      ))}
      <div className="absolute left-[1.89%] top-[-7.4%] h-[20.26%] w-[96.24%] overflow-hidden">
        {shapes.map((s, i) => (
          <span key={i} className="absolute" style={s} />
        ))}
      </div>
    </div>
  );
}
