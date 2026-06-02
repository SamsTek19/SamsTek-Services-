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

      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-brand-primary/50 to-cyan-900/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/30" />

      <div className="relative mx-auto flex min-h-[min(100vh,820px)] max-w-6xl flex-col justify-center px-4 py-24 sm:px-6 sm:py-32">
        <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
          <BookOpen className="h-4 w-4 text-cyan-300" />
          Technology &amp; Digital Skills Training
        </p>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
          {siteConfig.tagline}
        </h1>
        <p className="mt-4 text-lg font-medium text-cyan-200/95 sm:text-xl">
          Learn. Build. Grow.
        </p>
        <p className="mt-3 max-w-2xl text-lg text-blue-100/95">{siteConfig.description}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={onEnrollClick}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-brand-primary shadow-lg shadow-blue-900/30 transition hover:bg-blue-50"
          >
            Enroll Now
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="#tutorials"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-white/70 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/15"
          >
            View Tutorials
          </a>
        </div>
      </div>
    </section>
  );
}
