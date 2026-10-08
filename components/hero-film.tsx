"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export function HeroFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const preference = useRef<boolean | null>(null);
  const visible = useRef(true);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const synchronize = () => {
      const shouldPlay =
        (preference.current ?? !reducedMotion.matches) &&
        visible.current &&
        !document.hidden;
      if (shouldPlay) void element.play().catch(() => setPlaying(false));
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
  }, []);

  function toggle() {
    if (!video.current) return;
    preference.current = !playing;
    if (playing) video.current.pause();
    else void video.current.play().catch(() => setPlaying(false));
  }

  return (
    <>
      <img
        className="v2-hero-poster"
        src="/images/stage.jpeg"
        alt=""
        width="2560"
        height="1183"
        fetchPriority="high"
      />
      <video
        ref={video}
        className={`v2-hero-video ${failed ? "v2-film-failed" : ""}`}
        poster="/images/stage.jpeg"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      >
        <source
          src="/video/event-film.mp4"
          type="video/mp4"
          onError={() => setFailed(true)}
        />
      </video>
      {!failed && (
        <button
          type="button"
          className="v2-film-control"
          aria-label={
            playing ? "Pause background video" : "Play background video"
          }
          title={playing ? "Pause background video" : "Play background video"}
          onClick={toggle}
        >
          {playing ? <Pause size={19} /> : <Play size={19} />}
        </button>
      )}
    </>
  );
}
