// RevenueCat Webhook Handler
//
// RevenueCat schickt alle Events mit einem einfachen Authorization-Header
// (dein konfigurierbarer Shared Secret aus dem RevenueCat Dashboard).
//
// WICHTIG: app_user_id in RevenueCat muss = Supabase UUID des Users sein.
// Im nativen SDK: Purchases.logIn(supabaseUserId) VOR dem ersten Kauf aufrufen.
// Im Web (Stripe): RevenueCat übernimmt das automatisch via Stripe Customer.

import { Env, EntitlementUpdate, upsertEntitlement, logBillingEvent } from './supabase.js';

interface RevenueCatEvent {
  type: string;
  app_user_id: string;
  product_id?: string;
  expiration_at_ms?: number;
  store?: 'APP_STORE' | 'PLAY_STORE' | 'STRIPE' | 'PROMOTIONAL';
  entitlement_ids?: string[];
  cancel_reason?: string;
  grace_period_expiration_at_ms?: number;
}

interface RevenueCatPayload {
  event: RevenueCatEvent;
}

export async function handleRevenueCat(request: Request, env: Env): Promise<Response> {
  // 1. Auth-Check — RevenueCat sendet das Secret als Authorization-Header
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || authHeader !== env.REVENUECAT_WEBHOOK_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  let body: RevenueCatPayload;
  try {
    body = await request.json() as RevenueCatPayload;
  } catch {
    return new Response('Bad Request: invalid JSON', { status: 400 });
  }

  const event = body.event;
  if (!event?.app_user_id || !event?.type) {
    return new Response('Bad Request: missing app_user_id or type', { status: 400 });
  }

  const userId = event.app_user_id;
  const update = mapEvent(event);

  // 2. Entitlement + Audit-Log parallel schreiben
  try {
    await Promise.all([
      upsertEntitlement(env, userId, update),
      logBillingEvent(env, userId, 'revenuecat', event.type, body),
    ]);
  } catch (err) {
    console.error('RevenueCat processing error:', err);
    // 500 → RevenueCat retries the webhook automatically
    return new Response('Internal Server Error', { status: 500 });
  }

  console.log(`[RevenueCat] ${event.type} → user=${userId} plan=${update.plan} status=${update.status}`);
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

function mapEvent(event: RevenueCatEvent): EntitlementUpdate {
  const source = storeToSource(event.store);
  const periodEnd = event.expiration_at_ms
    ? new Date(event.expiration_at_ms).toISOString()
    : null;
  const gracePeriodEnd = event.grace_period_expiration_at_ms
    ? new Date(event.grace_period_expiration_at_ms).toISOString()
    : null;
  const plan = mapEntitlements(event.entitlement_ids);

  switch (event.type) {
    case 'INITIAL_PURCHASE':
    case 'RENEWAL':
      return { plan, status: 'active', source, product_id: event.product_id, current_period_end: periodEnd };

    case 'PRODUCT_CHANGE':
      return { plan, status: 'active', source, product_id: event.product_id, current_period_end: periodEnd };

    case 'CANCELLATION':
      // Bleibt aktiv bis zum Periodenende — kein sofortiger Entzug
      return { plan, status: 'active', source, product_id: event.product_id, current_period_end: periodEnd };

    case 'EXPIRATION':
      return { plan: 'free', status: 'expired', source, product_id: null, current_period_end: null };

    case 'BILLING_ISSUE':
      return { plan, status: 'grace_period', source, product_id: event.product_id, current_period_end: gracePeriodEnd };

    case 'SUBSCRIBER_ALIAS':
      // Kein Entitlement-Update nötig — nur Event loggen
      return { plan: 'free', status: 'active', source };

    default:
      console.warn(`[RevenueCat] unhandled event type: ${event.type}`);
      return { plan: 'free', status: 'active', source };
  }
}

function storeToSource(store?: string): string {
  const map: Record<string, string> = {
    APP_STORE: 'apple',
    PLAY_STORE: 'google',
    STRIPE: 'stripe',
    PROMOTIONAL: 'promo',
  };
  return store ? (map[store] ?? store.toLowerCase()) : 'unknown';
}

function mapEntitlements(ids?: string[]): EntitlementUpdate['plan'] {
  if (!ids?.length) return 'free';
  if (ids.includes('pro_plus')) return 'pro_plus';
  if (ids.includes('pro')) return 'pro';
  return 'free';
}
