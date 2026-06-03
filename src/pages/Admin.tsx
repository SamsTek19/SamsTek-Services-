import {
  Download,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import { demoTutorials } from "../data/demoTutorials";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { siteConfig } from "../lib/site";
import type { Enrollment, Tutorial } from "../lib/types";

type Tab = "tutorials" | "enrollments" | "payments";

const emptyTutorial = {
  name: "",
  description: "",
  price: "",
  is_active: true,
  coming_soon: false,
};

export function Admin() {
  const [session, setSession] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  const [tab, setTab] = useState<Tab>("tutorials");
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyTutorial);
  const [showForm, setShowForm] = useState(false);

  const checkSession = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      const demoAuth = sessionStorage.getItem("adminDemoAuth") === "true";
      setSession(demoAuth);
      setAuthLoading(false);
      return;
    }

    const { data } = await supabase.auth.getSession();
    setSession(!!data.session);
    setAuthLoading(false);
  }, []);

  useEffect(() => {
    checkSession();

    if (!supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, authSession) => {
      setSession(!!authSession);
    });

    return () => subscription.unsubscribe();
  }, [checkSession]);

  const loadTutorials = useCallback(async () => {
    if (!session) return;
    setLoading(true);

    if (!isSupabaseConfigured || !supabase) {
      setTutorials(demoTutorials);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("tutorials")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      setMessage({ type: "error", text: `Could not load tutorials: ${error.message}` });
    } else if (data) {
      setTutorials(data as Tutorial[]);
    }
    setLoading(false);
  }, [session]);

  const loadEnrollments = useCallback(async () => {
    if (!session) return;
    setLoading(true);

    if (!isSupabaseConfigured || !supabase) {
      setEnrollments([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("enrollments")
      .select("*, tutorials(name)")
      .order("created_at", { ascending: false });

    if (!error && data) setEnrollments(data as Enrollment[]);
    setLoading(false);
  }, [session]);

  useEffect(() => {
    if (session) {
      loadTutorials();
      loadEnrollments();
    }
  }, [session, loadTutorials, loadEnrollments]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setAuthError(null);

    if (!isSupabaseConfigured || !supabase) {
      const demoPassword = import.meta.env.VITE_ADMIN_DEMO_PASSWORD ?? "admin123";
      if (password === demoPassword) {
        sessionStorage.setItem("adminDemoAuth", "true");
        setSession(true);
      } else {
        setAuthError("Invalid demo admin password.");
      }
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message);
      return;
    }
    setSession(true);
  }

  async function handleLogout() {
    if (supabase) await supabase.auth.signOut();
    sessionStorage.removeItem("adminDemoAuth");
    setSession(false);
  }

  async function saveTutorial(e: FormEvent) {
    e.preventDefault();
    setMessage(null);

    const fullPayload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: parseFloat(form.price),
      is_active: form.is_active,
      coming_soon: form.coming_soon,
      updated_at: new Date().toISOString(),
    };

    if (!fullPayload.name || !fullPayload.description || Number.isNaN(fullPayload.price)) {
      setMessage({ type: "error", text: "Please complete all tutorial fields." });
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setMessage({ type: "error", text: "Connect Supabase to save tutorials to the database." });
      return;
    }

    const { data: authData } = await supabase.auth.getSession();
    if (!authData.session) {
      setMessage({
        type: "error",
        text: "You are not signed in. Log out and sign in again with your Supabase admin account.",
      });
      return;
    }

    const client = supabase;

    const { coming_soon: _omit, ...payloadWithoutComingSoon } = fullPayload;

    async function trySave(includeComingSoon: boolean) {
      const payload = includeComingSoon ? fullPayload : payloadWithoutComingSoon;
      if (editingId) {
        return client.from("tutorials").update(payload).eq("id", editingId);
      }
      return client.from("tutorials").insert(payload);
    }

    let { error } = await trySave(true);

    if (error?.message.includes("coming_soon")) {
      const retry = await trySave(false);
      error = retry.error;

      if (!error) {
        setMessage({
          type: "success",
          text: "Saved (without Coming soon flag). Run supabase/migrations/003_add_coming_soon_only.sql in Supabase SQL Editor to enable that option.",
        });
        setShowForm(false);
        setEditingId(null);
        setForm(emptyTutorial);
        await loadTutorials();
        return;
      }
    }

    if (error) {
      setMessage({ type: "error", text: error.message });
      return;
    }

    setMessage({
      type: "success",
      text: editingId ? "Tutorial updated successfully." : "Tutorial added successfully.",
    });

    setShowForm(false);
    setEditingId(null);
    setForm(emptyTutorial);
    await loadTutorials();
  }

  function startEdit(tutorial: Tutorial) {
    setEditingId(tutorial.id);
    setForm({
      name: tutorial.name,
      description: tutorial.description,
      price: String(tutorial.price),
      is_active: tutorial.is_active,
      coming_soon: tutorial.coming_soon ?? false,
    });
    setShowForm(true);
  }

  async function deleteTutorial(id: string) {
    if (!confirm("Delete this tutorial?")) return;
    if (!supabase) return;

    const { error } = await supabase.from("tutorials").delete().eq("id", id);
    if (error) {
      setMessage({ type: "error", text: error.message });
      return;
    }
    setMessage({ type: "success", text: "Tutorial deleted." });
    await loadTutorials();
  }

  function exportEnrollments() {
    const filtered = filteredEnrollments();
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Tutorial",
      "Amount",
      "Reference",
      "Status",
      "Date",
    ];
    const rows = filtered.map((e) => [
      e.full_name,
      e.email,
      e.phone,
      e.tutorials?.name ?? "",
      e.amount_paid ?? "",
      e.payment_reference ?? "",
      e.status,
      new Date(e.created_at).toLocaleString(),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `samstek-enrollments-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function filteredEnrollments() {
    const q = search.trim().toLowerCase();
    if (!q) return enrollments;
    return enrollments.filter(
      (e) =>
        e.full_name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.phone.includes(q) ||
        (e.payment_reference ?? "").toLowerCase().includes(q) ||
        (e.tutorials?.name ?? "").toLowerCase().includes(q),
    );
  }

  const paidEnrollments = enrollments.filter((e) => e.status === "paid");

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          <Link to="/" className="text-sm text-brand-primary hover:underline">
            ← Back to website
          </Link>
          <div className="mt-4">
            <Logo size="lg" linkToHome={false} variant="light" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-brand-text">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">Sign in to manage tutorials and enrollments.</p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            {isSupabaseConfigured && (
              <div>
                <label htmlFor="adminEmail" className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="adminEmail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  required
                />
              </div>
            )}
            <div>
              <label htmlFor="adminPassword" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="adminPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                required
              />
            </div>
            {!isSupabaseConfigured && (
              <p className="text-xs text-slate-500">
                Demo mode: default password is <code className="rounded bg-slate-100 px-1">admin123</code>
              </p>
            )}
            {authError && <p className="text-sm text-red-600">{authError}</p>}
            <button
              type="submit"
              className="w-full rounded-lg bg-brand-primary py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Logo size="sm" linkToHome={false} />
            <div>
              <h1 className="text-xl font-bold text-brand-text">Admin</h1>
              <p className="text-sm text-slate-500">Manage tutorials, enrollments, and payments</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-brand-primary hover:underline">
              View Site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-wrap gap-2">
          {(["tutorials", "enrollments", "payments"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-2 text-sm font-medium capitalize ${
                tab === t
                  ? "bg-brand-primary text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {message && (
          <p
            className={`mb-4 rounded-lg px-4 py-2 text-sm ${
              message.type === "error"
                ? "bg-red-50 text-red-800"
                : "bg-green-50 text-green-800"
            }`}
            role="alert"
          >
            {message.text}
          </p>
        )}

        {tab === "tutorials" && (
          <div>
            <div className="mb-4 flex justify-between">
              <h2 className="text-lg font-bold text-brand-text">Tutorials</h2>
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyTutorial);
                  setShowForm(true);
                }}
                className="inline-flex items-center gap-1 rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white"
              >
                <Plus className="h-4 w-4" />
                Add Tutorial
              </button>
            </div>

            {showForm && (
              <form
                onSubmit={saveTutorial}
                className="mb-6 rounded-xl border border-slate-200 bg-white p-6"
              >
                <h3 className="font-semibold">{editingId ? "Edit Tutorial" : "New Tutorial"}</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <input
                    placeholder="Tutorial name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm sm:col-span-2"
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    className="min-h-[80px] rounded-lg border border-slate-300 px-3 py-2 text-sm sm:col-span-2"
                    required
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    required
                  />
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
                    />
                    Active (visible on website)
                  </label>
                  <label className="flex items-center gap-2 text-sm sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={form.coming_soon}
                      onChange={(e) => setForm((f) => ({ ...f, coming_soon: e.target.checked }))}
                    />
                    Coming soon (hide price and enrollment on website)
                  </label>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    type="submit"
                    className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin text-brand-primary" />
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Name</th>
                      <th className="px-4 py-3 font-semibold">Price</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tutorials.map((t) => (
                      <tr key={t.id} className="border-b border-slate-100">
                        <td className="px-4 py-3">
                          <p className="font-medium">{t.name}</p>
                          <p className="text-xs text-slate-500 line-clamp-1">{t.description}</p>
                        </td>
                        <td className="px-4 py-3">
                          {siteConfig.currency} {Number(t.price).toFixed(2)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`mr-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                              t.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {t.is_active ? "Active" : "Hidden"}
                          </span>
                          {t.coming_soon && (
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                              Coming soon
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => startEdit(t)}
                              className="text-brand-primary hover:text-blue-700"
                              aria-label="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteTutorial(t.id)}
                              className="text-red-500 hover:text-red-700"
                              aria-label="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {(tab === "enrollments" || tab === "payments") && (
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-brand-text">
                {tab === "payments" ? "Payment Records" : "Enrollments"}
              </h2>
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    placeholder="Search students..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={exportEnrollments}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-50"
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </button>
              </div>
            </div>

            {!isSupabaseConfigured && (
              <p className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Connect Supabase to view live enrollment and payment records.
              </p>
            )}

            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin text-brand-primary" />
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Student</th>
                      <th className="px-4 py-3 font-semibold">Tutorial</th>
                      <th className="px-4 py-3 font-semibold">Amount</th>
                      <th className="px-4 py-3 font-semibold">Reference</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(tab === "payments" ? paidEnrollments : filteredEnrollments()).map((e) => (
                      <tr key={e.id} className="border-b border-slate-100">
                        <td className="px-4 py-3">
                          <p className="font-medium">{e.full_name}</p>
                          <p className="text-xs text-slate-500">{e.email}</p>
                          <p className="text-xs text-slate-500">{e.phone}</p>
                        </td>
                        <td className="px-4 py-3">{e.tutorials?.name ?? "—"}</td>
                        <td className="px-4 py-3">
                          {e.amount_paid != null
                            ? `${siteConfig.currency} ${Number(e.amount_paid).toFixed(2)}`
                            : "—"}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs">
                          {e.payment_reference ?? "—"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              e.status === "paid"
                                ? "bg-green-100 text-green-700"
                                : e.status === "pending"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {e.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-500">
                          {new Date(e.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    {(tab === "payments" ? paidEnrollments : filteredEnrollments()).length ===
                      0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                          No records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
