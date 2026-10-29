// Test double for "@/lib/gsap": animations do nothing, but completion callbacks run
// so components reach the state they would after the real tween.
type Vars = { onComplete?: () => void } | undefined;

const tween = { kill: jest.fn(), play: jest.fn(), reverse: jest.fn(), timeScale: jest.fn(), paused: jest.fn() };

export const gsap = {
  to: jest.fn((_targets: unknown, vars: Vars) => {
    vars?.onComplete?.();
    return tween;
  }),
  fromTo: jest.fn(() => tween),
  set: jest.fn(),
  timeline: jest.fn(() => tween),
  matchMedia: jest.fn(() => ({ add: jest.fn(), revert: jest.fn() })),
};

export const ScrollTrigger = { create: jest.fn() };
export const SplitText = { create: jest.fn(() => ({ words: [] })) };

export const useGSAP = () => ({ contextSafe: <T,>(fn: T) => fn });

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const prefersReducedMotion = () => true;
