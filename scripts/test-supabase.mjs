/**
 * Quick Supabase connection test. Run: node scripts/test-supabase.mjs
 * Loads .env from project root (simple parse, no dotenv package).
 */
import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnv() {
  try {
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
  } catch {
    return {};
  }
}

const env = loadEnv();
const url = env.VITE_SUPABASE_URL;
const keys = [
  ["publishable", env.VITE_SUPABASE_PUBLISHABLE_KEY],
  ["anon", env.VITE_SUPABASE_ANON_KEY],
].filter(([, k]) => k);

if (!url || keys.length === 0) {
  console.error("Missing VITE_SUPABASE_URL or keys in .env");
  process.exit(1);
}

for (const [label, key] of keys) {
  const res = await fetch(`${url}/rest/v1/tutorials?select=id,name&limit=1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  const body = await res.json();
  console.log(`${label}: HTTP ${res.status}`, res.ok ? "OK" : body.message ?? body);
}
