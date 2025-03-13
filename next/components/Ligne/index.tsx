"use client"
import { useRef, useEffect } from "react"
import styles from "./style.module.css"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Ligne() {
  const svgRefDesktop = useRef<SVGSVGElement | null>(null);
  const pathRefDesktop = useRef<SVGPathElement | null>(null);
  const svgRefMobile = useRef<SVGSVGElement | null>(null);
  const pathRefMobile = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth <= 425;
    const svg = isMobile ? svgRefMobile.current : svgRefDesktop.current;
    const path = isMobile ? pathRefMobile.current : pathRefDesktop.current;
    if (!svg || !path) return;

    path.style.willChange = "stroke-dashoffset";

    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: svg,
        start: "top",
        end: () => `+=${svg.clientHeight / 1.1}`,
        scrub: true,
      },
    });
  }, []);

  return (
    <>
    <svg ref={svgRefDesktop} className={`${styles.ligne} ${styles.firstSvg}`} width="2150" height="16839" viewBox="0 0 2150 16839" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          ref={pathRefDesktop}
          d="M28.2464 0C28.2464 0 997.06 434.527 885.557 762.729C774.054 1090.93 176.511 882.46 266.505 1273.48C356.5 1664.5 2350.5 1650 2049.5 2105C1748.5 2560 -1315 2581 -874.5 2888.5C-434 3196 1314.5 3511 1042 4119.5C769.5 4728 1714 4287.5 2007.5 4728C2301 5168.5 993 5595.5 266.505 5266.5C-459.989 4937.5 -776.5 6148 41.9999 5917C860.5 5686 2818 7470 2699.5 6693.5C2581 5917 1455 7015 1545.5 7532.5C1636 8050 1517.5 8092 1189 8176C860.5 8260 482.5 8099 210 7924.5C-62.5002 7750 -699.5 9078.5 -377.5 8896.5C-55.5008 8714.5 412.5 9449 965 9302C1517.5 9155 2469.5 9386 2007.5 9945.5C1545.5 10505 -293.5 11169.5 203 10722C699.5 10274.5 2720.5 11156 2734.5 11540.5C2748.5 11925 1867 11512 1573.5 11757C1280 12002 1826 12001.5 2007.5 12246.5C2189 12491.5 328.5 12359 461.5 12750.5C594.5 13142 1363.5 13022.5 1573.5 13484.5C1783.5 13946.5 -447.001 13883 -370.5 14121C-294 14359 538.5 14876.5 1112 15044.5C1685.5 15212.5 -7 15135.5 342.5 15562C692 15988.5 2238.5 16059 1965.5 16338.5C1692.5 16618 -769.5 16814 -769.5 16814"
          stroke="#CE4242"
          strokeWidth="50"
        />
      </svg>

      <svg ref={svgRefMobile} className={`${styles.ligne} ${styles.secondSvg}`} width="2150" height="23856" viewBox="0 0 2150 23856" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          ref={pathRefMobile}
          d="M0 50.6744C13.42 -61.1606 692.5 223 331.244 496.416C-30.0127 769.832 5 991 97.5 1372.5C190 1754 1611 1898.5 1900 2141C2189 2383.5 3333 3573.5 2489.5 3429C1646 3284.5 900.501 3429 542.501 4030C184.501 4631 1484 4625 1617 5133.5C1750 5642 -590 5330 -445.5 5982.5C-301 6635 565.5 6554.5 357.5 7502C149.5 8449.5 2102 7941 2119.5 8553.5C2137 9166 57 8553.5 149.5 9310C242 10066.5 -301.5 10130.5 5 10413.5C311.5 10696.5 1293.5 9587.5 1524.5 10171C1755.5 10754.5 2639.5 10881.5 2414 11199.5C2188.5 11517.5 1091 11315 1097 11765.5C1103 12216 490.5 12123.5 219 12528C-52.5001 12932.5 733.001 13019 1027.5 13273.5C1322 13528 -174 13412 149.5 13897.5C473 14383 1669 15607 2044.5 14908C2420 14209 62.9999 15474.5 -595.5 15896C-1254 16317.5 282.001 16681.5 444.001 17282.5C606 17883.5 2004 17681 2085 18091.5C2166 18502 -12.0005 18623.5 167 19068C346 19512.5 900.5 19322 1536 19767C2171.5 20212 -584 21332.5 -359 20506.5C-134.001 19680.5 -23.5 21586.5 554.001 21523C1131.5 21459.5 2252 21886.5 1923 22193C1594 22499.5 80.501 22216.5 346 22603.5C611.5 22990.5 1397 23504.5 1351 23054C1305 22603.5 866.001 23002 762.001 23429.5C658 23857 2062 23903 2333.5 23753"
          stroke="#CE4242"
          strokeWidth="50"
        />
      </svg>
    </>
  )
}
