import { notFound } from "next/navigation";
import { pageOutlines } from "@/lib/page-structure";
import { PageOutlineView } from "@/components/page-outline";

export function generateStaticParams() {
  return Object.keys(pageOutlines).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: pageOutlines[slug]?.title ?? "Page Not Found",
    robots: { index: false, follow: false },
  };
}
export default async function OutlinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const outline = pageOutlines[slug];
  if (!outline) notFound();
  return <PageOutlineView outline={outline} />;
}
