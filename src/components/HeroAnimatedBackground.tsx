import { useEffect, useState } from "react";

const codeLines = [
  "const app = createApp(React);",
  "function train(model) { }",
  "import { useState } from 'react';",
  "SELECT skills FROM students;",
  "git commit -m 'level up'",
  "npm run build && deploy",
  "<Component className='future'>",
  "async function learnAI() {}",
  "export default SamsTek;",
  "python -m deep_learning",
  "ssh student@cloud-lab",
  "design.tokens.generate()",
  "const skills = await fetch()",
  "docker build --tag career .",
];

const techCards = [
  { label: "Web Dev", sub: "HTML · CSS · React", icon: "</>", delay: 0 },
  { label: "Python & AI", sub: "ML · Data Science", icon: "AI", delay: -3 },
  { label: "Cybersecurity", sub: "Ethical Hacking", icon: "{}", delay: -6 },
  { label: "Cloud DevOps", sub: "AWS · Docker", icon: "01", delay: -9 },
  { label: "UI/UX Design", sub: "Figma · Prototyping", icon: "</>" , delay: -12 },
  { label: "Digital Mktg", sub: "SEO · Analytics", icon: ">>", delay: -2 },
];

const streamPositions = [8, 18, 27, 38, 49, 60, 71, 82, 91];

export function HeroAnimatedBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="hero-cinematic-bg absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Deep space base gradient */}
      <div className="hero-gradient-base absolute inset-0" />

      {/* Perspective grid receding into depth */}
      <div className={`hero-perspective-grid absolute inset-0 ${reducedMotion ? "" : "hero-perspective-grid-animate"}`} />

      {/* Fine overlay grid */}
      <div className={`hero-grid absolute inset-0 ${reducedMotion ? "" : "hero-grid-animate"}`} />

      {/* Atmospheric light orbs */}
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />
      <div className="hero-glow hero-glow-3" />
      <div className="hero-glow hero-glow-4" />

      {/* Vignette edge darkening */}
      <div className="hero-vignette absolute inset-0" />

      {!reducedMotion && (
        <>
          {/* Vertical data streams */}
          {streamPositions.map((left, i) => (
            <div
              key={i}
              className="hero-stream"
              style={{
                left: `${left}%`,
                animationDelay: `${-(i * 1.4)}s`,
                animationDuration: `${9 + (i % 4) * 2.5}s`,
                width: i % 3 === 0 ? "2px" : "1px",
                height: `${30 + (i % 3) * 15}%`,
              }}
            />
          ))}

          {/* Horizontal light trails */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="hero-light-trail"
              style={{
                top: `${15 + i * 20}%`,
                animationDelay: `${-(i * 3.5)}s`,
                animationDuration: `${13 + i * 2}s`,
              }}
            />
          ))}

          {/* Scanline sweep */}
          <div className="hero-scanline" />

          {/* Code snippets */}
          {codeLines.map((line, i) => (
            <span
              key={line}
              className="hero-code-snippet"
              style={{
                left: `${4 + (i * 6.2) % 86}%`,
                top: `${6 + (i * 6.5) % 82}%`,
                animationDelay: `${-(i * 1.1)}s`,
                animationDuration: `${15 + (i % 5) * 2}s`,
              }}
            >
              {line}
            </span>
          ))}

          {/* Floating holographic tech cards */}
          {techCards.map((card, i) => (
            <div
              key={card.label}
              className="hero-holo-card"
              style={{
                left: `${5 + (i * 16) % 74}%`,
                top: `${10 + (i * 15) % 74}%`,
                animationDelay: `${card.delay}s`,
              }}
            >
              <span className="hero-holo-card-icon">{card.icon}</span>
              <div>
                <div className="hero-holo-card-label">{card.label}</div>
                <div className="hero-holo-card-sub">{card.sub}</div>
              </div>
            </div>
          ))}

          {/* Floating particles */}
          {Array.from({ length: 22 }, (_, i) => (
            <div
              key={i}
              className="hero-particle"
              style={{
                left: `${(i * 4.7 + 2) % 96}%`,
                top: `${(i * 5.9 + 5) % 90}%`,
                animationDelay: `${-(i * 0.55)}s`,
                animationDuration: `${7 + (i % 6) * 1.5}s`,
                width: i % 5 === 0 ? "3px" : "2px",
                height: i % 5 === 0 ? "3px" : "2px",
              }}
            />
          ))}

          {/* Cinematic brand title sequence */}
          <div className="hero-title-sequence">
            <p className="hero-seq-brand">SamsTek Services</p>
            <p className="hero-seq-tagline">Learn. Build. Grow.</p>
            <p className="hero-seq-sub">Practical Tech Skills for the Future</p>
          </div>
        </>
      )}
    </div>
  );
}
