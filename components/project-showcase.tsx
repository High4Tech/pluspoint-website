"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "./language-provider";
import { useMotionPreference } from "./motion-preference";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image: "concept-event.jpg",
    title: ["The corporate stage", "المسرح المؤسسي"],
    type: ["CONCEPT PREVIEW", "معاينة تصورية"],
    scope: [
      "Stage crew / Production support / Carpentry",
      "طاقم المسرح / دعم الإنتاج / النجارة",
    ],
    copy: [
      "A considered space for an important moment. From installation sequencing and material handling to the final stage finish, a detailed crew brief connects the production plan to the practical work on site.",
      "مساحة مدروسة للحظات المهمة. من تسلسل التركيب ومناولة المواد إلى اللمسات النهائية للمسرح، يربط ملخص مهام الطاقم المفصل بين خطة الإنتاج والعمل العملي في الموقع.",
    ],
  },
  {
    image: "stage.jpeg",
    title: ["Ready for the live moment", "جاهزون للحظة المباشرة"],
    type: ["PLUS POINT GALLERY", "معرض بلس بوينت"],
    scope: [
      "Stage setup / General crew / Site support",
      "تجهيز المسرح / الطواقم العامة / دعم الموقع",
    ],
    copy: [
      "The experience begins long before the audience arrives. This stage environment from our published gallery shows the layers of structure, equipment and seating that go into preparing an event space.",
      "تبدأ التجربة قبل وصول الجمهور بوقت طويل. توضح بيئة المسرح من معرضنا المنشور طبقات الهياكل والمعدات والمقاعد اللازمة لتجهيز مساحة الفعالية.",
    ],
  },
  {
    image: "scaffolding.jpeg",
    title: ["Built from the ground up", "نبنيها من الأساس"],
    type: ["PLUS POINT GALLERY", "معرض بلس بوينت"],
    scope: [
      "Temporary infrastructure / Specialist crew",
      "بنية تحتية مؤقتة / طواقم متخصصة",
    ],
    copy: [
      "Every build has its own sequence. Working areas, access, material movement and temporary structures all shape the support needed. Share the programme early so setup and strike can be planned together.",
      "لكل مشروع تجهيز تسلسله الخاص. تحدد مناطق العمل والدخول وحركة المواد والهياكل المؤقتة الدعم المطلوب. شارك البرنامج مبكراً لتخطيط التجهيز والتفكيك معاً.",
    ],
  },
];

function ProjectScene({
  image,
  index,
  alt,
}: {
  image: string;
  index: number;
  alt: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const { reduceMotion } = useMotionPreference();
  useEffect(() => {
    setReady(false);
    if (reduceMotion) return;
    let disposed = false;
    let cleanup = () => {};
    let contextLost = false;
    const element = host.current;
    if (!element) return;
    const onLost = () => {
      contextLost = true;
      setReady(false);
    };
    void import("three")
      .then(async (THREE) => {
        if (disposed) return;
        let renderer: InstanceType<typeof THREE.WebGLRenderer>;
        try {
          renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true,
          });
        } catch {
          return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.setAttribute("aria-hidden", "true");
        renderer.domElement.addEventListener("webglcontextlost", onLost);
        element.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
        camera.position.z = 6;
        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.MeshBasicMaterial({
          side: THREE.DoubleSide,
        });
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);
        const media = gsap.matchMedia();
        let visible = false;
        const pointer = { x: 0, y: 0 };
        const movement = { x: 0, y: 0, z: 0 };
        let imageAspect = 16 / 9;
        const draw = () => {
          if (!disposed && !contextLost) {
            plane.rotation.set(
              movement.x + pointer.y,
              movement.y + pointer.x,
              movement.z,
            );
            renderer.domElement.dataset.rotation = [
              plane.rotation.x,
              plane.rotation.y,
              plane.rotation.z,
            ]
              .map((value) => value.toFixed(4))
              .join(",");
            renderer.render(scene, camera);
          }
        };
        const size = () => {
          const width = element.clientWidth,
            height = element.clientHeight;
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          const screenHeight = 2 * 6 * Math.tan((38 * Math.PI) / 360);
          const planeWidth = Math.min(
            screenHeight * camera.aspect * 0.94,
            screenHeight * 0.94 * imageAspect,
          );
          plane.scale.set(planeWidth, planeWidth / imageAspect, 1);
          draw();
        };
        const resize = new ResizeObserver(size);
        resize.observe(element);
        const observer = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible) draw();
        });
        observer.observe(element);
        const pointerMove = (event: PointerEvent) => {
          if (
            !visible ||
            reduceMotion ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            event.pointerType !== "mouse"
          )
            return;
          const bounds = element.getBoundingClientRect();
          gsap.to(pointer, {
            x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.08,
            y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.06,
            duration: 0.6,
            onUpdate: draw,
          });
        };
        const pointerLeave = () =>
          gsap.to(pointer, { x: 0, y: 0, duration: 0.5, onUpdate: draw });
        element.addEventListener("pointermove", pointerMove);
        element.addEventListener("pointerleave", pointerLeave);
        if (!reduceMotion)
          media.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.fromTo(
              movement,
              {
                x: 0.13,
                y: index % 2 ? -0.1 : 0.1,
                z: index % 2 ? -0.025 : 0.025,
              },
              {
                x: -0.04,
                y: 0,
                z: 0,
                ease: "none",
                onUpdate: draw,
                scrollTrigger: {
                  trigger: element,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.9,
                },
              },
            );
          });
        const texture = new THREE.TextureLoader().load(
          `/images/${image}`,
          (loaded) => {
            if (disposed) {
              loaded.dispose();
              return;
            }
            loaded.colorSpace = THREE.SRGBColorSpace;
            const bitmap = loaded.image as HTMLImageElement;
            imageAspect = bitmap.width / bitmap.height;
            material.map = loaded;
            material.needsUpdate = true;
            size();
            setReady(true);
            if (
              !reduceMotion &&
              !matchMedia("(prefers-reduced-motion: reduce)").matches
            )
              gsap.fromTo(
                renderer.domElement,
                { opacity: 0 },
                { opacity: 1, duration: 0.55 },
              );
          },
          undefined,
          () => {
            if (!disposed) setReady(false);
          },
        );
        cleanup = () => {
          resize.disconnect();
          observer.disconnect();
          media.revert();
          gsap.killTweensOf(pointer);
          gsap.killTweensOf(renderer.domElement);
          element.removeEventListener("pointermove", pointerMove);
          element.removeEventListener("pointerleave", pointerLeave);
          renderer.domElement.removeEventListener("webglcontextlost", onLost);
          geometry.dispose();
          texture.dispose();
          material.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
        if (disposed) cleanup();
      })
      .catch(() => {
        if (!disposed) setReady(false);
      });
    return () => {
      disposed = true;
      cleanup();
    };
  }, [image, index, reduceMotion]);
  return (
    <div
      id={`project-view-${index}`}
      ref={host}
      className={`project-scene ${ready ? "scene-ready" : ""}`}
    >
      <img
        className="project-fallback"
        src={`/images/${image}`}
        alt={alt}
        width="1600"
        height="900"
        loading="lazy"
      />
    </div>
  );
}

export function ProjectShowcase() {
  const { language, t, href } = useLanguage();
  const { reduceMotion } = useMotionPreference();
  const locale = language === "ar" ? 1 : 0;
  const stage = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  const selected = useRef(0);
  const [active, setActive] = useState(0);
  const project = projects[active];

  useEffect(() => {
    if (reduceMotion || !root.current) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const trigger = ScrollTrigger.create({
        trigger: root.current,
        start: () => `top ${window.innerWidth <= 600 ? 102 : 130}px`,
        end: () => `+=${window.innerHeight * 2.4}`,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => {
          const next = Math.min(
            projects.length - 1,
            Math.floor(progress * projects.length),
          );
          if (next !== selected.current) {
            selected.current = next;
            setActive(next);
          }
        },
      });
      return () => trigger.kill();
    });
    return () => media.revert();
  }, [reduceMotion, language]);

  useEffect(() => {
    if (
      reduceMotion ||
      !stage.current ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".project-scene",
        {
          x: language === "ar" ? -65 : 65,
          rotate: language === "ar" ? -3 : 3,
          scale: 0.96,
          opacity: 0.3,
        },
        {
          x: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        ".project-side-heading, .project-side-details",
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.12,
          ease: "power2.out",
        },
      );
    }, stage);
    return () => context.revert();
  }, [active, language, reduceMotion]);

  return (
    <section
      ref={root}
      className="project-showcase scroll-projects"
      id="work"
      aria-labelledby="projects-title"
    >
      <div className="pp-wrap projects-intro">
        <div className="section-top">
          <span>{t("PROJECTS IN FOCUS", "المشاريع تحت الضوء")}</span>
          <span>
            {t("Stages / Spaces / Structures", "مسارح / مساحات / هياكل")}
          </span>
        </div>
        <div className="projects-heading-grid">
          <div>
            <h2 id="projects-title">
              {t(
                "Big spaces. Real possibilities.",
                "مساحات كبيرة. إمكانات حقيقية.",
              )}
            </h2>
            <p>
              {t(
                "An inside look at the environments behind the experience. Original gallery photography sits alongside a sample corporate concept for this preview.",
                "نظرة من الداخل إلى البيئات وراء التجربة. صور من معرضنا الأصلي إلى جانب تصور مؤسسي نموذجي لهذه المعاينة.",
              )}
            </p>
          </div>
          <a className="view-projects-cta" href={href("/project/")}>
            <span>{t("View all projects", "شاهد جميع المشاريع")}</span>
            <ArrowUpRight size={32} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="pp-wrap project-static-list" hidden={!reduceMotion}>
        {projects.map((item, index) => (
          <article key={item.image}>
            <span className="sample-label">{item.type[locale]}</span>
            <h3>{item.title[locale]}</h3>
            <img
              src={`/images/${item.image}`}
              alt={item.title[locale]}
              width="1600"
              height="900"
              loading="lazy"
            />
            <p>{item.copy[locale]}</p>
          </article>
        ))}
      </div>
      <div className="project-scroll-stage" ref={stage} hidden={reduceMotion}>
        <div className="pp-wrap project-composition">
          <div className="project-side-heading">
            <span className="project-number" aria-hidden="true">
              0{active + 1}
              <small> / 03</small>
            </span>
            <h3>{project.title[locale]}</h3>
            <span className="sample-label">{project.type[locale]}</span>
            <div className="project-scroll-progress" aria-hidden="true">
              {projects.map((item, index) => (
                <span
                  key={item.image}
                  className={index === active ? "is-active" : ""}
                />
              ))}
            </div>
          </div>
          <ProjectScene
            image={project.image}
            index={active}
            alt={project.title[locale]}
          />
          <div className="project-side-details">
            <span>{project.scope[locale]}</span>
            <p>{project.copy[locale]}</p>
            <a className="pp-text-link" href={href("/#enquiry")}>
              {t("Discuss a similar brief", "ناقش مشروعاً مشابهاً")}
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
