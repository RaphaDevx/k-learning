-- ── K-Learning Billing Schema ─────────────────────────────────────────────
-- Phase 5: Payment & Entitlement Layer
--
-- Wende dieses Script im Supabase SQL-Editor an:
-- https://supabase.com/dashboard/project/ifmwcgwfvunjbnfwwbtr/sql
-- ──────────────────────────────────────────────────────────────────────────

-- Subscription-Status pro User (Single Source of Truth)
CREATE TABLE IF NOT EXISTS public.user_entitlements (
  user_id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  plan                 TEXT NOT NULL DEFAULT 'free',        -- 'free' | 'pro' | 'pro_plus'
  status               TEXT NOT NULL DEFAULT 'active',     -- 'active' | 'expired' | 'grace_period' | 'paused'
  source               TEXT,                               -- 'stripe' | 'apple' | 'google' | 'byok'
  product_id           TEXT,                               -- e.g. 'k_learning_pro_monthly'
  current_period_end   TIMESTAMPTZ,
  credits_balance      INT NOT NULL DEFAULT 0,
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS: Jeder User liest nur seine eigene Zeile. Kein Frontend-Schreiben.
ALTER TABLE public.user_entitlements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_reads_own_entitlement"
  ON public.user_entitlements FOR SELECT
  USING (auth.uid() = user_id);

-- ──────────────────────────────────────────────────────────────────────────

-- Audit-Log aller Billing-Events (für Debugging, Compliance, Rückerstattungen)
CREATE TABLE IF NOT EXISTS public.billing_events (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  source       TEXT NOT NULL,       -- 'revenuecat' | 'stripe'
  event_type   TEXT NOT NULL,       -- 'INITIAL_PURCHASE' | 'RENEWAL' | 'CANCELLATION' etc.
  payload      JSONB NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS: Kein Frontend-Zugriff. Nur service_role (Worker) darf schreiben.
ALTER TABLE public.billing_events ENABLE ROW LEVEL SECURITY;

-- Keine SELECT-Policy → Frontend kann nie auf billing_events zugreifen.
-- INSERT erfolgt ausschliesslich über den Cloudflare Worker mit service_role Key.

-- ──────────────────────────────────────────────────────────────────────────
-- Indizes für häufige Abfragen
CREATE INDEX IF NOT EXISTS billing_events_user_idx ON public.billing_events (user_id);
CREATE INDEX IF NOT EXISTS billing_events_source_type_idx ON public.billing_events (source, event_type);
