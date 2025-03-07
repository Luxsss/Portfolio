import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './style.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

export default function Contact() {

  const titleRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    createAnimation()
  }, [])

  const createAnimation = () => {
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

    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
        },
        ease: "power2.out",
      },
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulaire soumis")
  }

  return (
    <div>
      <div className={styles.contactContainer}>
        <h2 ref={titleRef}>Contactez-moi</h2>
      </div>
      <div className={styles.formContainer}>
      <form ref={formRef} className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="prenom">Prénom</label>
              <input type="text" id="prenom" name="prenom" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="nom">Nom</label>
              <input type="text" id="nom" name="nom" required />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} required></textarea>
          </div>

          <button type="submit" className={styles.submitButton}>
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
