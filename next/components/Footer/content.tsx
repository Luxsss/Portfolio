"use client"
import { useEffect, useState } from "react"
import { CV_PATH, SOCIALS } from "@/lib/site"
import { Icon } from "@/components/Icons"
import type { Dictionary } from "@/content"
import styles from "./style.module.css"

const parisTime = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Paris",
  timeZoneName: "short",
})

function useParisTime() {
  // Rendered empty on the server so the first client render matches the HTML.
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => setTime(parisTime.format(new Date()))
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  return time
}

export default function Content({ t, nav }: { t: Dictionary["footer"]; nav: Dictionary["nav"] }) {
  const time = useParisTime()

  return (
    <div className={styles.content}>
      <div className={styles.top}>
        <nav aria-label={t.navigation}>
          <p className={styles.label}>{t.navigation}</p>
          <ul className={styles.navList}>
            {nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.side}>
          <p className={styles.label}>{t.socials}</p>
          <ul className={styles.socials}>
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  className={styles.socialLink}
                  href={social.href}
                  aria-label={social.label}
                  data-testid={`button-${social.label}`}
                  {...(social.icon !== "mail" && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <Icon name={social.icon} />
                </a>
              </li>
            ))}
            <li>
              <a className={styles.socialLink} href={CV_PATH} aria-label={nav.cv} data-testid="button-CV" download>
                CV
              </a>
            </li>
          </ul>
          <a href={nav.switchLanguage.href} hrefLang={nav.switchLanguage.lang} lang={nav.switchLanguage.lang} className={styles.language}>
            {nav.switchLanguage.label}
          </a>
        </div>
      </div>

      <p className={styles.wordmark} aria-hidden="true">
        Alexis Brun
      </p>

      <div className={styles.bottom}>
        <p>
          <span className={styles.label}>{t.edition}</span> © {new Date().getFullYear()} Alexis Brun
        </p>
        <p>
          <span className={styles.label}>{t.time}</span> <time>{time ?? "--:--"}</time>
        </p>
        <a href="#home" className={styles.backToTop}>
          {t.backToTop}
        </a>
      </div>
    </div>
  )
}
