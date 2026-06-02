import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter, MessageCircle } from "lucide-react";
import { siteConfig } from "../lib/site";

export function Contact() {
  const social = [
    { label: "Facebook", href: siteConfig.social.facebook, icon: Facebook },
    { label: "Twitter", href: siteConfig.social.twitter, icon: Twitter },
    { label: "LinkedIn", href: siteConfig.social.linkedin, icon: Linkedin },
    { label: "Instagram", href: siteConfig.social.instagram, icon: Instagram },
  ];

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      color: "from-blue-500 to-cyan-500",
      bg: "from-blue-50 to-cyan-50",
    },
    {
      icon: Phone,
      label: "Phone",
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
      color: "from-brand-primary to-blue-500",
      bg: "from-brand-primary/5 to-blue-50",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat with us",
      href: siteConfig.whatsapp,
      color: "from-green-500 to-emerald-500",
      bg: "from-green-50 to-emerald-50",
      external: true,
    },
  ];

  return (
    <section id="contact" className="relative px-4 py-20 sm:px-6 sm:py-24">
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-brand-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-40 w-80 h-80 bg-brand-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-3 px-3 py-1 rounded-full border border-brand-secondary/20 bg-brand-secondary/5">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary">
              Get in Touch
            </p>
          </div>
          <h2 className="text-4xl font-bold text-brand-text sm:text-5xl">
            Contact Us
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Have questions? Reach out and our team will help you get started.
          </p>
        </div>

        {/* Contact methods grid */}
        <div className="grid gap-6 sm:grid-cols-3 lg:gap-8 mb-12">
          {contactMethods.map(({ icon: Icon, label, value, href, color, bg, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${bg} border border-slate-200/60 p-8 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-slate-200/80`}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Icon */}
              <div className={`relative mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-lg shadow-slate-900/10 transition-all duration-300 group-hover:scale-110`}>
                <Icon className="h-6 w-6" />
              </div>

              {/* Label */}
              <h3 className="relative text-lg font-bold text-brand-text transition-colors duration-300">{label}</h3>

              {/* Value */}
              <p className="relative mt-2 text-sm font-medium text-slate-600 transition-colors duration-300 group-hover:text-slate-700">
                {value}
              </p>

              {/* Bottom accent */}
              <div className={`absolute bottom-0 left-1/2 right-1/2 h-1 bg-gradient-to-r ${color} scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-hover:left-0 group-hover:right-0`} />
            </a>
          ))}
        </div>

        {/* Social media */}
        <div className="flex flex-col items-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-500">
            Follow Us
          </p>
          <div className="flex gap-4">
            {social.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Icon className="relative h-5 w-5 transition-colors duration-300 group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
