# Landing QA

## Current Refinement (2026-10-08)

- Hero fills 1000px desktop and 844/740px mobile viewports, with no repeated logo mark or playback controls. Blue video decodes and plays; matching poster is retained.
- Neutral bands and generous section spacing; distinct stage and crew photographs in the adjacent company/services sections. Supplied logo remains in navigation and company/footer.
- Entire project section pins beneath navigation, with heading and View all projects visible. Scroll changes projects 01/02/03; image swipes, text entrances and Three.js tilt are coordinated. No next-project buttons or automatic timer.
- Desktop 1440x1000 and Arabic mobile 390x844 project photographs are nonblank and correctly framed. Final pixel samples span 0-255 in every RGB channel; standard deviations 75-81 in the inspected crops. Canvas rotation changes with scroll.
- Arabic 390px and 320px hero inspected without horizontal overflow; project text and CTA checked at both sizes. Wide desktop 2200x1200 retains capped 1480px content and full-height hero.
- Black full-viewport reveal shows the photograph through the actual mark, then enlarges to the darkened photograph while retaining the headline and a reading interval.
- Official WhatsApp glyph, icon-only 60-64px green action, accessible label and focus treatment. Menu/close use matching 48px borderless circular controls. Escape closes the menu and restores trigger focus.
- Footer type ring forms the upper half-circle and rotates over 110 seconds. Reduced-motion checkbox stops the ring, loops and video and exposes all three projects in normal flow. Both DOM branches remain mounted to avoid React/pin-wrapper conflicts.
- FAQ expands correctly. Reversed enquiry dates produce the inline validation error; valid dates prepare a reviewable email draft. Switching to Arabic preserves the name/details and translates the draft. No enquiry or WhatsApp message was sent.
- Final TypeScript check, production build, all 16 routes, both unknown-route 404s, media/font responses, bilingual email encoding and compressed blue video checks pass. Build emits a non-blocking size warning for the dynamically imported Three.js chunk.
- Screenshots: hero-desktop-final.png, projects-desktop-final.png, projects-mobile-ar-final.png and footer-desktop-final.png.
- Earlier revision notes below are historical, not the current colour/motion specification. This is a focused accessibility review, not a complete WCAG certification. Browser OS-media emulation was unavailable; manual preference was exercised and OS behaviour reviewed in code.

## Second Revision (2026-10-08)

- Landing rebuilt with large video hero, three blue section bands, large service photography and expanded descriptions/task lists.
- Desktop 1440 x 1000 and mobile 390 x 844 / 320 x 740 inspected. No horizontal overflow. Mobile hero leaves a visible hint of the following blue section.
- Hero video decoded at 1280 x 720 and played on desktop/mobile. Manual pause and off-screen pause verified in the browser. Reduced-motion and hidden-document behavior reviewed in the component; browser media emulation was not available.
- All seven landing image elements loaded. Crew image retains the full group; production/site photos fill their image areas.
- Mobile Services menu link closes the drawer, focuses the destination and lands below the sticky header.
- FAQ expansion verified. Enquiry prepares an encoded reviewable email draft, without sending. Blue-section copy/checklist and draft button contrast checked after correcting inherited colors.
- TypeScript, all 16 route checks, unknown-route 404s, image responses, compressed video response and production build pass.
- Hero MP4 is 1,701,652 bytes. Illustrative footage provenance is documented in README.
- Screenshot: `landing-blue-v2.jpg`.

## First Revision

Checks are performed against the local preview; no test enquiry is sent.

- TypeScript: passed.
- Desktop images: all loaded.
- Desktop at 1440px: no horizontal overflow; services and photo sections rendered.
- FAQ: opens and closes with the expected expanded state.
- Enquiry: inverted dates rejected with inline error and focus on the end date.
- Valid enquiry: encoded mailto draft prepared; edit preserves the entered fields.
- Mobile at 390px: hero, service hint and actions visible without horizontal overflow.
- Mobile navigation: modal drawer and accessible close control render.
- Escape closes the mobile drawer and restores focus to the menu trigger.
- Narrow mobile at 320px: no overflowing text or controls.
- All 16 routes: passed HTTP and heading checks. Unknown routes return 404.
- Enquiry text preserves special characters and line breaks in the encoded email draft.
- Production build: passed using the framework runner directly because the Windows npm shim resolves to an incorrect path.
- Fonts: self-hosted regular and semibold weights loaded correctly.
- Mobile page anchors wait until the drawer releases scroll lock before moving focus and scroll position to the destination section.

Supporting pages are outlines, not completed visual designs or approved content. Privacy and site standards require approval before public launch.
