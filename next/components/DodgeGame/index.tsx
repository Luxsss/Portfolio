"use client"
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react"
import SectionTitle from "@/components/SectionTitle"
import { format } from "@/lib/format"
import type { Dictionary } from "@/content"
import { createGame, DOT_COLOR, resize, score, spawnShot, step, type Game } from "./engine"
import styles from "./style.module.css"

type Phase = "idle" | "countdown" | "playing" | "paused" | "over"

interface Result {
  score: number
  time: number
  points: number
  isBest: boolean
}

const BEST_KEY = "dodge-best"
const COUNTDOWN_MS = 700

// Arrows plus ZQSD (AZERTY) and WASD (QWERTY), like the original.
const DIRECTIONS: Record<string, [number, number]> = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  z: [0, -1],
  w: [0, -1],
  q: [-1, 0],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0],
}

const readBest = () => {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0
  } catch {
    return 0
  }
}

const writeBest = (value: number) => {
  try {
    localStorage.setItem(BEST_KEY, String(value))
  } catch {
    // Private mode or blocked storage: the record just won't persist.
  }
}

const keyName = (key: string) => (key.length === 1 ? key.toLowerCase() : key)

// Idle arena: a few frozen shots hint at what the game is.
function preview(game: Game) {
  for (let i = 0; i < 7; i++) {
    const shot = spawnShot(game)
    shot.x = Math.random() * (game.width - shot.w)
    shot.y = Math.random() * (game.height - shot.h)
    game.shots.push(shot)
  }
}

export default function DodgeGame({ t }: { t: Dictionary["game"] }) {
  const arenaRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<Game | null>(null)
  const keysRef = useRef(new Set<string>())
  const targetRef = useRef<{ x: number; y: number } | null>(null)
  const phaseRef = useRef<Phase>("idle")
  const [phase, setPhase] = useState<Phase>("idle")
  const [count, setCount] = useState(3)
  const [best, setBest] = useState(0)
  const [result, setResult] = useState<Result | null>(null)

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  useEffect(() => setBest(readBest()), [])

  const render = useCallback(() => {
    const canvas = canvasRef.current
    const game = gameRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !game || !ctx) return

    ctx.clearRect(0, 0, game.width, game.height)
    for (const shot of game.shots) {
      ctx.fillStyle = shot.color
      ctx.fillRect(shot.x, shot.y, shot.w, shot.h)
    }
    const circle = (x: number, y: number, r: number, color: string) => {
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }
    circle(game.dot.x, game.dot.y, game.dot.r, DOT_COLOR)
    circle(game.player.x, game.player.y, game.player.r, game.over ? "#000" : "#fff")

    if (phaseRef.current === "playing") {
      ctx.fillStyle = "rgba(237, 235, 233, 0.6)"
      ctx.font = `600 20px ${getComputedStyle(canvas).fontFamily}`
      ctx.fillText(String(score(game)), 20, 34)
    }
  }, [])

  // Match the canvas to the arena (and the screen's pixel density).
  useEffect(() => {
    const arena = arenaRef.current!
    const canvas = canvasRef.current!
    const observer = new ResizeObserver(() => {
      const { width, height } = arena.getBoundingClientRect()
      if (!width || !height) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (gameRef.current) {
        resize(gameRef.current, width, height)
      } else {
        gameRef.current = createGame(width, height)
        preview(gameRef.current)
      }
      render()
    })
    observer.observe(arena)
    return () => observer.disconnect()
  }, [render])

  // Pause when the tab is hidden or the arena scrolls out of view.
  useEffect(() => {
    const pause = () => {
      if (phaseRef.current !== "playing") return
      keysRef.current.clear()
      setPhase("paused")
    }
    const onVisibility = () => document.hidden && pause()
    const observer = new IntersectionObserver(([entry]) => !entry.isIntersecting && pause(), { threshold: 0.3 })
    observer.observe(arenaRef.current!)
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  useEffect(() => {
    if (phase !== "countdown") return
    if (count === 0) {
      setPhase("playing")
      return
    }
    const id = setTimeout(() => setCount((value) => value - 1), COUNTDOWN_MS)
    return () => clearTimeout(id)
  }, [phase, count])

  useEffect(() => {
    if (phase !== "playing") return
    let frame = 0
    let last = performance.now()

    const tick = (now: number) => {
      const game = gameRef.current!
      let dx = 0
      let dy = 0
      for (const key of keysRef.current) {
        dx += DIRECTIONS[key][0]
        dy += DIRECTIONS[key][1]
      }
      // Clamp long frames (tab switch, debugger) so nothing teleports.
      step(game, Math.min(now - last, 50), { dx, dy, target: targetRef.current })
      last = now
      render()

      if (!game.over) {
        frame = requestAnimationFrame(tick)
        return
      }
      const total = score(game)
      const previous = readBest()
      if (total > previous) writeBest(total)
      setBest(Math.max(previous, total))
      setResult({ score: total, time: Math.floor(game.elapsed / 1000), points: game.points, isBest: total > previous })
      setPhase("over")
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [phase, render])

  const start = () => {
    const arena = arenaRef.current!
    const { width, height } = arena.getBoundingClientRect()
    gameRef.current = createGame(width, height)
    keysRef.current.clear()
    targetRef.current = null
    setResult(null)
    setCount(3)
    setPhase("countdown")
    arena.focus({ preventScroll: true })
    render()
  }

  const resume = () => {
    setPhase("playing")
    arenaRef.current?.focus({ preventScroll: true })
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const key = keyName(event.key)
    if (key === "Escape") {
      if (phase === "playing") {
        keysRef.current.clear()
        setPhase("paused")
      } else if (phase === "paused") {
        resume()
      }
      return
    }
    // Only swallow movement keys mid-game so the page keeps scrolling otherwise.
    if (key in DIRECTIONS && (phase === "playing" || phase === "countdown")) {
      event.preventDefault()
      keysRef.current.add(key)
    }
  }

  const pointerPosition = (event: PointerEvent<HTMLCanvasElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
  }

  const onPointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    if (phase !== "playing" && phase !== "countdown") return
    event.currentTarget.setPointerCapture(event.pointerId)
    targetRef.current = pointerPosition(event)
  }

  const onPointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (targetRef.current) targetRef.current = pointerPosition(event)
  }

  const releasePointer = () => {
    targetRef.current = null
  }

  const inGame = phase === "countdown" || phase === "playing" || phase === "paused"

  return (
    <section id="game" className={styles.game}>
      <SectionTitle>{t.title}</SectionTitle>
      <div className={styles.intro}>
        <p>{t.intro}</p>
        <p className={styles.controls}>{t.controls}</p>
      </div>

      <div
        ref={arenaRef}
        className={`${styles.arena} ${inGame ? styles.inGame : ""}`}
        tabIndex={0}
        role="application"
        aria-label={t.arenaLabel}
        onKeyDown={onKeyDown}
        onKeyUp={(event) => keysRef.current.delete(keyName(event.key))}
        onBlur={() => keysRef.current.clear()}
      >
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          aria-hidden="true"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={releasePointer}
          onPointerCancel={releasePointer}
        />

        {phase === "idle" && (
          <div className={styles.overlay}>
            <button type="button" className={styles.primary} onClick={start}>
              {t.play}
            </button>
            {best > 0 && <p className={styles.small}>{format(t.best, { best })}</p>}
          </div>
        )}

        {phase === "countdown" && (
          <div className={`${styles.overlay} ${styles.passThrough}`} aria-live="assertive">
            <span className={styles.count}>{count}</span>
          </div>
        )}

        {phase === "paused" && (
          <div className={styles.overlay}>
            <p className={styles.big}>{t.paused}</p>
            <button type="button" className={styles.primary} onClick={resume}>
              {t.resume}
            </button>
          </div>
        )}

        {phase === "over" && result && (
          <div className={styles.overlay} role="status">
            <p className={styles.big}>{format(t.score, { score: result.score })}</p>
            <p>{format(t.breakdown, { time: result.time, points: result.points })}</p>
            <p className={styles.small}>{result.isBest ? t.newBest : format(t.best, { best })}</p>
            <div className={styles.actions}>
              <button type="button" className={styles.primary} onClick={start}>
                {t.replay}
              </button>
              <a href="#contact" className={styles.secondary}>
                {t.cta}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
