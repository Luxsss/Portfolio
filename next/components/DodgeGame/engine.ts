// Pure game logic for Dodge, ported from github.com/Luxsss/Dodge (main.js).
// Sizes and speeds are relative to the arena's shorter side ("unit") so difficulty
// is the same on a phone and on a wide screen. Times are in milliseconds.

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Shot extends Rect {
  vx: number;
  vy: number;
  color: string;
}

interface Circle {
  x: number;
  y: number;
  r: number;
}

export interface Game {
  width: number;
  height: number;
  unit: number;
  player: Circle;
  dot: Circle;
  shots: Shot[];
  points: number;
  elapsed: number;
  spawnDelay: number;
  spawnIn: number;
  holdFor: number;
  over: boolean;
}

export interface Input {
  dx: number;
  dy: number;
  target: { x: number; y: number } | null;
}

export type Random = () => number;

// Colours and relative speeds of the original shots.
export const SHOT_TYPES = [
  { color: "#e41313", speed: 1 },
  { color: "#d8bf1f", speed: 1.5 },
  { color: "#31c42b", speed: 2 },
  { color: "#3295c7", speed: 2.5 },
];
export const DOT_COLOR = "#ff00cc";

const PLAYER_SPEED = 0.55; // units per second
const SHOT_SPEED = 0.3; // units per second for the slowest shot
const START_DELAY = 500; // ms between shots at the start, as in the original
const MIN_DELAY = 70;
const DELAY_STEP = 5;
// The original freezes the difficulty for 3s at a time once shots come every 75–110ms.
const HOLD_BAND = { from: 75, to: 110, duration: 3000 };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function sizes(unit: number) {
  return {
    playerR: Math.max(9, unit * 0.03),
    dotR: Math.max(4, unit * 0.012),
    thickness: Math.max(4, unit * 0.012),
    length: unit * 0.07,
  };
}

function placeDot(game: Game, random: Random) {
  const margin = game.dot.r * 2;
  game.dot.x = margin + random() * (game.width - margin * 2);
  game.dot.y = margin + random() * (game.height - margin * 2);
}

export function createGame(width: number, height: number, random: Random = Math.random): Game {
  const unit = Math.min(width, height);
  const { playerR, dotR } = sizes(unit);
  const game: Game = {
    width,
    height,
    unit,
    player: { x: width / 2, y: height / 2, r: playerR },
    dot: { x: 0, y: 0, r: dotR },
    shots: [],
    points: 0,
    elapsed: 0,
    spawnDelay: START_DELAY,
    spawnIn: START_DELAY,
    holdFor: 0,
    over: false,
  };
  placeDot(game, random);
  return game;
}

// A shot enters from one of the four edges and crosses the arena in a straight line.
export function spawnShot(game: Game, random: Random = Math.random): Shot {
  const type = SHOT_TYPES[Math.floor(random() * SHOT_TYPES.length)];
  const speed = (type.speed * SHOT_SPEED * game.unit) / 1000;
  const { thickness, length } = sizes(game.unit);
  const side = Math.floor(random() * 4);
  const alongX = random() * (game.width - thickness);
  const alongY = random() * (game.height - thickness);
  const color = type.color;

  if (side === 0) return { x: alongX, y: -length, w: thickness, h: length, vx: 0, vy: speed, color };
  if (side === 1) return { x: -length, y: alongY, w: length, h: thickness, vx: speed, vy: 0, color };
  if (side === 2) return { x: game.width, y: alongY, w: length, h: thickness, vx: -speed, vy: 0, color };
  return { x: alongX, y: game.height, w: thickness, h: length, vx: 0, vy: -speed, color };
}

export function circleHitsRect(circle: Circle, rect: Rect) {
  const nearestX = clamp(circle.x, rect.x, rect.x + rect.w);
  const nearestY = clamp(circle.y, rect.y, rect.y + rect.h);
  return (circle.x - nearestX) ** 2 + (circle.y - nearestY) ** 2 <= circle.r ** 2;
}

function speedUp(game: Game) {
  if (game.spawnDelay <= MIN_DELAY || game.holdFor > 0) return;
  game.spawnDelay = Math.max(MIN_DELAY, game.spawnDelay - DELAY_STEP);
  if (game.spawnDelay >= HOLD_BAND.from && game.spawnDelay <= HOLD_BAND.to) game.holdFor = HOLD_BAND.duration;
}

function movePlayer(game: Game, dt: number, input: Input) {
  const { player } = game;
  const maxStep = ((PLAYER_SPEED * game.unit) / 1000) * dt;
  let dx = input.dx;
  let dy = input.dy;

  if (input.target) {
    dx = input.target.x - player.x;
    dy = input.target.y - player.y;
  }
  const distance = Math.hypot(dx, dy);
  if (distance === 0) return;

  // Pointer steering stops on the target instead of overshooting it.
  const stepLength = input.target ? Math.min(maxStep, distance) : maxStep;
  player.x = clamp(player.x + (dx / distance) * stepLength, player.r, game.width - player.r);
  player.y = clamp(player.y + (dy / distance) * stepLength, player.r, game.height - player.r);
}

export function step(game: Game, dt: number, input: Input, random: Random = Math.random) {
  if (game.over) return;

  game.elapsed += dt;
  game.holdFor = Math.max(0, game.holdFor - dt);
  movePlayer(game, dt, input);

  game.spawnIn -= dt;
  while (game.spawnIn <= 0) {
    game.shots.push(spawnShot(game, random));
    speedUp(game);
    game.spawnIn += game.spawnDelay;
  }

  for (const shot of game.shots) {
    shot.x += shot.vx * dt;
    shot.y += shot.vy * dt;
  }
  game.shots = game.shots.filter(
    (shot) => shot.x + shot.w >= -shot.w && shot.x <= game.width + shot.w && shot.y + shot.h >= -shot.h && shot.y <= game.height + shot.h,
  );

  const { player, dot } = game;
  if (Math.hypot(player.x - dot.x, player.y - dot.y) <= player.r + dot.r) {
    game.points += 1;
    placeDot(game, random);
  }

  if (game.shots.some((shot) => circleHitsRect(player, shot))) game.over = true;
}

export function score(game: Game) {
  return Math.floor(game.elapsed / 1000) + game.points;
}

// Keeps a running game proportional when the arena changes size.
export function resize(game: Game, width: number, height: number) {
  const sx = width / game.width;
  const sy = height / game.height;
  const unit = Math.min(width, height);
  const k = unit / game.unit;
  const { playerR, dotR } = sizes(unit);

  for (const point of [game.player, game.dot]) {
    point.x *= sx;
    point.y *= sy;
  }
  game.player.r = playerR;
  game.dot.r = dotR;
  for (const shot of game.shots) {
    shot.x *= sx;
    shot.y *= sy;
    shot.w *= k;
    shot.h *= k;
    shot.vx *= k;
    shot.vy *= k;
  }
  game.width = width;
  game.height = height;
  game.unit = unit;
}
