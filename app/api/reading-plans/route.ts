import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const bodySchema = z.object({
  bookId: z.string().min(1),
  months: z.number().min(1).max(24),
});

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "No autenticado." }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const { bookId, months } = parsed.data;

  const book = await db.book.findUnique({ where: { id: bookId } });
  if (!book) {
    return NextResponse.json({ error: "Libro no encontrado." }, { status: 404 });
  }

  const days = Math.max(1, Math.round(months * 30));
  const pagesPerDay = Math.max(1, Math.ceil(book.totalPages / days));
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + days);

  const plan = await db.readingPlan.upsert({
    where: { userId_bookId: { userId: session.user.id, bookId } },
    update: { targetDate, pagesPerDay },
    create: {
      userId: session.user.id,
      bookId,
      targetDate,
      pagesPerDay,
    },
  });

  return NextResponse.json(plan);
}
