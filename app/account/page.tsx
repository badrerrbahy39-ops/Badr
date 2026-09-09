import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { SignOutButton } from "@/components/account/SignOutButton";
import { UpgradeButton } from "@/components/account/UpgradeButton";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const plans = await db.readingPlan.findMany({
    where: { userId: session.user.id },
    include: { book: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <Link href="/" className="text-sm text-neutral-500 hover:underline">
            ← Volver
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Mi cuenta
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{session.user.email}</p>
        </div>
        <SignOutButton />
      </div>

      <div className="mb-8 rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Plan actual</p>
            <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {session.user.plan === "PREMIUM" ? "Premium" : "Gratis"}
            </p>
          </div>
          {session.user.plan !== "PREMIUM" && <UpgradeButton />}
        </div>
      </div>

      <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Mis planes de lectura
      </h2>
      {plans.length === 0 ? (
        <p className="text-sm text-neutral-500">
          Aún no tienes ningún plan de lectura.{" "}
          <Link href="/library" className="underline">
            Explora la librería
          </Link>
          .
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {plans.map((plan) => (
            <li
              key={plan.id}
              className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 dark:border-neutral-800"
            >
              <div>
                <p className="font-medium text-neutral-900 dark:text-neutral-100">
                  {plan.book.title}
                </p>
                <p className="text-sm text-neutral-500">
                  {plan.pagesPerDay} {plan.pagesPerDay === 1 ? "página" : "páginas"}/día · página{" "}
                  {plan.currentPage}/{plan.book.totalPages}
                </p>
              </div>
              <Link href={`/library/${plan.book.slug}`} className="text-sm underline">
                Ver
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
