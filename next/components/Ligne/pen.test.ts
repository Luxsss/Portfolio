import { buildPen, toCubics, type Box } from './pen';

const CONTENT_LEFT = 144;
const titles: Box[] = [
  { x: CONTENT_LEFT, y: 1100, w: 400, h: 80 },
  { x: CONTENT_LEFT, y: 2200, w: 300, h: 80 },
  { x: CONTENT_LEFT, y: 3400, w: 260, h: 80 },
];

// Every coordinate pair of the path data, control points included.
const pointsOf = (d: string) => {
  const numbers = d.match(/-?\d+(\.\d+)?/g)!.map(Number);
  const points = [];
  for (let i = 0; i < numbers.length; i += 2) points.push({ x: numbers[i], y: numbers[i + 1] });
  return points;
};

const pen = buildPen({ targets: titles, margin: CONTENT_LEFT / 2 });

describe('red thread geometry', () => {
  test('trace une courbe lisse qui passe par chaque point', () => {
    const segments = toCubics([{ x: 0, y: 0 }, { x: 10, y: 10 }, { x: 20, y: 0 }]);
    expect(segments).toHaveLength(2);
    expect(segments[0].endsWith('10 10')).toBe(true);
    expect(segments[1].endsWith('20 0')).toBe(true);
  });

  test('marque un repère par titre, dans l’ordre de la page', () => {
    expect(pen.marks).toHaveLength(3);
    pen.marks.forEach((mark, i) => {
      if (i > 0) expect(mark).toBeGreaterThan(pen.marks[i - 1]);
    });
  });

  test('reste dans la marge, sans jamais entrer dans la colonne de texte', () => {
    for (const point of pointsOf(pen.d)) expect(point.x).toBeLessThan(CONTENT_LEFT - 10);
  });

  test('s’infléchit vers chaque titre, à sa hauteur', () => {
    titles.forEach((title, i) => {
      const apex = pointsOf(pen.prefix(pen.marks[i])).at(-1)!;
      expect(apex.y).toBeCloseTo(title.y + title.h / 2);
      expect(apex.x).toBeGreaterThan(CONTENT_LEFT / 2);
    });
  });

  test('descend toujours, sans revenir en arrière', () => {
    const anchors = pointsOf(pen.d).filter((_, i) => i % 3 === 0);
    anchors.slice(1).forEach((point, i) => expect(point.y).toBeGreaterThan(anchors[i].y));
  });

  test('le préfixe s’arrête au point demandé', () => {
    expect(pen.d.startsWith(pen.prefix(pen.marks[0]))).toBe(true);
    expect(pen.prefix(0)).toMatch(/^M[\d.]+ [\d.]+ $/);
  });
});
