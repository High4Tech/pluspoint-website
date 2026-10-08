import { services } from "./site-content";

export type OutlineSection = {
  title: string;
  text?: string;
  links?: { title: string; href: string }[];
};
export type PageOutline = { title: string; sections: OutlineSection[] };
const serviceLinks = services.map((service) => ({
  title: service.title,
  href: `/${service.slug}/`,
}));

export const pageOutlines: Record<string, PageOutline> = {
  services: {
    title: "Crew Services",
    sections: [
      { title: "Service overview", links: serviceLinks },
      { title: "Scope & crew requirements" },
      { title: "Deployment process" },
      {
        title: "Project enquiry",
        links: [{ title: "Discuss your requirements", href: "/#enquiry" }],
      },
    ],
  },
  "about-us": {
    title: "About Plus Point Gulf",
    sections: [
      {
        title: "Company overview",
        text: "Event crew and specialist site support in Saudi Arabia and the United Arab Emirates.",
      },
      { title: "Our team" },
      { title: "How we work" },
      { title: "Regional coverage" },
      { title: "Site standards" },
    ],
  },
  project: {
    title: "Projects",
    sections: [
      { title: "Project overview" },
      { title: "Event crew projects" },
      { title: "Stage & production projects" },
      { title: "Site infrastructure projects" },
      {
        title: "Project details",
        links: [
          {
            title: "Project detail structure",
            href: "/project/project-detail/",
          },
        ],
      },
    ],
  },
  "portfolio-2": {
    title: "Gallery",
    sections: [
      { title: "Event crew" },
      { title: "Stage & production" },
      { title: "Overlay & site work" },
      { title: "Tents, structures & scaffolding" },
      { title: "Carpentry" },
    ],
  },
  "contact-us": {
    title: "Contact Us",
    sections: [
      {
        title: "Saudi Arabia",
        text: "Al Shumaisi Riyadh, Saudi Arabia",
        links: [
          { title: "Riyadh: +966 54 056 0097", href: "tel:+966540560097" },
          {
            title: "operations@pluspointgulf.com",
            href: "mailto:operations@pluspointgulf.com",
          },
        ],
      },
      {
        title: "United Arab Emirates",
        text: "Bur Dubai, Dubai, UAE.",
        links: [
          { title: "Dubai: +971 56 538 8457", href: "tel:+971565388457" },
          {
            title: "operations@pluspointgulf.com",
            href: "mailto:operations@pluspointgulf.com",
          },
        ],
      },
      {
        title: "Project brief",
        links: [{ title: "Prepare a project enquiry", href: "/#enquiry" }],
      },
    ],
  },
  coverage: {
    title: "Regional Coverage",
    sections: [
      { title: "Saudi Arabia" },
      { title: "United Arab Emirates" },
      { title: "Deployment arrangements" },
      { title: "Site access & logistics" },
    ],
  },
  safety: {
    title: "Safety & Site Standards",
    sections: [
      { title: "Site coordination" },
      { title: "Induction & access" },
      { title: "Role-specific requirements" },
      { title: "PPE & equipment" },
      { title: "Documentation" },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    sections: [
      { title: "Who we are" },
      { title: "Information provided in an enquiry" },
      { title: "How information is used" },
      { title: "Retention & security" },
      { title: "Your choices & contact details" },
      { title: "Cookies & third-party services" },
    ],
  },
};
for (const service of services) {
  pageOutlines[service.slug] = {
    title: service.title,
    sections: [
      { title: "Overview", text: service.description },
      { title: "Service scope", text: service.scope },
      { title: "Crew roles & requirements" },
      { title: "Typical deployment" },
      { title: "Site requirements" },
      {
        title: "Related services",
        links: serviceLinks.filter((link) => link.href !== `/${service.slug}/`),
      },
      {
        title: "Project enquiry",
        links: [{ title: "Discuss this service", href: "/#enquiry" }],
      },
    ],
  };
}
export const projectDetailOutline: PageOutline = {
  title: "Project Details",
  sections: [
    { title: "Project overview" },
    { title: "Location & dates" },
    { title: "Client brief" },
    { title: "Scope of work" },
    { title: "Crew & deployment" },
    { title: "Project images" },
    { title: "Outcome" },
    { title: "Related services", links: serviceLinks },
  ],
};
