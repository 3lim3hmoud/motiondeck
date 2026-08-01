"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function scorePassword(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}

const labels = ["Weak", "Fair", "Good", "Strong"];
const colors = ["bg-danger", "bg-warning", "bg-info", "bg-success"];

/** Only rendered by the parent once password.length > 0 — never judges an empty field. */
function PasswordStrengthMeter({ password }: { password: string }) {
  const score = scorePassword(password);
  const level = Math.max(score - 1, 0);

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className={cn("h-1 flex-1 rounded-full", i <= level ? colors[level] : "bg-neutral-200")}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.2, delay: i * 0.03 }}
            style={{ transformOrigin: "left" }}
          />
        ))}
      </div>
      <p className="text-xs text-tertiary">{labels[level]} password</p>
    </div>
  );
}

export { PasswordStrengthMeter };
