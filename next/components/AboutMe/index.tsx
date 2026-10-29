"use client"
import { useRef } from "react"
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap"
import SectionTitle from "@/components/SectionTitle"
import type { Dictionary } from "@/content"
import styles from "./style.module.css"

export default function AboutMe({ t }: { t: Dictionary["about"] }) {
  const textRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const { words } = SplitText.create(textRef.current, { type: "words" })
      gsap.fromTo(words, { opacity: 0.2 }, {
        opacity: 1,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: { trigger: textRef.current, start: "top 80%", end: "bottom 55%", scrub: true },
      })
    })
  }, { scope: textRef })

  return (
    <section id="about" className={styles.about}>
      <SectionTitle>{t.title}</SectionTitle>
      <div className={styles.layout}>
        <p ref={textRef} className={styles.text}>
          {t.text}
        </p>
        <aside className={styles.now} aria-labelledby="now-title">
          <h3 id="now-title" className={styles.nowTitle}>
            {t.now.title}
          </h3>
          <dl>
            {t.now.items.map((item) => (
              <div key={item.label} className={styles.nowItem}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  )
}
