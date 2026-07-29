const CONTACT_EMAIL = "lucascardosoft@gmail.com";

interface ContactMailtoCopy {
  subject: string;
  body: string;
}

interface CaseAccessMailtoCopy {
  bodyWithCompany: string;
  bodyWithoutCompany: string;
}

interface CaseAccessMailtoParams {
  title: string;
  company?: string;
}

function buildMailto(subject: string, body: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export function createContactMailto(copy: ContactMailtoCopy): string {
  return buildMailto(copy.subject, copy.body);
}

export function createCaseAccessMailto(
  copy: CaseAccessMailtoCopy,
  { title, company }: CaseAccessMailtoParams
): string {
  const subject = `Request access — ${title}`;
  const template = company ? copy.bodyWithCompany : copy.bodyWithoutCompany;
  const body = template
    .replaceAll("{{title}}", title)
    .replaceAll("{{company}}", company ?? "");

  return buildMailto(subject, body);
}
