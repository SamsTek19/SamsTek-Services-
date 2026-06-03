const url = "https://gmapwauaducyxldefgby.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtYXB3YXVhZHVjeXhsZGVmZ2J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MzA3MTksImV4cCI6MjA5NjAwNjcxOX0.mHcaO0qpipILJ6FzoQpHGBFf36QxD7XzGYEnqz5vuiI";
const h = { apikey: key, Authorization: `Bearer ${key}` };

const cols = [
  "email", "full_name", "phone", "status", "student_email", "payment_status",
  "amount_paid", "payment_reference", "tutorial_id", "created_at",
];
for (const c of cols) {
  const r = await fetch(`${url}/rest/v1/enrollments?select=id,${c}&limit=1`, { headers: h });
  console.log(c, r.status, r.ok ? "OK" : (await r.json()).message);
}

const tid = (await (await fetch(`${url}/rest/v1/tutorials?select=id&limit=1`, { headers: h })).json())[0].id;

// minimal legacy insert
const ins = await fetch(`${url}/rest/v1/enrollments`, {
  method: "POST",
  headers: { ...h, "Content-Type": "application/json", Prefer: "return=representation" },
  body: JSON.stringify({
    tutorial_id: tid,
    full_name: "RLS Test",
    email: "rls-test@example.com",
    phone: "0550000000",
    status: "pending",
  }),
});
console.log("insert", ins.status, await ins.text());
