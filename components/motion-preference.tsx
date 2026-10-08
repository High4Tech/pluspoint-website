"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const MotionContext = createContext({
  reduceMotion: false,
  systemReduced: false,
  setReduceMotion: (_value: boolean) => {},
});

export function MotionPreference({ children }: { children: ReactNode }) {
  const [manual, setManual] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const synchronize = () => setSystemReduced(media.matches);
    synchronize();
    try {
      setManual(localStorage.getItem("pluspoint-reduce-motion") === "true");
    } catch {}
    media.addEventListener("change", synchronize);
    return () => media.removeEventListener("change", synchronize);
  }, []);
  const reduceMotion = manual || systemReduced;
  useEffect(() => {
    document.documentElement.dataset.motion = reduceMotion ? "reduced" : "full";
  }, [reduceMotion]);
  function setReduceMotion(value: boolean) {
    setManual(value);
    try {
      localStorage.setItem("pluspoint-reduce-motion", String(value));
    } catch {}
  }
  return (
    <MotionContext.Provider
      value={{ reduceMotion, systemReduced, setReduceMotion }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export const useMotionPreference = () => useContext(MotionContext);
