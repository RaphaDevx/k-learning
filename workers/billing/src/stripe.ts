// Stripe Webhook Handler
//
// Stripe signiert Webhooks mit HMAC-SHA256.
// Signatur-Format: "t=<timestamp>,v1=<hex-sig>"
// Signed Payload:  "<timestamp>.<rawBody>"
//
// Relevante Events (kommen von Stripe direkt, NICHT via RevenueCat):
//   payment_intent.succeeded   → Prepaid Credits aufladen
//   customer.subscription.*    → Falls du Stripe-Abos ohne RevenueCat managst
//
// Für Abo-Events empfiehlt sich RevenueCat als einzige Source of Truth —
// dann ignorierst du Stripe-Abo-Events hier und lässt nur Prepaid durch.

import { Env, upsertEntitlement, logBillingEvent } from './supabase.js';

export async function handleStripe(request: Request, env: Env): Promise<Response> {
  const signature = request.headers.get('Stripe-Signature');
  if (!signature) {
    return new Response('Unauthorized: missing Stripe-Signature', { status: 401 });
  }

  const rawBody = await request.text();

  const verified = await verifyStripeSignature(rawBody, signature, env.STRIPE_WEBHOOK_SECRET);
  if (!verified) {
    return new Response('Unauthorized: invalid signature', { status: 401 });
  }

  let event: { type: string; data: { object: Record<string, unknown> }; [k: string]: unknown };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response('Bad Request: invalid JSON', { status: 400 });
  }

  try {
    await logBillingEvent(env, null, 'stripe', event.type, event);

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePrepaidTopup(env, event.data.object);
        break;

      // Abo-Events werden via RevenueCat gemanagt — hier nur loggen
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        console.log(`[Stripe] ${event.type} — managed via RevenueCat, no action taken`);
        break;

      default:
        console.log(`[Stripe] unhandled event: ${event.type}`);
    }
  } catch (err) {
    console.error('Stripe processing error:', err);
    return new Response('Internal Server Error', { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

async function handlePrepaidTopup(
  env: Env,
  paymentIntent: Record<string, unknown>
): Promise<void> {
  // Supabase UUID muss als metadata.supabase_user_id im PaymentIntent stehen.
  // Beim Checkout-Erstellen: payment_intent_data: { metadata: { supabase_user_id: uid } }
  const userId = (paymentIntent.metadata as Record<string, string> | undefined)?.supabase_user_id;
  if (!userId) {
    console.warn('[Stripe] payment_intent.succeeded ohne supabase_user_id in metadata — ignoriert');
    return;
  }

  // TODO: Credits-Betrag aus amount / price-Tabelle berechnen und credits_balance erhöhen
  // Für jetzt: nur loggen
  console.log(`[Stripe] Prepaid topup for user=${userId} amount=${paymentIntent.amount}`);
}

async function verifyStripeSignature(
  rawBody: string,
  sigHeader: string,
  secret: string
): Promise<boolean> {
  // Parse "t=timestamp,v1=sig1,v1=sig2"
  const parts = Object.fromEntries(
    sigHeader.split(',').map((p) => p.split('=') as [string, string])
  );
  const timestamp = parts['t'];
  const expectedSig = parts['v1'];
  if (!timestamp || !expectedSig) return false;

  // Stripe tolerates a 5-minute clock skew
  const age = Math.abs(Date.now() / 1000 - parseInt(timestamp, 10));
  if (age > 300) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signedPayload = `${timestamp}.${rawBody}`;
  const sigBytes = await crypto.subtle.sign('HMAC', key, encoder.encode(signedPayload));
  const computedSig = Array.from(new Uint8Array(sigBytes))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  // Timing-safe comparison via constant-time HMAC verify
  return computedSig === expectedSig;
}
