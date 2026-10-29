"use client"
import { useRef } from "react"
import Image from "next/image"
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap"
import Marquee from "@/components/Marquee"
import type { Dictionary } from "@/content"
import styles from "./style.module.css"

export default function Header({ t }: { t: Dictionary["hero"] }) {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      // The page's single orchestrated moment: everything else answers scroll or the pointer.
      gsap.set("[data-intro]", { visibility: "visible" })
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from("[data-photo-frame]", { clipPath: "inset(100% 0% 0% 0%)", duration: 1.1, stagger: 0.15 })
        .from("[data-photo-frame] img", { scale: 1.25, duration: 1.4, stagger: 0.15 }, 0)
        .from("[data-title-line]", { yPercent: 110, duration: 0.9, stagger: 0.12 }, 0.3)
        .from("[data-intro-text]", { autoAlpha: 0, y: 16, duration: 0.6 }, 0.8)
        .from("[data-marquee]", { autoAlpha: 0, duration: 1 }, 0.8)

      const scrub = { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true }
      gsap.to("[data-marquee]", { x: -300, ease: "none", scrollTrigger: { ...scrub, scrub: 0.25 } })
      gsap.to("[data-photo='main']", { yPercent: -10, ease: "none", scrollTrigger: scrub })
      gsap.to("[data-photo='small']", { yPercent: -35, ease: "none", scrollTrigger: scrub })
    })
  }, { scope: rootRef })

  return (
    <section id="home" ref={rootRef} className={styles.hero}>
      <div className={styles.stage}>
        <div className={styles.photos} data-intro>
          <div className={styles.photoMain} data-photo="main">
            <div className={styles.frame} data-photo-frame>
              <Image src="/images/image1.webp" alt={t.photoMainAlt} fill priority sizes="(max-width: 768px) 55vw, 350px" />
            </div>
          </div>
          <div className={styles.photoSmall} data-photo="small">
            <div className={styles.frame} data-photo-frame>
              <Image src="/images/image2.webp" alt={t.photoSmallAlt} fill sizes="(max-width: 768px) 40vw, 250px" />
            </div>
          </div>
        </div>

        <div className={styles.titles}>
          <h1 className={styles.title} data-intro>
            <span className="sr-only">{t.name}, </span>
            <span className={styles.line}>
              <span data-title-line>{t.lines[0]}</span>
            </span>{" "}
            <span className={`${styles.line} ${styles.indent}`}>
              <span data-title-line>{t.lines[1]}</span>
            </span>
          </h1>
          <p className={`${styles.intro} ${styles.indent}`} data-intro data-intro-text>
            {t.intro}
          </p>
        </div>
      </div>

      <Marquee
        items={[`${t.name} –`]}
        className={styles.marquee}
        itemClassName={styles.marqueeItem}
        data-intro
        data-marquee
      />
    </section>
  )
}
