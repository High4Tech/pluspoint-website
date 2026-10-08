"use client";

import { useRef, useState, type FormEvent } from "react";
import { Mail, Pencil } from "lucide-react";
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
import { useLanguage } from "@/components/language-provider";

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
  const { t } = useLanguage();
  return (
    <Accordion type="single" collapsible className="landing-faq">
      {questions.map(([question, answer], index) => (
        <AccordionItem value={`question-${index}`} key={question}>
          <AccordionTrigger>{t(question)}</AccordionTrigger>
          <AccordionContent>{t(answer)}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function EnquiryForm() {
  const { t, href, language } = useLanguage();
  const [draftValues, setDraftValues] = useState<Enquiry | null>(null);
  const draft = draftValues ? enquiryEmail(draftValues, language) : null;
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
    setDraftValues(values);
  }

  return (
    <form
      className="enquiry-form"
      onSubmit={prepareEnquiry}
      onChange={() => {
        setDraftValues(null);
        setError("");
      }}
    >
      <div className="form-heading">
        <h3>{t("Project enquiry")}</h3>
        <span>{t("* Required fields")}</span>
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">{t("Full name *")}</label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            maxLength={80}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="company">{t("Company name", "اسم الشركة")}</label>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            maxLength={100}
          />
        </div>
        <div className="field">
          <label htmlFor="email">{t("Work email *")}</label>
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
          <label htmlFor="phone">{t("Phone number")}</label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
          />
        </div>
        <div className="field">
          <label htmlFor="country">{t("Event location *")}</label>
          <NativeSelect id="country" name="country" required defaultValue="">
            <NativeSelectOption value="" disabled>
              {t("Select country")}
            </NativeSelectOption>
            <NativeSelectOption value="Saudi Arabia">
              {t("Saudi Arabia")}
            </NativeSelectOption>
            <NativeSelectOption value="United Arab Emirates">
              {t("United Arab Emirates")}
            </NativeSelectOption>
            <NativeSelectOption value="Other / Discuss coverage">
              {t("Other / Discuss coverage")}
            </NativeSelectOption>
          </NativeSelect>
        </div>
        <div className="field">
          <label htmlFor="service">{t("Service required *")}</label>
          <NativeSelect id="service" name="service" required defaultValue="">
            <NativeSelectOption value="" disabled>
              {t("Select service")}
            </NativeSelectOption>
            {services.map((item) => (
              <NativeSelectOption key={item.slug} value={item.title}>
                {t(item.title)}
              </NativeSelectOption>
            ))}
            <NativeSelectOption value="Multiple services / Not sure">
              {t("Multiple services / Not sure")}
            </NativeSelectOption>
          </NativeSelect>
        </div>
        <div className="field">
          <label htmlFor="startDate">{t("Start date")}</label>
          <Input type="date" id="startDate" name="startDate" />
        </div>
        <div className="field">
          <label htmlFor="endDate">{t("End date")}</label>
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
              {t(error)}
            </p>
          )}
        </div>
        <div className="field field-wide">
          <label htmlFor="crewSize">{t("Estimated crew size")}</label>
          <NativeSelect id="crewSize" name="crewSize" defaultValue="">
            <NativeSelectOption value="">
              {t("To be discussed")}
            </NativeSelectOption>
            {[
              "1-10 people",
              "11-25 people",
              "26-50 people",
              "More than 50 people",
            ].map((size) => (
              <NativeSelectOption key={size} value={size}>
                {t(size)}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        <div className="field field-wide">
          <label htmlFor="brief">{t("Project brief *")}</label>
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
            <Mail size={19} />
            {t("Prepare enquiry")}
          </button>
          <p className="form-note">
            {t(
              "Your brief is prepared as an email draft. Nothing is sent automatically.",
            )}
          </p>
        </>
      ) : (
        <div className="draft-ready" role="status">
          <h4>{t("Your enquiry is ready to review")}</h4>
          <p>
            {t(
              "Open the draft in your email app, review the details and send it to our operations team.",
            )}
          </p>
          <a className="button button-blue" href={draft.href}>
            <Mail size={18} />
            {t("Open email draft")}
          </a>
          <button
            className="text-link"
            type="button"
            onClick={() => setDraftValues(null)}
          >
            <Pencil size={16} />
            {t("Edit details")}
          </button>
          <details>
            <summary>{t("View enquiry text")}</summary>
            <pre>{draft.body}</pre>
          </details>
        </div>
      )}
      <p className="privacy-note">
        {t("Please include business enquiry details only.")}{" "}
        <a href={href("/privacy-policy/")}>{t("Privacy policy")}</a>
      </p>
    </form>
  );
}
