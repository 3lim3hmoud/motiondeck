"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
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

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setFormError(null);
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    setIsSubmitting(false);

    if (result?.error) {
      setFormError("Incorrect email or password.");
      return;
    }
    router.push(ROUTES.dashboard);
    router.refresh();
  }

  return (
    <Card className="w-full max-w-[400px] shadow-lg">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Log in to keep building.</CardDescription>
      </CardHeader>
      <CardContent>
        <SsoButtons
          onSelect={(provider) => {
            if (provider === "google") {
              void signIn("google", { callbackUrl: ROUTES.dashboard });
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
        {formError ? (
          <p className="mb-4 text-sm text-danger" role="alert">
            {formError}
          </p>
        ) : null}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="mb-0">Password</FormLabel>
                    <Link href={ROUTES.resetPassword} className="text-sm text-accent hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Logging in…" : "Log in"}
            </Button>
          </form>
        </Form>
      </CardContent>

      <p className="mt-2 pb-6 text-center text-md text-secondary">
        Don’t have an account?{" "}
        <Link href={ROUTES.signup} className="font-medium text-accent hover:underline">
          Start Free
        </Link>
      </p>
    </Card>
  );
}
