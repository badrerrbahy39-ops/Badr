import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 dark:bg-black">
      <main className="flex max-w-xl flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Ledger
        </h1>
        <p className="text-lg leading-8 text-neutral-600 dark:text-neutral-400">
          Termina los libros de finanzas y desarrollo personal que siempre dejas a medias.
          Meta diaria de páginas, lectura dentro de la app y contexto con IA sobre las
          personas reales que aparecen en el texto.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/onboarding"
            className="rounded-full bg-neutral-900 px-6 py-3 text-base font-medium text-white transition hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Empezar
          </Link>
          <Link
            href="/read/principios-del-dinero"
            className="rounded-full border border-neutral-300 px-6 py-3 text-base font-medium text-neutral-900 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-900"
          >
            Probar el lector
          </Link>
        </div>
      </main>
    </div>
  );
}
