"use client"

import React, { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import styles from "./style.module.css"

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const arrow1Ref = useRef(null)
  const arrow2Ref = useRef(null)
  const arrow3Ref = useRef(null)

  const xForceRef = useRef(0)
  const yForceRef = useRef(0)
  const requestIdRef = useRef<number | null>(null)
  const easing = 0.08
  const speed = 0.01

  const lerp = (start:any, target:any, amount:any) =>
    start * (1 - amount) + target * amount

  const animateFloating = () => {
    xForceRef.current = lerp(xForceRef.current, 0, easing)
    yForceRef.current = lerp(yForceRef.current, 0, easing)

    gsap.set(arrow1Ref.current, { x: `+=${xForceRef.current}`, y: `+=${yForceRef.current}` })
    gsap.set(arrow2Ref.current, { x: `+=${xForceRef.current * 0.5}`, y: `+=${yForceRef.current * 0.5}` })
    gsap.set(arrow3Ref.current, { x: `+=${xForceRef.current * 0.25}`, y: `+=${yForceRef.current * 0.25}` })

    if (Math.abs(xForceRef.current) < 0.01) xForceRef.current = 0
    if (Math.abs(yForceRef.current) < 0.01) yForceRef.current = 0

    if (xForceRef.current !== 0 || yForceRef.current !== 0) {
      requestIdRef.current = requestAnimationFrame(animateFloating)
    } else {
      if (requestIdRef.current !== null) {
        cancelAnimationFrame(requestIdRef.current)
      }
      requestIdRef.current = null
    }
  }

  const handleMouseMove = (e:any) => {
    const { movementX, movementY } = e
    xForceRef.current += movementX * speed
    yForceRef.current += movementY * speed
    if (!requestIdRef.current) {
      requestIdRef.current = requestAnimationFrame(animateFloating)
    }
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
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
      buttonRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 80%",
        },
        ease: "power2.out",
      }
    )
  }, [])

  const openModal = () => {
    setIsModalOpen(true)
    setTimeout(() => {
      if (modalRef.current && formRef.current) {
        gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
        gsap.fromTo(formRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.2 })
      }
    }, 10)
  }

  const closeModal = () => {
    if (modalRef.current && formRef.current) {
      gsap.to(modalRef.current, { opacity: 0, duration: 0.3 })
      gsap.to(formRef.current, { opacity: 0, y: 30, duration: 0.2 })
      setTimeout(() => setIsModalOpen(false), 300)
    } else {
      setIsModalOpen(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !email.trim() || !name.trim()) {
      console.error("Tous les champs doivent être remplis.");
      return;
    }

    try {
      const response = await fetch("https://submit-form.com/OTTnr3nxj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          message: message,
          _email: {
            from: email,
            subject: name,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      console.log("Formulaire soumis avec succès :", await response.json());

      closeModal();
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
    }
  };



  return (
    <div id="contact" className={styles.contactPage} onMouseMove={handleMouseMove}>
      <div className={styles.contactContainer}>
        <h2 ref={titleRef} className={styles.contactTitle}>
          DÉRANGEZ-MOI
        </h2>
        <button ref={buttonRef} className={styles.contactButton} onClick={openModal}>
          DÉRANGEZ-MOI
        </button>
      </div>

      <svg ref={arrow1Ref} width="315" height="247" viewBox="0 0 315 247" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowContainer1}>
        <path className={styles.arrowStroke} d="M308.069 236.423C312.169 235.833 315.014 232.031 314.423 227.931L304.803 161.12C304.212 157.02 300.41 154.175 296.31 154.766C292.21 155.356 289.365 159.158 289.956 163.258L298.508 222.646L239.12 231.197C235.02 231.788 232.175 235.59 232.766 239.69C233.356 243.79 237.158 246.635 241.258 246.044L308.069 236.423ZM13.5797 126.948C31.4935 94.2042 47.073 69.7644 60.8816 52.1892C74.7556 34.5307 86.4591 24.3015 96.4711 19.3207C106.104 14.5281 114.236 14.5351 122.01 17.7288C130.232 21.1061 138.676 28.3133 147.853 39.2309C156.971 50.0774 166.274 63.9196 176.439 79.786C186.516 95.5134 197.453 113.255 209.532 131.266C233.742 167.366 263.195 205.59 302.507 235.005L311.493 222.995C274.206 195.095 245.875 158.527 221.99 122.912C210.022 105.065 199.335 87.7176 189.07 71.6941C178.893 55.8095 169.136 41.2387 159.336 29.5792C149.595 17.9909 139.263 8.59922 127.71 3.85374C115.71 -1.07541 103.068 -0.715118 89.7898 5.89079C76.8898 12.3084 63.5427 24.5228 49.0866 42.9221C34.5652 61.4047 18.5354 86.6369 0.420318 119.748L13.5797 126.948Z" fill="black" />
      </svg>

      <svg ref={arrow2Ref} width="602" height="614" viewBox="0 0 602 614" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowContainer2}>
        <path className={styles.arrowStroke} d="M324 604L328.94 609.643L332.231 606.762L331.344 602.478L324 604ZM9.56907 357.016C10.1299 361.119 13.9115 363.992 18.0155 363.431L84.8939 354.291C88.9979 353.731 91.8702 349.949 91.3093 345.845C90.7485 341.741 86.9669 338.869 82.8629 339.43L23.4154 347.554L15.2914 288.106C14.7305 284.002 10.9489 281.13 6.84493 281.691C2.74094 282.252 -0.131343 286.033 0.429506 290.137L9.56907 357.016ZM229.588 41.5106C250.14 22.535 273.064 14.7498 297.248 15.2603C321.659 15.7755 347.78 24.7674 374.226 40.1688C427.174 71.0046 479.667 126.511 519.296 184.84C539.068 213.942 555.506 243.555 567.13 270.871C578.801 298.295 585.419 322.939 586.004 342.228C586.591 361.61 581.151 373.685 571.01 379.454C560.267 385.567 541.407 386.412 510.945 375.91L506.056 390.091C537.593 400.964 561.859 401.918 578.428 392.492C595.599 382.722 601.659 363.61 600.997 341.773C600.332 319.842 592.95 293.237 580.932 264.997C568.869 236.649 551.932 206.184 531.704 176.41C491.333 116.99 437.326 59.5584 381.774 27.2067C353.97 11.0143 325.341 0.849921 297.565 0.263611C269.561 -0.327478 242.86 8.84046 219.412 30.4898L229.588 41.5106ZM510.945 375.91C447.879 354.167 402.846 356.737 371.295 374.967C339.812 393.158 323.728 425.81 315.94 459.761C308.137 493.778 308.37 530.269 310.475 558.013C311.531 571.934 313.067 583.764 314.341 592.127C314.979 596.311 315.552 599.632 315.968 601.921C316.177 603.065 316.346 603.952 316.464 604.559C316.523 604.862 316.57 605.096 316.602 605.257C316.618 605.338 316.631 605.401 316.64 605.445C316.645 605.467 316.648 605.484 316.651 605.497C316.652 605.503 316.653 605.51 316.654 605.513C316.655 605.518 316.656 605.521 324 604C331.344 602.478 331.344 602.48 331.344 602.48C331.344 602.479 331.344 602.478 331.343 602.475C331.342 602.469 331.34 602.459 331.337 602.444C331.331 602.413 331.321 602.365 331.308 602.299C331.281 602.166 331.24 601.962 331.187 601.688C331.08 601.14 330.923 600.316 330.726 599.236C330.333 597.077 329.784 593.897 329.17 589.867C327.941 581.803 326.454 570.355 325.432 556.878C323.38 529.825 323.238 495.034 330.56 463.114C337.897 431.128 352.438 403.187 378.799 387.955C405.092 372.763 445.122 369.083 506.056 390.091L510.945 375.91ZM319.06 598.357C318.79 598.593 318.847 598.522 318.734 598.507C318.258 598.441 316.97 598.039 314.813 596.335C310.476 592.909 304.927 586.076 298.502 575.577C285.796 554.813 271.148 522.208 256.731 481.931C227.931 401.47 200.56 291.817 191.471 188.344L176.529 189.656C185.747 294.603 213.448 405.518 242.608 486.986C257.172 527.673 272.225 561.374 285.707 583.406C292.377 594.305 299.043 602.993 305.515 608.106C308.762 610.671 312.526 612.792 316.684 613.366C321.205 613.99 325.478 612.674 328.94 609.643L319.06 598.357ZM191.471 188.344C189.172 162.172 186.361 142.72 182.92 129.124C181.202 122.335 179.254 116.7 176.964 112.318C174.735 108.051 171.75 104.136 167.516 102.03C162.823 99.6954 158.006 100.25 153.903 102.255C150.098 104.115 146.695 107.282 143.656 110.828C137.537 117.968 131.087 128.83 124.309 141.729C110.813 167.411 94.3799 204.498 75.7773 241.999C56.9435 279.965 35.4638 319.291 11.0275 351.464L22.9725 360.536C48.2862 327.209 70.2682 286.858 89.2147 248.665C108.392 210.005 124.058 174.452 137.587 148.706C144.321 135.892 150.114 126.343 155.046 120.588C157.532 117.687 159.356 116.285 160.489 115.732C160.991 115.487 161.173 115.5 161.097 115.503C161.059 115.504 160.996 115.501 160.925 115.486C160.855 115.471 160.822 115.453 160.835 115.46C160.972 115.528 162.078 116.218 163.67 119.265C165.202 122.197 166.805 126.584 168.379 132.803C171.521 145.221 174.251 163.723 176.529 189.656L191.471 188.344Z" fill="black" />
      </svg>

      <svg ref={arrow3Ref} width="264" height="363" viewBox="0 0 264 363" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowContainer3}>
        <path className={styles.arrowStroke} d="M67.6299 3.47052C65.1283 0.169086 60.424 -0.479339 57.1226 2.02222L3.32261 42.7875C0.0211792 45.2891 -0.627246 49.9934 1.87432 53.2948C4.37588 56.5962 9.08014 57.2447 12.3816 54.7431L60.2038 18.5073L96.4396 66.3295C98.9412 69.6309 103.645 70.2793 106.947 67.7778C110.248 65.2762 110.897 60.5719 108.395 57.2705L67.6299 3.47052ZM111.652 362.454C111.257 298.319 126.856 267.22 145.307 253.926C163.618 240.732 187.621 243.079 209.105 252.963C219.704 257.84 229.193 264.359 236.315 271.05C243.641 277.933 247.684 284.258 248.726 288.534C249.208 290.514 248.905 291.427 248.724 291.777C248.568 292.075 247.994 292.955 245.684 293.766C240.588 295.554 230.133 295.881 211.826 291.689L208.478 306.311C227.296 310.619 241.322 311.193 250.651 307.919C255.553 306.199 259.677 303.221 262.029 298.702C264.355 294.235 264.368 289.372 263.3 284.985C261.24 276.526 254.712 267.753 246.585 260.118C238.253 252.291 227.406 244.872 215.374 239.337C191.596 228.396 161.154 224.019 136.538 241.756C112.061 259.392 96.2475 296.881 96.6522 362.546L111.652 362.454ZM211.826 291.689C174.991 283.256 151.77 274.189 137.641 264.755C123.866 255.557 119.178 246.357 118.341 237.018C117.436 226.92 120.871 215.425 126.333 201.383C131.59 187.871 138.693 172.093 143.147 155.438L128.657 151.562C124.486 167.157 117.995 181.442 112.353 195.945C106.917 209.919 102.149 224.392 103.401 238.357C104.72 253.081 112.547 266.036 129.312 277.23C145.721 288.186 171.063 297.744 208.478 306.311L211.826 291.689ZM143.147 155.438C145.425 146.921 146.007 139.504 143.568 133.496C140.862 126.833 135.295 123.781 129.957 122.332C124.95 120.973 118.949 120.7 113.68 120.409C108.058 120.098 102.586 119.761 97.274 118.608C92.0434 117.473 87.2464 115.597 83.0541 112.379C78.9012 109.192 74.9636 104.4 71.8567 96.8551C65.5129 81.4503 62.761 54.8813 69.0818 9.0241L54.2223 6.9759C47.7932 53.6187 50.1039 83.4247 57.9867 102.567C61.9932 112.296 67.4599 119.32 73.9213 124.279C80.3434 129.208 87.3706 131.808 94.0932 133.267C100.734 134.708 107.345 135.082 112.852 135.386C118.713 135.71 122.89 135.957 126.027 136.808C128.833 137.57 129.378 138.421 129.67 139.139C130.227 140.512 130.692 143.954 128.657 151.562L143.147 155.438Z" fill="black" />
      </svg>

      {isModalOpen && (
        <div ref={modalRef} className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              X
            </button>
            <form ref={formRef} className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="prenom">Prénom</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="prenom" name="prenom" required />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} name="message" rows={5} required></textarea>
              </div>
              <button type="submit" className={styles.submitButton}>
                Envoyer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
