import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const stripe = getStripe();
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
    }

    const subscriptionId = typeof session.subscription === "string"
      ? session.subscription
      : (session.subscription as Stripe.Subscription | null)?.id;

    if (!subscriptionId) {
      return NextResponse.json({ error: "No subscription found for this session" }, { status: 404 });
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const licenseKey = subscription.metadata.license_key;

    if (!licenseKey) {
      return NextResponse.json(
        { error: "License not yet generated. Please wait a moment and refresh." },
        { status: 202 }
      );
    }

    const plan = subscription.metadata.plan ?? "diagnose";
    return NextResponse.json({ key: licenseKey, plan });
  } catch (err) {
    return NextResponse.json({ error: `Failed to verify session: ${String(err)}` }, { status: 500 });
  }
}
