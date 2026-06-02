import {
  BadgeCheck,
  CreditCard,
  MousePointerClick,
  Sparkles,
  Zap,
} from "lucide-react";
import { siteConfig } from "../lib/site";

const icons = [Sparkles, CreditCard, MousePointerClick, Zap, BadgeCheck];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-text">Why Choose SamsTek Services</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            We make it easy to learn practical tech skills with professional training you can trust.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.whyChooseUs.map((item, index) => {
            const Icon = icons[index] ?? Sparkles;
            return (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-secondary/15 text-brand-secondary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-brand-text">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
