import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { ReaderView } from "@/components/reader/ReaderView";

export default async function ReadPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const book = await db.book.findUnique({
    where: { slug },
    include: { chapters: { orderBy: { order: "asc" } } },
  });

  if (!book || book.chapters.length === 0) {
    notFound();
  }

  if (book.isPremium) {
    const session = await auth();
    if (session?.user?.plan !== "PREMIUM") {
      redirect(`/library/${book.slug}`);
    }
  }

  return <ReaderView bookTitle={book.title} chapters={book.chapters} />;
}
