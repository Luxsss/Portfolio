"use client"
import { useRef, useState } from "react"
import Image from "next/image"
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap"
import SectionTitle from "@/components/SectionTitle"
import Dialog, { type DialogHandle } from "@/components/Dialog"
import type { Dictionary, Project } from "@/content"
import styles from "./style.module.css"

type Labels = Dictionary["projects"]

function ProjectLinks({ project, t, onPlay }: { project: Project; t: Labels; onPlay?: () => void }) {
  const external = { target: "_blank", rel: "noopener noreferrer" }
  return (
    <>
      {project.links.play && (
        <a href={project.links.play} className={styles.link} onClick={onPlay} aria-label={`${t.play} : ${project.title}`}>
          {t.play}
        </a>
      )}
      {project.links.live && (
        <a href={project.links.live} className={styles.link} aria-label={`${t.viewSite} : ${project.title}`} {...external}>
          {t.viewSite}
        </a>
      )}
      {project.links.code && (
        <a href={project.links.code} className={styles.link} aria-label={`${t.viewCode} : ${project.title}`} {...external}>
          {t.viewCode}
        </a>
      )}
    </>
  )
}

function Meta({ project, t }: { project: Project; t: Labels }) {
  return (
    <p className={styles.meta}>
      <span>{t.contexts[project.context]}</span>
      <span>{project.year}</span>
      {project.private && <span className={styles.badge}>{t.privateCode}</span>}
    </p>
  )
}

function TechList({ project, t }: { project: Project; t: Labels }) {
  return (
    <ul className={styles.stack} aria-label={t.techLabel}>
      {project.technologies.map((tech) => (
        <li key={tech}>{tech}</li>
      ))}
    </ul>
  )
}

export default function Projects({ t, projects }: { t: Labels; projects: Project[] }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const dialogRef = useRef<DialogHandle>(null)
  const [selected, setSelected] = useState<Project | null>(null)

  useGSAP(() => {
    // Mirrors the CSS: below 769px or with reduced motion the track is a native swipe carousel.
    gsap.matchMedia().add(`(min-width: 769px) and ${MOTION_OK}`, () => {
      const track = trackRef.current!
      const distance = () => track.offsetWidth - window.innerWidth

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: viewportRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    })
  }, { scope: viewportRef })

  const showDetails = (project: Project) => {
    setSelected(project)
    dialogRef.current?.open()
  }

  return (
    <section id="projects" className={styles.projects}>
      <SectionTitle>{t.title}</SectionTitle>

      <div ref={viewportRef} className={styles.viewport}>
        <ul ref={trackRef} className={styles.track}>
          {projects.map((project) => (
            <li key={project.slug} className={`${styles.card} ${project.featured ? styles.featured : ""}`}>
              <div className={styles.media}>
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes={project.featured ? "(max-width: 768px) 85vw, 560px" : "(max-width: 768px) 85vw, 640px"}
                />
              </div>

              <div className={styles.body}>
                <Meta project={project} t={t} />
                <h3>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <TechList project={project} t={t} />
                <div className={styles.actions}>
                  {project.details && (
                    <button
                      type="button"
                      className={styles.secondary}
                      onClick={() => showDetails(project)}
                      aria-label={`${t.details} : ${project.title}`}
                    >
                      {t.details}
                    </button>
                  )}
                  <ProjectLinks project={project} t={t} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Dialog ref={dialogRef} title={selected?.title ?? ""} closeLabel={t.close} wide>
        {selected?.details && (
          <div className={styles.details}>
            <div className={styles.detailsMedia}>
              <Image src={selected.image} alt="" fill sizes="(max-width: 768px) 90vw, 700px" />
            </div>
            <Meta project={selected} t={t} />
            <h3>{t.headings.context}</h3>
            <p>{selected.details.context}</p>
            <h3>{t.headings.did}</h3>
            <ul className={styles.bullets}>
              {selected.details.did.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3>{t.headings.learned}</h3>
            <ul className={styles.bullets}>
              {selected.details.learned.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <TechList project={selected} t={t} />
            <div className={styles.actions}>
              <ProjectLinks project={selected} t={t} onPlay={() => dialogRef.current?.close()} />
            </div>
          </div>
        )}
      </Dialog>
    </section>
  )
}
