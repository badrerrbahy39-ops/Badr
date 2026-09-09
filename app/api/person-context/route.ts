import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { generatePersonSummary } from "@/lib/anthropic";

const bodySchema = z.object({
  name: z.string().min(1).max(200),
  bookTitle: z.string().min(1).max(300),
});

export async function POST(request: NextRequest) {
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, bookTitle } = parsed.data;

  const cached = await db.personContext.findUnique({ where: { name } });
  if (cached) {
    return NextResponse.json({ name, summary: cached.summary, cached: true });
  }

  const summary = await generatePersonSummary(name, bookTitle);

  const saved = await db.personContext.upsert({
    where: { name },
    update: { summary },
    create: { name, summary },
  });

  return NextResponse.json({ name, summary: saved.summary, cached: false });
}
