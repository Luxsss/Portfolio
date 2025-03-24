'use client';
import styles from './style.module.css';
import { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

const phrase =
  "Tout a commencé avec une passion dévorante pour les jeux vidéo – et quelques nuits blanches bien méritées. À force de respawn et de rage quits, une question m’a traversé l’esprit : « Mais qui code ces mondes dans lesquels je passe des heures ? » Curiosité piquée, j’ai plongé dans les coulisses du numérique… et découvert le développement web. Aujourd’hui, entre balises, logique et bugs un peu trop joueurs, j’ai trouvé un nouvel univers où je peux m’exprimer, apprendre et créer. Je continue de jouer — mais désormais, c’est moi qui crée.";

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
