import assert from "node:assert/strict";
import { enquiryEmail } from "../lib/enquiry.ts";

const base = process.argv[2] || "http://localhost:5173";
const routes = ["/", "/services/", "/event-crew/", "/overlay-site-crew/", "/stage-production-crew/", "/tents-structure/", "/scaffolder/", "/expert-carpenter/", "/about-us/", "/project/", "/project/project-detail/", "/portfolio-2/", "/contact-us/", "/coverage/", "/safety/", "/privacy-policy/"];
for (const route of routes) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 200, `${route} must render`);
  const html = await response.text();
  assert.match(html, /<h1[\s>]/, `${route} needs a page heading`);
  assert.doesNotMatch(html, /Building your site|Internal Server Error/, `${route} must not render starter or error content`);
  console.log(`PASS ${route}`);
}
assert.equal((await fetch(new URL("/unknown-page/", base))).status, 404);
assert.equal((await fetch(new URL("/project/unknown-project/", base))).status, 404);
for (const asset of ["logo.png", "stage.jpeg", "scaffolding.jpeg", "team.jpeg"]) {
  const response = await fetch(new URL(`/images/${asset}`, base));
  assert.equal(response.status, 200);
  assert.ok((await response.arrayBuffer()).byteLength > 1000);
}
const draft = enquiryEmail({ name: "A & B", company: "Test", email: "preview@example.com", phone: "", country: "Saudi Arabia", service: "Event Crew", startDate: "", endDate: "", crewSize: "", brief: "Build & strike\nRiyadh" });
assert.ok(draft.href.startsWith("mailto:Operations@pluspointgulf.com?subject="));
const query = new URL(draft.href).searchParams;
assert.equal(query.get("body"), draft.body);
assert.match(draft.body, /Start: To be confirmed/);
assert.match(draft.body, /Name: A & B/);
assert.match(draft.body, /Build & strike\nRiyadh/);
console.log("PASS 404 routes, image responses and enquiry encoding");
