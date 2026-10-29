import type { ReactNode } from "react";
import { SiteDocument, buildMetadata } from "../../document";

export const metadata = buildMetadata("en");

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <SiteDocument locale="en">{children}</SiteDocument>;
}
