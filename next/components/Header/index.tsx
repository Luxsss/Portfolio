"use client"
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './style.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

export default function Header() {
  const slider = useRef(null);
  const firstText = useRef(null);
  const secondText = useRef(null);
  const thirdText = useRef(null);

  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        scrub: 0.25,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: '-300px',
    });

    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    gsap.set(thirdText.current, { xPercent: xPercent });
    xPercent += 0.19 * direction;
    requestAnimationFrame(animate);
  };

  return (
    <div id="home" className={styles.headerContainer}>
      <div data-scroll data-scroll-speed="0.3" className={styles.imageContainer1}>
        <Image src="/images/image1.jpg" fill={true} alt="Picture" />
      </div>
      <div data-scroll data-scroll-speed="0.1" className={styles.imageContainer2}>
        <Image src="/images/image2.jpg" fill={true} alt="Picture" />
      </div>
      <div className={styles.firstContainer}>
        <h1 className={styles.firstText}>Développeur</h1>
        <h1 className={styles.secondText}>Full-stack</h1>
      </div>
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <span ref={firstText}>Alexis Brun -</span>
          <span ref={secondText}>Alexis Brun -</span>
          <span ref={thirdText}>Alexis Brun -</span>
        </div>
      </div>
    </div>
  );
}
