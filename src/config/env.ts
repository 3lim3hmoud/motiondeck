import { z } from "zod";

/**
 * Centralized, validated environment access.
 *
 * Why this exists:
 * - Fails fast at boot with a readable error instead of a cryptic runtime
 *   crash three layers deep when a var is missing.
 * - Gives every consumer full autocomplete + type safety (`env.OPENAI_API_KEY`
 *   is `string`, never `string | undefined`).
 * - Draws a hard line between server-only secrets and NEXT_PUBLIC_ values so a
 *   secret can never accidentally leak into a client bundle.
 */

const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),

  AUTH_SECRET: z.string().min(32),
  AUTH_URL: z.string().url(),
  AUTH_GOOGLE_ID: z.string().optional(),
  AUTH_GOOGLE_SECRET: z.string().optional(),
  AUTH_GITHUB_ID: z.string().optional(),
  AUTH_GITHUB_SECRET: z.string().optional(),

  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  UPLOADTHING_TOKEN: z.string(),

  GEMINI_API_KEY: z.string(),

  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),

  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().optional(),

  SENTRY_DSN: z.string().optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PRICE_PRO_YEARLY: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PRICE_TEAM_MONTHLY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().optional(),
});

const isServer = typeof window === "undefined";

const fullSchema = serverSchema.merge(clientSchema);
type FullEnv = z.infer<typeof fullSchema>;

function loadEnv(): FullEnv {
  const parsed = (isServer ? fullSchema : clientSchema).safeParse(
    isServer ? process.env : {
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY,
      NEXT_PUBLIC_STRIPE_PRICE_PRO_YEARLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_YEARLY,
      NEXT_PUBLIC_STRIPE_PRICE_TEAM_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM_MONTHLY,
      NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
      NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    },
  );

  if (!parsed.success) {
    console.error(
      "❌ Invalid environment variables:\n",
      parsed.error.flatten().fieldErrors,
    );
    throw new Error("Invalid environment variables. See console for details.");
  }

  return parsed.data as FullEnv;
}

export const env = loadEnv();
