"use client"
import { useRef, useLayoutEffect, useState } from "react"
import styles from "./style.module.css"
import gsap from "gsap"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navbarLogoRef = useRef(null)
  const navbarMenuRef = useRef(null)
  const menuContainerRef = useRef(null)
  const menuItemsRef = useRef<HTMLLIElement[]>([])
  const socialItemsRef = useRef<HTMLAnchorElement[]>([])

  // Reset the refs arrays
  menuItemsRef.current = []
  socialItemsRef.current = []

  // Add to the refs arrays
  const addToMenuRefs = (el:any) => {
    if (el && !menuItemsRef.current.includes(el)) {
      menuItemsRef.current.push(el)
    }
  }

  const addToSocialRefs = (el:any) => {
    if (el && !socialItemsRef.current.includes(el)) {
      socialItemsRef.current.push(el)
    }
  }

  useLayoutEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 2 })
    tl.to(navbarLogoRef.current, { duration: 1, rotation: 180, ease: `power1.out` })
    tl.to(navbarLogoRef.current, { duration: 1, rotationY: 180, ease: `power1.out` })
    tl.to(navbarLogoRef.current, { duration: 1, rotationX: 180, ease: `power1.out` })

    gsap.from(navbarMenuRef.current, { duration: 1, y: -50, opacity: 0, ease: "bounce.out" })
  }, [])

  useLayoutEffect(() => {
    if (isMenuOpen) {
      // Animate menu opening
      gsap.to(menuContainerRef.current, {
        duration: 0.5,
        opacity: 1,
        visibility: "visible",
        scale: 1,
        ease: "back.out(1.2)",
      })

      // Animate menu items with stagger
      gsap.fromTo(
        menuItemsRef.current,
        { x: -20, opacity: 0 },
        {
          duration: 0.4,
          x: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.1,
        },
      )

      // Animate social items with stagger
      gsap.fromTo(
        socialItemsRef.current,
        { y: 20, opacity: 0 },
        {
          duration: 0.4,
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.5, // Delay after menu items
        },
      )
    } else if (menuContainerRef.current) {
      // Animate menu closing
      gsap.to(socialItemsRef.current, {
        duration: 0.2,
        y: 10,
        opacity: 0,
        stagger: 0.03,
        ease: "power2.in",
      })

      gsap.to(menuItemsRef.current, {
        duration: 0.2,
        x: -10,
        opacity: 0,
        stagger: 0.03,
        ease: "power2.in",
      })

      gsap.to(menuContainerRef.current, {
        duration: 0.4,
        opacity: 0,
        scale: 0.9,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(menuContainerRef.current, { visibility: "hidden" })
        },
      })
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>
          <p ref={navbarLogoRef}>AB</p>
        </div>
        <div ref={navbarMenuRef} className={`${styles.navbarMenu} ${isMenuOpen ? styles.active : ""}`} onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path fill="none" stroke="none" d="M0 0h24v24H0z" />
                <path d="M4 6H20M4 12H20M12 18H20" />
              </>
            )}
          </svg>
        </div>
      </div>

      <div ref={menuContainerRef} className={styles.menuContainer}>
        <div className={styles.menuContent}>
          <nav className={styles.menuNav}>
            <ul className={styles.menuList}>
              <li ref={addToMenuRefs} className={styles.menuItem} onClick={toggleMenu}>
                <a href="#home">
                  <span className={styles.menuIcon}>🏠</span>
                  <span className={styles.menuText}>Accueil</span>
                </a>
              </li>
              <li ref={addToMenuRefs} className={styles.menuItem} onClick={toggleMenu}>
                <a href="#about">
                  <span className={styles.menuIcon}>👤</span>
                  <span className={styles.menuText}>À propos</span>
                </a>
              </li>
              <li ref={addToMenuRefs} className={styles.menuItem} onClick={toggleMenu}>
                <a href="#projects">
                  <span className={styles.menuIcon}>🔨</span>
                  <span className={styles.menuText}>Projets</span>
                </a>
              </li>
              <li ref={addToMenuRefs} className={styles.menuItem} onClick={toggleMenu}>
                <a href="#contact">
                  <span className={styles.menuIcon}>✉️</span>
                  <span className={styles.menuText}>Contact</span>
                </a>
              </li>
            </ul>
          </nav>

          <div className={styles.menuSeparator}></div>

          <div className={styles.socialContainer}>
            <a ref={addToSocialRefs} href="https://github.com/Luxsss" target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="GitHub">
              <i className="fa-brands fa-github fa-lg"></i>
            </a>
            <a ref={addToSocialRefs} href="https://www.linkedin.com/in/alexs-brun/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="LinkedIn">
              <i className="fa-brands fa-linkedin-in fa-lg"></i>
            </a>
            <a ref={addToSocialRefs} href="mailto:alexis1.brun@epitech.eu" className={styles.socialLink} title="Email">
              <i className="fa-solid fa-paper-plane fa-lg"></i>
            </a>
            <a ref={addToSocialRefs} href="/download/CvAlexisBrunCom.pdf" target="_blank" className={styles.socialLink} title="CV" rel="noreferrer" download>
              CV
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
