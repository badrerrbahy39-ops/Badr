"use client";

import { useState } from "react";
import Link from "next/link";
import { categoryLabel } from "@/lib/categories";

type Recommendation = {
  id: string;
  slug: string;
  title: string;
  author: string;
  category: string;
  isPremium: boolean;
  reason: string;
};

export default function OnboardingPage() {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setRecommendations(data.recommendations);
    } catch {
      setError("No se pudieron generar recomendaciones. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        Cuéntanos qué quieres desarrollar
      </h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Por ejemplo: &quot;tengo una app de juegos y quiero escalarla&quot; o &quot;quiero
        mejorar mis finanzas personales&quot;.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          required
          minLength={3}
          rows={3}
          placeholder="Escribe tu objetivo…"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
        />
        <button
          type="submit"
          disabled={loading}
          className="self-start rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-neutral-900"
        >
          {loading ? "Buscando libros…" : "Recomiéndame libros"}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {recommendations && (
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Recomendado para ti
          </h2>
          {recommendations.length === 0 ? (
            <p className="text-sm text-neutral-500">
              No encontramos coincidencias claras todavía. Explora la{" "}
              <Link href="/library" className="underline">
                librería completa
              </Link>
              .
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {recommendations.map((rec) => (
                <li
                  key={rec.id}
                  className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                      {categoryLabel(rec.category)}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        rec.isPremium
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                      }`}
                    >
                      {rec.isPremium ? "Premium" : "Gratis"}
                    </span>
                  </div>
                  <Link href={`/library/${rec.slug}`} className="mt-1 block font-semibold hover:underline">
                    {rec.title}
                  </Link>
                  <p className="text-sm text-neutral-500">{rec.author}</p>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{rec.reason}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
