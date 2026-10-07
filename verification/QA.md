# Landing QA

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
