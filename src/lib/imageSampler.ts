export type SampledPixel = {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
};

export async function sampleImageCover(
  src: string,
  containerAspect: number,
  gridCols = 96
): Promise<SampledPixel[]> {
  const img = await loadImage(src);
  const gridRows = Math.max(1, Math.round(gridCols / containerAspect));

  const canvas = document.createElement("canvas");
  canvas.width = gridCols;
  canvas.height = gridRows;
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];

  const imgAspect = img.width / img.height;
  let sx = 0, sy = 0, sw = img.width, sh = img.height;
  if (imgAspect > containerAspect) {
    sw = img.height * containerAspect;
    sx = (img.width - sw) / 2;
  } else {
    sh = img.width / containerAspect;
    sy = (img.height - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, gridCols, gridRows);
  const { data } = ctx.getImageData(0, 0, gridCols, gridRows);

  const pixels: SampledPixel[] = [];
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      const i = (row * gridCols + col) * 4;
      const a = data[i + 3];
      if (a < 10) continue;
      pixels.push({
        x: col / (gridCols - 1) - 0.5,
        y: 0.5 - row / (gridRows - 1),
        r: data[i] / 255,
        g: data[i + 1] / 255,
        b: data[i + 2] / 255,
      });
    }
  }
  return pixels;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}