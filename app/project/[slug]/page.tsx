import { notFound } from "next/navigation";
import { PageOutlineView } from "@/components/page-outline";
import { projectDetailOutline } from "@/lib/page-structure";
import { workProjects } from "@/lib/experience-content";
import { ProjectDetailPage } from "@/components/experience-pages";

export async function generateMetadata({ params }: { params: Promise<{slug:string}> }) {
  const {slug} = await params;
  const project = workProjects.find(item => item.slug === slug);
  const galleryTitles: Record<string,string> = {
    "the-corporate-stage": "The corporate stage",
    "ready-for-the-live-moment": "Ready for the live moment",
    "built-from-the-ground-up": "Built from the ground up",
  };
  return {title:project?.title[0] || galleryTitles[slug] || "Project Details",description:project?.copy[0],robots:{index:false,follow:false}};
}
export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (
    workProjects.some((project) => project.slug === slug) ||
    [
      "the-corporate-stage",
      "ready-for-the-live-moment",
      "built-from-the-ground-up",
    ].includes(slug)
  )
    return <ProjectDetailPage slug={slug} />;
  if (slug !== "project-detail") notFound();
  return <PageOutlineView outline={projectDetailOutline} />;
}
