"use client"
import { useEffect, useRef, useState, type PointerEvent } from "react"
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap"
import type { Dictionary, Locale } from "@/content"
import type { GitHubActivity } from "@/lib/github"
import { format } from "@/lib/format"
import styles from "./style.module.css"

interface HeatmapProps {
  calendar: NonNullable<GitHubActivity["calendar"]>
  t: Dictionary["github"]
  locale: Locale
}

const LEVELS = [0, 1, 2, 3, 4]

export default function Heatmap({ calendar, t, locale }: HeatmapProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [tip, setTip] = useState<{ text: string; x: number; y: number } | null>(null)

  const days = calendar.weeks.flat()
  // GitHub weeks start on Sunday: pad the first column so weekdays line up in rows.
  const leading = days.length > 0 ? new Date(days[0].date).getUTCDay() : 0
  const dayFormat = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
  const monthFormat = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" })

  const months = new Map<string, number>()
  for (const day of days) months.set(day.date.slice(0, 7), (months.get(day.date.slice(0, 7)) ?? 0) + day.count)

  // On narrow screens the grid scrolls; start on the most recent weeks.
  useEffect(() => {
    const scroller = scrollRef.current!
    scroller.scrollLeft = scroller.scrollWidth
  }, [])

  useGSAP(() => {
    // One sweep from the oldest week to today, the first time the grid is seen.
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.from("[data-cell]", {
        opacity: 0,
        duration: 0.3,
        ease: "none",
        stagger: { amount: 0.9 },
        scrollTrigger: { trigger: rootRef.current, start: "top 80%", once: true },
      })
    })
  }, { scope: rootRef })

  const showTip = (event: PointerEvent<HTMLDivElement>) => {
    const cell = (event.target as HTMLElement).closest<HTMLElement>("[data-date]")
    if (!cell) return setTip(null)
    const root = rootRef.current!.getBoundingClientRect()
    const box = cell.getBoundingClientRect()
    setTip({
      text: format(t.day, { count: cell.dataset.count!, date: dayFormat.format(new Date(cell.dataset.date!)) }),
      x: box.left + box.width / 2 - root.left,
      y: box.top - root.top,
    })
  }

  return (
    <div ref={rootRef} className={styles.heatmap}>
      <p className={styles.total}>{format(t.contributions, { count: calendar.total.toLocaleString(locale) })}</p>

      <div ref={scrollRef} className={styles.scroll} onPointerMove={showTip} onPointerLeave={() => setTip(null)}>
        <div className={styles.grid} aria-hidden="true">
          {Array.from({ length: leading }, (_, index) => (
            <span key={`pad-${index}`} />
          ))}
          {days.map((day) => (
            <span
              key={day.date}
              className={styles.cell}
              data-cell
              data-level={day.level}
              data-date={day.date}
              data-count={day.count}
            />
          ))}
        </div>
      </div>

      <div className={styles.legend} aria-hidden="true">
        <span>{t.less}</span>
        {LEVELS.map((level) => (
          <span key={level} className={styles.cell} data-level={level} />
        ))}
        <span>{t.more}</span>
      </div>

      {tip && (
        <p className={styles.tooltip} style={{ left: tip.x, top: tip.y }} aria-hidden="true">
          {tip.text}
        </p>
      )}

      <table className="sr-only">
        <caption>{t.byMonth}</caption>
        <tbody>
          {[...months].map(([month, count]) => (
            <tr key={month}>
              <th scope="row">{monthFormat.format(new Date(`${month}-01`))}</th>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
