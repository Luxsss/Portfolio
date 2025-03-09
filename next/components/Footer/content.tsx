"use client"
import styles from "./style.module.css"

export default function Content() {
  return (
    <div className="bg-[#2C2A27] py-8 px-4 sm:px-12 h-full w-full flex flex-col justify-center items-center md:items-stretch">
      <Section1 />
    </div>
  )
}

const Section1 = () => {
  return (
    <div className={`flex flex-col md:flex-row md:justify-between items-center md:items-end gap-6 md:gap-0 ${styles.footerContainer}`}>
      <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
        <div className="mb-4 sm:mb-0 sm:mx-5">
          <p className={styles.footer}>VERSION</p>
          <p className="text-[#edebe9] text-base sm:text-xl">2025 © Edition</p>
        </div>
        <div className="sm:mx-5">
          <p className={styles.footer}>LOCAL TIME</p>
          <p className="text-[#edebe9] text-base sm:text-xl">23:00 PM GMT+2</p>
        </div>
      </div>
      <div className="text-center md:text-left">
        <p className={styles.footer}>SOCIALS</p>
        <ul className="flex justify-center md:justify-between items-center">
          <li className={"text-[#edebe9]"}>
            <a href="https://github.com/Luxsss" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-github fa-lg"></i>
            </a>
          </li>
          <li className={"ml-5 text-[#edebe9]"}>
            <a href="https://www.linkedin.com/in/alexs-brun/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-linkedin-in fa-lg"></i>
            </a>
          </li>
          <li className={"ml-5 text-[#edebe9]"}>
            <a href="mailto:alexis1.brun@epitech.eu">
              <i className="fa-solid fa-paper-plane fa-lg"></i>
            </a>
          </li>
          <li className={"ml-5 text-[#edebe9]"}>
            <a href="mailto:alexis1.brun@epitech.eu">
              CV
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
