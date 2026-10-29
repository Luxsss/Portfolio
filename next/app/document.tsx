import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/content";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, SITE_URL } from "@/lib/site";
import { nohemi } from "./fonts";
import "./globals.css";

const OG_IMAGE = "/images/image1.webp";

export function buildMetadata(locale: Locale): Metadata {
  const { meta } = getDictionary(locale);
  const url = locale === "en" ? `${SITE_URL}/en` : SITE_URL;

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    keywords: [
      "Alexis Brun",
      "Alexis-Dominique Brun",
      "Alexis Dominique Brun",
      "développeur full-stack",
      "full-stack developer",
      "développeur web",
      "web developer",
      "portfolio",
      "React",
      "Next.js",
      "Symfony",
      "Node.js",
      "TypeScript",
      "Epitech",
      "Web Académie",
    ],
    authors: [{ name: "Alexis Brun", url: SITE_URL }],
    creator: "Alexis Brun",
    alternates: {
      canonical: locale === "en" ? "/en" : "/",
      languages: { fr: "/", en: "/en", "x-default": "/" },
    },
    formatDetection: { email: false, telephone: false },
    openGraph: {
      type: "website",
      locale: meta.ogLocale,
      url,
      siteName: "Alexis Brun",
      title: meta.title,
      description: meta.description,
      images: [{ url: OG_IMAGE, alt: meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    verification: { google: "Ci5l2MeTzLStUjiQFtogwr4rnDqX3K1SdZnb92d_7KY" },
  };
}

// Shared <html> shell for the French and English root layouts.
export function SiteDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alexis Brun",
    url: SITE_URL,
    image: `${SITE_URL}${OG_IMAGE}`,
    email: `mailto:${EMAIL}`,
    jobTitle: getDictionary(locale).meta.jobTitle,
    knowsAbout: ["JavaScript", "TypeScript", "React", "Next.js", "PHP", "Symfony", "Node.js"],
    sameAs: [GITHUB_URL, LINKEDIN_URL],
  };

  return (
    <html lang={locale} className={nohemi.variable} suppressHydrationWarning>
      <head>
        {/* Lets CSS hide the hero intro before hydration, without hiding it when JS is off. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="antialiased">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
