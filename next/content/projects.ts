import type { Locale, Project, ProjectContext } from "./types";

type ProjectText = Pick<Project, "title" | "description" | "details">;

interface ProjectEntry extends Omit<Project, keyof ProjectText> {
  text: Record<Locale, ProjectText>;
}

const epitech: ProjectContext = "epitech";
const perso: ProjectContext = "perso";

// Order here is the display order; the featured project is always shown first.
// Years and contexts are guesses from repo dates and screenshots (à vérifier).
// To add a "Détails" sheet, give a project `details: { context, did: [...], learned: [...] }` in both languages.
const PROJECTS: ProjectEntry[] = [
  {
    slug: "runelith",
    image: "/images/projects/ror.webp",
    year: "2025",
    context: epitech,
    featured: true,
    private: true,
    technologies: ["Ruby", "Ruby on Rails", "JavaScript", "Tailwind"],
    links: {},
    text: {
      fr: {
        title: "Runelith",
        description: "Un jeu de stratégie au tour par tour dans un univers médiéval-fantastique.",
      },
      en: {
        title: "Runelith",
        description: "A turn-based strategy game set in a medieval fantasy world.",
      },
    },
  },
  {
    slug: "portfolio",
    image: "/images/projects/portfolio.webp",
    year: "2025",
    context: epitech,
    featured: false,
    private: false,
    technologies: ["Next.js", "React", "GSAP", "TypeScript", "CSS"],
    links: { code: "https://github.com/Luxsss/Portfolio" },
    text: {
      fr: {
        title: "Portfolio",
        description: "Ce site : Next.js, animations GSAP pilotées par le scroll et un mini-jeu jouable.",
      },
      en: {
        title: "Portfolio",
        description: "This site: Next.js, scroll-driven GSAP animations and a playable mini-game.",
      },
    },
  },
  {
    slug: "dodge",
    image: "/images/projects/dodge.webp",
    year: "2024",
    context: perso,
    featured: false,
    private: false,
    technologies: ["JavaScript", "HTML", "CSS"],
    links: { code: "https://github.com/Luxsss/Dodge", play: "#game" },
    text: {
      fr: {
        title: "Dodge Game",
        description:
          "Un jeu où il faut survivre le plus longtemps possible en esquivant des traits qui apparaissent et se déplacent à des vitesses aléatoires.",
      },
      en: {
        title: "Dodge Game",
        description: "A survival game: dodge lines that appear and move at random speeds for as long as you can.",
      },
    },
  },
  {
    slug: "previously-on",
    image: "/images/projects/previouslyOn.webp",
    year: "2025",
    context: epitech,
    featured: false,
    private: true,
    technologies: ["Next.js", "Tailwind", "TypeScript"],
    links: {},
    text: {
      fr: {
        title: "Previously On",
        description: "Application pour suivre et organiser vos visionnages de films, séries et anime.",
      },
      en: {
        title: "Previously On",
        description: "An app to track and organise the films, series and anime you watch.",
      },
    },
  },
  {
    slug: "my-irc",
    image: "/images/projects/my_irc.webp",
    year: "2025",
    context: epitech,
    featured: false,
    private: true,
    technologies: ["Socket.io", "React", "CSS"],
    links: {},
    text: {
      fr: {
        title: "My IRC",
        description:
          "Messagerie instantanée inspirée d'IRC, utilisant Socket.io et React pour une communication en temps réel.",
      },
      en: {
        title: "My IRC",
        description: "An IRC-inspired instant messaging app using Socket.io and React for real-time chat.",
      },
    },
  },
  {
    slug: "puissance-4",
    image: "/images/projects/puissance4.webp",
    year: "2024",
    context: epitech,
    featured: false,
    private: false,
    technologies: ["JavaScript", "HTML", "CSS"],
    links: { code: "https://github.com/Luxsss/Puissance4", live: "https://luxsss.github.io/Puissance4/" },
    text: {
      fr: {
        title: "Puissance 4",
        description:
          "Jeu classique de Puissance 4 en HTML, CSS et JavaScript, où l'objectif est d'aligner quatre jetons.",
      },
      en: {
        title: "Connect Four",
        description: "The classic Connect Four in HTML, CSS and JavaScript: line up four tokens to win.",
      },
    },
  },
];

export function getProjects(locale: Locale): Project[] {
  return PROJECTS.map(({ text, ...project }) => ({ ...project, ...text[locale] })).sort(
    (a, b) => Number(b.featured) - Number(a.featured),
  );
}
