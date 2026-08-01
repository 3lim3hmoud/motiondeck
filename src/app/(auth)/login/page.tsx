"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    // TODO(Phase — Auth backend): wire to NextAuth credentials sign-in.
    console.log("log in", values);
  }

  return (
    <Card className="w-full max-w-[400px] shadow-lg">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Log in to keep building.</CardDescription>
      </CardHeader>
      <CardContent>
        <SsoButtons />
        <div className="my-5 flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-tertiary">OR</span>
          <Separator className="flex-1" />
        </div>
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
            <Button type="submit" className="w-full" size="lg">
              Log in
            </Button>
          </form>
        </Form>
      </CardContent>

      <p className="mt-2 pb-6 text-center text-md text-secondary">
        Don't have an account?{" "}
        <Link href={ROUTES.signup} className="font-medium text-accent hover:underline">
          Start Free
        </Link>
      </p>
    </Card>
  );
}
