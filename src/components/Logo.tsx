import { Link } from "react-router-dom";
import { siteConfig } from "../lib/site";

interface LogoProps {
  className?: string;
  linkToHome?: boolean;
  variant?: "light" | "dark";
  showName?: boolean;
}

const badgeSizes = {
  sm: "h-9 w-9 text-sm",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
} as const;

const nameSizes = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
} as const;

type LogoSize = keyof typeof badgeSizes;

interface LogoWithSize extends LogoProps {
  size?: LogoSize;
}

export function Logo({
  className = "",
  linkToHome = true,
  size = "md",
  variant = "light",
  showName = true,
}: LogoWithSize) {
  const nameClass =
    variant === "dark" ? "font-bold text-white" : "font-bold text-brand-text";

  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className={`flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-primary to-blue-600 font-bold text-white shadow-lg shadow-brand-primary/30 transition-transform hover:scale-105 ${badgeSizes[size]}`}
        aria-hidden="true"
      >
        ST
      </span>
      {showName && (
        <span className={`leading-tight font-bold transition-colors ${nameSizes[size]} ${nameClass}`}>
          {siteConfig.name}
        </span>
      )}
    </span>
  );

  if (linkToHome) {
    return (
      <Link to="/" className="inline-flex shrink-0 items-center" aria-label={siteConfig.name}>
        {content}
      </Link>
    );
  }

  return content;
}
