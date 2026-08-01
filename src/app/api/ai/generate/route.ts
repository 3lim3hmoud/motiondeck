import { NextRequest, NextResponse } from "next/server";
import { generateDeckFromText } from "@/services/gemini";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * POST /api/ai/generate
 * Body: { text: string }
 * Turns raw source text into a structured deck (title + scenes) via Gemini.
 *
 * This is the real backend for the import flow's "Structuring…" step. Only
 * the pasted-text source is wired up so far — file upload and URL import
 * still need their own text-extraction step (docx/pdf/pptx parsing, page
 * scraping) before they can call this same endpoint.
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const text = typeof body === "object" && body !== null && "text" in body ? (body as { text: unknown }).text : undefined;

  if (typeof text !== "string" || !text.trim()) {
    return NextResponse.json({ error: "Missing required field: text (string)." }, { status: 400 });
  }

  if (text.length > 50_000) {
    return NextResponse.json(
      { error: "Text is too long (max 50,000 characters)." },
      { status: 413 },
    );
  }

  try {
    const result = await generateDeckFromText(text);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("[/api/ai/generate] Gemini generation failed:", error);
    return NextResponse.json(
      { error: "AI generation failed. Please try again." },
      { status: 502 },
    );
  }
}
