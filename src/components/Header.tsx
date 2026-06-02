import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

interface HeaderProps {
  onEnrollClick: () => void;
}

export function Header({ onEnrollClick }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "Tutorials", href: "#tutorials" },
    { label: "Why Us", href: "#why-us" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo size="md" />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-brand-primary"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/admin"
            className="text-sm font-medium text-slate-500 transition hover:text-brand-primary"
          >
            Admin
          </Link>
          <button
            type="button"
            onClick={onEnrollClick}
            className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Enroll Now
          </button>
        </nav>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-600"
              >
                {link.label}
              </a>
            ))}
            <Link to="/admin" className="text-sm font-medium text-slate-500" onClick={() => setOpen(false)}>
              Admin
            </Link>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onEnrollClick();
              }}
              className="mt-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white"
            >
              Enroll Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
