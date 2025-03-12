"use client"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import styles from "./style.module.css"

const projectsData = [
  {
    id: 1,
    title: "Previously On",
    description: "Application pour suivre et organiser vos visionnages de films, séries et anime.",
    technologies: "Next.js",
    image: "/images/projects/previouslyOn.webp?height=300&width=500",
  },
  {
    id: 2,
    title: "Jeu de Bataille Navale",
    description: "Jeu stratégique où vous placez des navires sur une grille, jouable en solo contre une IA.",
    technologies: "Javascript",
    image: "/images/projects/battleship.webp?height=300&width=500",
  },
  {
    id: 3,
    title: "My IRC",
    description: "Messagerie instantanée inspirée d'IRC, utilisant Socket.io et React pour une communication en temps réel.",
    technologies: "Socket.io, React",
    image: "/images/projects/my_irc.webp?height=300&width=500",
  },
  {
    id: 4,
    title: "Twitter",
    description: "Plateforme de microblogging inspirée de Twitter, développée en Symfony pour publier des messages et suivre les tendances.",
    technologies: "Symfony, MySQL, Javascript, Tailwind",
    image: "/images/projects/twitter.webp?height=300&width=500",
  },
  {
    id: 5,
    title: "Puissance 4",
    description: "Jeu classique de Puissance 4 en HTML, CSS et JavaScript, où l'objectif est d'aligner quatre jetons.",
    technologies: "Javascript, HTML, CSS",
    image: "/images/projects/puissance4.webp?height=300&width=500",
  },
  {
    id: 6,
    title: "Site Responsive",
    description: "Exercice de design responsive pour s'adapter à tous les appareils.",
    technologies: "HTML, CSS",
    image: "/images/projects/responsive.png?height=300&width=500",
  },
];


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
          end: () =>
            `+=${projectsRef.current ? projectsRef.current.scrollWidth - window.innerWidth : 0}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Ajout d'un debounce sur l'événement resize
      let resizeTimeout: ReturnType<typeof setTimeout>
      const handleResize = () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(() => {
          ScrollTrigger.refresh()
        }, 200)
      }
      window.addEventListener("resize", handleResize)

      return () => {
        horizontalScrollTween.kill()
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

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
                    src={project.image || "/placeholder.svg"}
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
