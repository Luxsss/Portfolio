import SectionTitle from "@/components/SectionTitle"
import type { Dictionary, Locale } from "@/content"
import type { GitHubActivity as Activity } from "@/lib/github"
import { format } from "@/lib/format"
import { GITHUB_URL } from "@/lib/site"
import Heatmap from "./Heatmap"
import styles from "./style.module.css"

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31_536_000],
  ["month", 2_592_000],
  ["week", 604_800],
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
]

function timeAgo(iso: string, locale: Locale) {
  const seconds = (Date.parse(iso) - Date.now()) / 1000
  const [unit, size] = UNITS.find(([, size]) => Math.abs(seconds) >= size) ?? ["minute", 60]
  return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(Math.round(seconds / size), unit)
}

export default function GitHubActivity({ t, activity, locale }: { t: Dictionary["github"]; activity: Activity; locale: Locale }) {
  return (
    <section id="github" className={styles.github}>
      <SectionTitle>{t.title}</SectionTitle>
      <div className={styles.layout}>
        <p className={styles.intro}>{t.intro}</p>

        {activity.calendar && <Heatmap calendar={activity.calendar} t={t} locale={locale} />}

        {activity.repos.length > 0 && (
          <div>
            <h3 className={styles.reposTitle}>{t.recent}</h3>
            <ul className={styles.repos}>
              {activity.repos.map((repo) => (
                <li key={repo.name}>
                  <a href={repo.url} className={styles.repo} target="_blank" rel="noopener noreferrer">
                    <span className={styles.repoName}>{repo.name}</span>
                    <span className={styles.repoDescription}>{repo.description ?? t.noDescription}</span>
                    <span className={styles.repoMeta}>
                      {repo.language && <span>{repo.language}</span>}
                      <span>{format(t.pushed, { when: timeAgo(repo.pushedAt, locale) })}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <a href={GITHUB_URL} className={styles.profile} target="_blank" rel="noopener noreferrer">
          {t.profile}
        </a>
      </div>
    </section>
  )
}
