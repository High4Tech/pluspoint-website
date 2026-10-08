import assert from "node:assert/strict";
import { enquiryEmail } from "../lib/enquiry.ts";

const base = process.argv[2] || "http://localhost:5173";
const routes = [
  "/",
  "/services/",
  "/event-crew/",
  "/overlay-site-crew/",
  "/stage-production-crew/",
  "/tents-structure/",
  "/scaffolder/",
  "/expert-carpenter/",
  "/about-us/",
  "/project/",
  "/project/project-detail/",
  "/portfolio-2/",
  "/contact-us/",
  "/coverage/",
  "/safety/",
  "/privacy-policy/",
];
for (const route of routes) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 200, `${route} must render`);
  const html = await response.text();
  assert.match(html, /<h1[\s>]/, `${route} needs a page heading`);
  assert.doesNotMatch(
    html,
    /Building your site|Internal Server Error/,
    `${route} must not render starter or error content`,
  );
  console.log(`PASS ${route}`);
}
assert.equal((await fetch(new URL("/unknown-page/", base))).status, 404);
assert.equal(
  (await fetch(new URL("/project/unknown-project/", base))).status,
  404,
);
for (const asset of [
  "plus-point-logo.svg",
  "plus-point-symbol.svg",
  "stage.jpeg",
  "scaffolding.jpeg",
  "team.jpeg",
  "event-poster-blue.jpg",
  "concept-event.jpg",
  "arena.png",
]) {
  const response = await fetch(new URL(`/images/${asset}`, base));
  assert.equal(response.status, 200);
  assert.ok((await response.arrayBuffer()).byteLength > 1000);
}
const draft = enquiryEmail({
  name: "A & B",
  company: "Test",
  email: "preview@example.com",
  phone: "",
  country: "Saudi Arabia",
  service: "Event Crew",
  startDate: "",
  endDate: "",
  crewSize: "",
  brief: "Build & strike\nRiyadh",
});
assert.ok(
  draft.href.startsWith("mailto:operations@pluspointgulf.com?subject="),
);
const query = new URL(draft.href).searchParams;
assert.equal(query.get("body"), draft.body);
assert.match(draft.body, /Start: To be confirmed/);
assert.match(draft.body, /Name: A & B/);
assert.match(draft.body, /Build & strike\nRiyadh/);
const film = await fetch(new URL("/video/event-film-blue.mp4", base));
assert.equal(film.status, 200);
assert.match(film.headers.get("content-type"), /video\/mp4/);
const filmBytes = (await film.arrayBuffer()).byteLength;
assert.ok(
  filmBytes > 100_000 && filmBytes < 3_000_000,
  "Hero footage must be compressed",
);
const landing = await (await fetch(new URL("/", base))).text();
assert.match(landing, /<video[\s>]/);
assert.doesNotMatch(landing, /class="v2-film-control"/);
assert.match(landing, /Reduce motion/);
assert.match(landing, /pp-blue/);
assert.match(landing, /Loading, unloading and equipment movement/);
for (const font of ["boldonse-regular.ttf", "cairo-variable.ttf"]) {
  const response = await fetch(new URL(`/fonts/${font}`, base));
  assert.equal(response.status, 200);
  assert.ok((await response.arrayBuffer()).byteLength > 1000);
}
const arabicDraft = enquiryEmail(
  {
    name: "أحمد",
    company: "",
    email: "preview@example.com",
    phone: "",
    country: "Saudi Arabia",
    service: "Event Crew",
    startDate: "",
    endDate: "",
    crewSize: "",
    brief: "تجهيز وتفكيك الفعالية",
  },
  "ar",
);
assert.match(arabicDraft.body, /الاسم: أحمد/);
assert.match(arabicDraft.body, /المملكة العربية السعودية/);
assert.equal(
  new URL(arabicDraft.href).searchParams.get("body"),
  arabicDraft.body,
);
assert.match(landing, /Switch to Arabic/);
assert.match(landing, /CLIENT LOGO PLACEHOLDERS/);
assert.match(landing, /not confirmed Plus Point clients/);
assert.match(landing, /wa\.me\/966540560097/);
assert.match(landing, /CONCEPT PREVIEW/);
assert.match(landing, /information-ticker/);
assert.match(landing, /View all projects/);
assert.match(landing, /project-scroll-stage/);
assert.doesNotMatch(landing, /Previous project|Next project|hero-plus/);
assert.match(landing, /whatsapp\.svg/);
assert.match(landing, /event-film-blue/);
assert.equal((await fetch(new URL("/images/fifa.svg", base))).status, 200);
console.log(
  "PASS 404 routes, image responses, enquiry encoding and compressed hero video",
);
