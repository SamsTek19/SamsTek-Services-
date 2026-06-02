import type { Tutorial } from "../lib/types";

export const demoTutorials: Tutorial[] = [
  {
    id: "demo-1",
    name: "Web Development Fundamentals",
    description:
      "Learn HTML, CSS, and JavaScript to build responsive websites from scratch.",
    price: 150,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-2",
    name: "Python for Beginners",
    description:
      "Master Python basics, data structures, and automation with hands-on projects.",
    price: 120,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-3",
    name: "Digital Marketing Essentials",
    description:
      "Grow your brand with SEO, social media strategy, and content marketing.",
    price: 99,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-4",
    name: "Cybersecurity Basics",
    description:
      "Understand online threats, safe browsing, and essential security practices.",
    price: 180,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
