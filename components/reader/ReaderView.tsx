"use client";

import { useState } from "react";
import Link from "next/link";
import { ChapterText } from "@/components/reader/ChapterText";
import { PersonPanel } from "@/components/reader/PersonPanel";

type Chapter = {
  id: string;
  order: number;
  title: string;
  startPage: number;
  endPage: number;
  content: string;
};

export function ReaderView({
  bookTitle,
  chapters,
}: {
  bookTitle: string;
  chapters: Chapter[];
}) {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  const chapter = chapters[chapterIndex];
  const isFirst = chapterIndex === 0;
  const isLast = chapterIndex === chapters.length - 1;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-10">
      <div>
        <Link href="/" className="text-sm text-neutral-500 hover:underline">
          ← Volver
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          {bookTitle}
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Capítulo {chapter.order}: {chapter.title} · páginas {chapter.startPage}-
          {chapter.endPage}
        </p>
      </div>

      <ChapterText content={chapter.content} onSelectPerson={setSelectedPerson} />

      <p className="text-xs text-neutral-400">
        Toca cualquier nombre subrayado para ver quién es esa persona real.
      </p>

      <div className="flex items-center justify-between border-t border-neutral-200 pt-6 dark:border-neutral-800">
        <button
          type="button"
          disabled={isFirst}
          onClick={() => setChapterIndex((i) => Math.max(0, i - 1))}
          className="rounded-md px-4 py-2 text-sm font-medium text-neutral-700 disabled:opacity-30 enabled:hover:bg-neutral-100 dark:text-neutral-300 dark:enabled:hover:bg-neutral-800"
        >
          ← Capítulo anterior
        </button>
        <button
          type="button"
          disabled={isLast}
          onClick={() => setChapterIndex((i) => Math.min(chapters.length - 1, i + 1))}
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-30 enabled:hover:bg-neutral-700 dark:bg-white dark:text-neutral-900"
        >
          Siguiente capítulo →
        </button>
      </div>

      {selectedPerson && (
        <PersonPanel
          key={selectedPerson}
          name={selectedPerson}
          bookTitle={bookTitle}
          onClose={() => setSelectedPerson(null)}
        />
      )}
    </div>
  );
}
