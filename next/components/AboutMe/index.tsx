'use client';
import styles from './style.module.css';
import { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

const phrase =
  "Je suis étudiant à la Web Académie d'Epitech, où je me spécialise en développement web. Chaque semaine, je travaille sur des projets concrets qui renforcent mes compétences. Ma passion grandit chaque jour pour le développement web me pousse à innover et à trouver des solutions créatives pour les utilisateurs. Je recherche des opportunités stimulantes pour mettre en valeur mes compétences techniques et mon esprit d'équipe. Je suis ouvert aux collaborations et je suis enthousiaste à l'idée d'apprendre en continu dans ce domaine en évolution rapide.";

export default function AboutMe() {
  const wordsRef = useRef<HTMLParagraphElement[]>([]);
  const aboutContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  wordsRef.current = [];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    createAnimation();
  }, []);

  const createAnimation = () => {
    gsap.to(wordsRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        scrub: true,
        start: 'top 10%',
        end: `+=${window.innerHeight / 2.5}`,
      },
      opacity: 1,
      ease: 'none',
      stagger: 0.1,
    });

    gsap.to(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        scrub: true,
        start: 'top 80%',
        end: 'top 20%',
      },
      '--border-scale': 1,
      ease: 'power2.out',
    });
  };

  const splitWords = (phrase: string) =>
    phrase.split(' ').map((word, i) => (
      <p
        key={`${word}_${i}`}
        ref={(el) => {
          if (el) wordsRef.current.push(el);
        }}
      >
        {word}
      </p>
    ));

  return (
    <div id="about">
      <div ref={aboutContainerRef} className={styles.aboutContainer}>
        <h2 ref={titleRef}>Qui suis-je ?</h2>
      </div>
      <div ref={textContainerRef} className={styles.textContainer}>
        <div ref={textContentRef} className={styles.textContent}>
          {splitWords(phrase)}
        </div>
      </div>
    </div>
  );
}
