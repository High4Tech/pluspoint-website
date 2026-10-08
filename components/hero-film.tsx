"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionPreference } from "./motion-preference";

export function HeroFilm() {
  const { reduceMotion } = useMotionPreference();
  const video = useRef<HTMLVideoElement>(null);
  const visible = useRef(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const synchronize = () => {
      const shouldPlay =
        !reduceMotion &&
        !reducedMotion.matches &&
        visible.current &&
        !document.hidden;
      if (shouldPlay) void element.play().catch(() => {});
      else element.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      synchronize();
    });
    observer.observe(element);
    reducedMotion.addEventListener("change", synchronize);
    document.addEventListener("visibilitychange", synchronize);
    synchronize();
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", synchronize);
      document.removeEventListener("visibilitychange", synchronize);
      element.pause();
    };
  }, [reduceMotion]);

  return (
    <>
      <img
        className="v2-hero-poster"
        src="/images/event-poster-blue.jpg"
        alt=""
        width="2560"
        height="1183"
        fetchPriority="high"
      />
      <video
        ref={video}
        className={`v2-hero-video ${failed ? "v2-film-failed" : ""}`}
        poster="/images/event-poster-blue.jpg"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onError={() => setFailed(true)}
      >
        <source
          src="/video/event-film-blue.mp4"
          type="video/mp4"
          onError={() => setFailed(true)}
        />
      </video>
    </>
  );
}
