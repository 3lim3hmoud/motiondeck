import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service-role key — bypasses Row
 * Level Security, so this must never be imported from client components.
 * Used for deck thumbnails and exported files (PDF/MP4/HTML) via Supabase
 * Storage, which is free on the Supabase free tier (1GB storage / 2GB
 * bandwidth per month).
 */
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase Storage isn't configured — set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const STORAGE_BUCKETS = {
  thumbnails: "deck-thumbnails",
  exports: "deck-exports",
} as const;

/** Uploads a file buffer to a bucket and returns its public URL. */
export async function uploadToStorage(
  bucket: (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS],
  path: string,
  file: Buffer | Blob,
  contentType: string,
) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    contentType,
    upsert: true,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/** Deletes a file from a bucket. */
export async function deleteFromStorage(
  bucket: (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS],
  path: string,
) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}
