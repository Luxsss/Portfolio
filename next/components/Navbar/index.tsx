"use client"
import { useEffect, useRef, useState } from "react"
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap"
import { CV_PATH, SOCIALS } from "@/lib/site"
import { Icon } from "@/components/Icons"
import type { Dictionary } from "@/content"
import styles from "./style.module.css"

export default function Navbar({ t }: { t: Dictionary["nav"] }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const timeline = useRef<gsap.core.Timeline | null>(null)

  useGSAP(() => {
    const shift = prefersReducedMotion() ? 0 : 1
    timeline.current = gsap
      .timeline({ paused: true, defaults: { duration: 0.3, ease: "power2.out" } })
      .fromTo(menuRef.current, { autoAlpha: 0, scale: 1 - 0.05 * shift }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(1.2)" })
      .fromTo("[data-menu-item]", { autoAlpha: 0, x: -20 * shift }, { autoAlpha: 1, x: 0, stagger: 0.06 }, "<0.1")
      .fromTo("[data-menu-social]", { autoAlpha: 0, y: 12 * shift }, { autoAlpha: 1, y: 0, stagger: 0.05 }, "<0.15")
  }, { scope: menuRef })

  useEffect(() => {
    const tl = timeline.current
    if (!tl) return
    // Closing replays the same timeline backwards, a bit faster.
    tl.timeScale(isOpen ? 1 : 1.6)
    if (isOpen) tl.play()
    else tl.reverse()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setIsOpen(false)
      toggleRef.current?.focus()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  const close = () => setIsOpen(false)

  return (
    <>
      <header className={styles.navbar}>
        <a href="#home" className={styles.logo} aria-label={t.home}>
          <span>AB</span>
        </a>
        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={isOpen}
          aria-controls="site-menu"
          aria-label={isOpen ? t.close : t.open}
          onClick={() => setIsOpen((open) => !open)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {isOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M12 18h8" />}
          </svg>
        </button>
      </header>

      <nav id="site-menu" ref={menuRef} className={styles.menu} aria-label={t.menuLabel}>
        <ul className={styles.menuList}>
          {t.links.map((link) => (
            <li key={link.href} data-menu-item>
              <a href={link.href} onClick={close}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.separator} />

        <div className={styles.socials}>
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className={styles.socialLink}
              aria-label={social.label}
              data-menu-social
              {...(social.icon !== "mail" && { target: "_blank", rel: "noopener noreferrer" })}
            >
              <Icon name={social.icon} />
            </a>
          ))}
          <a href={CV_PATH} className={styles.socialLink} aria-label={t.cv} data-menu-social data-testid="cv-menu" download>
            CV
          </a>
        </div>

        <a href={t.switchLanguage.href} hrefLang={t.switchLanguage.lang} lang={t.switchLanguage.lang} className={styles.language} data-menu-social>
          {t.switchLanguage.label}
        </a>
      </nav>

      <a href={CV_PATH} className={styles.cvButton} aria-label={t.cv} data-testid="cv-button" download>
        CV
      </a>
    </>
  )
}
