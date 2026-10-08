import type { Metadata } from "next";
import "./globals.css";
import "./landing-v3.css";
import "./brand-experience.css";
import "./refinements.css";
import { LanguageProvider } from "@/components/language-provider";
import { MotionPreference } from "@/components/motion-preference";

export const metadata: Metadata = {
  title: {
    default: "Plus Point Gulf | Event Crew & Site Support",
    template: "%s | Plus Point Gulf",
  },
  description:
    "Event crew, stage production, overlay, scaffolding, tents and carpentry support in Saudi Arabia and the UAE. Discuss your next project with Plus Point Gulf.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/images/plus-point-logo.svg",
    shortcut: "/images/plus-point-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link
          rel="preload"
          href="/fonts/source-sans-3-regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/boldonse-regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="antialiased">
        <MotionPreference>
          <LanguageProvider>{children}</LanguageProvider>
        </MotionPreference>
      </body>
    </html>
  );
}
