"use client";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function BookCalculator({
  bookId,
  totalPages,
}: {
  bookId: string;
  totalPages: number;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [months, setMonths] = useState(2);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const days = Math.max(1, Math.round(months * 30));
  const pagesPerDay = Math.max(1, Math.ceil(totalPages / days));
  const targetDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
  }, [days]);

  async function handleSave() {
    if (!session) {
      router.push("/login");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/reading-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, months }),
      });
      if (!res.ok) throw new Error("No se pudo guardar el plan.");
      setSaved(true);
    } catch {
      setError("No se pudo guardar el plan. Inténtalo de nuevo.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
      <h2 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Calculadora de páginas al día
      </h2>
      <label className="block text-sm text-neutral-600 dark:text-neutral-400">
        ¿En cuántos meses quieres terminarlo?
      </label>
      <input
        type="range"
        min={1}
        max={12}
        step={1}
        value={months}
        onChange={(e) => {
          setMonths(Number(e.target.value));
          setSaved(false);
        }}
        className="mt-2 w-full"
      />
      <p className="mt-1 text-sm text-neutral-500">{months} {months === 1 ? "mes" : "meses"}</p>

      <div className="mt-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
        <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          {pagesPerDay} {pagesPerDay === 1 ? "página" : "páginas"}/día
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Terminarías el {targetDate}.
        </p>
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="mt-4 w-full rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50 dark:bg-white dark:text-neutral-900"
      >
        {saving ? "Guardando…" : saved ? "Plan guardado ✓" : "Guardar mi plan de lectura"}
      </button>
      {!session && (
        <p className="mt-2 text-xs text-neutral-400">
          Inicia sesión para guardar tu plan y seguir tu progreso.
        </p>
      )}
      {error && <p className="mt-2 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
