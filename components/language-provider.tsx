"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Direction } from "radix-ui";
import { arabic } from "@/lib/translations";

type Language = "en" | "ar";
const LanguageContext = createContext({
  language: "en" as Language,
  setLanguage: (_language: Language) => {},
  t: (text: string, translation?: string) => text,
  href: (path: string) => path,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>("en");
  useEffect(() => {
    const restore = () => {
      const query = new URLSearchParams(window.location.search).get("lang");
      let saved: string | null = null;
      try {
        saved = localStorage.getItem("pluspoint-language");
      } catch {}
      updateLanguage(
        query === "ar" || query === "en" ? query : saved === "ar" ? "ar" : "en",
      );
    };
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  function setLanguage(next: Language) {
    updateLanguage(next);
    try {
      localStorage.setItem("pluspoint-language", next);
    } catch {}
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }
  function href(path: string) {
    if (language !== "ar" || !path.startsWith("/")) return path;
    const [pathname, hash] = path.split("#");
    return `${pathname}${pathname.includes("?") ? "&" : "?"}lang=ar${hash ? `#${hash}` : ""}`;
  }
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        href,
        t: (text, translation) =>
          language === "ar" ? (translation ?? arabic[text] ?? text) : text,
      }}
    >
      <Direction.Provider dir={language === "ar" ? "rtl" : "ltr"}>
        {children}
      </Direction.Provider>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
