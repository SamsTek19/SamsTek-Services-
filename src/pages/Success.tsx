import { CheckCircle2, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { siteConfig } from "../lib/site";

interface SuccessData {
  studentName: string;
  tutorialName: string;
  amountPaid: number;
  reference: string;
}

export function Success() {
  const [params] = useSearchParams();
  const [data, setData] = useState<SuccessData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("enrollmentSuccess");
    if (stored) {
      setData(JSON.parse(stored) as SuccessData);
      return;
    }

    const ref = params.get("ref");
    if (ref) {
      setData({
        studentName: "Student",
        tutorialName: "Your tutorial",
        amountPaid: 0,
        reference: ref,
      });
    }
  }, [params]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-2xl font-bold text-brand-text">Payment Successful!</h1>
        <p className="mt-2 text-slate-600">
          Thank you for enrolling with {siteConfig.name}. A confirmation email has been sent to
          your inbox.
        </p>

        {data && (
          <dl className="mt-8 space-y-3 rounded-xl bg-slate-50 p-4 text-left text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Student</dt>
              <dd className="font-medium text-brand-text">{data.studentName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Tutorial</dt>
              <dd className="font-medium text-brand-text">{data.tutorialName}</dd>
            </div>
            {data.amountPaid > 0 && (
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Amount Paid</dt>
                <dd className="font-medium text-brand-text">
                  {siteConfig.currency} {data.amountPaid.toFixed(2)}
                </dd>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Reference</dt>
              <dd className="break-all font-mono text-xs font-medium text-brand-text">
                {data.reference}
              </dd>
            </div>
          </dl>
        )}

        <p className="mt-6 text-sm text-slate-600">
          Need help? Contact us at{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-brand-primary hover:underline">
            {siteConfig.email}
          </a>
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
