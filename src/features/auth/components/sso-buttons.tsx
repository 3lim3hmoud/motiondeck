"use client";

import { Button } from "@/components/ui/button";

/** Inline brand marks (no external icon deps for two logos). */
function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4">
      <path fill="#4285F4" d="M23.52 12.27c0-.82-.07-1.6-.2-2.36H12v4.47h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.58-5.17 3.58-8.74z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.28v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.3a7.2 7.2 0 0 1 0-4.6v-3.1H1.28a12 12 0 0 0 0 10.8z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.28 6.6l3.99 3.1C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}

function MicrosoftMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4">
      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
      <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
      <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
      <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}

function SsoButtons({ onSelect }: { onSelect?: (provider: "google" | "microsoft") => void }) {
  return (
    <div className="grid gap-2.5">
      <Button variant="secondary" size="lg" className="gap-2.5" onClick={() => onSelect?.("google")}>
        <GoogleMark />
        Continue with Google
      </Button>
      <Button variant="secondary" size="lg" className="gap-2.5" onClick={() => onSelect?.("microsoft")}>
        <MicrosoftMark />
        Continue with Microsoft
      </Button>
    </div>
  );
}

export { SsoButtons };
