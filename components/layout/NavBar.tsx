"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export function NavBar() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold text-neutral-900 dark:text-neutral-100">
          Ledger
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/library" className="text-neutral-600 hover:underline dark:text-neutral-400">
            Librería
          </Link>
          <Link href="/onboarding" className="text-neutral-600 hover:underline dark:text-neutral-400">
            Onboarding
          </Link>
          {status === "authenticated" && session?.user ? (
            <Link href="/account" className="text-neutral-600 hover:underline dark:text-neutral-400">
              Mi cuenta
            </Link>
          ) : (
            <Link href="/login" className="text-neutral-600 hover:underline dark:text-neutral-400">
              Iniciar sesión
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
