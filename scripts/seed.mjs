// One-time seed: load the bundled mug dataset into Supabase.
//
// Usage (from the project root):
//   SUPABASE_URL=https://xxxx.supabase.co \
//   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key \
//   node scripts/seed.mjs
//
// Run supabase/schema.sql first to create the table + RLS policy.
// The service_role key bypasses RLS so it can write — keep it secret and
// NEVER put it in the frontend or commit it.

import { createClient } from "@supabase/supabase-js";
import { MUG_DATA } from "../src/data/mugs.js";

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(
    "Missing env. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running."
  );
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { persistSession: false },
});

// sort_order preserves MUG_DATA's current State -> City -> Special ordering,
// since the grid renders in raw fetch order with no client-side sort.
const rows = MUG_DATA.map((m, index) => ({
  id: m.id,
  name: m.name,
  category: m.category,
  state_id: m.stateId ?? null,
  lat: m.lat ?? null,
  lon: m.lon ?? null,
  group: m.group ?? null,
  sort_order: index,
}));

const { error } = await supabase
  .from("mugs")
  .upsert(rows, { onConflict: "id" });

if (error) {
  console.error("Seed failed:", error);
  process.exit(1);
}

console.log(`Seeded ${rows.length} mugs into Supabase.`);
