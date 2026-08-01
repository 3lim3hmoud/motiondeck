import "server-only";
import { GoogleGenAI, Type } from "@google/genai";
import { env } from "@/config/env";

/**
 * Server-only Gemini client, built lazily on first use (not at module load)
 * so a missing GEMINI_API_KEY surfaces as a normal catchable error from
 * generateDeckFromText — not a crash at import time. The `server-only`
 * import above still makes importing this from a Client Component a
 * build-time error, so the key can never leak into the browser bundle.
 */
let cachedClient: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (!env.GEMINI_API_KEY) {
    throw new Error(
      "AI parsing isn't configured yet — set GEMINI_API_KEY to enable it.",
    );
  }
  if (!cachedClient) {
    cachedClient = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
  }
  return cachedClient;
}

const MODEL = "gemini-2.5-flash";

export interface GeneratedScene {
  title: string;
  bullets: string[];
  speakerNotes: string;
}

export interface GenerateDeckResult {
  deckTitle: string;
  scenes: GeneratedScene[];
}

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    deckTitle: { type: Type.STRING },
    scenes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          bullets: { type: Type.ARRAY, items: { type: Type.STRING } },
          speakerNotes: { type: Type.STRING },
        },
        required: ["title", "bullets", "speakerNotes"],
      },
    },
  },
  required: ["deckTitle", "scenes"],
};

/**
 * Turns raw source text (pasted text, or extracted document text once file
 * parsing is wired in) into a structured set of presentation scenes.
 *
 * Throws on empty input, API failure, or a response that doesn't match the
 * expected shape — callers (the API route) are responsible for turning
 * those into an HTTP error response.
 */
export async function generateDeckFromText(sourceText: string): Promise<GenerateDeckResult> {
  const trimmed = sourceText.trim();
  if (!trimmed) {
    throw new Error("sourceText is empty");
  }

  const prompt = `You are structuring raw source material into a slide deck.
Read the text below and break it into a logical sequence of 4 to 10 scenes
(slides). Each scene needs a short title (max 8 words), 2 to 5 concise
bullet points capturing the key ideas (no bullet longer than ~15 words), and
one sentence of speaker notes giving context a presenter would say aloud but
not put on the slide itself. Preserve the original meaning — do not invent
facts that aren't in the source text. Also produce one short overall deck
title (max 8 words).

SOURCE TEXT:
"""
${trimmed}
"""`;

  const response = await getClient().models.generateContent({
    model: MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("Gemini returned malformed JSON");
  }

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !("deckTitle" in parsed) ||
    !("scenes" in parsed) ||
    !Array.isArray((parsed as { scenes: unknown }).scenes)
  ) {
    throw new Error("Gemini response did not match the expected deck shape");
  }

  return parsed as GenerateDeckResult;
}
