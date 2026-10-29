import Marquee from "@/components/Marquee"
import SectionTitle from "@/components/SectionTitle"
import type { Dictionary } from "@/content"
import { STACK } from "@/content/stack"
import styles from "./style.module.css"

export default function Stack({ t }: { t: Dictionary["stack"] }) {
  const groups = [
    { label: t.groups.front, items: STACK.front },
    { label: t.groups.back, items: STACK.back },
    { label: t.groups.tools, items: STACK.tools },
  ]

  return (
    <section id="stack" className={styles.stack}>
      <SectionTitle>{t.title}</SectionTitle>

      <div className={styles.bands}>
        <Marquee items={STACK.front} duration={40} className={styles.band} itemClassName={styles.bandItem} />
        <Marquee
          items={[...STACK.back, ...STACK.tools]}
          duration={40}
          reverse
          className={styles.band}
          itemClassName={`${styles.bandItem} ${styles.outline}`}
        />
      </div>

      <div className={styles.groups}>
        {groups.map((group) => (
          <div key={group.label}>
            <h3 className={styles.groupTitle}>{group.label}</h3>
            <ul className={styles.groupList}>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
