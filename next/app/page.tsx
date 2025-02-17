"use client"

import { useEffect } from 'react';
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import AboutMe from '@/components/AboutMe'
import Projects from '@/components/Projects'

export default function Home() {

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, [])

  return (
    <div>
      <Navbar />
      <Header />
      <AboutMe />
      <Projects />
    </div>
  );
}
