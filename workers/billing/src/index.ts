// K-Learning Billing Worker
// Endpunkte:
//   POST /webhooks/revenuecat  — RevenueCat Subscription Events
//   POST /webhooks/stripe      — Stripe Payment Events (Prepaid + Abo-Fallback)

import { Env } from './supabase.js';
import { handleRevenueCat } from './revenuecat.js';
import { handleStripe } from './stripe.js';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname, method } = { pathname: url.pathname, method: request.method };

    if (method === 'POST' && pathname === '/webhooks/revenuecat') {
      return handleRevenueCat(request, env);
    }

    if (method === 'POST' && pathname === '/webhooks/stripe') {
      return handleStripe(request, env);
    }

    if (method === 'GET' && pathname === '/health') {
      return new Response(JSON.stringify({ ok: true, ts: new Date().toISOString() }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
} satisfies ExportedHandler<Env>;
