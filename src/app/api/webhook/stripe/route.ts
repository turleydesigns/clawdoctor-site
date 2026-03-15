import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto";

function getStripe() { return new Stripe(process.env.STRIPE_SECRET_KEY!); }

function generateLicenseKey(): string {
  return crypto.randomUUID();
}

function planFromPriceId(priceId: string): "diagnose" | "heal" {
  if (priceId === "price_1TB1Vj2sVp9zfTN09jxcLO7H") return "heal";
  return "diagnose";
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    const stripe = getStripe();
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: `Webhook signature verification failed: ${String(err)}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status !== "paid") {
      console.log("[webhook] Payment not completed, skipping");
      return NextResponse.json({ received: true });
    }

    // Determine plan from line items
    let priceId = "price_1TB1Vi2sVp9zfTN0IcwDkQNp"; // default: diagnose
    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1 });
      if (lineItems.data[0]?.price?.id) {
        priceId = lineItems.data[0].price.id;
      }
    } catch {
      // fallback to default
    }

    const plan = planFromPriceId(priceId);
    const key = generateLicenseKey();

    const subscriptionId = typeof session.subscription === "string"
      ? session.subscription
      : (session.subscription as Stripe.Subscription | null)?.id;

    if (subscriptionId) {
      await stripe.subscriptions.update(subscriptionId, {
        metadata: { license_key: key, plan },
      });
    }

    console.log(`[webhook] License created for ${plan} plan`);
  }

  return NextResponse.json({ received: true });
}
