import { notFound } from "next/navigation";
import { PageOutlineView } from "@/components/page-outline";
import { projectDetailOutline } from "@/lib/page-structure";

export const metadata = {
  title: "Project Details",
  robots: { index: false, follow: false },
};
export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== "project-detail") notFound();
  return <PageOutlineView outline={projectDetailOutline} />;
}
