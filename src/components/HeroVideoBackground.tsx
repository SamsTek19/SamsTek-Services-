import { useEffect, useRef, useState } from "react";
import { siteConfig } from "../lib/site";
import { HeroAnimatedBackground } from "./HeroAnimatedBackground";

export function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = Boolean(siteConfig.heroVideoUrl);
  const [useFallback, setUseFallback] = useState(!hasVideo);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || useFallback || reducedMotion) return;

    const play = () => {
      video.play().catch(() => setUseFallback(true));
    };

    video.addEventListener("canplay", play);
    play();

    return () => video.removeEventListener("canplay", play);
  }, [useFallback, reducedMotion]);

  if (!hasVideo || useFallback || reducedMotion) {
    return <HeroAnimatedBackground />;
  }

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onError={() => setUseFallback(true)}
    >
      <source src={siteConfig.heroVideoUrl} type="video/mp4" />
    </video>
  );
}
