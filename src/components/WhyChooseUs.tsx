import {
  BadgeCheck,
  CreditCard,
  MousePointerClick,
  Sparkles,
  Zap,
} from "lucide-react";
import { siteConfig } from "../lib/site";

const icons = [Sparkles, CreditCard, MousePointerClick, Zap, BadgeCheck];

const gradients = [
  "from-blue-50 to-cyan-50",
  "from-cyan-50 to-teal-50",
  "from-teal-50 to-blue-50",
  "from-sky-50 to-blue-50",
  "from-blue-50 to-indigo-50",
];

const accentColors = [
  "border-blue-200 bg-blue-50",
  "border-cyan-200 bg-cyan-50",
  "border-teal-200 bg-teal-50",
  "border-sky-200 bg-sky-50",
  "border-indigo-200 bg-indigo-50",
];

const iconBgGradients = [
  "from-brand-primary/15 to-blue-400/10",
  "from-brand-secondary/15 to-cyan-400/10",
  "from-teal-400/15 to-cyan-400/10",
  "from-sky-400/15 to-blue-400/10",
  "from-indigo-400/15 to-brand-primary/10",
];

const iconColors = [
  "text-brand-primary",
  "text-brand-secondary",
  "text-teal-600",
  "text-sky-600",
  "text-indigo-600",
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="relative px-4 py-20 sm:px-6 sm:py-24">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-3 px-3 py-1 rounded-full border border-brand-primary/20 bg-brand-primary/5">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
              Why Choose Us
            </p>
          </div>
          <h2 className="text-4xl font-bold text-brand-text sm:text-5xl">
            Why SamsTek Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            We make it easy to learn practical tech skills with professional training you can trust.
          </p>
        </div>

        {/* Grid of features */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.whyChooseUs.map((item, index) => {
            const Icon = icons[index] ?? Sparkles;
            return (
              <div
                key={item.title}
                className={`group relative overflow-hidden rounded-xl border bg-gradient-to-br ${gradients[index]} ${accentColors[index]} p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default`}
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon container */}
                <div className={`relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${iconBgGradients[index]} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                  <Icon className={`h-6 w-6 ${iconColors[index]} transition-transform duration-300 group-hover:rotate-12`} />
                </div>

                {/* Title */}
                <h3 className="relative text-lg font-bold text-brand-text mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="relative text-sm leading-relaxed text-slate-700">
                  {item.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
