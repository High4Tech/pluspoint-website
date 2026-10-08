"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Pause, Play, Phone, Mail, Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "./language-provider";
import { useMotionPreference } from "./motion-preference";

gsap.registerPlugin(ScrollTrigger);

export function MotionLoop({
  children,
  reverse = false,
  className = "",
  label,
  controls = true,
}: {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
  label: string;
  controls?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const area = useRef<HTMLDivElement>(null);
  const animation = useRef<gsap.core.Tween | null>(null);
  const [paused, setPaused] = useState(false);
  const { language, t } = useLanguage();
  const { reduceMotion } = useMotionPreference();
  useEffect(() => {
    if (reduceMotion) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const backwards = reverse !== (language === "ar");
      animation.current = gsap.fromTo(
        track.current,
        { xPercent: backwards ? -50 : 0 },
        {
          xPercent: backwards ? 0 : -50,
          duration: 36,
          repeat: -1,
          ease: "none",
        },
      );
      const synchronize = () =>
        animation.current?.paused(
          paused ||
            document.hidden ||
            area.current?.matches(":hover, :focus-within") ||
            false,
        );
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) animation.current?.pause();
        else synchronize();
      });
      if (area.current) observer.observe(area.current);
      document.addEventListener("visibilitychange", synchronize);
      synchronize();
      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", synchronize);
        animation.current = null;
      };
    });
    return () => media.revert();
  }, [language, paused, reverse, reduceMotion]);
  return (
    <div
      ref={area}
      className={`motion-loop ${className}`}
      onMouseEnter={() => animation.current?.pause()}
      onMouseLeave={() => {
        if (!paused) animation.current?.resume();
      }}
      onFocusCapture={() => animation.current?.pause()}
      onBlurCapture={() => {
        if (!paused) animation.current?.resume();
      }}
    >
      <div className="loop-window">
        <div ref={track} className="loop-track" dir="ltr">
          <div className="loop-copy">{children}</div>
          <div className="loop-copy loop-duplicate" aria-hidden="true" inert>
            {children}
          </div>
        </div>
      </div>
      {controls && (
        <button
          type="button"
          className="loop-control"
          aria-label={`${t(paused ? "Play" : "Pause", paused ? "تشغيل" : "إيقاف")} ${label}`}
          title={`${t(paused ? "Play" : "Pause", paused ? "تشغيل" : "إيقاف")} ${label}`}
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? (
            <Play size={15} aria-hidden="true" />
          ) : (
            <Pause size={15} aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}

export function InformationTicker() {
  const { t } = useLanguage();
  return (
    <MotionLoop
      className="information-ticker"
      controls={false}
      label={t("information ticker", "شريط المعلومات")}
    >
      <span>
        <Plus size={14} aria-hidden="true" />
        {t("EVENT CREW & SITE SUPPORT", "طواقم الفعاليات ودعم المواقع")}
      </span>
      <span>{t("SAUDI ARABIA + UAE", "السعودية + الإمارات")}</span>
      <a href="tel:+966540560097">
        <Phone size={13} aria-hidden="true" />
        <bdi>+966 54 056 0097</bdi>
      </a>
      <a href="mailto:Operations@pluspointgulf.com">
        <Mail size={13} aria-hidden="true" />
        <bdi>Operations@pluspointgulf.com</bdi>
      </a>
      <span>{t("BUILD / LIVE / BREAKDOWN", "تجهيز / تشغيل / تفكيك")}</span>
    </MotionLoop>
  );
}

function SampleLogos() {
  return (
    <>
      <img src="/images/arena.png" alt="Arena" width="220" height="106" />
      <img src="/images/fifa.svg" alt="FIFA" width="170" height="56" />
      <span className="dummy-wwe" aria-label="WWE">
        WWE
      </span>
      <span className="client-plus" aria-hidden="true">
        +
      </span>
    </>
  );
}

export function ClientShowcase() {
  const { t } = useLanguage();
  return (
    <section className="client-showcase" aria-labelledby="client-title">
      <div className="pp-wrap client-intro">
        <span className="sample-label">
          {t("CLIENT LOGO PLACEHOLDERS", "نماذج مؤقتة لشعارات العملاء")}
        </span>
        <h2 id="client-title">
          {t(
            "Great events are a team effort.",
            "الفعاليات المميزة ثمرة عمل جماعي.",
          )}
        </h2>
        <p>
          {t(
            "From event organisers and production agencies to venue and infrastructure teams, we work around the people, priorities and practical demands of a live site.",
            "من منظمي الفعاليات ووكالات الإنتاج إلى فرق المواقع والبنية التحتية، ننسق العمل وفق الأشخاص والأولويات والمتطلبات العملية للموقع.",
          )}
        </p>
        <small>
          {t(
            "Arena, WWE and FIFA are sample logos for this design preview, not confirmed Plus Point clients.",
            "شعارات أرينا وWWE وفيفا نماذج للمعاينة التصميمية، وليست قائمة عملاء مؤكدة لبلس بوينت.",
          )}
        </small>
      </div>
      <MotionLoop
        className="client-loop"
        label={t("client logo loop", "شريط شعارات العملاء")}
      >
        <SampleLogos />
        <SampleLogos />
      </MotionLoop>
      <MotionLoop
        className="client-loop secondary-loop"
        reverse
        label={t("second client logo loop", "شريط الشعارات الثاني")}
      >
        <span className="client-word">
          {t("IN GOOD COMPANY", "مع شركاء مميزين")}
        </span>
        <SampleLogos />
        <SampleLogos />
      </MotionLoop>
    </section>
  );
}

export function LogoReveal() {
  const section = useRef<HTMLElement>(null);
  const { language, t } = useLanguage();
  const { reduceMotion } = useMotionPreference();
  useEffect(() => {
    if (reduceMotion) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const expansion = gsap.timeline({
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 2}`,
            pin: true,
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });
        expansion.fromTo(
          ".logo-reveal-image",
          { maskSize: "420px 420px", webkitMaskSize: "420px 420px" },
          {
            maskSize: "20000px 20000px",
            webkitMaskSize: "20000px 20000px",
            duration: 1.4,
            ease: "power2.in",
          },
        );
        expansion.fromTo(
          ".logo-reveal-image img",
          { opacity: 0.85 },
          { opacity: 0.38, duration: 0.4 },
          1.2,
        );
        // The final interval deliberately holds the composition for reading.
        expansion.to({}, { duration: 0.75 });
      }, section);
      return () => context.revert();
    });
    return () => media.revert();
  }, [language, reduceMotion]);
  return (
    <section
      className="logo-reveal"
      ref={section}
      aria-label={t("Plus Point event concept", "تصور فعالية بلس بوينت")}
    >
      <div className="logo-reveal-image">
        <img
          src="/images/concept-event.jpg"
          alt={t(
            "Concept image of a blue-lit corporate stage prepared by event crew",
            "صورة تصورية لمسرح مؤسسي بإضاءة زرقاء يجهزه طاقم فعاليات",
          )}
          width="1600"
          height="900"
          loading="lazy"
        />
      </div>
      <div className="pp-wrap logo-reveal-heading">
        <span>{t("A PLUS IN EVERY DETAIL", "إضافة في كل تفصيل")}</span>
        <h2>
          {t(
            "More than a crew. A point of difference.",
            "أكثر من طاقم. إضافة تصنع الفرق.",
          )}
        </h2>
      </div>
      <span className="reveal-caption">
        {t(
          "Corporate production / Concept imagery",
          "الإنتاج المؤسسي / صورة تصورية",
        )}
      </span>
    </section>
  );
}

export function BehindTheBuild() {
  const { t } = useLanguage();
  return (
    <section className="behind-build">
      <div className="pp-wrap behind-heading">
        <span>{t("BEHIND THE BUILD", "خلف التجهيز")}</span>
        <h2>
          {t("The energy behind every experience.", "الطاقة وراء كل تجربة.")}
        </h2>
        <p>
          {t(
            "People, preparation and the details that rarely make the spotlight. A view of the spaces we support, from the first equipment arrival to the final finishing touch.",
            "الأشخاص والاستعداد والتفاصيل التي لا تظهر تحت الأضواء. نظرة إلى المساحات التي ندعمها، من وصول أول قطعة معدات إلى اللمسة الأخيرة.",
          )}
        </p>
      </div>
      <div className="snapshot-strip">
        {[
          "team.jpeg",
          "scaffolding.jpeg",
          "concept-event.jpg",
          "stage.jpeg",
          "team.jpeg",
        ].map((image, i) => (
          <figure key={i}>
            <figcaption>
              <span>0{i + 1}</span>
              {t(
                i === 2 ? "Concept production" : "From our gallery",
                i === 2 ? "إنتاج تصوري" : "من معرض الصور",
              )}
            </figcaption>
            <img
              src={`/images/${image}`}
              width="640"
              height="800"
              alt={t(
                i === 0 || i === 4
                  ? "Plus Point crew members"
                  : i === 2
                    ? "Sample corporate event environment"
                    : "Event site preparation",
                i === 0 || i === 4
                  ? "أفراد فريق بلس بوينت"
                  : i === 2
                    ? "بيئة فعالية مؤسسية تصورية"
                    : "تجهيز موقع الفعالية",
              )}
              loading="lazy"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}

export function WhatsAppLink() {
  const { t } = useLanguage();
  return (
    <a
      className="whatsapp-float"
      href="https://wa.me/966540560097"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t(
        "Chat with the Saudi team on WhatsApp (opens a new tab)",
        "تواصل مع فريق السعودية عبر واتساب (يفتح علامة تبويب جديدة)",
      )}
      title={t("WhatsApp the Saudi team", "تواصل مع فريق السعودية عبر واتساب")}
    >
      <img src="/images/whatsapp.svg" alt="" width="26" height="26" />
    </a>
  );
}
