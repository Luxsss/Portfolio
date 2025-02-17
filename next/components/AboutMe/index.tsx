'use client';
import styles from './style.module.css';
import { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

const phrase = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio eum dignissimos similique alias, obcaecati animi temporibus eveniet nam tempora rerum, maiores cum maxime aliquam! Odio cumque reprehenderit fuga harum? Fugit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae eum error, odio corporis hic cumque nulla facilis ullam veniam delectus sunt ipsum alias sit obcaecati labore fuga sed corrupti ipsam.";

export default function AboutMe() {
  const refs = useRef<HTMLSpanElement[]>([]);
  const aboutContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    createAnimation();
  }, []);

  const createAnimation = () => {
    gsap.to(refs.current, {
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
  };

  const splitWords = (phrase: string) =>
    phrase.split(' ').map((word, i) => (
      <p key={`${word}_${i}`}>{splitLetters(word)}</p>
    ));

  const splitLetters = (word: string) =>
    word.split('').map((letter, i) => (
      <span key={`${letter}_${i}`} ref={(el) => {
        if (el) refs.current.push(el);
      }}>
        {letter}
      </span>
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
