"use client";

import { useRef, useState, type ReactNode, type PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "./language-provider";

export function ProjectLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const cursor = useRef<HTMLSpanElement>(null);
  const [inside, setInside] = useState(false);
  const { t } = useLanguage();
  function move(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse" || !cursor.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    cursor.current.style.setProperty(
      "--cursor-x",
      `${event.clientX - bounds.left}px`,
    );
    cursor.current.style.setProperty(
      "--cursor-y",
      `${event.clientY - bounds.top}px`,
    );
    setInside(true);
  }
  return (
    <a
      href={href}
      className={`project-link ${className} ${inside ? "cursor-inside" : ""}`}
      onPointerMove={move}
      onPointerLeave={() => setInside(false)}
      aria-label={t("View project", "شاهد المشروع")}
    >
      {children}
      <span className="project-pointer" ref={cursor} aria-hidden="true">
        {t("View project", "شاهد المشروع")}
        <ArrowUpRight size={20} />
      </span>
    </a>
  );
}
