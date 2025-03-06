import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './style.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

export default function Contact() {

  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    createAnimation();
  }, []);

  const createAnimation = () => {

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

  return (
    <div>
      <div className={styles.contactContainer}>
        <h2 ref={titleRef}>Contact</h2>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}
