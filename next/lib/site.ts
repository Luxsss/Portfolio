export const SITE_URL = "https://alexisbn.com";
export const EMAIL = "alexsdev@outlook.fr";
export const CV_PATH = "/download/CvAlexisBrunCom.pdf";
export const GITHUB_URL = "https://github.com/Luxsss";
export const LINKEDIN_URL = "https://www.linkedin.com/in/alexs-brun/";

export type SocialIcon = "github" | "linkedin" | "mail";

export const SOCIALS: { label: string; href: string; icon: SocialIcon }[] = [
  { label: "GitHub", href: GITHUB_URL, icon: "github" },
  { label: "LinkedIn", href: LINKEDIN_URL, icon: "linkedin" },
  { label: "Email", href: `mailto:${EMAIL}`, icon: "mail" },
];
