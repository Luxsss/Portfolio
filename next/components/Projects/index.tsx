"use client"
import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import styles from "./style.module.css"

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const [projectsData, setProjectsData] = useState<Project[] | null>(null)

  const [isCommentsOpen, setIsCommentsOpen] = useState(false)
  const [activeProject, setActiveProject] = useState<{ id: number; title: string } | null>(null)
  const modalOverlayRef = useRef<HTMLDivElement>(null)
  const modalPanelRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  interface Project {
    id: number;
    picture_url: string;
    title: string;
    description: string;
    technologies: string;
    url: string;
  }

  interface CommentType {
    id: number
    name: string
    comment: string
    created_at: string
    project_id: number
  }

  const [comments, setComments] = useState<CommentType[]>([])

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects")
        const json = await res.json()
        if (json.error) console.error(json.error)
        else setProjectsData(json.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchProjects()
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.to(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        scrub: true,
        start: "top 80%",
        end: "top 20%",
      },
      "--border-scale": 1,
      ease: "power2.out",
    })

    const calculateWidth = () => {
      if (horizontalRef.current && projectsRef.current) {
        const scrollWidth = projectsRef.current.scrollWidth
        return -(scrollWidth - window.innerWidth + window.innerWidth * 0.01)
      }
      return 0
    }

    if (sectionRef.current && horizontalRef.current && projectsRef.current) {
      const horizontalScrollTween = gsap.to(projectsRef.current, {
        x: calculateWidth,
        ease: "none",
        scrollTrigger: {
          trigger: horizontalRef.current,
          start: "top top",
          end: () =>
            `+=${projectsRef.current ? projectsRef.current.scrollWidth - window.innerWidth : 0}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      const onResize = () => ScrollTrigger.refresh()
      window.addEventListener("resize", onResize)

      return () => {
        horizontalScrollTween.kill()
        window.removeEventListener("resize", onResize)
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [projectsData])

  async function getComments(id: number) {
    try {
      const res = await fetch("/api/getComments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      const json = await res.json()
      if (!res.ok) {
        console.error(json?.error || "Erreur récupération commentaires")
        setComments([])
        return
      }
      setComments(Array.isArray(json.data) ? json.data : [])
    } catch (error) {
      console.error(error)
      setComments([])
    }
  }

  const openComments = (project: Project) => {
    setActiveProject({ id: project.id, title: project.title })
    setIsCommentsOpen(true)
    getComments(project.id)

    setTimeout(() => {
      if (modalOverlayRef.current && modalPanelRef.current) {
        gsap.fromTo(modalOverlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
        gsap.fromTo(
          modalPanelRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.2 }
        )
      }
    }, 10)
  }

  const closeComments = () => {
    if (modalOverlayRef.current && modalPanelRef.current) {
      gsap.to(modalOverlayRef.current, { opacity: 0, duration: 0.25 })
      gsap.to(modalPanelRef.current, { opacity: 0, y: 30, duration: 0.2 })
      setTimeout(() => {
        setIsCommentsOpen(false)
        setActiveProject(null)
        setName("")
        setMessage("")
        setComments([])
      }, 250)
    } else {
      setIsCommentsOpen(false)
      setActiveProject(null)
      setName("")
      setMessage("")
      setComments([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeProject?.id) return
    if (!name.trim() || !message.trim()) return

    try {
      const res = await fetch("/api/addComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: activeProject.id,
          name,
          comment: message,
        }),
      })

      const json = await res.json()
      if (!res.ok) {
        console.error(json?.error || "Erreur lors de l'ajout du commentaire")
        return
      }

      await getComments(activeProject.id)

      setName("")
      setMessage("")
    } catch (err) {
      console.error("Erreur handleSubmit:", err)
    }
  }

  if (!projectsData) return <div id="projects"><p>Loading ...</p></div>

  return (
    <div id="projects">
      <div className={styles.projectsContainer}>
        <h2 ref={titleRef}>Mes Projets</h2>
      </div>

      <div ref={sectionRef} className={styles.projectsSection}>
        <div ref={horizontalRef} className={styles.horizontalContainer}>
          <div ref={projectsRef} className={styles.projectsWrapper}>
            {projectsData.map((project) => (
              <div key={project.id} className={styles.projectCard}>
                <div className={styles.projectImageContainer}>
                  <img
                    src={project.picture_url || "/placeholder.svg"}
                    alt={project.title}
                    className={styles.projectImage}
                  />
                </div>

                <div className={styles.projectInfo}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className={styles.technologies}>
                    <span>{project.technologies}</span>
                  </div>

                  <button
                    type="button"
                    className={styles.projectCom}
                    onClick={() => openComments(project)}
                    aria-label={`Voir les commentaires du projet ${project.title}`}
                  >
                    Commentaire
                  </button>

                  <a
                    href={project.url}
                    className={styles.projectButton}
                    target="_blank"
                    aria-label={`Voir le projet ${project.title}`}
                  >
                    <span>Voir le projet</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isCommentsOpen && (
        <div
          ref={modalOverlayRef}
          className={styles.modalOverlay}
          onClick={closeComments}
          role="dialog"
          aria-modal="true"
        >
          <div
            ref={modalPanelRef}
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={closeComments}
              aria-label="Fermer la modal"
            >
              X
            </button>

            <div className={styles.contactForm}>
              <h3 className={styles.commentsTitle}>
                Commentaires {activeProject?.title ? `— ${activeProject.title}` : ""}
              </h3>

              <form ref={formRef} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="c-name">Nom</label>
                    <input
                      id="c-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="c-message">Message</label>
                  <textarea
                    id="c-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Écrivez votre commentaire…"
                    required
                  />
                </div>

                <button type="submit" className={styles.submitButton}>
                  Publier
                </button>
              </form>

              {comments.length === 0 ? (
                <p className={styles.commentsEmpty}>Aucun commentaire pour le moment.</p>
              ) : (
                <ul className={styles.commentsList}>
                  {comments.map((c) => (
                    <li key={c.id} className={styles.commentItem}>
                      <div className={styles.commentName}>{c.name}</div>
                      <div className={styles.commentBody}>{c.comment}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
