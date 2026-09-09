import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";

export async function POST() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "No autenticado." }, { status: 401 });
  }

  const stripe = getStripe();
  const priceId = process.env.STRIPE_PRICE_ID_PREMIUM;

  if (!stripe || !priceId) {
    return NextResponse.json(
      {
        error:
          "Stripe no está configurado todavía en este entorno (faltan STRIPE_SECRET_KEY / STRIPE_PRICE_ID_PREMIUM).",
      },
      { status: 503 }
    );
  }

  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: session.user.email ?? undefined,
    client_reference_id: session.user.id,
    success_url: `${baseUrl}/account?upgraded=1`,
    cancel_url: `${baseUrl}/account`,
    metadata: { userId: session.user.id },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
