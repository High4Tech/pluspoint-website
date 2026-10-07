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

export function enquiryEmail(values: Enquiry) {
  const subject = `Crew enquiry: ${values.service} - ${values.country}`;
  const body = [
    "Hello Plus Point Gulf,",
    "",
    "Please contact me to discuss the following crew requirement:",
    "",
    `Name: ${values.name}`,
    `Company: ${values.company || "Not specified"}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone || "Not specified"}`,
    `Location: ${values.country}`,
    `Service: ${values.service}`,
    `Start: ${values.startDate || "To be confirmed"}`,
    `End: ${values.endDate || "To be confirmed"}`,
    `Estimated crew: ${values.crewSize || "To be discussed"}`,
    "",
    "Project brief:",
    values.brief,
  ].join("\n");
  return {
    body,
    href: `mailto:Operations@pluspointgulf.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}
