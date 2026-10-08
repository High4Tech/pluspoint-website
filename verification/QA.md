# Landing QA

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
