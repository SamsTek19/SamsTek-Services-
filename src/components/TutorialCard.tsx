import { GraduationCap } from "lucide-react";
import { siteConfig } from "../lib/site";
import type { Tutorial } from "../lib/types";

interface TutorialCardProps {
  tutorial: Tutorial;
  onEnroll: (tutorial: Tutorial) => void;
}

export function TutorialCard({ tutorial, onEnroll }: TutorialCardProps) {
  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-primary/30 hover:shadow-md">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
        <GraduationCap className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-brand-text">{tutorial.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {tutorial.description}
      </p>
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
        <p className="text-xl font-bold text-brand-primary">
          {siteConfig.currency} {Number(tutorial.price).toFixed(2)}
        </p>
        <button
          type="button"
          onClick={() => onEnroll(tutorial)}
          className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Enroll
        </button>
      </div>
    </article>
  );
}
