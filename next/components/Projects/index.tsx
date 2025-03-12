"use client"
import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import styles from "./style.module.css"

export default function Projects() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const horizontalRef = useRef(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  interface Project {
    id: number;
    picture_url: string;
    title: string;
    description: string;
    technologies: string;
  }

  const [projectsData, setProjectsData] = useState<Project[] | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects")
        const json = await res.json()
        if (json.error) {
          console.error(json.error)
        } else {
          setProjectsData(json.data)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchProjects()
  }, [])

  useEffect(() => {
    if (!projectsData) return

    gsap.registerPlugin(ScrollTrigger)

    // Animation sur le titre avec accélération GPU activée (force3D)
    gsap.to(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        scrub: true,
        start: "top 80%",
        end: "top 20%",
      },
      "--border-scale": 1,
      ease: "power2.out",
      force3D: true,
    })

    // Fonction pour créer l'animation horizontale
    const createHorizontalTween = () => {
      if (sectionRef.current && horizontalRef.current && projectsRef.current) {
        const scrollWidth = projectsRef.current.scrollWidth
        // Calcul de la distance avec un petit offset
        const distance = -(scrollWidth - window.innerWidth + window.innerWidth * 0.01)
        return gsap.to(projectsRef.current, {
          x: distance,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: horizontalRef.current,
            start: "top top",
            end: `+=${Math.abs(distance)}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      }
      return null
    }

    let horizontalTween = createHorizontalTween()

    let resizeTimeout: any
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        // Au redimensionnement, on tue l'ancienne tween et on en crée une nouvelle avec les nouvelles dimensions
        if (horizontalTween) {
          horizontalTween.kill()
        }
        horizontalTween = createHorizontalTween()
        ScrollTrigger.refresh()
      }, 200)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      if (horizontalTween) horizontalTween.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      window.removeEventListener("resize", handleResize)
    }
  }, [projectsData])

  if (!projectsData) return <p>Loading...</p>

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
                    src={project.picture_url}
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
