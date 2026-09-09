import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";
import { db } from "@/lib/db";

const bodySchema = z.object({
  goal: z.string().min(3).max(500),
});

const RECOMMENDATION_MODEL = "claude-sonnet-5";

function keywordFallback(
  goal: string,
  books: { id: string; title: string; category: string; description: string | null }[]
) {
  const goalLower = goal.toLowerCase();
  const categoryHints: Record<string, string[]> = {
    finanzas: ["dinero", "invertir", "ahorrar", "finanzas", "negocio", "ingresos", "patrimonio", "escalar"],
    "desarrollo-personal": ["hábito", "habito", "productividad", "disciplina", "rutina", "organizar"],
    mentalidad: ["mentalidad", "miedo", "confianza", "actitud", "mindset", "creer"],
    carisma: ["carisma", "hablar", "persuadir", "liderar", "equipo", "vender", "relaciones"],
    biografia: ["ejemplo", "inspiración", "historia de", "cómo lo hizo"],
  };

  const scored = books.map((book) => {
    let score = 0;
    const hints = categoryHints[book.category] ?? [];
    for (const hint of hints) {
      if (goalLower.includes(hint)) score += 2;
    }
    if (book.description && goalLower.split(/\s+/).some((w) => w.length > 4 && book.description!.toLowerCase().includes(w))) {
      score += 1;
    }
    return { book, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 5).map(({ book }) => ({
    id: book.id,
    reason:
      "Coincide con tu objetivo por categoría y temática (recomendación en modo demo, sin IA — falta ANTHROPIC_API_KEY).",
  }));
}

export async function POST(request: NextRequest) {
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Cuéntanos un poco más sobre tu objetivo." }, { status: 400 });
  }

  const { goal } = parsed.data;

  const books = await db.book.findMany({
    select: { id: true, slug: true, title: true, author: true, category: true, description: true, isPremium: true },
  });

  const apiKey = process.env.ANTHROPIC_API_KEY;

  let ranked: { id: string; reason: string }[];

  if (!apiKey) {
    ranked = keywordFallback(goal, books);
  } else {
    try {
      const anthropic = new Anthropic({ apiKey });
      const catalogForPrompt = books.map((b) => ({
        id: b.id,
        title: b.title,
        author: b.author,
        category: b.category,
        description: b.description,
      }));

      const message = await anthropic.messages.create({
        model: RECOMMENDATION_MODEL,
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content:
              `Un usuario de la app de lectura Ledger describió este objetivo: "${goal}".\n\n` +
              `Catálogo disponible (JSON): ${JSON.stringify(catalogForPrompt)}\n\n` +
              `Elige hasta 5 libros del catálogo, ordenados del más al menos relevante para ese objetivo. ` +
              `Responde EXCLUSIVAMENTE con JSON válido, sin markdown, con esta forma: ` +
              `[{"id": "<id del libro>", "reason": "<una frase breve en español explicando por qué encaja>"}]`,
          },
        ],
      });

      const textBlock = message.content.find((b) => b.type === "text");
      const raw = textBlock && textBlock.type === "text" ? textBlock.text.trim() : "[]";
      const jsonMatch = raw.match(/\[[\s\S]*\]/);
      ranked = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
    } catch {
      ranked = keywordFallback(goal, books);
    }
  }

  const byId = new Map(books.map((b) => [b.id, b]));
  const recommendations = ranked
    .map((r) => {
      const book = byId.get(r.id);
      if (!book) return null;
      return { ...book, reason: r.reason };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  return NextResponse.json({ recommendations });
}
