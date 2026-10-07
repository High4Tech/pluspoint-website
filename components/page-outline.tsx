import { SiteHeader, SiteFooter } from "./site-shell";
import type { PageOutline } from "@/lib/page-structure";

export function PageOutlineView({ outline }: { outline: PageOutline }) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="container structure-page">
        <p className="breadcrumb">
          <a href="/">Home</a> / {outline.title}
        </p>
        <h1>{outline.title}</h1>
        <nav className="outline-nav" aria-label="On this page">
          {outline.sections.map((section, index) => (
            <a key={section.title} href={`#section-${index}`}>
              {section.title}
            </a>
          ))}
        </nav>
        {outline.sections.map((section, index) => (
          <section id={`section-${index}`} key={section.title}>
            <h2>{section.title}</h2>
            {section.text && <p>{section.text}</p>}
            {section.links && (
              <ul>
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.title}</a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <a className="return-link" href="/">
          Return to landing page
        </a>
      </main>
      <SiteFooter />
    </>
  );
}
