import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnv() {
  const raw = readFileSync(resolve(process.cwd(), ".env"), "utf8");
  const env = {};
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return env;
}

const env = loadEnv();
const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_ANON_KEY;
const headers = { apikey: key, Authorization: `Bearer ${key}` };

async function trySelect(table, cols) {
  const select = cols.join(",");
  const res = await fetch(`${url}/rest/v1/${table}?select=${select}&limit=1`, { headers });
  const text = await res.text();
  if (res.ok) {
    console.log(`OK ${table}: ${select}`);
    console.log(text.slice(0, 300));
    return true;
  }
  console.log(`FAIL ${table} [${select}]: ${text.slice(0, 120)}`);
  return false;
}

const tutorialCols = [
  "id", "title", "name", "description", "price", "is_active", "active",
  "coming_soon", "created_at", "updated_at",
];
const enrollmentCols = [
  "id", "tutorial_id", "full_name", "name", "email", "student_email",
  "phone", "status", "amount_paid", "payment_reference", "created_at",
];

console.log("--- tutorials ---");
for (const col of tutorialCols) await trySelect("tutorials", ["id", col]);

console.log("\n--- enrollments ---");
for (const col of enrollmentCols) await trySelect("enrollments", ["id", col]);

// OpenAPI schema
const openApiRes = await fetch(`${url}/rest/v1/`, {
  headers: { ...headers, Accept: "application/openapi+json" },
});
if (openApiRes.ok) {
  const spec = await openApiRes.json();
  const defs = spec.definitions ?? spec.components?.schemas ?? {};
  for (const table of ["tutorials", "enrollments"]) {
    const def = defs[table];
    if (def?.properties) {
      console.log(`\nOpenAPI ${table} columns:`, Object.keys(def.properties).join(", "));
    }
  }
} else {
  console.log("OpenAPI", openApiRes.status);
}
