'use client';
import styles from './style.module.css';
import { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

const phrase =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio eum dignissimos similique alias, obcaecati animi temporibus eveniet nam tempora rerum, maiores cum maxime aliquam! Odio cumque reprehenderit fuga harum? Fugit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae eum error, odio corporis hic cumque nulla facilis ullam veniam delectus sunt ipsum alias sit obcaecati labore fuga sed corrupti ipsam.";

export default function AboutMe() {
  const wordsRef = useRef<HTMLParagraphElement[]>([]);
  const aboutContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Réinitialise le tableau pour éviter les doublons
  wordsRef.current = [];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    createAnimation();
  }, []);

  const createAnimation = () => {
    // Animation des mots (au lieu des lettres)
    gsap.to(wordsRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        scrub: true,
        start: 'top 2%',
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
    <div>
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
