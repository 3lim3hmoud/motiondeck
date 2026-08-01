"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z.object({ email: z.string().email("Enter a valid email address") });

export default function ResetPasswordPage() {
  const [sent, setSent] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    // TODO(Phase — Auth backend): trigger password-reset email via NextAuth/Resend.
    console.log("reset request", values);
    setSent(true);
  }

  return (
    <Card className="w-full max-w-[400px] shadow-lg">
      {sent ? (
        <CardContent className="flex flex-col items-center gap-3 py-4 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-success/10 text-success">
            <CheckCircle2 className="size-6" />
          </div>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            If an account exists for {form.getValues("email")}, we’ve sent a reset link.
          </CardDescription>
          <Button variant="secondary" className="mt-2 w-full" asChild>
            <Link href={ROUTES.login}>Back to login</Link>
          </Button>
        </CardContent>
      ) : (
        <>
          <CardHeader>
            <CardTitle>Reset your password</CardTitle>
            <CardDescription>We’ll email you a link to get back in.</CardDescription>
          </CardHeader>
          <CardContent>
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
                <Button type="submit" className="w-full" size="lg">
                  Send reset link
                </Button>
              </form>
            </Form>
            <p className="mt-6 text-center text-md text-secondary">
              <Link href={ROUTES.login} className="font-medium text-accent hover:underline">
                Back to login
              </Link>
            </p>
          </CardContent>
        </>
      )}
    </Card>
  );
}
