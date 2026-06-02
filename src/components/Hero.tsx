import { ArrowRight, BookOpen } from "lucide-react";
import { siteConfig } from "../lib/site";
import { HeroVideoBackground } from "./HeroVideoBackground";

interface HeroProps {
  onEnrollClick: () => void;
}

export function Hero({ onEnrollClick }: HeroProps) {
  return (
    <section className="relative min-h-[min(100vh,820px)] overflow-hidden">
      <HeroVideoBackground />

      {/* Cinematic overlay stack */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-blue-950/50 to-cyan-950/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/15 to-slate-950/45" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/70 to-transparent" />

      <div className="relative mx-auto flex min-h-[min(100vh,820px)] max-w-6xl flex-col justify-center px-4 py-24 sm:px-6 sm:py-32">
        <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-semibold text-cyan-200 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <BookOpen className="h-4 w-4 text-cyan-300" />
          Technology &amp; Digital Skills Training
        </div>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl" style={{ textShadow: "0 2px 40px rgba(37,99,235,0.4)" }}>
          {siteConfig.tagline}
        </h1>
        <p className="mt-5 text-base font-semibold uppercase tracking-[0.2em] text-cyan-300/90 sm:text-sm">
          Learn &nbsp;·&nbsp; Build &nbsp;·&nbsp; Grow
        </p>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-200/85">{siteConfig.description}</p>

        {/* Stats row */}
        <div className="mt-8 flex flex-wrap gap-6">
          {[
            { value: "4+", label: "Courses" },
            { value: "100%", label: "Hands-on" },
            { value: "GHS", label: "Affordable" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-xs font-medium uppercase tracking-widest text-slate-400">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={onEnrollClick}
            className="group inline-flex items-center gap-2 rounded-xl bg-brand-primary px-7 py-3.5 font-semibold text-white shadow-[0_4px_24px_rgba(37,99,235,0.5)] transition-all hover:bg-blue-500 hover:shadow-[0_4px_32px_rgba(37,99,235,0.7)] active:scale-95"
          >
            Enroll Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <a
            href="#tutorials"
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/8 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/15"
          >
            View Tutorials
          </a>
        </div>
      </div>
    </section>
  );
}
