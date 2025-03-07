"use client"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import styles from "./style.module.css"

// Données de projets fictives pour la démonstration
const projectsData = [
  {
    id: 1,
    title: "Portfolio Personnel",
    description: "Site web responsive présentant mes compétences et projets",
    technologies: "React, Next.js, GSAP",
    image: "/images/image2.jpg?height=300&width=500",
  },
  {
    id: 2,
    title: "Application E-commerce",
    description: "Plateforme de vente en ligne avec panier et paiement",
    technologies: "React, Node.js, MongoDB",
    image: "/images/image2.jpg?height=300&width=500",
  },
  {
    id: 3,
    title: "Dashboard Analytics",
    description: "Interface d'analyse de données avec graphiques interactifs",
    technologies: "TypeScript, D3.js, Firebase",
    image: "/images/image2.jpg?height=300&width=500",
  },
  {
    id: 4,
    title: "Application Mobile",
    description: "Application de gestion de tâches avec notifications",
    technologies: "React Native, Redux, Firebase",
    image: "/images/image2.jpg?height=300&width=500",
  },
  {
    id: 5,
    title: "Site Vitrine",
    description: "Site web pour une entreprise locale avec formulaire de contact",
    technologies: "HTML, CSS, JavaScript",
    image: "/images/image2.jpg?height=300&width=500",
  },
  {
    id: 6,
    title: "Site Vitrine",
    description: "Site web pour une entreprise locale avec formulaire de contact",
    technologies: "HTML, CSS, JavaScript",
    image: "/images/image2.jpg?height=300&width=500",
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Enregistrer le plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)

    // Animation du soulignement du titre
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

    // Calculer la largeur totale du conteneur de projets pour le scroll horizontal
    const calculateWidth = () => {
      if (horizontalRef.current && projectsRef.current) {
        const scrollWidth = projectsRef.current.scrollWidth
        return -(scrollWidth - window.innerWidth + window.innerWidth * 0.01) // Ajustement pour la marge
      }
      return 0
    }

    // Animation du défilement horizontal
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

      // Recalculer lors du redimensionnement de la fenêtre
      window.addEventListener("resize", () => {
        ScrollTrigger.refresh()
      })

      // Nettoyage
      return () => {
        horizontalScrollTween.kill()
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [])

  return (
    <div ref={sectionRef} className={styles.projectsSection}>
      <div className={styles.titleWrapper}>
        <h2 ref={titleRef} className={styles.projectsTitle}>
          Mes Projets
        </h2>
      </div>
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
  )
}
