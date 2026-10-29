import type { Dictionary } from "@/content"
import Content from "./content"
import styles from "./style.module.css"

// The footer sits under the page and is revealed as the last section scrolls away.
export default function Footer({ t, nav }: { t: Dictionary["footer"]; nav: Dictionary["nav"] }) {
  return (
    <footer className={styles.reveal}>
      <div className={styles.revealTrack}>
        <div className={styles.revealSticky}>
          <Content t={t} nav={nav} />
        </div>
      </div>
    </footer>
  )
}
