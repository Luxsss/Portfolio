"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import AboutMe from "@/components/AboutMe";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  // Spécification des types pour les refs
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const svg = svgRef.current;
    const path = pathRef.current;

    if (!svg || !path) return;

    // Récupère la longueur totale du tracé
    const pathLength = path.getTotalLength();

    // Initialisation du tracé
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    // Animation avec GSAP et ScrollTrigger
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: svg,
        start: "top -50%",
        end: `+=${svg.clientHeight / 1.3}`
,
        scrub: true,
        markers: true, // décommentez pour visualiser les points de départ/fin
      },
    });
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <AboutMe />
      <Projects />
      <Contact />

      <svg
        ref={svgRef}
        width="2019"
        height="9633"
        viewBox="0 0 2019 9633"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="olk squiggle"
      >
        <path
          ref={pathRef}
          d="M3.99999 27.0001C247.717 2.84364 411 388 552 301C693 214 652 562.5 328 766C4.1881 969.382 438.405 1045.8 651.629 1064.97C651.883 1064.99 652.141 1064.99 652.396 1064.97C1082.74 1037.43 1076.81 1136.05 1062.57 1313.13C1062.52 1313.7 1062.36 1314.31 1062.13 1314.83C886.515 1707.52 1183.16 1397.17 1411.5 1637.5C1639.72 1877.7 1464.71 1799.29 1329.01 1919.55C1328.68 1919.84 1328.51 1919.98 1328.27 1920.35C1320.54 1931.95 1120.38 2226.47 888.5 1974C652 1716.5 407 1849.5 473 2115C535.402 2366.03 383.704 2427.98 366.98 2433.99C365.968 2434.36 365.255 2434.83 364.632 2435.71C350.485 2455.59 169.211 2716.06 249 2904C329.474 3093.55 328.163 3180.63 328.009 3185.76C328.004 3185.92 327.993 3185.87 328.002 3186.03C328.29 3191.41 366.596 3893.95 652 3360.5C918.433 2862.51 1302.91 3534.62 1355.47 3631.21C1357.67 3635.26 1353.54 3639.65 1349.15 3638.26C1290 3619.45 1042.58 3558.62 1141.5 3896C1253.5 4278 925.5 4095 772 4273.5C618.5 4452 328 4988 925.5 4622.5C1480.15 4283.21 1842.21 4448.46 1891.29 4473.9C1894.26 4475.45 1895.03 4478.81 1892.54 4481.06C1823.72 4543.35 971.197 5301.1 286.5 5245C-427.5 5186.5 731 5519.5 573 5677C415 5834.5 851 5777 1233 5303.5C1615 4830 1730.5 5361 1843 5710C1955.5 6059 1204 6262 390 6295.5C-424 6329 266 6657 602 6748C938 6839 872 6823 1204 6910C1536 6997 1345 6619.5 1685.5 6594.5C2026 6569.5 1689.5 6939 1934.5 6997C2179.5 7055 1623 7819 1062.5 7391.5C514.94 6973.87 676.946 7502.96 684.719 7527.62C684.965 7528.4 685.222 7528.71 685.798 7529.29C783.984 7628.23 892.561 8447.27 990.777 8548.28C991.634 8549.16 992.049 8550.18 992.138 8551.4L1071 9637"
          stroke="#CE4242"
          strokeWidth="50"
        />
      </svg>
    </div>
  );
}
