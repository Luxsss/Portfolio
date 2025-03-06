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
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path) return;

    // Indique au navigateur que stroke-dashoffset va être animé
    path.style.willChange = "stroke-dashoffset";

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
        end: `+=${svg.clientHeight / 1.13}`,
        scrub: true,
        markers: true,
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

      {/* <svg ref={svgRef} className="olk squiggle" width="2085" height="10545" viewBox="0 0 2085 10545" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path ref={pathRef} d="M12.5 48C25.8357 -57.0001 536.097 231.323 341.664 466.5C147.231 701.677 111.5 955 162 1112C212.5 1269 397.5 1533.5 701.5 1545.5C1005.5 1557.5 940.638 1828.31 282.5 2238.5C-349.081 2711.22 566.828 2607.37 818 2930C1097.38 3203.86 1366 3702.5 1710.5 3416C2055 3129.5 -539 3698 282.5 3905.5C1104 4113 708.353 4396.49 818 4885.5C927.647 5374.5 1246.87 5008.8 1710.5 4644.5C2174.13 4280.2 2143.5 5509.5 1806 5338C1468.5 5166.5 307.937 6350.93 261.5 6027C215.284 5704.61 1404.45 6689.58 1648.57 6609.22C1650.74 6608.51 1653.08 6609.5 1654.38 6611.37C1884.84 6943.44 896.74 6989.76 605.5 7104.5C313.276 7219.63 549.271 7447.49 191 7372C-167.271 7296.51 1344.5 7986 1212 7766.5C1079.5 7547 2065.5 7922.5 1871 7989C1676.5 8055.5 1764.16 8199.87 1914 8227C2063.84 8254.12 1819 8374.48 1677 8712.99C1535 9051.5 713.5 8712.99 494.5 8810.5C275.5 8908.01 494.5 9571.5 165 9254.5C-164.5 8937.5 1284.91 9283.6 1046 9488.99C807.087 9694.38 1543 9530.48 1677 9825.49C1811 10120.5 1251.2 9701.57 1067 9899.99C882.797 10098.4 1233.4 10081.9 1067 10536" stroke="#CE4242" strokeWidth="50"/>
      </svg> */}

      <svg ref={svgRef} className="olk squiggle" width="2150" height="10942" viewBox="0 0 2150 10942" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path ref={pathRef} d="M12.5 48C25.8357 -57.0001 536.097 231.323 341.664 466.5C147.231 701.677 111.5 955 162 1112C212.5 1269 397.5 1533.5 701.5 1545.5C1005.5 1557.5 940.638 1828.31 282.5 2238.5C-348.849 2711.05 566.155 2607.44 817.723 2929.65C817.909 2929.88 818.088 2930.08 818.314 2930.28C887.974 2991.55 1279.62 3050.65 1884.5 3289C2490.29 3527.71 -684.759 3675.2 282.5 3905.5C1249.76 4135.8 1505.55 4362.3 818 4885.5C130.45 5408.69 1215.03 4899.25 1710.5 4644.5C2205.97 4389.75 2143.5 5509.5 1806 5338C1468.5 5166.5 345.095 6872.51 261.5 6027C177.904 5181.48 1222.8 6427.8 1652 6608C2510.85 7051.16 836.5 7044 605.5 7104.5C374.5 7165 131.762 7245.76 191 7372C250.237 7498.23 1210.66 8173.52 1212 7766.5C1213.34 7359.48 1528.5 7970 1871 7989C2213.5 8008 1985.42 8066.67 1914 8227C1842.58 8387.33 1693.56 8450 1677 8712.99C1660.44 8975.98 713.5 8712.99 494.5 8810.5C275.5 8908.01 64.5 8977.5 165 9254.5C265.5 9531.5 1284.91 9283.6 1046 9488.99C807.087 9694.38 1543 9530.48 1677 9825.49C1811 10120.5 913.5 9699.5 1067 9899.99C1211.49 10088.7 1065.35 10631 1047.7 10694C1046.82 10697.1 1043.28 10698.4 1040.47 10696.8L890.962 10609.5C886.92 10607.1 882.141 10611.1 883.744 10615.5L992.386 10913.6C993.293 10916.1 995.979 10917.4 998.515 10916.7L1289.55 10829.7C1293.94 10828.4 1294.47 10822.4 1290.33 10820.5C1258.61 10805.4 1171.42 10764.2 1145.89 10753.9C1143.24 10752.8 1141.91 10749.7 1142.95 10747C1276.01 10408.4 1347.5 10353.9 1244.5 10127.5C1141 9899.99 1870.73 10395.5 2148.5 10803.5" stroke="#CE4242" strokeWidth="50"/>
      </svg>


    </div>
  );
}
