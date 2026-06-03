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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-all animate-in fade-in duration-300"
        onClick={onClose}
        aria-label="Close enrollment form"
      />

      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 animate-in zoom-in-95 fade-in duration-300">
        {/* Top gradient accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-blue-500 rounded-t-2xl" />

        <div className="p-6">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mb-6 flex justify-center">
            <Logo size="sm" linkToHome={false} />
          </div>

          <h2 className="text-2xl font-bold text-brand-text">Enroll Now</h2>
          <p className="mt-2 text-sm font-semibold text-brand-primary">
            {tutorial.name}
          </p>
          <p className="mt-1 text-lg font-bold text-slate-900">
            {siteConfig.currency} {Number(tutorial.price).toFixed(2)}
          </p>
          <p className="mt-3 text-xs text-slate-500 leading-relaxed">
            Complete your enrollment and proceed to secure payment via{" "}
            <a
              href={siteConfig.paystackPaymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-primary transition-colors hover:text-blue-600"
            >
              Paystack
            </a>
            . Your enrollment confirmation will be sent to your email.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={form.fullName}
                onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm transition-all placeholder:text-slate-400 hover:border-slate-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm transition-all placeholder:text-slate-400 hover:border-slate-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none"
                placeholder="you@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-slate-700">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm transition-all placeholder:text-slate-400 hover:border-slate-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none"
                placeholder="+233 XX XXX XXXX"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                <p className="font-semibold">Error</p>
                <p className="mt-1 text-xs">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-primary to-blue-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/30 transition-all hover:shadow-lg hover:shadow-brand-primary/50 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
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
    </div>
  );
}
