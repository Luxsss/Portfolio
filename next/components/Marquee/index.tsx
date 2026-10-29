"use client"
import { useRef, type ComponentPropsWithoutRef } from "react"
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap"
import styles from "./style.module.css"

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  items: string[]
  itemClassName?: string
  duration?: number
  reverse?: boolean
  // Enough copies of the group so one is always off-screen while the loop wraps.
  copies?: number
}

// Endless band whose direction follows the scroll direction (flipped when `reverse`).
export default function Marquee({
  items,
  itemClassName = "",
  duration = 18,
  reverse = false,
  copies = 3,
  className = "",
  ...rest
}: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const base = reverse ? -1 : 1
      const loop = gsap.to("[data-marquee-group]", {
        xPercent: -100,
        duration,
        ease: "none",
        repeat: -1,
        // Jump far ahead so playing backwards never hits the start of the loop.
        onReverseComplete: () => {
          loop.totalTime(loop.rawTime() + loop.duration() * 100)
        },
      })
      loop.timeScale(base)

      let direction = 1
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => loop.paused(!self.isActive),
        onUpdate: (self) => {
          if (self.direction === direction) return
          direction = self.direction
          gsap.to(loop, { timeScale: base * direction, duration: 0.5, overwrite: true })
        },
      })
    })
  }, { scope: rootRef })

  return (
    <div ref={rootRef} className={`${styles.marquee} ${className}`} aria-hidden="true" {...rest}>
      <div className={styles.track}>
        {Array.from({ length: copies }, (_, copy) => (
          <div key={copy} className={styles.group} data-marquee-group>
            {items.map((item) => (
              <span key={item} className={itemClassName}>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
