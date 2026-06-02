const heroVideoUrl =
  (import.meta.env.VITE_HERO_VIDEO_URL as string | undefined)?.trim() || "";

const paystackPaymentUrl =
  (import.meta.env.VITE_PAYSTACK_PAYMENT_URL as string | undefined)?.trim() ||
  "https://paystack.shop/pay/samstek_";

export const siteConfig = {
  name: "SamsTek Services",
  /** Set VITE_HERO_VIDEO_URL to your MP4 (1920×1080, 10–15s, loop). Falls back to animated background. */
  heroVideoUrl: heroVideoUrl || "/videos/hero.mp4",
  tagline: "Learn Practical Tech Skills with SamsTek Services",
  description:
    "Enroll in our tutorials and training programs to gain valuable digital and technology skills.",
  email: "info@samstekservices.com",
  phone: "+233 24 000 0000",
  whatsapp: "https://wa.me/233240000000",
  social: {
    facebook: "https://facebook.com/samstekservices",
    twitter: "https://twitter.com/samstekservices",
    linkedin: "https://linkedin.com/company/samstekservices",
    instagram: "https://instagram.com/samstekservices",
  },
  currency: "GHS",
  paystackPaymentUrl,
  whyChooseUs: [
    {
      title: "Practical Learning",
      description: "Hands-on projects and real-world exercises you can apply immediately.",
    },
    {
      title: "Affordable Pricing",
      description: "Quality training at prices that make professional skills accessible.",
    },
    {
      title: "Easy Enrollment Process",
      description: "Enroll in minutes with a simple form and secure online payment.",
    },
    {
      title: "Instant Confirmation",
      description: "Receive confirmation right after payment so you know you are enrolled.",
    },
    {
      title: "Professional Training",
      description: "Learn from experienced instructors focused on industry-ready skills.",
    },
  ],
} as const;
