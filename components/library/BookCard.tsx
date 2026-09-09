import Link from "next/link";
import { categoryLabel } from "@/lib/categories";

export function BookCard({
  slug,
  title,
  author,
  category,
  totalPages,
  isPremium,
}: {
  slug: string;
  title: string;
  author: string;
  category: string;
  totalPages: number;
  isPremium: boolean;
}) {
  return (
    <Link
      href={`/library/${slug}`}
      className="flex flex-col justify-between rounded-xl border border-neutral-200 p-5 transition hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <div>
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
            {categoryLabel(category)}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              isPremium
                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                : "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
            }`}
          >
            {isPremium ? "Premium" : "Gratis"}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {title}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{author}</p>
      </div>
      <p className="mt-4 text-xs text-neutral-400">{totalPages} páginas</p>
    </Link>
  );
}
