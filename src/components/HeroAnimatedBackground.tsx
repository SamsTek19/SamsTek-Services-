import { useEffect, useState } from "react";

const codeSnippets = [
  "const app = createApp();",
  "function build() { }",
  "import React from 'react';",
  "SELECT * FROM users;",
  "git commit -m 'learn'",
  "npm run build",
  "<div className='hero'>",
  "async function train() {}",
  "export default App;",
  "python -m pip install",
  "ssh user@server",
  "design.system.tokens",
];

const techLabels = ["Web Dev", "Python", "Cybersecurity", "AI", "Design", "Cloud"];

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
    <div
      className="hero-cinematic-bg absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="hero-gradient-base absolute inset-0" />
      <div className={`hero-grid absolute inset-0 ${reducedMotion ? "" : "hero-grid-animate"}`} />
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />
      <div className="hero-glow hero-glow-3" />

      {!reducedMotion && (
        <>
          <div className="hero-stream hero-stream-1" />
          <div className="hero-stream hero-stream-2" />
          <div className="hero-scanline" />

          {codeSnippets.map((snippet, i) => (
            <span
              key={snippet}
              className="hero-code-snippet"
              style={{
                left: `${8 + (i * 7) % 82}%`,
                top: `${10 + (i * 11) % 75}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${12 + (i % 4)}s`,
              }}
            >
              {snippet}
            </span>
          ))}

          {techLabels.map((label, i) => (
            <span
              key={label}
              className="hero-tech-pill"
              style={{
                left: `${12 + (i * 14) % 70}%`,
                top: `${20 + (i * 13) % 60}%`,
                animationDelay: `${i * 1.2}s`,
              }}
            >
              {label}
            </span>
          ))}

          <div className="hero-icons">
            <span className="hero-icon hero-icon-1">{`</>`}</span>
            <span className="hero-icon hero-icon-2">{"{ }"}</span>
            <span className="hero-icon hero-icon-3">AI</span>
            <span className="hero-icon hero-icon-4">01</span>
          </div>

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
