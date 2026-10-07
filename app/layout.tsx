import type { Metadata } from "next";
import "./globals.css";

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
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
          href="/fonts/source-sans-3-semibold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
