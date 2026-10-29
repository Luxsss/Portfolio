import Navbar from "@/components/Navbar"
import Header from "@/components/Header"
import AboutMe from "@/components/AboutMe"
import Timeline from "@/components/Timeline"
import Stack from "@/components/Stack"
import Projects from "@/components/Projects"
import GitHubActivity from "@/components/GitHubActivity"
import DodgeGame from "@/components/DodgeGame"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import Ligne from "@/components/Ligne"
import { getDictionary, getProjects, type Locale } from "@/content"
import { getGitHubActivity } from "@/lib/github"

export default async function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const github = await getGitHubActivity()

  return (
    // overflow-clip stops the very tall red line from stretching the page past the footer.
    <div className="relative overflow-clip">
      <Ligne />
      <Navbar t={t.nav} />
      <main>
        <Header t={t.hero} />
        <AboutMe t={t.about} />
        <Timeline t={t.timeline} />
        <Stack t={t.stack} />
        <Projects t={t.projects} projects={getProjects(locale)} />
        {github && <GitHubActivity t={t.github} activity={github} locale={locale} />}
        <DodgeGame t={t.game} />
        <Contact t={t.contact} />
      </main>
      <Footer t={t.footer} nav={t.nav} />
    </div>
  )
}
