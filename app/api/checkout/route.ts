import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST() {
  const key = process.env.STRIPE_SECRET_KEY;
  const price = process.env.STRIPE_PRICE_ID;

  if (!key || !price) {
    return NextResponse.json({ error: "Stripe env missing" }, { status: 500 });
  }

  const stripe = new Stripe(key, { apiVersion: "2024-06-20" });

  const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://qirapid.com";
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price, quantity: 1 }],
      success_url: `${origin}/payment/success`,
      cancel_url: `${origin}/payment/cancel`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
