export type Locale = "fr" | "en";

export type ProjectContext = "epitech" | "perso" | "alternance";

export interface Project {
  slug: string;
  title: string;
  image: string;
  year: string;
  context: ProjectContext;
  featured: boolean;
  private: boolean;
  technologies: string[];
  links: { code?: string; live?: string; play?: string };
  description: string;
  // Optional: the "Détails" button only shows for projects that have them.
  details?: { context: string; did: string[]; learned: string[] };
}

interface NavLink {
  href: string;
  label: string;
}

// Every string a visitor can read. Placeholders use the markers checked by scripts/check-content.mjs.
// Strings with {name} slots are filled with lib/format.ts.
export interface Dictionary {
  meta: { title: string; description: string; ogAlt: string; ogLocale: string; jobTitle: string };
  nav: {
    links: NavLink[];
    open: string;
    close: string;
    menuLabel: string;
    home: string;
    cv: string;
    switchLanguage: { href: string; label: string; lang: Locale };
  };
  hero: {
    name: string;
    lines: [string, string];
    intro: string;
    photoMainAlt: string;
    photoSmallAlt: string;
  };
  about: {
    title: string;
    text: string;
    now: { title: string; items: { label: string; value: string }[] };
  };
  timeline: {
    title: string;
    entries: { period: string; title: string; place: string; text: string }[];
  };
  stack: { title: string; groups: { front: string; back: string; tools: string } };
  projects: {
    title: string;
    contexts: Record<ProjectContext, string>;
    privateCode: string;
    techLabel: string;
    details: string;
    viewCode: string;
    viewSite: string;
    play: string;
    close: string;
    headings: { context: string; did: string; learned: string };
  };
  github: {
    title: string;
    intro: string;
    contributions: string;
    recent: string;
    noDescription: string;
    pushed: string;
    profile: string;
    day: string;
    byMonth: string;
    less: string;
    more: string;
  };
  game: {
    title: string;
    intro: string;
    controls: string;
    arenaLabel: string;
    play: string;
    replay: string;
    resume: string;
    paused: string;
    score: string;
    breakdown: string;
    best: string;
    newBest: string;
    cta: string;
  };
  contact: {
    title: string;
    lead: string;
    button: string;
    copy: string;
    copied: string;
    dialogTitle: string;
    sentTitle: string;
    sentText: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    close: string;
    error: string;
  };
  footer: {
    navigation: string;
    socials: string;
    edition: string;
    time: string;
    backToTop: string;
  };
}
