"use client"
import { useRef } from "react"
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap"
import { buildPen, type Box } from "./pen"
import styles from "./style.module.css"

// The thread reaches a title's lean when the title sits at this height of the screen.
const MEET_AT = 0.6

export default function Ligne() {
  const rootRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const tipRef = useRef<SVGCircleElement>(null)

  useGSAP(() => {
    const root = rootRef.current!
    const svg = root.querySelector("svg")!
    const path = pathRef.current!
    const tip = tipRef.current!
    let ctx: gsap.Context | undefined

    const draw = () => {
      ctx?.revert()
      const origin = root.getBoundingClientRect()
      const targets: Box[] = [...document.querySelectorAll<HTMLElement>("[data-pen-target]")]
        .map((element) => element.getBoundingClientRect())
        .filter((rect) => rect.width > 0)
        .map((rect) => ({ x: rect.left - origin.left, y: rect.top - origin.top, w: rect.width, h: rect.height }))
      if (targets.length === 0) return

      // The spine runs halfway between the page edge and the content column.
      const pen = buildPen({ targets, margin: Math.max(8, targets[0].x / 2) })
      svg.setAttribute("viewBox", `0 0 ${origin.width} ${origin.height}`)

      const lengthAt = (pointIndex: number) => {
        path.setAttribute("d", pen.prefix(pointIndex))
        return path.getTotalLength()
      }
      const markLengths = pen.marks.map(lengthAt)
      path.setAttribute("d", pen.d)
      const total = path.getTotalLength()

      ctx = gsap.context(() => {
        // Reduced motion keeps the thread fully drawn, without the moving tip.
        gsap.matchMedia().add(MOTION_OK, () => {
          const vh = window.innerHeight
          const pageTop = origin.top + window.scrollY
          const max = ScrollTrigger.maxScroll(window)
          const drawn = { length: 0 }

          const render = () => {
            const visible = drawn.length > 0.5
            path.style.visibility = visible ? "visible" : "hidden"
            path.style.strokeDashoffset = String(total - drawn.length)
            const point = path.getPointAtLength(drawn.length)
            tip.setAttribute("transform", `translate(${point.x} ${point.y})`)
            tip.style.opacity = visible ? "1" : "0"
          }

          // Scroll position → drawn length, pinned to the moments titles reach MEET_AT.
          const keys = [
            { scroll: 0, length: 0 },
            ...targets.map((target, index) => ({ scroll: pageTop + target.y - vh * MEET_AT, length: markLengths[index] })),
            { scroll: max, length: total },
          ]

          path.style.strokeDasharray = `${total} ${total}`
          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            onUpdate: render,
            scrollTrigger: { start: 0, end: "max", scrub: 0.6 },
          })
          let previous = keys[0]
          for (const key of keys.slice(1)) {
            const scroll = Math.max(previous.scroll, Math.min(max, key.scroll))
            timeline.to(drawn, { length: key.length, duration: scroll - previous.scroll }, previous.scroll)
            previous = { scroll, length: key.length }
          }
          // Timeline time equals scroll position.
          timeline.set({}, {}, max)
          render()

          return () => {
            path.style.removeProperty("stroke-dasharray")
            path.style.removeProperty("stroke-dashoffset")
            path.style.removeProperty("visibility")
            tip.style.opacity = "0"
          }
        })
      })
    }

    // Rebuild whenever the page changes size (pinning, fonts, resize).
    let frame = 0
    const rebuild = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        draw()
      })
    }
    const observer = new ResizeObserver(rebuild)
    observer.observe(root)
    document.fonts?.ready.then(rebuild)
    draw()

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      ctx?.revert()
    }
  }, { scope: rootRef })

  return (
    <div ref={rootRef} className={styles.root} aria-hidden="true">
      <svg className={styles.svg} preserveAspectRatio="none" fill="none">
        <path ref={pathRef} className={styles.path} />
        <circle ref={tipRef} className={styles.tip} r="3" />
      </svg>
    </div>
  )
}
