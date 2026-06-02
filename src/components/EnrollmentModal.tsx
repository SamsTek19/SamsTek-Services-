import { Loader2, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Logo } from "./Logo";
import { redirectToPaystackShop } from "../lib/paystackShop";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { siteConfig } from "../lib/site";
import type { EnrollmentFormData, Tutorial } from "../lib/types";

interface EnrollmentModalProps {
  tutorial: Tutorial | null;
  open: boolean;
  onClose: () => void;
}

export function EnrollmentModal({ tutorial, open, onClose }: EnrollmentModalProps) {
  const [form, setForm] = useState<EnrollmentFormData>({
    fullName: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setForm({ fullName: "", email: "", phone: "" });
      setError(null);
    }
  }, [open]);

  if (!open || !tutorial) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!tutorial) return;

    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    const selectedTutorial = tutorial;

    try {
      if (isSupabaseConfigured && supabase) {
        const { error: insertError } = await supabase.from("enrollments").insert({
          tutorial_id: selectedTutorial.id,
          full_name: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          status: "pending",
        });

        if (insertError) throw new Error(insertError.message);
      }

      sessionStorage.setItem(
        "pendingEnrollment",
        JSON.stringify({
          studentName: form.fullName.trim(),
          tutorialName: selectedTutorial.name,
          amountPaid: Number(selectedTutorial.price),
          email: form.email.trim(),
          phone: form.phone.trim(),
        }),
      );

      redirectToPaystackShop({
        email: form.email.trim(),
        fullName: form.fullName.trim(),
        amountGhs: Number(selectedTutorial.price),
        tutorialName: selectedTutorial.name,
        phone: form.phone.trim(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close enrollment form"
      />

      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4 flex justify-center">
          <Logo size="sm" linkToHome={false} />
        </div>

        <h2 className="text-xl font-bold text-brand-text">Enroll Now</h2>
        <p className="mt-1 text-sm text-slate-600">
          {tutorial.name} — {siteConfig.currency} {Number(tutorial.price).toFixed(2)}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          You will complete payment securely on{" "}
          <a
            href={siteConfig.paystackPaymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary hover:underline"
          >
            Paystack
          </a>
          .
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={form.fullName}
              onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-primary focus:border-brand-primary focus:ring-2"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-primary focus:border-brand-primary focus:ring-2"
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-primary focus:border-brand-primary focus:ring-2"
              placeholder="+233 XX XXX XXXX"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-primary py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Redirecting to Paystack...
              </>
            ) : (
              "Proceed to Payment"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
