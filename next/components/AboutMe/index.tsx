'use client';
import styles from './style.module.css';
import { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

const phrase =
  "Ma curiosité pour le développement web est née d'une passion de longue date pour les jeux vidéo – et de quelques nuits blanches à explorer des mondes virtuels. Un jour, je me suis demandé : « Qui crée ces univers où je passe tant de temps ? » De fil en aiguille, j’ai découvert les coulisses du numérique. Aujourd’hui, c’est dans le code que je m’exprime, que j’apprends et que je crée, toujours guidé par le même plaisir de jouer — mais cette fois, en construisant le jeu.";

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
