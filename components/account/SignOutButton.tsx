"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-sm text-neutral-500 hover:underline"
    >
      Cerrar sesión
    </button>
  );
}
