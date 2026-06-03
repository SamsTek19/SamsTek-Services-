import { Clock, GraduationCap, ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "../lib/site";
import { isTutorialEnrollable } from "../lib/tutorials";
import type { Tutorial } from "../lib/types";

interface TutorialCardProps {
  tutorial: Tutorial;
  onEnroll: (tutorial: Tutorial) => void;
}

export function TutorialCard({ tutorial, onEnroll }: TutorialCardProps) {
  const enrollable = isTutorialEnrollable(tutorial);

  return (
    <article className="group relative overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-blue-500" />

      <div className="relative p-6">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary/15 to-brand-secondary/10 text-brand-primary transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-primary/20">
          <GraduationCap className="h-6 w-6" />
        </div>

        <h3 className="text-lg font-bold text-brand-text">{tutorial.name}</h3>

        <p className="mt-2 min-h-[2.5rem] flex-1 text-sm leading-relaxed text-slate-600">
          {tutorial.description}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-slate-100 via-slate-100 to-transparent" />
          <Sparkles className="h-4 w-4 text-brand-secondary/40" />
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          {enrollable ? (
            <>
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Price
                </span>
                <p className="text-2xl font-bold text-brand-primary">
                  {siteConfig.currency} {Number(tutorial.price).toFixed(2)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onEnroll(tutorial)}
                className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-primary to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-primary/30 transition-all hover:shadow-lg hover:shadow-brand-primary/50 active:scale-95"
              >
                Enroll
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </button>
            </>
          ) : (
            <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              <Clock className="h-4 w-4 text-brand-secondary" />
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
