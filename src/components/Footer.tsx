import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { siteConfig } from "../lib/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <Logo size="sm" />
          <p className="mt-3 text-sm text-slate-600">
            Practical technology training for modern learners.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <a href="#tutorials" className="hover:text-brand-primary">
            Tutorials
          </a>
          <a href="#contact" className="hover:text-brand-primary">
            Contact
          </a>
          <Link to="/admin" className="hover:text-brand-primary">
            Admin
          </Link>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
