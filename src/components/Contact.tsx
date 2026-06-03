import { Instagram, Mail, MessageCircle, Phone, Youtube } from "lucide-react";
import { siteConfig } from "../lib/site";

export function Contact() {
  const social = [
    { label: "Instagram", href: siteConfig.social.instagram, icon: Instagram },
    { label: "YouTube", href: siteConfig.social.youtube, icon: Youtube },
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-40 h-80 w-80 rounded-full bg-brand-primary/5 blur-3xl" />
        <div className="absolute bottom-1/3 -right-40 h-80 w-80 rounded-full bg-brand-secondary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <div className="mb-3 inline-block rounded-full border border-brand-secondary/20 bg-brand-secondary/5 px-3 py-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary">
              Get in Touch
            </p>
          </div>
          <h2 className="text-4xl font-bold text-brand-text sm:text-5xl">Contact Us</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Have questions? Reach out and our team will help you get started.
          </p>
        </div>

        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <a
            href={`mailto:${siteConfig.email}`}
            className="group relative overflow-hidden rounded-xl border border-slate-200/60 bg-gradient-to-br from-blue-50 to-cyan-50 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-slate-200/80 hover:shadow-lg"
          >
            <div className="relative mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="relative text-lg font-bold text-brand-text">Email</h3>
            <p className="relative mt-2 text-sm font-medium text-slate-600">{siteConfig.email}</p>
          </a>

          <div className="group relative overflow-hidden rounded-xl border border-slate-200/60 bg-gradient-to-br from-brand-primary/5 to-blue-50 p-8 text-center">
            <div className="relative mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-blue-500 text-white shadow-lg">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="relative text-lg font-bold text-brand-text">Phone</h3>
            <div className="relative mt-2 space-y-1">
              {siteConfig.phones.map((phone) => (
                <a
                  key={phone.tel}
                  href={`tel:${phone.tel}`}
                  className="block text-sm font-medium text-slate-600 transition-colors hover:text-brand-primary"
                >
                  {phone.display}
                </a>
              ))}
            </div>
          </div>

          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-xl border border-slate-200/60 bg-gradient-to-br from-green-50 to-emerald-50 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-slate-200/80 hover:shadow-lg"
          >
            <div className="relative mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="relative text-lg font-bold text-brand-text">WhatsApp</h3>
            <p className="relative mt-2 text-sm font-medium text-slate-600">Chat with us</p>
          </a>

          <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/60 bg-white/80 p-8 text-center">
            <h3 className="text-lg font-bold text-brand-text">Follow Us</h3>
            <div className="mt-4 flex gap-4">
              {social.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <Icon className="relative h-5 w-5 transition-colors duration-300 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
