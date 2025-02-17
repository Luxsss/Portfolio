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

  function changeSvg(sunMoon: string) {
    const sunProps = {
      backgroundColor: sunMoon === 'sun' ? '#2d2a27' : 'transparent',
      color: sunMoon === 'sun' ? '#edebe9' : '#2d2a27',
      duration: 0.9,
      ease: `power1.out`,
    };

    const moonProps = {
      color: sunMoon === 'moon' ? '#edebe9' : '#2d2a27',
      backgroundColor: sunMoon === 'moon' ? '#2d2a27' : 'transparent',
      duration: 0.9,
      ease: `power1.out`,
    };

    gsap.to(sunSvgRef.current, sunProps);
    gsap.to(moonSvgRef.current, moonProps);

    setIsChangeSvg(!isChangeSvg);
  }

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarLogo}>
        <p ref={navbarLogoRef}>AB.</p>
      </div>
      <div className={styles.navbarName}>
        <svg ref={sunSvgRef} className={styles.sunSvg} onClick={() => changeSvg('sun')} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'><path fill='none' stroke='none' d='M0 0h24v24H0z'/><path d='M3 12H4M12 3V4M21 12H20M12 21V20M5.63 5.63L6.343 6.343M18.364 18.364L17.65 17.65M18.364 5.6L17.65 6.343M5.6 18.364L6.343 17.65M12 8A4 4 0 0 1 12 16A4 4 0 0 1 12 8'/></svg>
        <svg ref={moonSvgRef} className={styles.moonSvg} onClick={() => changeSvg('moon')} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'><path fill='none' stroke='none' d='M0 0h24v24H0z'/><path d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646'/></svg>
      </div>
      <div ref={navbarMenuRef} className={styles.navbarMenu}>
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'><path fill='none' stroke='none' d='M0 0h24v24H0z'/><path d='M4 6H20M4 12H20M12 18H20'/></svg>
      </div>
    </div>
  )
}
