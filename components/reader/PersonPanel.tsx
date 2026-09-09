"use client";

import { useEffect, useState } from "react";

export function PersonPanel({
  name,
  bookTitle,
  onClose,
}: {
  name: string;
  bookTitle: string;
  onClose: () => void;
}) {
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/person-context", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, bookTitle }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("No se pudo generar el contexto.");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setSummary(data.summary);
      })
      .catch(() => {
        if (!cancelled) setError("No se pudo cargar el contexto de esta persona.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [name, bookTitle]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onClick={onClose}>
      <div
        className="h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-xl dark:bg-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {name}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {loading && (
          <p className="text-neutral-500 dark:text-neutral-400">Generando contexto…</p>
        )}
        {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
        {summary && (
          <div className="space-y-3 whitespace-pre-line text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            {summary}
          </div>
        )}
      </div>
    </div>
  );
}
