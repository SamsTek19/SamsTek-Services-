import { useState } from "react";
import { Contact } from "../components/Contact";
import { EnrollmentModal } from "../components/EnrollmentModal";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { TutorialCard } from "../components/TutorialCard";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { useTutorials } from "../hooks/useTutorials";
import type { Tutorial } from "../lib/types";

export function Home() {
  const { tutorials, loading } = useTutorials();
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function openEnrollment(tutorial?: Tutorial) {
    if (tutorial) {
      setSelectedTutorial(tutorial);
    } else if (tutorials.length > 0) {
      setSelectedTutorial(tutorials[0]);
    }
    setModalOpen(true);
  }

  function closeEnrollment() {
    setModalOpen(false);
    setSelectedTutorial(null);
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onEnrollClick={() => openEnrollment()} />

      <main>
        <Hero onEnrollClick={() => openEnrollment()} />

        <section id="tutorials" className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-brand-text">Tutorials &amp; Training</h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                Choose a program that fits your goals and enroll in minutes.
              </p>
            </div>

            {loading ? (
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-64 animate-pulse rounded-xl border border-slate-200 bg-slate-100"
                  />
                ))}
              </div>
            ) : (
              <div className="mt-12 grid gap-6 sm:grid-cols-2">
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

        <WhyChooseUs />
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
