"use client";

import { ArrowRight, Menu, Phone, Mail } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigation, services } from "@/lib/site-content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pendingAnchor = useRef<string | null>(null);

  function followMobileLink(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
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
    // Navigate after the drawer releases its scroll lock and focus scope.
    requestAnimationFrame(() => {
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      if (window.location.hash !== hash) history.pushState(null, "", hash);
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "start" });
    });
  }
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>Event crew services in Saudi Arabia & UAE</span>
          <a href="mailto:Operations@pluspointgulf.com">
            <Mail size={14} /> Operations@pluspointgulf.com
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <a href="/" className="brand" aria-label="Plus Point Gulf home">
            <img
              src="/images/logo.png"
              width="74"
              height="74"
              alt="Plus Point Crew"
            />
            <span>
              Plus Point Gulf<small>EVENT CREW SERVICES</small>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <a href={item.href} key={item.label}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="button button-blue header-quote" href="/#enquiry">
            Request a quote <ArrowRight size={17} />
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="menu-button" aria-label="Open navigation">
                <Menu size={25} />
              </button>
            </SheetTrigger>
            <SheetContent className="mobile-sheet" aria-describedby={undefined} onCloseAutoFocus={finishMobileNavigation}>
              <SheetHeader>
                <SheetTitle>Plus Point Gulf</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile navigation">
                {navigation.map((item) => (
                  <a
                    href={item.href}
                    key={item.label}
                    onClick={followMobileLink}
                  >
                    {item.label}
                    <ArrowRight size={20} />
                  </a>
                ))}
                <a href="/#enquiry" onClick={followMobileLink}>
                  Request a quote
                  <ArrowRight size={20} />
                </a>
              </nav>
              <a className="mobile-phone" href="tel:+966540560097">
                <Phone size={18} />
                +966 54 056 0097
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <a className="footer-brand" href="/">
            Plus Point Gulf
          </a>
          <p>
            Event crew and specialist site support.
            <br />
            Saudi Arabia & United Arab Emirates.
          </p>
        </div>
        <div>
          <h3>Services</h3>
          {services.map((item) => (
            <a key={item.slug} href={`/${item.slug}/`}>
              {item.title}
            </a>
          ))}
        </div>
        <div>
          <h3>Company</h3>
          <a href="/about-us/">About us</a>
          <a href="/project/">Projects</a>
          <a href="/portfolio-2/">Gallery</a>
          <a href="/coverage/">Regional coverage</a>
          <a href="/safety/">Safety & site standards</a>
          <a href="/contact-us/">Contact us</a>
        </div>
        <div>
          <h3>Start a conversation</h3>
          <a href="mailto:Operations@pluspointgulf.com">
            Operations@pluspointgulf.com
          </a>
          <a href="tel:+966540560097">KSA: +966 54 056 0097</a>
          <a href="tel:+971565388457">UAE: +971 56 538 8457</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>&copy; {new Date().getFullYear()} Plus Point Gulf</span>
        <a href="/privacy-policy/">Privacy policy</a>
        <span>Saudi Arabia & UAE</span>
      </div>
    </footer>
  );
}
