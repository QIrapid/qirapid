import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  try {
    // Recupera a URL do site
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://qirapid.com";

    // Cria a sessão de pagamento
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/payment/success`,
      cancel_url: `${siteUrl}/payment/cancel`,
    });

    // Retorna o link de checkout da Stripe
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Erro ao criar sessão de pagamento:", error);
    return NextResponse.json(
      { error: "Erro ao criar sessão de pagamento" },
      { status: 500 }
    );
  }
}
