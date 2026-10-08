"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Check,
  MapPin,
  Mail,
  Phone,
  Plus,
  Quote,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "./site-shell";
import { useLanguage } from "./language-provider";
import { useMotionPreference } from "./motion-preference";
import {
  BehindTheBuild,
  WhatsAppLink,
  ClientShowcase,
} from "./brand-experience";
import { LandingFaq, EnquiryForm } from "./landing-interactions";
import { ProcessStory } from "./process-story";
import { ProjectLink } from "./project-link";
import { featuredProjects } from "./project-showcase";
import { services } from "@/lib/site-content";
import {
  serviceStories,
  workProjects,
  journey,
  companyValues,
  team,
} from "@/lib/experience-content";

gsap.registerPlugin(ScrollTrigger);

export function ExperienceFrame({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const { reduceMotion } = useMotionPreference();
  useEffect(() => {
    if (!root.current || reduceMotion) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".experience-hero-content > *", {
          y: 28,
          opacity: 0,
          stagger: 0.11,
          duration: 0.85,
          ease: "power3.out",
        });
        gsap.to(".experience-hero > img", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: ".experience-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        root.current
          ?.querySelectorAll<HTMLElement>("[data-photo-motion]")
          .forEach((element, index) => {
            gsap.fromTo(
              element,
              {
                rotate: (index % 2 ? 2 : -2) * (language === "ar" ? -1 : 1),
                y: 35,
              },
              {
                rotate: 0,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: element,
                  start: "top 95%",
                  end: "center 55%",
                  scrub: 0.8,
                },
              },
            );
          });
      }, root);
      return () => context.revert();
    });
    const refresh = () => ScrollTrigger.refresh();
    void document.fonts.ready.then(refresh);
    return () => media.revert();
  }, [language, reduceMotion]);
  return (
    <>
      <SiteHeader cinematic inner />
      <main id="main-content" ref={root} className="landing-v3 experience-page">
        {children}
      </main>
      <SiteFooter />
      <WhatsAppLink />
    </>
  );
}

export function PageHero({
  title,
  text,
  image,
  caption,
  children,
}: {
  title: string;
  text: string;
  image: string;
  caption?: string;
  children?: ReactNode;
}) {
  const { t, href } = useLanguage();
  return (
    <section className="experience-hero">
      <img src={image} alt="" width="1600" height="900" fetchPriority="high" />
      <div className="experience-hero-shade" />
      <div className="pp-wrap experience-hero-content">
        <a className="pp-text-link" href={href("/")}>
          {t("Plus Point Gulf")}
          <ArrowUpRight size={18} />
        </a>
        <h1>{title}</h1>
        <p>{text}</p>
        {children}
      </div>
      {caption && <span className="experience-hero-caption">{caption}</span>}
    </section>
  );
}

export function LeadershipQuote() {
  const { t } = useLanguage();
  return (
    <section className="leadership-quote" aria-labelledby="quote-heading">
      <div className="pp-wrap quote-layout">
        <div className="quote-intro">
          <Quote size={52} fill="currentColor" aria-hidden="true" />
          <h2 id="quote-heading">{t("In their words.", "بكلماتهم.")}</h2>
          <p>{t("From our leadership", "من قيادتنا")}</p>
        </div>
        <figure>
          <blockquote>
            {t(
              "Our goal is not only to complete the job, but to deliver it with excellence and responsibility. We believe that our success depends on our clients' satisfaction.",
              "هدفنا ليس فقط إتمام العمل، بل إنجازه بإتقان ومسؤولية. نؤمن بأن نجاحنا يعتمد على رضا عملائنا.",
            )}
          </blockquote>
          <figcaption>
            <strong>{t("Amir Saleem", "أمير سليم")}</strong>
            <span>{t("Managing Director", "المدير العام")}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function NextConversation({ title, text }: { title?: string; text?: string }) {
  const { t, href } = useLanguage();
  return (
    <section className="experience-conversation">
      <div className="pp-wrap conversation-layout">
        <div>
          <h2>
            {title ||
              t(
                "Your next brief. Our next conversation.",
                "مشروعك القادم. محادثتنا القادمة.",
              )}
          </h2>
          <p>
            {text ||
              t(
                "Share the venue, dates and work you need covered. We will bring the right disciplines together around your production.",
                "شارك الموقع والمواعيد والمهام المطلوبة. نجمع التخصصات المناسبة حول إنتاجك.",
              )}
          </p>
        </div>
        <a className="pp-cta" href={href("/contact-us/#enquiry")}>
          {t("Discuss your project", "ناقش مشروعك")}
          <ArrowUpRight size={25} />
        </a>
      </div>
    </section>
  );
}

export function ServicesPage() {
  const { t, language, href } = useLanguage();
  const locale = language === "ar" ? 1 : 0;
  return (
    <ExperienceFrame>
      <PageHero
        title={t("Crew services.", "خدمات الطواقم.")}
        image="/images/banners/event-crew.webp"
        text={t(
          "Specialised teams for live events, site overlays and corporate productions. Six connected disciplines, from the first load-in to the final load-out.",
          "فرق متخصصة للفعاليات وتجهيز المواقع والإنتاج المؤسسي. ستة تخصصات مترابطة، من إدخال أول قطعة معدات إلى إخراج آخرها.",
        )}
      >
        <a className="pp-cta" href="#disciplines">
          {t("Explore the disciplines", "اكتشف التخصصات")}
          <ArrowUpRight size={24} />
        </a>
      </PageHero>
      <section
        className="experience-section service-directory"
        id="disciplines"
      >
        <div className="pp-wrap">
          <div className="editorial-intro">
            <h2>
              {t(
                "One crew partner. Every phase covered.",
                "شريك طواقم واحد. لكل مراحل العمل.",
              )}
            </h2>
            <p>
              {t(
                "Bring your event scope, schedule and site requirements. Choose a discipline below to see the practical work, planning process and details we need to shape your crew brief.",
                "شارك نطاق الفعالية وجدولها ومتطلبات الموقع. اختر تخصصاً أدناه للتعرف على المهام وخطوات التخطيط والتفاصيل التي نحتاجها لإعداد ملخص الطاقم.",
              )}
            </p>
          </div>
          <div className="service-directory-grid">
            {serviceStories.map((story, index) => (
              <article key={story.slug} className="discipline-entry">
                <a
                  className="discipline-photo"
                  href={href(`/${story.slug}/`)}
                  data-photo-motion
                >
                  <img
                    src={`/images/${story.image}`}
                    alt={t(services[index].title)}
                    width="1200"
                    height="900"
                    loading="lazy"
                  />
                  <span>
                    <Plus size={25} />
                    {t(services[index].title)}
                  </span>
                </a>
                <div>
                  <h3>
                    <a href={href(`/${story.slug}/`)}>
                      {t(services[index].title)}
                      <ArrowUpRight size={24} />
                    </a>
                  </h3>
                  <p>{story.intro[locale]}</p>
                  <p className="discipline-scope">
                    {story.capabilities
                      .slice(0, 3)
                      .map((item) => item[locale])
                      .join(" / ")}
                  </p>
                  <a className="pp-cta cta-blue" href={href(`/${story.slug}/`)}>
                    {t("Explore this service", "اكتشف هذه الخدمة")}
                    <ArrowUpRight size={21} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ProcessStory />
      <LeadershipQuote />
      <NextConversation />
    </ExperienceFrame>
  );
}

export function ServiceDetailPage({ slug }: { slug: string }) {
  const { t, language, href } = useLanguage();
  const locale = language === "ar" ? 1 : 0;
  const index = serviceStories.findIndex((story) => story.slug === slug);
  const story = serviceStories[index];
  return (
    <ExperienceFrame>
      <PageHero
        title={t(services[index].title)}
        text={story.bannerIntro[locale]}
        image={`/images/banners/${story.bannerImage}.webp`}
      >
        <a
          className="pp-cta"
          href={href(`/contact-us/?service=${slug}#enquiry`)}
        >
          {t("Request this service", "اطلب هذه الخدمة")}
          <ArrowUpRight size={24} />
        </a>
      </PageHero>
      <section className="experience-section">
        <div className="pp-wrap service-detail-layout">
          <div className="service-detail-heading">
            <a className="pp-text-link" href={href("/services/")}>
              {t("All services", "كل الخدمات")}
              <ArrowUpRight size={20} />
            </a>
            <h2>{story.headline[locale]}</h2>
            <span className="detail-symbol logo-symbol" aria-hidden="true" />
          </div>
          <div>
            <p className="lead">{story.body[locale]}</p>
            <h3>{t("What we support", "الأعمال التي ندعمها")}</h3>
            <ul className="capability-list">
              {story.capabilities.map((item) => (
                <li key={item[0]}>
                  <Check size={21} />
                  {item[locale]}
                </li>
              ))}
            </ul>
            <p>
              {t(
                "Crew availability, specialist responsibilities, equipment and site requirements are agreed with the team before deployment.",
                "يتم الاتفاق على توفر الطاقم والمسؤوليات المتخصصة والمعدات ومتطلبات الموقع مع الفريق قبل بدء العمل.",
              )}
            </p>
          </div>
        </div>
      </section>
      <section className="service-plan experience-section">
        <div className="pp-wrap">
          <div className="editorial-intro">
            <h2>{t("From plan to handover.", "من الخطة إلى التسليم.")}</h2>
            <p>
              {t(
                "A connected sequence. Each phase prepares the next, with your programme and site lead at the centre.",
                "تسلسل مترابط. تمهد كل مرحلة لما بعدها، مع برنامجك ومسؤول الموقع في قلب العمل.",
              )}
            </p>
          </div>
          <ol className="service-step-list">
            {story.steps.map((step, i) => (
              <li key={step[0]}>
                <span aria-hidden="true">0{i + 1}</span>
                <h3>{step[locale]}</h3>
                <p>
                  {
                    [
                      t(
                        "Start with your venue, scope and dates.",
                        "ابدأ بالموقع والنطاق والمواعيد.",
                      ),
                      t(
                        "Align people, materials, shifts and access.",
                        "نسق الأشخاص والمواد والورديات والدخول.",
                      ),
                      t(
                        "Work with the agreed sequence and site leads.",
                        "اعمل وفق التسلسل المتفق عليه ومسؤولي الموقع.",
                      ),
                      t(
                        "Confirm the finish, remaining tasks and next phase.",
                        "أكد التشطيب والمهام المتبقية والمرحلة التالية.",
                      ),
                    ][i]
                  }
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="experience-section service-brief">
        <div className="pp-wrap conversation-layout">
          <div>
            <h2>{t("Let's shape your crew brief.", "لنعد ملخص الطاقم.")}</h2>
            <p>{story.brief[locale]}</p>
          </div>
          <a
            className="pp-cta"
            href={href(`/contact-us/?service=${slug}#enquiry`)}
          >
            {t("Discuss this service", "ناقش هذه الخدمة")}
            <ArrowUpRight size={24} />
          </a>
        </div>
      </section>
      <section className="experience-section related-services">
        <div className="pp-wrap">
          <h2>{t("Connected disciplines.", "تخصصات مترابطة.")}</h2>
          <div>
            {services
              .filter((item) => item.slug !== slug)
              .map((item) => (
                <a
                  className="pp-text-link"
                  key={item.slug}
                  href={href(`/${item.slug}/`)}
                >
                  {t(item.title)}
                  <ArrowUpRight size={22} />
                </a>
              ))}
          </div>
        </div>
      </section>
    </ExperienceFrame>
  );
}

function JourneyStory() {
  const root = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();
  const locale = language === "ar" ? 1 : 0;
  const { reduceMotion } = useMotionPreference();
  const [chapter, setChapter] = useState(0);
  useEffect(() => {
    if (reduceMotion) return;
    const media = gsap.matchMedia();
    media.add(
      "(min-width: 1000px) and (prefers-reduced-motion: no-preference)",
      () => {
        const triggers = Array.from(
          root.current?.querySelectorAll(".journey-chapter") || [],
        ).map((element, index) =>
          ScrollTrigger.create({
            trigger: element,
            start: "top center",
            end: "bottom center",
            onEnter: () => setChapter(index),
            onEnterBack: () => setChapter(index),
          }),
        );
        return () => triggers.forEach((trigger) => trigger.kill());
      },
    );
    return () => media.revert();
  }, [reduceMotion, language]);
  return (
    <section className="journey-story" ref={root}>
      <div className="pp-wrap journey-grid">
        <div className="journey-sticky">
          <span>{t("Our journey", "رحلتنا")}</span>
          <h2>
            {t(
              "Every great event starts with people.",
              "كل فعالية مميزة تبدأ بالأشخاص.",
            )}
          </h2>
          <div className="journey-photo" data-photo-motion>
            <img
              src={`/images/${["team.jpeg", "stage.jpeg", "crew.jpeg", "scaffolding.jpeg", "team.jpeg"][chapter]}`}
              alt={t(
                "Plus Point crew and event environments",
                "فريق بلس بوينت وبيئات الفعاليات",
              )}
              width="1200"
              height="900"
              loading="lazy"
            />
          </div>
          <span className="journey-current" aria-hidden="true">
            {journey[chapter].year}
          </span>
        </div>
        <div className="journey-chapters">
          {journey.map((item, index) => (
            <article
              key={item.year}
              className={`journey-chapter ${chapter === index ? "is-current" : ""}`}
            >
              <span className="journey-year">{item.year}</span>
              <h3>{item.title[locale]}</h3>
              <p>{item.copy[locale]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutPage() {
  const { t, language, href } = useLanguage();
  const locale = language === "ar" ? 1 : 0;
  return (
    <ExperienceFrame>
      <PageHero
        title={t("About Plus Point.", "عن بلس بوينت.")}
        image="/images/banners/about.webp"
        text={t(
          "The people behind the moment. Professional event crew and specialist manpower across Saudi Arabia and the United Arab Emirates.",
          "الأشخاص خلف اللحظة. طواقم فعاليات وكوادر متخصصة في المملكة العربية السعودية والإمارات العربية المتحدة.",
        )}
      >
        <a className="pp-cta" href="#our-story">
          {t("Our story", "قصتنا")}
          <ArrowUpRight size={24} />
        </a>
      </PageHero>
      <section className="experience-section" id="our-story">
        <div className="pp-wrap editorial-intro">
          <h2>
            {t(
              "Behind the scenes. Together on site.",
              "خلف الكواليس. معاً في الموقع.",
            )}
          </h2>
          <div>
            <p className="lead">
              {t(
                "Plus Point Crew Services Company supplies professional crew and manpower for events and projects in Saudi Arabia and the UAE.",
                "توفر شركة بلس بوينت لخدمات الطواقم كوادر مهنية للفعاليات والمشاريع في السعودية والإمارات.",
              )}
            </p>
            <p>
              {t(
                "We work behind the scenes with event organisers, production teams, contractors and venue operators. From concert builds to corporate spaces and exhibitions, our work connects the production plan with the people who bring it to life.",
                "نعمل خلف الكواليس مع منظمي الفعاليات وفرق الإنتاج والمقاولين ومشغلي المواقع. من تجهيز الحفلات إلى المساحات المؤسسية والمعارض، يربط عملنا خطة الإنتاج بالأشخاص الذين ينفذونها.",
              )}
            </p>
          </div>
        </div>
      </section>
      <JourneyStory />
      <section className="experience-section company-values">
        <div className="pp-wrap">
          <div className="editorial-intro">
            <h2>{t("The standards we work by.", "المبادئ التي نعمل بها.")}</h2>
            <p>
              {t(
                "Preparation matters. So does the way we work together, care for people and represent your production on site.",
                "الاستعداد مهم. وكذلك طريقة تعاوننا واهتمامنا بالأشخاص وتمثيل إنتاجك في الموقع.",
              )}
            </p>
          </div>
          <div className="values-grid">
            {companyValues.map((value) => (
              <article key={value[0]}>
                <Plus size={28} aria-hidden="true" />
                <h3>{value[locale]}</h3>
                <p>{value[locale + 2]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="people-section experience-section">
        <div className="pp-wrap">
          <div className="editorial-intro">
            <h2>{t("People who make it happen.", "أشخاص يصنعون الحدث.")}</h2>
            <p>
              {t(
                "Leadership, operations, technical support and site coordination. The names behind the working relationships.",
                "القيادة والعمليات والدعم الفني وتنسيق الموقع. أشخاص خلف علاقات العمل.",
              )}
            </p>
          </div>
          <figure className="people-photo" data-photo-motion>
            <img
              src="/images/team.jpeg"
              alt={t(
                "Plus Point crew in company uniforms",
                "طاقم بلس بوينت بزي الشركة",
              )}
              width="1200"
              height="900"
              loading="lazy"
            />
          </figure>
          <div className="team-directory">
            {team.map((person) => (
              <article key={person[0]}>
                <h3>{person[locale]}</h3>
                <p>{person[locale + 2]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="experience-section standards-band">
        <div className="pp-wrap editorial-intro">
          <h2>{t("Care is part of the work.", "العناية جزء من العمل.")}</h2>
          <div>
            <p>
              {t(
                "Health, safety and quality are central to a live site. Discuss induction, PPE, role-specific requirements and inspection arrangements as part of your project brief.",
                "الصحة والسلامة والجودة أساسية في الموقع. ناقش التعريف بالموقع ومعدات الوقاية ومتطلبات كل دور وترتيبات الفحص ضمن ملخص مشروعك.",
              )}
            </p>
            <p>
              {t(
                "Our teams support concerts, festivals, corporate events, conferences, exhibitions and trade shows. Every environment brings a different programme and a different set of practical needs.",
                "تدعم فرقنا الحفلات والمهرجانات والفعاليات المؤسسية والمؤتمرات والمعارض التجارية. لكل بيئة برنامج مختلف ومتطلبات عملية خاصة.",
              )}
            </p>
            <a className="pp-text-link" href={href("/services/")}>
              {t("Explore our crew services", "اكتشف خدمات طواقمنا")}
              <ArrowUpRight size={22} />
            </a>
          </div>
        </div>
      </section>
      <LeadershipQuote />
      <ClientShowcase />
      <NextConversation />
    </ExperienceFrame>
  );
}

const filters = [
  ["all", "All", "الكل"],
  ["concert", "Concerts", "الحفلات"],
  ["festival", "Festivals & sport", "المهرجانات والرياضة"],
  ["corporate", "Corporate", "الفعاليات المؤسسية"],
] as const;

export function ProjectsPage({ portfolio = false }: { portfolio?: boolean }) {
  const { t, language, href } = useLanguage();
  const locale = language === "ar" ? 1 : 0;
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    const restore = () => {
      const category = new URLSearchParams(location.search).get("category");
      setFilter(
        filters.some((item) => item[0] === category) ? category! : "all",
      );
    };
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);
  function chooseFilter(value: string) {
    setFilter(value);
    const url = new URL(location.href);
    if (value === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", value);
    history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }
  const list = useRef<HTMLDivElement>(null);
  const { reduceMotion } = useMotionPreference();
  const shown = workProjects.filter(
    (project) => filter === "all" || project.category === filter,
  );
  useEffect(() => {
    if (
      reduceMotion ||
      !list.current ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      gsap.fromTo(
        ".work-entry",
        { opacity: 0.25, y: 22 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power2.out" },
      );
      media.add("(min-width: 1000px)", () => {
        list.current
          ?.querySelectorAll(".project-link")
          .forEach((element, index) =>
            gsap.fromTo(
              element,
              { rotate: index % 2 ? 1.5 : -1.5, y: 35 },
              {
                rotate: 0,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: element,
                  start: "top bottom",
                  end: "center center",
                  scrub: 0.9,
                },
              },
            ),
          );
      });
    }, list);
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      media.revert();
      context.revert();
      cancelAnimationFrame(refresh);
    };
  }, [filter, reduceMotion]);
  return (
    <ExperienceFrame>
      <PageHero
        title={
          portfolio ? t("Portfolio.", "أعمالنا.") : t("Projects.", "المشاريع.")
        }
        image="/images/banners/projects.webp"
        text={
          portfolio
            ? t(
                "A closer look at stages, spaces and the work behind them. Explore the production environments from our published project selection.",
                "نظرة أقرب إلى المسارح والمساحات والعمل خلفها. اكتشف بيئات الإنتاج من مجموعة مشاريعنا المنشورة.",
              )
            : t(
                "Concerts, festivals, corporate productions and outdoor experiences. A selection from Plus Point's published project list.",
                "حفلات ومهرجانات وإنتاجات مؤسسية وتجارب خارجية. مجموعة من قائمة مشاريع بلس بوينت المنشورة.",
              )
        }
      >
        <a className="pp-cta" href="#project-collection">
          {t("Explore the work", "اكتشف الأعمال")}
          <ArrowUpRight size={24} />
        </a>
      </PageHero>
      <section
        className={`experience-section work-collection ${portfolio ? "portfolio-collection" : ""}`}
        id="project-collection"
      >
        <div className="pp-wrap">
          <div className="collection-top">
            <h2>
              {portfolio
                ? t("A view from behind the scenes.", "نظرة من خلف الكواليس.")
                : t(
                    "Different stages. One crew mindset.",
                    "مسارح مختلفة. روح فريق واحدة.",
                  )}
            </h2>
            <p>
              {t(
                "Project names and scopes are from our original website. Photographs are illustrative or from the company gallery; they are not verified photographs of each named project.",
                "أسماء المشاريع ونطاقاتها من موقعنا الأصلي. الصور توضيحية أو من معرض الشركة، وليست صوراً موثقة لكل مشروع مذكور.",
              )}
            </p>
          </div>
          <div
            className="project-filters"
            role="group"
            aria-label={t("Filter projects", "تصفية المشاريع")}
          >
            {filters.map(([value, en, ar]) => (
              <button
                key={value}
                type="button"
                aria-pressed={filter === value}
                onClick={() => chooseFilter(value)}
              >
                {t(en, ar)}
              </button>
            ))}
          </div>
          <p className="collection-count" role="status">
            {shown.length} {t("projects", "مشاريع")}
          </p>
          <div ref={list} className="work-grid">
            {shown.map((project, index) => (
              <article className="work-entry" key={project.slug}>
                <ProjectLink href={href(`/project/${project.slug}/`)}>
                  <img
                    src={project.image}
                    width="1600"
                    height="1000"
                    alt={project.title[locale]}
                    loading="lazy"
                  />
                  <span className="work-category">
                    {t(
                      ...(filters
                        .find((item) => item[0] === project.category)!
                        .slice(1) as [string, string]),
                    )}
                  </span>
                </ProjectLink>
                <div className="work-entry-caption">
                  <span className="work-index" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <div>
                    <h3>
                      <a href={href(`/project/${project.slug}/`)}>
                        {project.title[locale]}
                        <ArrowUpRight size={23} />
                      </a>
                    </h3>
                    <p>{project.copy[locale]}</p>
                    <span className="work-roles">{project.roles[locale]}</span>
                    <a
                      className="pp-cta cta-blue work-entry-cta"
                      href={href(`/project/${project.slug}/`)}
                    >
                      {t("Explore project", "اكتشف المشروع")}
                      <ArrowUpRight size={22} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <NextConversation />
    </ExperienceFrame>
  );
}

export function ProjectDetailPage({ slug }: { slug: string }) {
  const { t, href, language } = useLanguage();
  const locale = language === "ar" ? 1 : 0;
  const published = workProjects.find((project) => project.slug === slug);
  const feature = featuredProjects.find((project) => project.slug === slug);
  const title = published?.title[locale] || feature!.title[locale];
  const image = published?.image || `/images/${feature!.image}`;
  const copy = published?.copy[locale] || feature!.copy[locale];
  const scope = published?.roles[locale] || feature!.scope[locale];
  const next =
    workProjects[
      (workProjects.findIndex((project) => project.slug === slug) + 1) %
        workProjects.length
    ];
  return (
    <ExperienceFrame>
      <PageHero
        title={title}
        text={copy}
        image="/images/banners/projects.webp"
        caption={t(
          "Illustrative / gallery photography",
          "صور توضيحية / من معرض الشركة",
        )}
      >
        <a className="pp-cta" href={href("/contact-us/#enquiry")}>
          {t("Discuss a similar project", "ناقش مشروعاً مشابهاً")}
          <ArrowUpRight size={24} />
        </a>
      </PageHero>
      <section className="experience-section">
        <div className="pp-wrap project-detail-editorial">
          <div>
            <a className="pp-text-link" href={href("/project/")}>
              {t("All projects", "كل المشاريع")}
              <ArrowUpRight size={21} />
            </a>
            <h2>
              {t("The work behind the experience.", "العمل وراء التجربة.")}
            </h2>
          </div>
          <div>
            <h3>{t("Scope of work", "نطاق العمل")}</h3>
            <p className="lead">{scope}</p>
            <p>{copy}</p>
            <p className="source-note">
              {published
                ? t(
                    "This summary follows the project listing on our original website. Detailed dates, client approvals and outcomes are not published here. The image illustrates the environment rather than documenting this specific delivery.",
                    "يتبع هذا الملخص قائمة المشاريع في موقعنا الأصلي. لم تنشر هنا المواعيد التفصيلية أو موافقات العملاء أو النتائج. توضح الصورة البيئة ولا توثق هذا التنفيذ تحديداً.",
                  )
                : t(
                    "A gallery or concept study, not a verified client case study. Share a comparable brief to discuss the support your project needs.",
                    "دراسة من المعرض أو تصور، وليست حالة عميل موثقة. شارك ملخصاً مشابهاً لمناقشة الدعم الذي يحتاجه مشروعك.",
                  )}
            </p>
          </div>
        </div>
        <figure className="pp-wrap detail-wide-photo" data-photo-motion>
          <img
            src={image}
            alt={title}
            width="1600"
            height="900"
            loading="lazy"
          />
          <figcaption>
            {t(
              "Stages, spaces and the people behind them.",
              "مسارح ومساحات وأشخاص خلفها.",
            )}
          </figcaption>
        </figure>
      </section>
      <section className="experience-section project-next">
        <div className="pp-wrap">
          <span>{t("Next project", "المشروع التالي")}</span>
          <h2>{next.title[locale]}</h2>
          <ProjectLink href={href(`/project/${next.slug}/`)}>
            <img
              src={next.image}
              alt={next.title[locale]}
              width="1600"
              height="900"
              loading="lazy"
            />
          </ProjectLink>
        </div>
      </section>
      <NextConversation />
    </ExperienceFrame>
  );
}

export function ContactLocations() {
  const { t, language } = useLanguage();
  return (
    <section className="pp-contact" id="contact">
      <div className="pp-wrap">
        <div className="contact-heading">
          <h2>
            {t("Two places. One point of contact.", "في بلدين. وقريبون منك.")}
          </h2>
          <p>
            {t(
              "Reach the regional team closest to your event. Share your exact location, dates and requirements so coverage and deployment can be confirmed.",
              "تواصل مع الفريق الإقليمي الأقرب إلى فعاليتك. شارك الموقع والمواعيد والمتطلبات لتأكيد التغطية وتوفير الطاقم.",
            )}
          </p>
        </div>
        <div className="region-grid">
          {[
            {
              city: ["Riyadh", "الرياض"],
              address: [
                "Al Shumaisi Riyadh, Saudi Arabia",
                "الشميسي، الرياض، المملكة العربية السعودية",
              ],
              phone: "+966 54 056 0097",
              tel: "+966540560097",
            },
            {
              city: ["Dubai", "دبي"],
              address: [
                "Bur Dubai, Dubai, UAE.",
                "بر دبي، دبي، الإمارات العربية المتحدة.",
              ],
              phone: "+971 56 538 8457",
              tel: "+971565388457",
            },
          ].map((office) => (
            <article key={office.tel}>
              <h3 className="region-title">
                {office.city[language === "ar" ? 1 : 0]}
                <MapPin size={30} />
              </h3>
              <address>{t(office.address[0], office.address[1])}</address>
              <a href={`tel:${office.tel}`}>
                <Phone size={18} />
                <bdi>{office.phone}</bdi>
              </a>
              <a href="mailto:operations@pluspointgulf.com">
                <Mail size={18} />
                <bdi>operations@pluspointgulf.com</bdi>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactPage() {
  const { t } = useLanguage();
  return (
    <ExperienceFrame>
      <PageHero
        title={t("Let's talk.", "لنتحدث.")}
        image="/images/banners/contact.webp"
        text={t(
          "Tell us what you are building. We will help shape the people, disciplines and practical support behind your next event.",
          "أخبرنا بما تجهزه. نساعدك في تحديد الأشخاص والتخصصات والدعم العملي وراء فعاليتك القادمة.",
        )}
      />
      <section className="pp-enquiry pp-blue" id="enquiry">
        <div className="pp-wrap enquiry-grid">
          <div className="enquiry-copy">
            <span>{t("Let's make it happen", "لنجعلها واقعاً")}</span>
            <h2>
              {t("Your next event. Starts here.", "فعاليتك القادمة. تبدأ هنا.")}
            </h2>
            <p>
              {t(
                "Include the venue, build and show dates, crew disciplines, provisional headcount and shifts. Drawings and site requirements can be added when you send the email.",
                "أدرج الموقع ومواعيد التجهيز والعرض وتخصصات الطواقم والعدد المبدئي والورديات. يمكنك إضافة الرسومات ومتطلبات الموقع عند إرسال البريد.",
              )}
            </p>
            <p>
              {t(
                "Review your enquiry as an email draft, then send it from your email app. Availability, scope and pricing are confirmed directly with our team.",
                "راجع استفسارك كمسودة بريد ثم أرسله من تطبيق البريد. يتم تأكيد التوفر والنطاق والأسعار مباشرة مع فريقنا.",
              )}
            </p>
            <a
              className="enquiry-email"
              href="mailto:operations@pluspointgulf.com"
            >
              <Mail size={20} />
              <bdi>operations@pluspointgulf.com</bdi>
            </a>
            <span className="enquiry-plus brand-plus" aria-hidden="true" />
          </div>
          <EnquiryForm />
        </div>
      </section>
      <ContactLocations />
      <section className="pp-faq">
        <div className="pp-wrap faq-grid">
          <div>
            <span>{t("Good to know", "معلومات تهمك")}</span>
            <h2>{t("Before we get started.", "قبل أن نبدأ.")}</h2>
            <p>
              {t(
                "A few practical answers for planning your crew brief.",
                "إجابات عملية تساعدك في إعداد ملخص الطاقم.",
              )}
            </p>
          </div>
          <LandingFaq />
        </div>
      </section>
      <BehindTheBuild />
      <LeadershipQuote />
    </ExperienceFrame>
  );
}
