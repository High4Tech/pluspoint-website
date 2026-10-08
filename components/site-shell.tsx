"use client";

import {
  Menu,
  Phone,
  Mail,
  Globe,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigation, services } from "@/lib/site-content";
import { useLanguage } from "@/components/language-provider";
import { InformationTicker } from "./brand-experience";
import gsap from "gsap";
import { useMotionPreference } from "./motion-preference";

export function SiteHeader({ cinematic = false }: { cinematic?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pendingAnchor = useRef<string | null>(null);
  const menu = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t, href } = useLanguage();
  const { reduceMotion } = useMotionPreference();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const followAnchor = (event: globalThis.MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.defaultPrevented
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (!link || link.closest(".creative-menu")) return;
      const destination = new URL(link.href);
      if (
        destination.origin !== location.origin ||
        destination.pathname !== location.pathname ||
        !destination.hash
      )
        return;
      const target = document.getElementById(destination.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      history.pushState(
        null,
        "",
        `${location.pathname}${location.search}${destination.hash}`,
      );
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "start", behavior: "instant" });
    };
    document.addEventListener("click", followAnchor, true);
    return () => document.removeEventListener("click", followAnchor, true);
  }, []);
  useEffect(() => {
    if (!open || reduceMotion) return;
    let context: gsap.Context | undefined;
    const frame = requestAnimationFrame(() => {
      if (
        !menu.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      context = gsap.context(() => {
        const initial =
          language === "ar"
            ? "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
            : "polygon(0 0, 0 0, 0 100%, 0 100%)";
        gsap.fromTo(
          menu.current,
          { clipPath: initial },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 0.65,
            ease: "power3.inOut",
          },
        );
        gsap.from(".creative-menu nav a", {
          y: 45,
          opacity: 0,
          duration: 0.65,
          stagger: 0.075,
          delay: 0.2,
          ease: "power3.out",
        });
      }, menu);
    });
    return () => {
      cancelAnimationFrame(frame);
      context?.revert();
    };
  }, [open, language, reduceMotion]);

  function followMobileLink(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    const destination = new URL(event.currentTarget.href);
    if (destination.pathname === window.location.pathname && destination.hash) {
      event.preventDefault();
      pendingAnchor.current = destination.hash;
    }
    setOpen(false);
  }
  function finishMobileNavigation(event: Event) {
    const hash = pendingAnchor.current;
    if (!hash) return;
    pendingAnchor.current = null;
    event.preventDefault();
    // Wait for the drawer's scroll lock and focus scope to release.
    requestAnimationFrame(() => {
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      if (window.location.hash !== hash)
        history.pushState(
          null,
          "",
          `${window.location.pathname}${window.location.search}${hash}`,
        );
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "start", behavior: "instant" });
    });
  }
  return (
    <>
      <a className="skip-link" href="#main-content">
        {t("Skip to content")}
      </a>
      {!cinematic && (
        <div className="utility-bar">
          <div className="container utility-inner">
            <span>{t("Event crew services in Saudi Arabia & UAE")}</span>
            <a href="mailto:operations@pluspointgulf.com">
              <Mail size={14} />
              <bdi>operations@pluspointgulf.com</bdi>
            </a>
          </div>
        </div>
      )}
      <header
        className={`site-header pp-header ${cinematic ? "is-cinematic" : ""} ${scrolled ? "is-scrolled" : ""}`}
      >
        {cinematic && <InformationTicker />}
        <div className="pp-wrap header-inner">
          <a
            href={href("/")}
            className="brand"
            aria-label={t(
              "Plus Point Gulf home",
              "بلس بوينت الخليج، الصفحة الرئيسية",
            )}
          >
            <img
              src="/images/plus-point-logo.svg"
              width="66"
              height="66"
              alt=""
            />
            <span>
              {t("Plus Point Gulf")}
              <small>{t("Event crew services", "خدمات طواقم الفعاليات")}</small>
            </span>
          </a>
          <nav className="desktop-nav" aria-label={t("Main navigation")}>
            {navigation.map((item) => (
              <a href={href(item.href)} key={item.label}>
                {t(item.label)}
              </a>
            ))}
          </nav>
          <div className="header-controls">
            <button
              type="button"
              className="language-button"
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              aria-label={
                language === "en" ? "Switch to Arabic" : "Switch to English"
              }
              lang={language === "en" ? "ar" : "en"}
            >
              <Globe size={17} />
              {language === "en" ? "العربية" : "English"}
            </button>
            <a className="header-quote pp-cta" href={href("/#enquiry")}>
              {t("Request a quote")}
              <ArrowUpRight size={22} strokeWidth={2.5} aria-hidden="true" />
            </a>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="menu-button"
                  aria-label={t("Open navigation")}
                >
                  <Menu size={25} />
                </button>
              </SheetTrigger>
              <SheetContent
                ref={menu}
                className="mobile-sheet creative-menu"
                closeLabel={t("Close navigation", "أغلق القائمة")}
                side={language === "ar" ? "left" : "right"}
                dir={language === "ar" ? "rtl" : "ltr"}
                aria-describedby={undefined}
                onCloseAutoFocus={finishMobileNavigation}
              >
                <SheetHeader>
                  <SheetTitle>{t("Plus Point Gulf")}</SheetTitle>
                </SheetHeader>
                <div className="creative-menu-body">
                  <div className="menu-story">
                    <img
                      src="/images/concept-event.jpg"
                      width="1600"
                      height="900"
                      alt=""
                    />
                    <p>
                      {t(
                        "Your next event. Starts with a conversation.",
                        "فعاليتك القادمة. تبدأ بمحادثة.",
                      )}
                    </p>
                    <a href="mailto:operations@pluspointgulf.com">
                      <bdi>operations@pluspointgulf.com</bdi>
                    </a>
                    <span className="sample-label">
                      {t("Concept imagery", "صورة تصورية")}
                    </span>
                  </div>
                  <nav aria-label={t("Main navigation")}>
                    {[
                      ...navigation,
                      { label: "Projects", href: "/project/" },
                      { label: "Gallery", href: "/portfolio-2/" },
                    ].map((item) => (
                      <a
                        href={href(item.href)}
                        key={item.label}
                        onClick={followMobileLink}
                      >
                        {t(item.label)}
                        <ArrowUpRight size={25} aria-hidden="true" />
                      </a>
                    ))}
                    <a href={href("/#enquiry")} onClick={followMobileLink}>
                      {t("Request a quote")}
                      <ArrowUpRight size={25} aria-hidden="true" />
                    </a>
                  </nav>
                </div>
                <a className="mobile-phone" href="tel:+966540560097">
                  <Phone size={18} />
                  <bdi>+966 54 056 0097</bdi>
                </a>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  const { language, t, href } = useLanguage();
  const { reduceMotion, setReduceMotion, systemReduced } =
    useMotionPreference();
  return (
    <footer className="site-footer pp-footer">
      <div className="footer-invitation">
        <svg className="footer-arc" viewBox="0 0 1200 600" aria-hidden="true">
          <defs>
            <path
              id="footer-text-arc"
              d="M 90 560 A 510 510 0 1 1 1110 560 A 510 510 0 1 1 90 560"
            />
          </defs>
          <text>
            <textPath
              href="#footer-text-arc"
              startOffset="0%"
              textLength="3204"
              lengthAdjust="spacing"
            >
              {"PLUS POINT + PLUS POINT + PLUS POINT + PLUS POINT + "}
            </textPath>
          </text>
        </svg>
        <div className="invitation-copy">
          <span>
            {t(
              "ONE CONVERSATION. MANY POSSIBILITIES.",
              "محادثة واحدة. إمكانات عديدة.",
            )}
          </span>
          <h2>
            {t(
              "Tell us what you're building. We'll bring the people.",
              "أخبرنا بما تجهزه. ونحن نوفر الأشخاص.",
            )}
          </h2>
          <a className="pp-cta" href={href("/#enquiry")}>
            {t("Start a conversation")}
            <ArrowUpRight size={22} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="pp-wrap footer-grid">
        <div>
          <a className="footer-brand" href={href("/")}>
            <img
              src="/images/plus-point-logo.svg"
              width="92"
              height="92"
              alt=""
            />
            {t("Plus Point Gulf")}
          </a>
          <p>
            {t(
              "Event crew and specialist site support.",
              "طواقم فعاليات ودعم متخصص للمواقع.",
            )}
            <br />
            {t(
              "Saudi Arabia & United Arab Emirates.",
              "المملكة العربية السعودية والإمارات العربية المتحدة.",
            )}
          </p>
        </div>
        <div>
          <h3>{t("Services")}</h3>
          {services.map((item) => (
            <a key={item.slug} href={href(`/${item.slug}/`)}>
              {t(item.title)}
            </a>
          ))}
        </div>
        <div>
          <h3>{t("Company")}</h3>
          {[
            ["About us", "about-us"],
            ["Projects", "project"],
            ["Gallery", "portfolio-2"],
            ["Regional coverage", "coverage"],
            ["Safety & site standards", "safety"],
            ["Contact us", "contact-us"],
          ].map(([title, slug]) => (
            <a key={slug} href={href(`/${slug}/`)}>
              {t(title)}
            </a>
          ))}
        </div>
        <div>
          <h3>{t("Start a conversation")}</h3>
          <a href="mailto:operations@pluspointgulf.com">
            <bdi>operations@pluspointgulf.com</bdi>
          </a>
          <a href="tel:+966540560097">
            {t("KSA", "السعودية")}: <bdi>+966 54 056 0097</bdi>
          </a>
          <address>{t("Al Shumaisi Riyadh, Saudi Arabia", "الشميسي، الرياض، المملكة العربية السعودية")}</address>
          <a href="tel:+971565388457">
            {t("UAE", "الإمارات")}: <bdi>+971 56 538 8457</bdi>
          </a>
          <address>{t("Bur Dubai, Dubai, UAE.", "بر دبي، دبي، الإمارات العربية المتحدة.")}</address>
        </div>
      </div>
      <div className="pp-wrap footer-bottom">
        <span>
          &copy; {new Date().getFullYear()} {t("Plus Point Gulf")}
        </span>
        <a href={href("/privacy-policy/")}>{t("Privacy policy")}</a>
        <label className="motion-preference">
          <input
            type="checkbox"
            checked={reduceMotion}
            disabled={systemReduced}
            onChange={(event) => setReduceMotion(event.target.checked)}
          />
          {t("Reduce motion", "تقليل الحركة")}
        </label>
      </div>
      <div className="pp-wrap footer-wordmark" aria-hidden="true">
        <span>{t("PLUS POINT", "بلس بوينت")}</span>
        <span className="footer-logo-symbol logo-symbol" />
      </div>
    </footer>
  );
}
