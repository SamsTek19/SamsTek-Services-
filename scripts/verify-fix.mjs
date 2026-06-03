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

function priceFromDb(price) {
  if (price >= 1000) return price / 100;
  return price;
}

const tr = await fetch(`${url}/rest/v1/tutorials?select=*&order=created_at.asc`, { headers });
const tutorials = await tr.json();
const mapped = tutorials
  .filter((t) => t.is_published !== false)
  .map((t) => ({ name: t.title, price: priceFromDb(t.price), is_active: t.is_published !== false }));

console.log("courses", mapped.length, mapped.map((t) => `${t.name} GHS ${t.price}`).join(" | "));

const tid = tutorials[0].id;
const insertRes = await fetch(`${url}/rest/v1/enrollments`, {
  method: "POST",
  headers: { ...headers, "Content-Type": "application/json", Prefer: "return=representation" },
  body: JSON.stringify({
    tutorial_id: tid,
    student_name: "Verify Fix",
    student_email: "verify-fix@example.com",
    student_phone: "0551111111",
    payment_status: "pending",
  }),
});
console.log("enrollment", insertRes.status, insertRes.ok ? "OK" : await insertRes.text());
