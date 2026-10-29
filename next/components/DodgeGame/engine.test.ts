import { circleHitsRect, createGame, score, spawnShot, step, type Input } from './engine';

const still: Input = { dx: 0, dy: 0, target: null };

// Deterministic stand-in for Math.random.
const sequence = (...values: number[]) => {
  let index = 0;
  return () => values[index++ % values.length];
};

describe('Dodge engine', () => {
  test('place le joueur au centre de l’arène', () => {
    const game = createGame(800, 400, sequence(0.5));
    expect(game.player).toMatchObject({ x: 400, y: 200 });
    expect(game.unit).toBe(400);
  });

  test('détecte la collision entre un cercle et un rectangle', () => {
    const rect = { x: 10, y: 10, w: 20, h: 20 };
    expect(circleHitsRect({ x: 5, y: 20, r: 6 }, rect)).toBe(true);
    expect(circleHitsRect({ x: 0, y: 0, r: 5 }, rect)).toBe(false);
  });

  test('fait apparaître le premier trait après 500ms, puis accélère de 5ms', () => {
    const game = createGame(1000, 1000, sequence(0.5));
    step(game, 499, still, sequence(0.99));
    expect(game.shots).toHaveLength(0);
    step(game, 1, still, sequence(0.99));
    expect(game.shots).toHaveLength(1);
    expect(game.spawnDelay).toBe(495);
  });

  test('marque une pause de difficulté de 3s entre 75 et 110ms', () => {
    const game = createGame(1000, 1000, sequence(0.5));
    game.spawnDelay = 115;
    game.spawnIn = 1;
    step(game, 1, still, sequence(0.99));
    expect(game.spawnDelay).toBe(110);
    expect(game.holdFor).toBe(3000);

    step(game, 110, still, sequence(0.99));
    expect(game.spawnDelay).toBe(110);
  });

  test('ne descend jamais sous 70ms', () => {
    const game = createGame(1000, 1000, sequence(0.5));
    game.spawnDelay = 70;
    game.spawnIn = 1;
    step(game, 1, still, sequence(0.99));
    expect(game.spawnDelay).toBe(70);
  });

  test('ramasse le point rose et le replace', () => {
    const game = createGame(1000, 1000, sequence(0.5));
    game.dot.x = game.player.x;
    game.dot.y = game.player.y;
    step(game, 16, still, sequence(0.1));
    expect(game.points).toBe(1);
    expect(game.dot.x).not.toBe(game.player.x);
  });

  test('termine la partie quand un trait touche le joueur', () => {
    const game = createGame(1000, 1000, sequence(0.5));
    game.shots.push({ x: game.player.x - 2, y: game.player.y - 20, w: 4, h: 40, vx: 0, vy: 0, color: '#e41313' });
    step(game, 16, still);
    expect(game.over).toBe(true);
  });

  test('additionne les secondes de survie et les points', () => {
    const game = createGame(1000, 1000, sequence(0.5));
    game.elapsed = 12_400;
    game.points = 3;
    expect(score(game)).toBe(15);
  });

  test('garde le joueur dans l’arène', () => {
    const game = createGame(400, 400, sequence(0.5));
    for (let i = 0; i < 200; i++) step(game, 16, { dx: -1, dy: 0, target: null }, sequence(0.99));
    expect(game.player.x).toBe(game.player.r);
  });

  test('suit le doigt sans dépasser la vitesse maximale', () => {
    const game = createGame(1000, 1000, sequence(0.5));
    const start = game.player.x;
    step(game, 100, { dx: 0, dy: 0, target: { x: 1000, y: game.player.y } }, sequence(0.99));
    expect(game.player.x - start).toBeCloseTo(55);
  });

  test('fait entrer les traits par les quatre bords', () => {
    const game = createGame(1000, 500, sequence(0.5));
    const fromTop = spawnShot(game, sequence(0, 0, 0.5, 0.5));
    expect(fromTop.y).toBeLessThan(0);
    expect(fromTop.vy).toBeGreaterThan(0);
    const fromRight = spawnShot(game, sequence(0, 0.5, 0.5, 0.5));
    expect(fromRight.x).toBe(1000);
    expect(fromRight.vx).toBeLessThan(0);
  });
});
