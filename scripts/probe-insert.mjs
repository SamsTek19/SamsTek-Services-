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
const headers = {
  apikey: key,
  Authorization: `Bearer ${key}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

const tutorialsRes = await fetch(`${url}/rest/v1/tutorials?select=id,title,is_published,price&limit=5`, {
  headers,
});
const tutorials = await tutorialsRes.json();
console.log("tutorials", tutorials);

const tutorialId = tutorials[0]?.id;
const insertRes = await fetch(`${url}/rest/v1/enrollments`, {
  method: "POST",
  headers,
  body: JSON.stringify({
    tutorial_id: tutorialId,
    student_name: "Test User",
    student_email: "test@example.com",
    student_phone: "0550000000",
    payment_status: "pending",
  }),
});
console.log("insert", insertRes.status, await insertRes.text());
