import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { enquiryEmail } from "../lib/enquiry.ts";
import { arabic } from "../lib/translations.ts";

const addresses = ["Al Shumaisi Riyadh, Saudi Arabia", "Bur Dubai, Dubai, UAE."];
for (const file of ["components/landing-page.tsx", "components/site-shell.tsx", "lib/page-structure.ts"]) {
  const source = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
  for (const address of addresses) assert.ok(source.includes(address), `${file}: missing address`);
  assert.ok(source.includes("operations@pluspointgulf.com"), `${file}: missing operations email`);
  assert.ok(source.includes("tel:+966540560097"), `${file}: missing Saudi telephone`);
  assert.ok(source.includes("tel:+971565388457"), `${file}: missing UAE telephone`);
  assert.ok(!source.includes("tasneem@"), `${file}: obsolete Saudi email`);
}
for (const address of addresses) assert.ok(arabic[address], "Both addresses need Arabic translations");
for (const language of ["en", "ar"]) {
  const draft = enquiryEmail({name: "Preview", company: "", email: "preview@example.com", phone: "", country: "Saudi Arabia", service: "Event Crew", startDate: "", endDate: "", crewSize: "", brief: "Preview only"}, language);
  assert.ok(draft.href.startsWith("mailto:operations@pluspointgulf.com?"));
}
console.log("PASS office addresses, phone links, shared email and Arabic translations");
