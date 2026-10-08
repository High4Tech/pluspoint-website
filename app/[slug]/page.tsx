import { notFound } from "next/navigation";
import { pageOutlines } from "@/lib/page-structure";
import { PageOutlineView } from "@/components/page-outline";
import {
  ServicesPage,
  ServiceDetailPage,
  AboutPage,
  ProjectsPage,
  ContactPage,
} from "@/components/experience-pages";
import { services } from "@/lib/site-content";

export function generateStaticParams() {
  return [...Object.keys(pageOutlines), "portfolio"].map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: slug === "portfolio" ? "Portfolio" : pageOutlines[slug]?.title ?? "Page Not Found",
    robots: { index: false, follow: false },
  };
}
export default async function OutlinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "services") return <ServicesPage />;
  if (services.some((service) => service.slug === slug))
    return <ServiceDetailPage slug={slug} />;
  if (slug === "about-us") return <AboutPage />;
  if (slug === "project") return <ProjectsPage />;
  if (slug === "portfolio-2" || slug === "portfolio")
    return <ProjectsPage portfolio />;
  if (slug === "contact-us") return <ContactPage />;
  const outline = pageOutlines[slug];
  if (!outline) notFound();
  return <PageOutlineView outline={outline} />;
}
