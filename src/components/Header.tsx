import { Menu, X, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

interface HeaderProps {
  onEnrollClick: () => void;
}

export function Header({ onEnrollClick }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Tutorials", href: "#tutorials" },
    { label: "Why Us", href: "#why-us" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/40 bg-white/70 backdrop-blur-xl shadow-sm"
          : "border-b border-transparent bg-white/40 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo size="md" />

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-100/60 hover:text-brand-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={onEnrollClick}
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-primary to-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-blue-900/20 transition-all hover:shadow-lg hover:shadow-blue-900/30 active:scale-95"
          >
            <Zap className="h-4 w-4 transition-transform group-hover:rotate-12" />
            Enroll Now
          </button>
        </div>

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
        <div className="border-t border-slate-200/40 bg-white/80 px-4 py-4 backdrop-blur-md md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100/60 hover:text-brand-primary"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onEnrollClick();
              }}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-primary to-blue-500 px-4 py-2 text-sm font-semibold text-white"
            >
              <Zap className="h-4 w-4" />
              Enroll Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
