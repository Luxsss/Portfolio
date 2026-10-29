// Geometry of the red thread: a quiet spine down the left margin that leans towards
// each section title (without ever reaching the text) and straightens again.
// Pure functions in page-pixel coordinates, so the SVG can use a 1:1 viewBox.

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Point {
  x: number;
  y: number;
}

export interface Pen {
  d: string;
  // Point index of each lean's apex, used to sync drawing with scroll.
  marks: number[];
  // Path data up to a given point index.
  prefix: (pointIndex: number) => string;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const round = (value: number) => Math.round(value * 10) / 10;

// Smooth curve through every point: uniform Catmull-Rom converted to cubic Béziers.
export function toCubics(points: Point[]): string[] {
  const segments: string[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    segments.push(`C${round(c1.x)} ${round(c1.y)} ${round(c2.x)} ${round(c2.y)} ${round(p2.x)} ${round(p2.y)}`);
  }
  return segments;
}

export function buildPen({ targets, margin }: { targets: Box[]; margin: number }): Pen {
  const sway = Math.max(1, margin * 0.05);
  const first = targets[0];
  const points: Point[] = [{ x: margin, y: Math.max(0, first.y - 360) }];
  const marks: number[] = [];

  targets.forEach((box) => {
    const cy = box.y + box.h / 2;
    const reach = clamp(box.h * 1.2, 40, 110);
    const apexX = box.x - clamp(box.x * 0.15, 6, 20);
    const last = points[points.length - 1];
    const leanStart = cy - reach;

    // Almost straight down the margin, with a barely visible sway every ~420px.
    const bends = Math.max(0, Math.round((leanStart - last.y) / 420) - 1);
    for (let k = 1; k <= bends; k++) {
      points.push({ x: margin + (k % 2 ? sway : -sway), y: last.y + ((leanStart - last.y) * k) / (bends + 1) });
    }

    points.push({ x: margin, y: leanStart });
    marks.push(points.length);
    points.push({ x: Math.max(margin, apexX), y: cy }, { x: margin, y: cy + reach });
  });

  const last = points[points.length - 1];
  points.push({ x: margin, y: last.y + 260 });

  const start = `M${round(points[0].x)} ${round(points[0].y)}`;
  const segments = toCubics(points);
  return {
    d: `${start} ${segments.join(" ")}`,
    marks,
    prefix: (pointIndex) => `${start} ${segments.slice(0, pointIndex).join(" ")}`,
  };
}
