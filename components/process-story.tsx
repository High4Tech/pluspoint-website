"use client";

import { useEffect, useRef, useState } from "react";
import { ClipboardList, UsersRound, Hammer, PackageCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "./language-provider";
import { useMotionPreference } from "./motion-preference";
import { projectSteps } from "@/lib/landing-content";

gsap.registerPlugin(ScrollTrigger);
const icons = [ClipboardList, UsersRound, Hammer, PackageCheck];
const photos = [
  "concept-event.jpg",
  "team.jpeg",
  "scaffolding.jpeg",
  "stage.jpeg",
];

export function ProcessStory() {
  const root = useRef<HTMLElement>(null);
  const [chapter, setChapter] = useState(0);
  const { language, t, href } = useLanguage();
  const { reduceMotion } = useMotionPreference();
  const locale = language === "ar" ? 1 : 0;
  useEffect(() => {
    if (!root.current || reduceMotion) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.fromTo(
          ".story-progress",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".story-chapters",
              start: "top 55%",
              end: "bottom 55%",
              scrub: 0.5,
            },
          },
        );
        root.current
          ?.querySelectorAll<HTMLElement>(".story-chapter")
          .forEach((element, index) => {
            ScrollTrigger.create({
              trigger: element,
              start: "top 55%",
              end: "bottom 55%",
              onEnter: () => setChapter(index),
              onEnterBack: () => setChapter(index),
            });
            gsap.fromTo(
              element.querySelector(".story-photo"),
              { y: 35, rotation: index % 2 ? -2 : 2 },
              {
                y: 0,
                rotation: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: element,
                  start: "top 85%",
                  end: "center 45%",
                  scrub: 0.6,
                },
              },
            );
          });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, [language, reduceMotion]);
  return (
    <section ref={root} className="process-story" id="approach">
      <div className="pp-wrap story-layout">
        <div className="story-opening">
          <span>{t("HOW WE WORK", "كيف نعمل")}</span>
          <h2>
            {t(
              "A good event starts long before the doors open.",
              "تبدأ الفعالية الناجحة قبل فتح الأبواب بوقت طويل.",
            )}
          </h2>
          <p>
            {t(
              "Every project has a beginning, a build and a final handover. Here is how we turn your requirements into a coordinated crew brief, one conversation at a time.",
              "لكل مشروع بداية وتجهيز وتسليم نهائي. هكذا نحول متطلباتك إلى ملخص منسق لمهام الطاقم، عبر مناقشة كل التفاصيل خطوة بخطوة.",
            )}
          </p>
          <div className="story-position" aria-hidden="true">
            <strong>0{chapter + 1}</strong>
            <span>/ 04</span>
          </div>
          <a className="pp-text-link" href={href("/#enquiry")}>
            {t("Start your story", "ابدأ حكاية مشروعك")}
          </a>
        </div>
        <div className="story-chapters">
          <div className="story-rail" aria-hidden="true">
            <span className="story-progress" />
          </div>
          {projectSteps.map((step, index) => {
            const Icon = icons[index];
            return (
              <article
                className={`story-chapter ${chapter === index ? "is-current" : ""}`}
                key={index}
              >
                <div className="chapter-top">
                  <span>0{index + 1}</span>
                  <Icon size={34} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3>{step.title[locale]}</h3>
                <p>{step.copy[locale]}</p>
                <figure className="story-photo">
                  <img
                    src={`/images/${photos[index]}`}
                    alt={t(
                      index === 0
                        ? "Concept corporate event environment"
                        : index === 1
                          ? "Plus Point's crew preparing for site work"
                          : "Event site and production preparation",
                      index === 0
                        ? "بيئة فعالية مؤسسية تصورية"
                        : index === 1
                          ? "فريق بلس بوينت يستعد للعمل في الموقع"
                          : "تجهيز الموقع والإنتاج",
                    )}
                    width="1057"
                    height="650"
                    loading="lazy"
                  />
                  <figcaption>
                    {t(
                      index === 0
                        ? "The vision / Concept imagery"
                        : index === 1
                          ? "The people"
                          : index === 2
                            ? "The build"
                            : "The handover",
                      index === 0
                        ? "الرؤية / صورة تصورية"
                        : index === 1
                          ? "الأشخاص"
                          : index === 2
                            ? "التجهيز"
                            : "التسليم",
                    )}
                  </figcaption>
                </figure>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
