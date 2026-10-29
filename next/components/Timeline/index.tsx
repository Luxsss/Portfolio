"use client"
import { useRef } from "react"
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap"
import SectionTitle from "@/components/SectionTitle"
import type { Dictionary } from "@/content"
import styles from "./style.module.css"

export default function Timeline({ t }: { t: Dictionary["timeline"] }) {
  const listRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // The rule draws itself as you read down the entries, echoing the red line.
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.fromTo("[data-rule]", { scaleY: 0 }, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: listRef.current, start: "top 75%", end: "bottom 60%", scrub: true },
      })
    })
  }, { scope: listRef })

  return (
    <section id="journey" className={styles.timeline}>
      <SectionTitle>{t.title}</SectionTitle>
      <div ref={listRef} className={styles.body}>
        <span className={styles.rule} data-rule aria-hidden="true" />
        <ol className={styles.list}>
          {t.entries.map((entry) => (
            <li key={`${entry.period}-${entry.title}`} className={styles.entry}>
              <p className={styles.period}>{entry.period}</p>
              <div>
                <h3 className={styles.entryTitle}>{entry.title}</h3>
                <p className={styles.place}>{entry.place}</p>
                <p className={styles.text}>{entry.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
