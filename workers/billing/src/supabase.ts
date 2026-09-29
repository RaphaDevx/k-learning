// Supabase REST API wrapper (no SDK dependency — stays lightweight in the Worker)

export interface Env {
  REVENUECAT_WEBHOOK_SECRET: string;
  STRIPE_WEBHOOK_SECRET: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_KEY: string;
}

export interface EntitlementUpdate {
  plan: 'free' | 'pro' | 'pro_plus';
  status: 'active' | 'expired' | 'grace_period' | 'paused';
  source: string;
  product_id?: string | null;
  current_period_end?: string | null;
}

export async function upsertEntitlement(
  env: Env,
  userId: string,
  update: EntitlementUpdate
): Promise<void> {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/user_entitlements`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': env.SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
      'Prefer': 'resolution=merge-duplicates',
    },
    body: JSON.stringify({
      user_id: userId,
      ...update,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase upsert failed (${res.status}): ${err}`);
  }
}

export async function logBillingEvent(
  env: Env,
  userId: string | null,
  source: string,
  eventType: string,
  payload: unknown
): Promise<void> {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/billing_events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': env.SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
    },
    body: JSON.stringify({ user_id: userId, source, event_type: eventType, payload }),
  });

  if (!res.ok) {
    // Log but don't throw — audit failure must not block the entitlement update
    console.error(`billing_events insert failed (${res.status}):`, await res.text());
  }
}
