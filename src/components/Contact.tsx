import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from "lucide-react";
import { siteConfig } from "../lib/site";

export function Contact() {
  const social = [
    { label: "Facebook", href: siteConfig.social.facebook, icon: Facebook },
    { label: "Twitter", href: siteConfig.social.twitter, icon: Twitter },
    { label: "LinkedIn", href: siteConfig.social.linkedin, icon: Linkedin },
    { label: "Instagram", href: siteConfig.social.instagram, icon: Instagram },
  ];

  return (
    <section id="contact" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-text">Contact Us</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Have questions? Reach out and our team will help you get started.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:border-brand-primary/40"
          >
            <Mail className="h-8 w-8 text-brand-primary" />
            <h3 className="mt-4 font-semibold text-brand-text">Email</h3>
            <p className="mt-2 text-sm text-slate-600">{siteConfig.email}</p>
          </a>

          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:border-brand-primary/40"
          >
            <Phone className="h-8 w-8 text-brand-primary" />
            <h3 className="mt-4 font-semibold text-brand-text">Phone</h3>
            <p className="mt-2 text-sm text-slate-600">{siteConfig.phone}</p>
          </a>

          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:border-brand-primary/40"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">
              WA
            </span>
            <h3 className="mt-4 font-semibold text-brand-text">WhatsApp</h3>
            <p className="mt-2 text-sm text-slate-600">Chat with us</p>
          </a>

          <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <h3 className="font-semibold text-brand-text">Social Media</h3>
            <div className="mt-4 flex gap-3">
              {social.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-brand-primary hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
