import Link from "next/link";
import { db } from "@/lib/db";
import { BookCard } from "@/components/library/BookCard";

export default async function LibraryPage() {
  const books = await db.book.findMany({ orderBy: { title: "asc" } });
  const free = books.filter((b) => !b.isPremium);
  const premium = books.filter((b) => b.isPremium);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <Link href="/" className="text-sm text-neutral-500 hover:underline">
          ← Volver
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Librería
        </h1>
        <p className="mt-1 text-neutral-600 dark:text-neutral-400">
          Finanzas, desarrollo personal, mentalidad, carisma y biografías de gente exitosa.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Plan gratis
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {free.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Plan premium
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {premium.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      </section>
    </div>
  );
}
