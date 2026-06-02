import { siteConfig } from "./site";

export function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

/** Amount in pesewas (GHS minor unit) for Paystack payment pages. */
export function ghsToPesewas(amountGhs: number): number {
  return Math.round(amountGhs * 100);
}

export function buildPaystackShopUrl(options: {
  email: string;
  fullName: string;
  amountGhs: number;
  tutorialName?: string;
  phone?: string;
}): string {
  const { firstName, lastName } = splitFullName(options.fullName);
  const url = new URL(siteConfig.paystackPaymentUrl);

  url.searchParams.set("email", options.email);
  url.searchParams.set("amount", String(ghsToPesewas(options.amountGhs)));

  if (firstName) url.searchParams.set("first_name", firstName);
  if (lastName) url.searchParams.set("last_name", lastName);

  if (options.tutorialName) {
    url.searchParams.set("metadata[tutorial]", options.tutorialName);
  }
  if (options.phone) {
    url.searchParams.set("metadata[phone]", options.phone);
  }

  return url.toString();
}

export function redirectToPaystackShop(options: Parameters<typeof buildPaystackShopUrl>[0]) {
  window.location.href = buildPaystackShopUrl(options);
}
