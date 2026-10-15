#!/usr/bin/env node
// Uploads content/cards/<file>.json into Supabase deck_cards via the guarded RPC
// k_import_content (p_kind = 'cards', upsert per id, batches of <= 200).
//
// Usage: K_IMPORT_TOKEN=… node scripts/import-cards.mjs [--only om.json,other.json] [--dry-run]
// Env: SUPABASE_URL, SUPABASE_ANON_KEY (from ~/.keys/tokens.env), K_IMPORT_TOKEN

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CARD_DIR = join(ROOT, 'content', 'cards');
const BATCH = 200;
const { SUPABASE_URL, SUPABASE_ANON_KEY, K_IMPORT_TOKEN } = process.env;
const dryRun = process.argv.includes('--dry-run');

if (!dryRun && (!SUPABASE_URL || !SUPABASE_ANON_KEY || !K_IMPORT_TOKEN)) {
  console.error('SUPABASE_URL, SUPABASE_ANON_KEY and K_IMPORT_TOKEN are required');
  process.exit(2);
}

const onlyArg = process.argv.indexOf('--only');
const only = onlyArg > -1 ? new Set(process.argv[onlyArg + 1].split(',')) : null;
const files = readdirSync(CARD_DIR).filter(f => f.endsWith('.json') && (!only || only.has(f))).sort();
const TYPES = new Set(['qa', 'cloze', 'why', 'basic']);
let failed = 0;

for (const file of files) {
  const cards = JSON.parse(readFileSync(join(CARD_DIR, file), 'utf8'));
  if (!Array.isArray(cards)) { console.error(`✗ ${file}: expected an array`); failed++; continue; }

  const ids = new Set();
  const problems = [];
  for (const c of cards) {
    if (!c.id || ids.has(c.id)) problems.push(`${c.id}: missing/duplicate id`);
    ids.add(c.id);
    if (!c.course || !c.topic) problems.push(`${c.id}: course/topic missing`);
    if (!TYPES.has(c.type)) problems.push(`${c.id}: invalid type ${c.type}`);
    if (!String(c.front ?? '').trim() || !String(c.back ?? '').trim()) problems.push(`${c.id}: empty front/back`);
  }
  if (problems.length) { console.error(`✗ ${file}: validation failed\n  ${problems.join('\n  ')}`); failed++; continue; }
  if (dryRun) { console.log(`✓ ${file}: ${cards.length} cards valid (dry run)`); continue; }

  for (let i = 0; i < cards.length; i += BATCH) {
    const batch = cards.slice(i, i + BATCH);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/k_import_content`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ p_token: K_IMPORT_TOKEN, p_kind: 'cards', p_payload: batch }),
    });
    const text = await res.text();
    if (!res.ok) { failed++; console.error(`✗ ${file} [${i}-${i + batch.length - 1}]: ${res.status} ${text}`); }
    else console.log(`✓ ${file} [${i}-${i + batch.length - 1}]: ${text}`);
  }
}

process.exit(failed ? 1 : 0);
