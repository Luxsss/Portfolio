"use client"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import styles from "./style.module.css"

const projectsData = [
  {
    id: 1,
    title: "Puissance 4",
    description: "Jeu de stratégie classique basé sur une grille.",
    technologies: "Javascript",
    image: "/images/puissance4.png?height=300&width=500",
  },
  {
    id: 2,
    title: "Bataille Navale",
    description: "Jeu classique de combat naval.",
    technologies: "Javascript",
    image: "/images/battleship.png?height=300&width=500",
  },
  {
    id: 3,
    title: "Spotify",
    description: "Service de streaming de musique.",
    technologies: "React, Docker",
    image: "/images/spotify.png?height=300&width=500",
  },
  {
    id: 4,
    title: "Twitter",
    description: "Plateforme de partage.",
    technologies: "Symfony, MySQL, Javascript, Tailwind",
    image: "/images/twitter.png?height=300&width=500",
  },
  {
    id: 5,
    title: "MyCinema",
    description: "Trouvez votre prochain film !",
    technologies: "HTML, CSS, PHP",
    image: "/images/myCinema.png?height=300&width=500",
  },
  {
    id: 6,
    title: "Site Responsive",
    description: "Entraînez-vous avec un design résponsive",
    technologies: "HTML, CSS",
    image: "/images/responsive.png?height=300&width=500",
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

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
  }, [])

  return (
    <div>
      <div className={styles.projectsContainer}>
        <h2 ref={titleRef} >Mes Projets</h2>
      </div>
      <div ref={sectionRef} className={styles.projectsSection}>
        <div ref={horizontalRef} className={styles.horizontalContainer}>
          <div ref={projectsRef} className={styles.projectsWrapper}>
            {projectsData.map((project) => (
              <div key={project.id} className={styles.projectCard}>
                <div className={styles.projectImageContainer}>
                  <img src={project.image || "/placeholder.svg"} alt={project.title} className={styles.projectImage} />
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
