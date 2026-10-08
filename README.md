# Plus Point Gulf Redesign

The landing page is designed and implemented. Supporting pages contain a shared shell, working routes and section outlines only. Their content and visual design remain a later phase.

## Run

`npm run dev` serves the site on port 5173. `npm run build` creates the Cloudflare-compatible production output.

On this Windows machine, the npm shim required invoking the installed npm CLI directly:

```powershell
& 'C:\Program Files\nodejs\node.exe' 'C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js' run dev
```

## Scope

- Landing: services, existing crew and site photography, deployment process, company overview, regional contacts, FAQ and enquiry.
- Outlines: service index and six service pages, About, Projects and project detail, Gallery, Contact, Coverage, Site Standards and Privacy.
- Unknown page and project slugs return a 404.
- Supporting outlines are marked noindex until their content is approved.

The enquiry form validates required fields and date order, then prepares an email draft. It does not submit, store or claim to send a lead. A real submission backend, approved privacy copy and operational delivery rules are required before a public production launch.

## Design Sources

The current revision uses the supplied SVG identity, a full-viewport blue-graded video hero without a repeated logo, Boldonse/Cairo display typography and regular Source Sans 3 body text. Neutral backgrounds and generous spacing support restrained gold CTAs, a complete pinned GSAP/Three.js project section with card/text transitions, a continuous process story and a photo-filled transparent logo reveal on black with retained white text. The company section uses a different photograph from the following crew-services section. Client placeholders, information ticker and full-screen menu remain. WhatsApp is an authentic green icon-only button; the footer contains a slowly rotating bold type ring. English/Arabic content and direction are authored, including enquiry drafts. Supporting pages remain outlines. Read [DESIGN-CONTINUITY.md](./DESIGN-CONTINUITY.md) before future work; its latest refinements supersede earlier plan colours and motion patterns.

The active hero is a blue-graded version of the general "Vibrant Festival Crowd" asset observed on MDNT Events, reused at the user's request for this private design review. Its underlying reuse license is unverified. It is illustrative, not a Plus Point event/showreel. Obtain permission or replace with approved/licensed footage before public commercial launch. H.264 yuv420p, 1280 x 720, 25 fps, no audio, under 3MB, with matching poster. Playback controls are intentionally absent from hero/navigation; the footer's saved Reduce motion option stops autoplay and decorative motion, alongside OS preferences. The following paragraph records the previous, inactive hero asset.

Arena, FIFA and a WWE wordmark are expressly requested design placeholders, visibly identified as unconfirmed clients. The corporate event photograph is generated concept imagery. Use approved client logos and actual project evidence before a public launch. WhatsApp uses its recognisable brand glyph, sourced from Simple Icons, and the published Saudi phone contact.

Hero footage is illustrative, not a Plus Point event or showreel. Source: Yunus Terk, [aerial concert stage on Pexels](https://www.pexels.com/video/aerial-night-view-of-illuminated-concert-stage-37852804/), under the [Pexels license](https://www.pexels.com/license/). The self-hosted file is H.264, 1280 x 720, 25 fps, no audio, approximately 1.7 MB. Replace it with an approved company showreel before using it as branded work evidence. It pauses when off screen or when the document is hidden, respects reduced-motion preferences, and has a manual play/pause control and still-photo fallback.

The plan is in `../LANDING-PAGE-PLAN.md`. Visual direction draws on Adline Media, MICE International, Venttat and Team Events, while retaining Plus Point's brand identity. Original photographs and logo were retrieved from the public Plus Point Gulf website. The crew image is not a substitute for independently verified project results. No invented metrics, certifications, client endorsements or named case studies are included.

Source Sans 3 is self-hosted from Google Fonts. Typeface project: https://github.com/adobe-fonts/source-sans (SIL Open Font License).

The installed `frontend-design`, `design-taste-frontend` and `web-design-guidelines` skills informed implementation and checks. `imagegen-frontend-mobile` was reviewed but explicitly excludes websites, so it was not used to generate native-app mockups for this website.

## Verify

With the preview running: `node scripts/verify-site.mjs`. This checks all planned routes, 404s, image responses and email draft encoding. Use `npx tsc --noEmit` for TypeScript. Responsive and interaction checks are recorded in `verification/QA.md`.
