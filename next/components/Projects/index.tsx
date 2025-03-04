import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './style.module.css';

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const horizontalRef = useRef<HTMLDivElement | null>(null);

  const projects = [
    { title: "Project One", description: "Description du projet un. Lorem ipsum dolor sit amet." },
    { title: "Project Two", description: "Description du projet deux. Consectetur adipisicing elit." },
    { title: "Project Three", description: "Description du projet trois. Sed do eiusmod tempor incididunt." },
    { title: "Project Four", description: "Description du projet quatre. Aliquam reiciendis." },
    { title: "Project Five", description: "Description du projet cinq. Excepteur sint occaecat." },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const horizontalElem = horizontalRef.current;
    if (!horizontalElem) return; // Vérification si l'élément est disponible

    const scrollWidth = horizontalElem.scrollWidth;
    const viewportWidth = window.innerWidth;

    gsap.to(horizontalElem, {
      x: -(scrollWidth - viewportWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        markers: true,
        start: 'top 10%',
        // Ajout de window.innerHeight pour prolonger le scroll vertical
        end: () => "+=" + (scrollWidth - viewportWidth + window.innerHeight),
      },
    });

  }, []);

  return (
    <section ref={sectionRef} className={styles.projectsSection}>
      <h2>Projects</h2>
      <div ref={horizontalRef} className={styles.projectsGrid}>
        {projects.map((project, index) => (
          <div key={index} className={styles.projectCard}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
