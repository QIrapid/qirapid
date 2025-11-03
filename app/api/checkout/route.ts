import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
  try {
    const origin =
      req.headers.get('origin') ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://qirapid.com';

    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId) {
      return NextResponse.json({ error: 'STRIPE_PRICE_ID ausente' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/cancel`,
      metadata: { project: 'qirapid', product: 'resultado_iq_40_perguntas' },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err: any) {
    console.error('Stripe checkout error:', err?.message || err);
    return NextResponse.json({ error: 'Erro ao criar sessão de pagamento' }, { status: 500 });
  }
}
