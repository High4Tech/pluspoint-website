"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  Plus,
  Minus,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { EnquiryForm, LandingFaq } from "@/components/landing-interactions";
import { HeroFilm } from "@/components/hero-film";
import { useMotionPreference } from "./motion-preference";
import { ProcessStory } from "./process-story";
import { useLanguage } from "@/components/language-provider";
import { services } from "@/lib/site-content";
import { crewDetails } from "@/lib/landing-content";
import { ProjectShowcase } from "./project-showcase";
import {
  LogoReveal,
  ClientShowcase,
  BehindTheBuild,
  WhatsAppLink,
} from "./brand-experience";

gsap.registerPlugin(ScrollTrigger);

export function LandingPage() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(0);
  const { language, t, href } = useLanguage();
  const { reduceMotion } = useMotionPreference();
  const locale = language === "ar" ? 1 : 0;
  const photo = crewDetails[active ?? 0];

  useEffect(() => {
    if (!root.current || reduceMotion) return;
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const direction = language === "ar" ? -1 : 1;
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".hero-brand-line", {
            yPercent: 105,
            duration: 1.15,
            stagger: 0.14,
          })
          .from(".hero-intro", { opacity: 0, duration: 0.75 }, "-=0.55");
        gsap.fromTo(
          ".about-photo",
          { rotate: -3 * direction, y: 50 },
          {
            rotate: 0,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".pp-about",
              start: "top 85%",
              end: "center 35%",
              scrub: 1,
            },
          },
        );
        gsap.fromTo(
          ".about-plus",
          { rotate: 0 },
          {
            rotate: 14 * direction,
            ease: "none",
            scrollTrigger: {
              trigger: ".pp-about",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
        gsap.from(".region-title", {
          x: 35 * direction,
          opacity: 0,
          stagger: 0.18,
          duration: 0.85,
          scrollTrigger: {
            trigger: ".pp-contact",
            start: "top 75%",
            once: true,
          },
        });
      });
      return () => media.revert();
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    void document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh, { once: true });
    return () => {
      context.revert();
      window.removeEventListener("load", refresh);
    };
  }, [language, reduceMotion]);

  useEffect(() => {
    const image = root.current?.querySelector(".service-photo");
    if (
      !image ||
      reduceMotion ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const animation = gsap.fromTo(
      image,
      { opacity: 0.35, x: language === "ar" ? -22 : 22 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
    );
    const panel = root.current?.querySelector(`#service-panel-${active}`);
    const reveal = panel
      ? gsap.fromTo(
          panel,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        )
      : null;
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      animation.revert();
      reveal?.revert();
      cancelAnimationFrame(refresh);
    };
  }, [active, language, reduceMotion]);

  return (
    <>
      <SiteHeader cinematic />
      <main id="main-content" className="landing-v3" ref={root}>
        <section className="pp-hero" aria-labelledby="hero-title">
          <HeroFilm />
          <div className="hero-shade" />
          <div className="pp-wrap hero-layout">
            <div className="hero-topline">
              <span>
                <MapPin size={17} />
                {t(
                  "Saudi Arabia + United Arab Emirates",
                  "المملكة العربية السعودية + الإمارات العربية المتحدة",
                )}
              </span>
              <span>
                {t("The crew behind the experience", "الطاقم وراء التجربة")}
              </span>
            </div>
            <div className="hero-main">
              <div className="hero-brand">
                <h1 id="hero-title" aria-label={t("Plus Point Gulf")}>
                  <span className="hero-line-window">
                    <span className="hero-brand-line">
                      {t("PLUS POINT", "بلس بوينت")}
                    </span>
                  </span>
                  <span className="hero-line-window">
                    <span className="hero-brand-line">
                      {t("GULF", "الخليج")}
                    </span>
                  </span>
                </h1>
                <p className="hero-role">
                  {t(
                    "Event crew. Production support. Site specialists.",
                    "طواقم فعاليات. دعم إنتاج. متخصصون في المواقع.",
                  )}
                </p>
              </div>
              <div className="hero-intro">
                <p>
                  {t(
                    "Great experiences take more than a great idea. They take people who build, move, prepare and deliver. We bring practical crew support to every phase of your event.",
                    "التجارب المميزة تحتاج إلى أكثر من فكرة رائعة. تحتاج إلى أشخاص يبنون وينقلون ويجهزون وينفذون. نقدم الدعم العملي للطواقم في كل مرحلة من مراحل فعاليتك.",
                  )}
                </p>
                <a href="#enquiry" className="pp-cta">
                  {t("Discuss your project", "ناقش مشروعك")}
                  <ArrowUpRight
                    size={22}
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
            <div className="hero-bottom">
              <a href="#services">
                {t("Explore our services", "اكتشف خدماتنا")}
                <Plus size={20} />
              </a>
              <span>
                {t(
                  "From the first load-in to the final load-out",
                  "من إدخال أول قطعة معدات إلى إخراج آخرها",
                )}
              </span>
            </div>
          </div>
        </section>

        <section className="pp-about pp-blue" id="about">
          <div className="pp-wrap">
            <div className="section-top">
              <span>
                {t(
                  "People. Preparation. Plus Point.",
                  "أشخاص. استعداد. بلس بوينت.",
                )}
              </span>
              <span>
                {t("Your crew partner in the Gulf", "شريك طواقمك في الخليج")}
              </span>
            </div>
            <div className="about-grid">
              <div className="about-heading">
                <h2>
                  {t(
                    "Behind the scenes. At the heart of it.",
                    "خلف الكواليس. في قلب الحدث.",
                  )}
                </h2>
                <div className="about-plus logo-symbol" aria-hidden="true" />
              </div>
              <div className="about-copy">
                <p className="lead">
                  {t(
                    "You focus on the experience. We focus on the work that makes it possible.",
                    "ركز على التجربة. ونحن نركز على العمل الذي يجعلها ممكنة.",
                  )}
                </p>
                <p>
                  {t(
                    "Plus Point Gulf provides event crew and specialist site support across Saudi Arabia and the UAE. We work with event organisers, production teams and site contractors on the practical demands of builds, live operations and breakdowns.",
                    "توفر بلس بوينت الخليج طواقم فعاليات ودعماً متخصصاً للمواقع في المملكة العربية السعودية والإمارات. نعمل مع منظمي الفعاليات وفرق الإنتاج ومقاولي المواقع لتلبية المتطلبات العملية للتجهيز والتشغيل والتفكيك.",
                  )}
                </p>
                <p>
                  {t(
                    "From moving equipment to preparing temporary spaces, the brief matters. Tell us what needs doing, where it needs happening and when your team needs to be on site. We will discuss the roles, scope and deployment arrangements with you.",
                    "من نقل المعدات إلى تجهيز المساحات المؤقتة، يبدأ العمل بملخص واضح. أخبرنا بالمهام المطلوبة ومكانها ومواعيد حضور الفريق إلى الموقع. سنناقش معك الأدوار ونطاق العمل وترتيبات توفير الطاقم.",
                  )}
                </p>
                <a className="pp-text-link" href={href("/about-us/")}>
                  {t("Meet Plus Point Gulf", "تعرف على بلس بوينت الخليج")}
                </a>
              </div>
              <figure className="about-photo">
                <img
                  src="/images/stage.jpeg"
                  alt={t(
                    "Event stage preparation from the Plus Point gallery",
                    "تجهيز مسرح فعالية من معرض بلس بوينت",
                  )}
                  width="2560"
                  height="1183"
                  loading="lazy"
                />
                <figcaption>
                  {t("Before the audience arrives", "قبل وصول الجمهور")}
                </figcaption>
              </figure>
            </div>
            <div className="about-facts">
              <div>
                <strong>{t("6 disciplines", "6 تخصصات")}</strong>
                <span>
                  {t(
                    "General crew to specialist trades",
                    "من الطواقم العامة إلى المهن المتخصصة",
                  )}
                </span>
              </div>
              <div>
                <strong>
                  {t("2 regional contacts", "جهتا اتصال إقليميتان")}
                </strong>
                <span>
                  {t(
                    "Riyadh, Saudi Arabia / Dubai, UAE",
                    "الرياض، السعودية / دبي، الإمارات",
                  )}
                </span>
              </div>
              <div>
                <strong>{t("Every event phase", "كل مراحل الفعالية")}</strong>
                <span>
                  {t(
                    "Build, live operations and breakdown",
                    "التجهيز والتشغيل والتفكيك",
                  )}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="pp-services" id="services">
          <div className="pp-wrap">
            <div className="section-top">
              <span>{t("Crew services", "خدمات الطواقم")}</span>
              <a className="pp-text-link" href={href("/services/")}>
                {t("All service scopes", "جميع نطاقات الخدمات")}
              </a>
            </div>
            <div className="service-heading">
              <h2>
                {t(
                  "The right people. For the real work.",
                  "الأشخاص المناسبون. للعمل الحقيقي.",
                )}
              </h2>
              <p>
                {t(
                  "Six connected disciplines, one practical conversation. Find the support that fits your production and tell us what your site needs.",
                  "ستة تخصصات مترابطة، ومناقشة عملية واحدة. اختر الدعم الذي يناسب إنتاجك وأخبرنا باحتياجات موقعك.",
                )}
              </p>
            </div>
            <div className="service-explorer">
              <div className="service-visual">
                <div className="service-image-wrap">
                  <img
                    className="service-photo"
                    src={`/images/${photo.image}`}
                    alt={photo.alt[locale]}
                    width="1057"
                    height="883"
                    loading="lazy"
                  />
                </div>
                <div className="service-image-caption">
                  <span>
                    {t("On site. In sync.", "في الموقع. بتنسيق متكامل.")}
                  </span>
                  <Plus size={32} />
                </div>
              </div>
              <div className="service-list">
                {services.map((service, i) => (
                  <div
                    className={`service-item ${active === i ? "is-active" : ""}`}
                    key={service.slug}
                  >
                    <h3>
                      <button
                        type="button"
                        id={`service-tab-${i}`}
                        aria-expanded={active === i}
                        aria-controls={`service-panel-${i}`}
                        onClick={() => setActive(active === i ? null : i)}
                      >
                        {t(service.title)}
                        {active === i ? (
                          <Minus size={23} />
                        ) : (
                          <Plus size={23} />
                        )}
                      </button>
                    </h3>
                    <div
                      className="service-panel"
                      id={`service-panel-${i}`}
                      aria-labelledby={`service-tab-${i}`}
                      hidden={active !== i}
                    >
                      <p>{crewDetails[i].description[locale]}</p>
                      <ul>
                        {crewDetails[i].tasks[locale].map((task) => (
                          <li key={task}>
                            <Check size={17} />
                            {task}
                          </li>
                        ))}
                      </ul>
                      <a
                        className="pp-text-link"
                        href={href(`/${service.slug}/`)}
                      >
                        {t("View service scope", "اعرض نطاق الخدمة")}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="service-brief-note">
              <MessageSquare size={24} />
              <p>
                {t(
                  "A complex build rarely fits one category. Include multiple services in your brief, along with the schedule, site conditions and provisional headcount.",
                  "نادراً ما تندرج المشاريع المعقدة ضمن فئة واحدة. أدرج عدة خدمات في ملخصك، مع الجدول الزمني وظروف الموقع والعدد المبدئي للطاقم.",
                )}
              </p>
              <a className="pp-text-link" href="#enquiry">
                {t("Share your requirements", "شارك متطلباتك")}
              </a>
            </div>
          </div>
        </section>

        <ProjectShowcase />
        <LogoReveal />
        <ClientShowcase />

        <ProcessStory />

        <BehindTheBuild />
        <section className="pp-contact" id="contact">
          <div className="pp-wrap">
            <div className="section-top">
              <span>{t("Connected across the Gulf", "نتواصل عبر الخليج")}</span>
              <span>{t("Saudi Arabia + UAE", "السعودية + الإمارات")}</span>
            </div>
            <div className="contact-heading">
              <h2>
                {t(
                  "Two places. One point of contact.",
                  "في بلدين. وقريبون منك.",
                )}
              </h2>
              <p>
                {t(
                  "Reach the regional team closest to your event. Share your exact location, dates and requirements so coverage and deployment can be confirmed.",
                  "تواصل مع الفريق الإقليمي الأقرب إلى فعاليتك. شارك الموقع الدقيق والمواعيد والمتطلبات لتأكيد التغطية وترتيبات توفير الطاقم.",
                )}
              </p>
            </div>
            <div className="region-grid">
              <article>
                <h3 className="region-title">
                  {t("Riyadh", "الرياض")}
                  <Plus size={32} />
                </h3>
                <address>{t("Al Shumaisi Riyadh, Saudi Arabia", "الشميسي، الرياض، المملكة العربية السعودية")}</address>
                <a href="tel:+966540560097">
                  <Phone size={18} />
                  <bdi>+966 54 056 0097</bdi>
                </a>
                <a href="mailto:operations@pluspointgulf.com">
                  <Mail size={18} />
                  <bdi>operations@pluspointgulf.com</bdi>
                </a>
              </article>
              <article>
                <h3 className="region-title">
                  {t("Dubai", "دبي")}
                  <Plus size={32} />
                </h3>
                <address>{t("Bur Dubai, Dubai, UAE.", "بر دبي، دبي، الإمارات العربية المتحدة.")}</address>
                <a href="tel:+971565388457">
                  <Phone size={18} />
                  <bdi>+971 56 538 8457</bdi>
                </a>
                <a href="mailto:operations@pluspointgulf.com">
                  <Mail size={18} />
                  <bdi>operations@pluspointgulf.com</bdi>
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="pp-faq">
          <div className="pp-wrap faq-grid">
            <div>
              <span>{t("Good to know", "معلومات تهمك")}</span>
              <h2>{t("Before we get started.", "قبل أن نبدأ.")}</h2>
              <p>
                {t(
                  "A few practical answers for planning your crew brief.",
                  "إجابات عملية تساعدك في إعداد ملخص مهام الطاقم.",
                )}
              </p>
            </div>
            <LandingFaq />
          </div>
        </section>

        <section className="pp-enquiry pp-blue" id="enquiry">
          <div className="pp-wrap enquiry-grid">
            <div className="enquiry-copy">
              <span>{t("Let's make it happen", "لنجعلها واقعاً")}</span>
              <h2>
                {t(
                  "Your next event. Starts here.",
                  "فعاليتك القادمة. تبدأ هنا.",
                )}
              </h2>
              <p>
                {t(
                  "Tell us what you are building and the support you need. Include your location, dates, crew disciplines and provisional team size. If the scope is still taking shape, share what you know.",
                  "أخبرنا بما تجهزه والدعم الذي تحتاج إليه. أدرج الموقع والمواعيد وتخصصات الطواقم وحجم الفريق المبدئي. وإذا كان نطاق العمل لم يكتمل بعد، شارك المعلومات المتوفرة لديك.",
                )}
              </p>
              <p>
                {t(
                  "Your enquiry opens as an email draft for you to review and send. Crew availability, responsibilities and pricing are confirmed directly with the team.",
                  "يفتح استفسارك كمسودة بريد إلكتروني لتراجعها وترسلها. يتم تأكيد توفر الطاقم والمسؤوليات والأسعار مباشرة مع الفريق.",
                )}
              </p>
              <a
                href="mailto:operations@pluspointgulf.com"
                className="enquiry-email"
              >
                <Mail size={20} />
                <bdi>operations@pluspointgulf.com</bdi>
              </a>
              <div className="enquiry-plus brand-plus" aria-hidden="true" />
            </div>
            <EnquiryForm />
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppLink />
    </>
  );
}
