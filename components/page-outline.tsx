"use client";
import { SiteHeader, SiteFooter } from "./site-shell";
import { useLanguage } from "./language-provider";
import type { PageOutline } from "@/lib/page-structure";

export function PageOutlineView({ outline }: { outline: PageOutline }) {
  const { t, href } = useLanguage();
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="container structure-page">
        <p className="breadcrumb">
          <a href={href("/")}>{t("Home")}</a> / {t(outline.title)}
        </p>
        <h1>{t(outline.title)}</h1>
        <nav className="outline-nav" aria-label={t("On this page")}>
          {outline.sections.map((section, index) => (
            <a key={section.title} href={`#section-${index}`}>
              {t(section.title)}
            </a>
          ))}
        </nav>
        {outline.sections.map((section, index) => (
          <section id={`section-${index}`} key={section.title}>
            <h2>{t(section.title)}</h2>
            {section.text && <p>{t(section.text)}</p>}
            {section.links && (
              <ul>
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a href={href(link.href)}>{t(link.title)}</a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <a className="return-link" href={href("/")}>
          {t("Return to landing page")}
        </a>
      </main>
      <SiteFooter />
    </>
  );
}
