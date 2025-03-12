"use client"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import styles from "./style.module.css"

const projectsData = [
  {
    id: 1,
    title: "Previously On",
    description: "Previously On est une application conçue pour les passionnés de films, séries et anime qui souhaitent organiser et suivre leur progression dans leurs visionnages. Cette plateforme permet de planifier les œuvres à regarder, d’enregistrer celles en cours, et de garder une trace précise des films visionnés, des saisons et épisodes terminés.",
    technologies: "Next.js",
    image: "/images/projects/previouslyOn.webp?height=300&width=500",
  },
  {
    id: 2,
    title: "Jeu de Bataille Navale",
    description: "Ce célèbre jeu de bataille navale. Ce projet propose une expérience stratégique où les joueurs placent leurs navires sur une grille et tentent de couler ceux de leur adversaire en devinant leurs positions. Le jeu peut être joué en solo contre une IA.",
    technologies: "Javascript",
    image: "/images/projects/battleship.webp?height=300&width=500",
  },
  {
    id: 3,
    title: "My IRC",
    description: "My_IRC est une application de messagerie instantanée inspirée des salons de discussion IRC classiques, conçue avec Socket.io pour la communication en temps réel et React pour une interface fluide et moderne. Ce projet vise à offrir une plateforme de discussion interactive, légère et performante, permettant aux utilisateurs de rejoindre des salons, d’échanger des messages et de profiter d’une expérience de chat optimisée.",
    technologies: "Socket.io, React",
    image: "/images/projects/my_irc.webp?height=300&width=500",
  },
  {
    id: 4,
    title: "Twitter",
    description: "My_Twitter est une plateforme de microblogging inspirée de Twitter, développée en Symfony pour une gestion robuste du backend et une architecture sécurisée. Ce projet permet aux utilisateurs de publier des messages courts, d’interagir avec d’autres membres et de suivre des tendances en temps réel. Grâce à Symfony et à son écosystème performant, My_Twitter offre une expérience fluide et évolutive.",
    technologies: "Symfony, MySQL, Javascript, Tailwind",
    image: "/images/projects/twitter.webp?height=300&width=500",
  },
  {
    id: 5,
    title: "Puissance 4",
    description: "Ce célèbre jeu de Puissance 4, développée en HTML, CSS et JavaScript. Ce projet permet aux joueurs de s’affronter en plaçant des jetons sur une grille, dans le but d’aligner quatre pions consécutifs avant leur adversaire. Avec une interface fluide et interactive.",
    technologies: "Javascript, HTML, CSS ",
    image: "/images/projects/puissance4.webp?height=300&width=500",
  },
  {
    id: 6,
    title: "Site Responsive",
    description: "Entraînez-vous avec un design résponsive",
    technologies: "HTML, CSS",
    image: "/images/projects/responsive.png?height=300&width=500",
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
