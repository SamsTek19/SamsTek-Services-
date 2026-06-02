import type { PaystackOptions } from "./types";

const PAYSTACK_SCRIPT = "https://js.paystack.co/v1/inline.js";

let scriptPromise: Promise<void> | null = null;

export function loadPaystackScript(): Promise<void> {
  if (window.PaystackPop) return Promise.resolve();

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${PAYSTACK_SCRIPT}"]`,
      );
      if (existing) {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error("Paystack failed to load")));
        return;
      }

      const script = document.createElement("script");
      script.src = PAYSTACK_SCRIPT;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Paystack failed to load"));
      document.body.appendChild(script);
    });
  }

  return scriptPromise;
}

export async function openPaystackCheckout(options: PaystackOptions) {
  await loadPaystackScript();

  if (!window.PaystackPop) {
    throw new Error("Paystack is not available");
  }

  const handler = window.PaystackPop.setup(options);
  handler.openIframe();
}

export function amountToKobo(amount: number): number {
  return Math.round(amount * 100);
}
