import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { categoryLabel } from "@/lib/categories";
import { BookCalculator } from "@/components/library/BookCalculator";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();

  const book = await db.book.findUnique({
    where: { slug },
    include: { chapters: { select: { id: true } } },
  });

  if (!book) notFound();

  const hasReadableContent = book.chapters.length > 0;
  const canRead = !book.isPremium || session?.user?.plan === "PREMIUM";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link href="/library" className="text-sm text-neutral-500 hover:underline">
        ← Librería
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
            {categoryLabel(book.category)}
          </span>
          <h1 className="mt-1 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {book.title}
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400">{book.author}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${
            book.isPremium
              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
              : "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
          }`}
        >
          {book.isPremium ? "Premium" : "Gratis"}
        </span>
      </div>

      <p className="mt-4 text-neutral-700 dark:text-neutral-300">{book.description}</p>
      <p className="mt-2 text-sm text-neutral-400">{book.totalPages} páginas</p>

      <div className="mt-8">
        {hasReadableContent ? (
          canRead ? (
            <Link
              href={`/read/${book.slug}`}
              className="inline-block rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900"
            >
              Empezar a leer
            </Link>
          ) : (
            <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
              Este libro es parte del plan premium.{" "}
              <Link href="/account" className="underline">
                Actualiza tu plan
              </Link>{" "}
              para leerlo.
            </div>
          )
        ) : (
          <p className="text-sm text-neutral-400">
            El contenido completo de este libro estará disponible próximamente.
          </p>
        )}
      </div>

      <div className="mt-8">
        <BookCalculator bookId={book.id} totalPages={book.totalPages} />
      </div>
    </div>
  );
}
