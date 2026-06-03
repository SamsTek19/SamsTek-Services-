import { useState } from "react";
import { Contact } from "../components/Contact";
import { EnrollmentModal } from "../components/EnrollmentModal";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { TutorialCard } from "../components/TutorialCard";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { useTutorials } from "../hooks/useTutorials";
import { isTutorialEnrollable } from "../lib/tutorials";
import type { Tutorial } from "../lib/types";

export function Home() {
  const { tutorials, loading } = useTutorials();
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function openEnrollment(tutorial?: Tutorial) {
    if (tutorial && isTutorialEnrollable(tutorial)) {
      setSelectedTutorial(tutorial);
      setModalOpen(true);
      return;
    }

    const enrollable = tutorials.find(isTutorialEnrollable);
    if (enrollable) {
      setSelectedTutorial(enrollable);
      setModalOpen(true);
    }
  }

  function closeEnrollment() {
    setModalOpen(false);
    setSelectedTutorial(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/30 to-white">
      <Header onEnrollClick={() => openEnrollment()} />

      <main>
        <Hero onEnrollClick={() => openEnrollment()} />

        {/* Tutorials Section */}
        <section id="tutorials" className="relative px-4 py-24 sm:px-6 sm:py-32">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 -right-40 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl">
            {/* Section header */}
            <div className="mb-4 inline-block px-3 py-1 rounded-full border border-brand-primary/20 bg-brand-primary/5">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
                Our Programs
              </p>
            </div>

            <div className="text-start mb-12">
              <h2 className="text-4xl font-bold text-brand-text sm:text-5xl">
                Tutorials &amp; Training
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-slate-600">
                Choose a program that fits your goals and enroll in minutes.
              </p>
            </div>

            {/* Loading state */}
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-72 animate-pulse rounded-xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-50"
                  />
                ))}
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {tutorials.map((tutorial) => (
                  <TutorialCard
                    key={tutorial.id}
                    tutorial={tutorial}
                    onEnroll={(t) => openEnrollment(t)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Contact Section */}
        <Contact />
      </main>

      <Footer />

      <EnrollmentModal
        tutorial={selectedTutorial}
        open={modalOpen}
        onClose={closeEnrollment}
      />
    </div>
  );
}
