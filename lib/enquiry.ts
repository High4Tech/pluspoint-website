import { arabic } from "./translations.ts";

export type Enquiry = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  service: string;
  startDate: string;
  endDate: string;
  crewSize: string;
  brief: string;
};

export function enquiryEmail(values: Enquiry, language: "en" | "ar" = "en") {
  const translate = (en: string, ar?: string) =>
    language === "ar" ? (ar ?? arabic[en] ?? en) : en;
  const service = translate(values.service);
  const country = translate(values.country);
  const subject = `${translate("Crew enquiry", "استفسار عن طاقم")}: ${service} - ${country}`;
  const body = [
    translate("Hello Plus Point Gulf,", "مرحباً بلس بوينت الخليج،"),
    "",
    translate(
      "Please contact me to discuss the following crew requirement:",
      "يرجى التواصل معي لمناقشة متطلبات الطاقم التالية:",
    ),
    "",
    `${translate("Name", "الاسم")}: ${values.name}`,
    `${translate("Company", "الشركة")}: ${values.company || translate("Not specified", "غير محدد")}`,
    `${translate("Email", "البريد الإلكتروني")}: ${values.email}`,
    `${translate("Phone", "الهاتف")}: ${values.phone || translate("Not specified", "غير محدد")}`,
    `${translate("Location", "الموقع")}: ${country}`,
    `${translate("Service", "الخدمة")}: ${service}`,
    `${translate("Start", "تاريخ البدء")}: ${values.startDate || translate("To be confirmed", "يؤكد لاحقاً")}`,
    `${translate("End", "تاريخ الانتهاء")}: ${values.endDate || translate("To be confirmed", "يؤكد لاحقاً")}`,
    `${translate("Estimated crew", "العدد التقديري للطاقم")}: ${translate(values.crewSize || "To be discussed")}`,
    "",
    translate("Project brief:", "ملخص المشروع:"),
    values.brief,
  ].join("\n");
  return {
    body,
    href: `mailto:Operations@pluspointgulf.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}
