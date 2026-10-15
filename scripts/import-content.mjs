#!/usr/bin/env node
// Uploads content/exams/*.json into Supabase k_exams.content via the guarded RPC
// k_import_content. Content lives in Supabase only; the native app ships none.
//
// Usage: K_IMPORT_TOKEN=… node scripts/import-content.mjs [--only id1,id2]
// Env: SUPABASE_URL, SUPABASE_ANON_KEY (from ~/.keys/tokens.env), K_IMPORT_TOKEN

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const EXAM_DIR = join(ROOT, 'content', 'exams');
const { SUPABASE_URL, SUPABASE_ANON_KEY, K_IMPORT_TOKEN } = process.env;

// Fields that must never reach end users.
const PRIVATE_FIELDS = ['excelPassword'];

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !K_IMPORT_TOKEN) {
  console.error('SUPABASE_URL, SUPABASE_ANON_KEY and K_IMPORT_TOKEN are required');
  process.exit(2);
}

const onlyArg = process.argv.indexOf('--only');
const only = onlyArg > -1 ? new Set(process.argv[onlyArg + 1].split(',')) : null;

const files = readdirSync(EXAM_DIR).filter(f => f.endsWith('.json')).sort();
let failed = 0;

for (const file of files) {
  const exam = JSON.parse(readFileSync(join(EXAM_DIR, file), 'utf8'));
  if (only && !only.has(exam.id)) continue;
  for (const f of PRIVATE_FIELDS) delete exam[f];

  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/k_import_content`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ p_token: K_IMPORT_TOKEN, p_kind: 'exam', p_payload: exam }),
  });
  const text = await res.text();
  if (!res.ok) { failed++; console.error(`✗ ${exam.id}: ${res.status} ${text}`); }
  else console.log(`✓ ${exam.id}`);
}

process.exit(failed ? 1 : 0);
