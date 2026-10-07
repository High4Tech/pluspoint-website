"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Mail, Pencil } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { services } from "@/lib/site-content";
import { enquiryEmail, type Enquiry } from "@/lib/enquiry";

const questions = [
  [
    "What types of crew can I request?",
    "General event crew, overlay and site crew, stage and production support, tents and structures, scaffolding crews and event carpentry. Include the tasks you need covered so the team can discuss the appropriate roles.",
  ],
  [
    "Where does Plus Point Gulf operate?",
    "Plus Point Gulf lists regional contacts in Riyadh, Saudi Arabia and Dubai, United Arab Emirates. Share your exact event location so coverage and deployment arrangements can be confirmed.",
  ],
  [
    "What do you need to prepare a quote?",
    "Your event location, service requirements, estimated crew size, shift schedule and build, show and breakdown dates. Site access requirements and the work scope help define the enquiry.",
  ],
  [
    "Can I request support for more than one event phase?",
    "Yes, you can include setup, event operations and breakdown in the same brief. Availability, crew allocation and the agreed scope need to be confirmed with the team.",
  ],
  [
    "What if my crew requirements are not final yet?",
    "Send the information you have and mark any dates, headcounts or tasks that are still provisional. The team can discuss the scope with you before a quote is confirmed.",
  ],
];

export function LandingFaq() {
  return (
    <Accordion type="single" collapsible className="landing-faq">
      {questions.map(([question, answer], index) => (
        <AccordionItem value={`question-${index}`} key={question}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function EnquiryForm() {
  const [draft, setDraft] = useState<ReturnType<typeof enquiryEmail> | null>(
    null,
  );
  const [error, setError] = useState("");
  const endDateInput = useRef<HTMLInputElement>(null);

  function prepareEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(
      [...data.entries()].map(([key, value]) => [key, String(value).trim()]),
    ) as Enquiry;
    if (!values.name || !values.brief) {
      setError("Please enter your name and a project brief.");
      return;
    }
    if (
      values.startDate &&
      values.endDate &&
      values.endDate < values.startDate
    ) {
      setError("The end date must be on or after the start date.");
      endDateInput.current?.focus();
      return;
    }
    setError("");
    setDraft(enquiryEmail(values));
  }

  return (
    <form
      className="enquiry-form"
      onSubmit={prepareEnquiry}
      onChange={() => {
        setDraft(null);
        setError("");
      }}
    >
      <div className="form-heading">
        <h3>Project enquiry</h3>
        <span>* Required fields</span>
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Full name *</label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            maxLength={80}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="company">Company</label>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            maxLength={100}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Work email *</label>
          <Input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            spellCheck={false}
            autoComplete="email"
            maxLength={150}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone number</label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
          />
        </div>
        <div className="field">
          <label htmlFor="country">Event location *</label>
          <NativeSelect id="country" name="country" required defaultValue="">
            <NativeSelectOption value="" disabled>
              Select country
            </NativeSelectOption>
            <NativeSelectOption>Saudi Arabia</NativeSelectOption>
            <NativeSelectOption>United Arab Emirates</NativeSelectOption>
            <NativeSelectOption>Other / Discuss coverage</NativeSelectOption>
          </NativeSelect>
        </div>
        <div className="field">
          <label htmlFor="service">Service required *</label>
          <NativeSelect id="service" name="service" required defaultValue="">
            <NativeSelectOption value="" disabled>
              Select service
            </NativeSelectOption>
            {services.map((item) => (
              <NativeSelectOption key={item.slug}>
                {item.title}
              </NativeSelectOption>
            ))}
            <NativeSelectOption>
              Multiple services / Not sure
            </NativeSelectOption>
          </NativeSelect>
        </div>
        <div className="field">
          <label htmlFor="startDate">Start date</label>
          <Input type="date" id="startDate" name="startDate" />
        </div>
        <div className="field">
          <label htmlFor="endDate">End date</label>
          <Input
            ref={endDateInput}
            type="date"
            id="endDate"
            name="endDate"
            aria-describedby={error ? "enquiry-error" : undefined}
            aria-invalid={!!error || undefined}
          />
          {error && (
            <p className="form-error" id="enquiry-error" role="alert">
              {error}
            </p>
          )}
        </div>
        <div className="field field-wide">
          <label htmlFor="crewSize">Estimated crew size</label>
          <NativeSelect id="crewSize" name="crewSize" defaultValue="">
            <NativeSelectOption value="">To be discussed</NativeSelectOption>
            <NativeSelectOption>1-10 people</NativeSelectOption>
            <NativeSelectOption>11-25 people</NativeSelectOption>
            <NativeSelectOption>26-50 people</NativeSelectOption>
            <NativeSelectOption>More than 50 people</NativeSelectOption>
          </NativeSelect>
        </div>
        <div className="field field-wide">
          <label htmlFor="brief">Project brief *</label>
          <Textarea
            id="brief"
            name="brief"
            rows={4}
            maxLength={3000}
            required
          />
        </div>
      </div>
      {!draft ? (
        <>
          <button type="submit" className="button button-blue">
            Prepare enquiry <ArrowRight size={19} />
          </button>
          <p className="form-note">
            Your brief is prepared as an email draft. Nothing is sent
            automatically.
          </p>
        </>
      ) : (
        <div className="draft-ready" role="status">
          <h4>Your enquiry is ready to review</h4>
          <p>
            Open the draft in your email app, review the details and send it to
            our operations team.
          </p>
          <a className="button button-blue" href={draft.href}>
            <Mail size={18} />
            Open email draft
          </a>
          <button
            className="text-link"
            type="button"
            onClick={() => setDraft(null)}
          >
            <Pencil size={16} />
            Edit details
          </button>
          <details>
            <summary>View enquiry text</summary>
            <pre>{draft.body}</pre>
          </details>
        </div>
      )}
      <p className="privacy-note">
        Please include business enquiry details only.{" "}
        <a href="/privacy-policy/">Privacy policy</a>
      </p>
    </form>
  );
}
