"use client"
import { useRef, type ReactNode } from "react"
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap"
import styles from "./style.module.css"

export default function SectionTitle({ children }: { children: ReactNode }) {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    // Underline is drawn by default so reduced motion still shows it.
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.fromTo(titleRef.current, { "--border-scale": 0 }, {
        "--border-scale": 1,
        ease: "none",
        scrollTrigger: { trigger: titleRef.current, start: "top 80%", end: "top 40%", scrub: true },
      })
    })
  }, { scope: titleRef })

  return (
    <div className={styles.wrapper}>
      <h2 ref={titleRef} className={styles.title} data-pen-target>
        {children}
      </h2>
    </div>
  )
}
