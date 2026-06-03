import { Instagram, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { siteConfig } from "../lib/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Tutorials", href: "#tutorials" },
    { label: "Why Us", href: "#why-us" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
    { icon: Youtube, href: siteConfig.social.youtube, label: "YouTube" },
  ];

  return (
    <footer className="relative border-t border-slate-200/40 bg-gradient-to-b from-slate-50/50 to-slate-100/50 backdrop-blur-sm">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-32 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-64 h-64 bg-brand-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Main footer content */}
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand column */}
            <div>
              <Logo size="sm" />
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Practical technology training for modern learners. Learn from experienced instructors and build real-world skills.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-text">
                Navigation
              </h3>
              <ul className="mt-4 space-y-2">
                {quickLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-slate-600 transition-colors hover:text-brand-primary"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-text">
                Get in Touch
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm text-slate-600 transition-colors hover:text-brand-primary"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                {siteConfig.phones.map((phone) => (
                  <li key={phone.tel}>
                    <a
                      href={`tel:${phone.tel}`}
                      className="text-sm text-slate-600 transition-colors hover:text-brand-primary"
                    >
                      {phone.display}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={siteConfig.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-600 transition-colors hover:text-brand-primary"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-text">
                Follow Us
              </h3>
              <div className="mt-4 flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200/50 text-slate-600 transition-all hover:bg-gradient-to-br hover:from-brand-primary hover:to-brand-secondary hover:text-white hover:shadow-lg"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200/40" />

        {/* Copyright bar */}
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-slate-500">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <p className="text-xs text-slate-500">
              Designed with care for learners and professionals.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
