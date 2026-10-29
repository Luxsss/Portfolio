import type { ReactNode } from "react";
import { SiteDocument, buildMetadata } from "../document";

export const metadata = buildMetadata("fr");

export default function FrenchLayout({ children }: { children: ReactNode }) {
  return <SiteDocument locale="fr">{children}</SiteDocument>;
}
