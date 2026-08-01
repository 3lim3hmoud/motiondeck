"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Building2, GraduationCap, Megaphone, Users, FileText, MessageSquare, Presentation, Sparkles } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface Question {
  key: string;
  question: string;
  options: { value: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
}

const questions: Question[] = [
  {
    key: "role",
    question: "What's your role?",
    options: [
      { value: "sales", label: "Sales", icon: Megaphone },
      { value: "marketing", label: "Marketing", icon: Sparkles },
      { value: "education", label: "Education", icon: GraduationCap },
      { value: "other", label: "Other", icon: Building2 },
    ],
  },
  {
    key: "use",
    question: "What will you mostly present?",
    options: [
      { value: "pitch", label: "Pitch decks", icon: Presentation },
      { value: "reports", label: "Reports", icon: FileText },
      { value: "lessons", label: "Lessons", icon: GraduationCap },
      { value: "updates", label: "Internal updates", icon: MessageSquare },
    ],
  },
  {
    key: "team",
    question: "How big is your team?",
    options: [
      { value: "solo", label: "Just me", icon: Users },
      { value: "small", label: "2–10 people", icon: Users },
      { value: "medium", label: "11–50 people", icon: Users },
      { value: "large", label: "50+ people", icon: Building2 },
    ],
  },
];

export default function OnboardingQuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [justSelected, setJustSelected] = useState<string | null>(null);

  const current = questions[step];

  if (!current) {
    return null;
  }

  function selectOption(value: string) {
    setJustSelected(value);
    setAnswers((prev) => ({ ...prev, [current!.key]: value }));

    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep((s) => s + 1);
        setJustSelected(null);
      } else {
        // TODO(Phase — onboarding backend): persist `answers` to Workspace/User prefs.
        void answers;
        router.push(ROUTES.dashboard);
      }
    }, 400);
  }

  return (
    <div className="w-full max-w-lg">
      <div className="mb-8 flex items-center justify-center gap-2">
        {questions.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === step ? "w-8 bg-accent" : i < step ? "w-4 bg-accent/40" : "w-4 bg-neutral-200",
            )}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
        >
          <h1 className="mb-8 text-center text-2xl font-semibold text-primary sm:text-3xl">
            {current.question}
          </h1>

          <div className="grid grid-cols-2 gap-4">
            {current.options.map((option) => {
              const isSelected = justSelected === option.value;
              return (
                <motion.div key={option.value} animate={isSelected ? { y: -4 } : { y: 0 }}>
                  <Card
                    interactive
                    onClick={() => selectOption(option.value)}
                    className={cn(
                      "flex flex-col items-center gap-3 py-8 text-center",
                      isSelected && "border-accent ring-1 ring-accent",
                    )}
                  >
                    <div className="relative flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <option.icon className="size-6" />
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-success text-white"
                        >
                          <Check className="size-3" strokeWidth={3} />
                        </motion.div>
                      )}
                    </div>
                    <p className="text-md font-medium text-primary">{option.label}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => router.push(ROUTES.dashboard)}
        className="mx-auto mt-8 block text-md text-tertiary hover:text-secondary"
      >
        Skip
      </button>
    </div>
  );
}
