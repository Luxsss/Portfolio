"use client"
import React, {useRef, useLayoutEffect, useState} from 'react'
import styles from './style.module.css';
import gsap from 'gsap';

export default function Navbar() {

  const navbarLogoRef = useRef(null)
  const sunSvgRef = useRef(null)
  const moonSvgRef = useRef(null)
  const navbarMenuRef = useRef(null)
  const [isChangeSvg, setIsChangeSvg] = useState(false)

  useLayoutEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 2});
    tl.to(navbarLogoRef.current, {duration: 1, rotation: 180, ease: `power1.out`})
    tl.to(navbarLogoRef.current, {duration: 1, rotationY: 180, ease: `power1.out`})
    tl.to(navbarLogoRef.current, {duration: 1, rotationX: 180, ease: `power1.out`})

    gsap.from(navbarMenuRef.current, { duration: 1, y: -50, opacity: 0, ease: 'bounce.out' });
  }, [])

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarLogo}>
        <p ref={navbarLogoRef}>AB.</p>
      </div>
      <div ref={navbarMenuRef} className={styles.navbarMenu}>
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'><path fill='none' stroke='none' d='M0 0h24v24H0z'/><path d='M4 6H20M4 12H20M12 18H20'/></svg>
      </div>
    </div>
  )
}
