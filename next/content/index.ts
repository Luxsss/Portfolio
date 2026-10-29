import { fr } from "./fr";
import { en } from "./en";
import type { Dictionary, Locale } from "./types";

export { getProjects } from "./projects";
export type { Dictionary, Locale, Project, ProjectContext } from "./types";

export function getDictionary(locale: Locale): Dictionary {
  return locale === "en" ? en : fr;
}
