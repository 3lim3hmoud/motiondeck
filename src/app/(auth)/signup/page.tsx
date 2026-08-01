"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SsoButtons } from "@/features/auth/components/sso-buttons";
import { PasswordStrengthMeter } from "@/features/auth/components/password-strength-meter";
import { registerUser } from "@/server/auth/actions";

const emailSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

const passwordSchema = z.object({
  password: z.string().min(8, "Must be at least 8 characters"),
});

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "" },
  });

  function onEmailSubmit(values: z.infer<typeof emailSchema>) {
    setEmail(values.email);
    setStep("password");
  }

  async function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
    setFormError(null);
    setIsSubmitting(true);

    const result = await registerUser({ email, password: values.password });
    if (!result.ok) {
      setIsSubmitting(false);
      setFormError(result.error);
      return;
    }

    const signInResult = await signIn("credentials", {
      email,
      password: values.password,
      redirect: false,
    });
    setIsSubmitting(false);

    if (signInResult?.error) {
      setFormError("Account created — please log in.");
      router.push(ROUTES.login);
      return;
    }
    router.push(ROUTES.onboarding);
    router.refresh();
  }

  return (
    <Card className="w-full max-w-[400px] shadow-lg">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Start turning documents into decks in seconds.</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait" initial={false}>
          {step === "email" ? (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.18 }}
            >
              <SsoButtons
                onSelect={(provider) => {
                  if (provider === "google") {
                    void signIn("google", { callbackUrl: ROUTES.onboarding });
                  } else {
                    setFormError("Microsoft sign-in isn't set up yet — use email or Google.");
                  }
                }}
              />
              <div className="my-5 flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-xs text-tertiary">OR</span>
                <Separator className="flex-1" />
              </div>
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@company.com" autoFocus {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" size="lg">
                    Continue
                  </Button>
                </form>
              </Form>
            </motion.div>
          ) : (
            <motion.div
              key="password"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.18 }}
            >
              <button
                onClick={() => setStep("email")}
                className="mb-4 flex items-center gap-1.5 text-sm text-secondary hover:text-primary"
              >
                <ArrowLeft className="size-3.5" />
                {email}
              </button>
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-1">
                  <FormField
                    control={passwordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="At least 8 characters" autoFocus {...field} />
                        </FormControl>
                        {field.value.length > 0 && <PasswordStrengthMeter password={field.value} />}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {formError ? (
                    <p className="text-sm text-danger" role="alert">
                      {formError}
                    </p>
                  ) : null}
                  <Button type="submit" className="mt-4 w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Creating account…" : "Create account"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-6 text-center text-xs text-tertiary">
          By continuing you agree to MotionDeck’s{" "}
          <Link href="#" className="underline hover:text-secondary">Terms</Link> and{" "}
          <Link href="#" className="underline hover:text-secondary">Privacy Policy</Link>.
        </p>
      </CardContent>

      <p className="mt-2 pb-6 text-center text-md text-secondary">
        Already have an account?{" "}
        <Link href={ROUTES.login} className="font-medium text-accent hover:underline">
          Log in
        </Link>
      </p>
    </Card>
  );
}
