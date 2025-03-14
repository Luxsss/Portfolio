import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import AboutMe from "@/components/AboutMe";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer/index"
import Ligne from "@/components/Ligne"

export default function Home() {
  return (
    <div>
      <Ligne />
      <Navbar />
      <Header />
      <AboutMe />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
