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
          end: () => `+=${projectsRef.current ? projectsRef.current.scrollWidth - window.innerWidth : 0}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      window.addEventListener("resize", () => {
        ScrollTrigger.refresh()
      })

      return () => {
        horizontalScrollTween.kill()
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
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
                    loading="lazy"
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
