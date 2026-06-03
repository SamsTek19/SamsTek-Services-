import type { Enrollment, Tutorial } from "./types";

/** Row shape from the live Supabase project (title / student_* columns). */
export type TutorialRow = Record<string, unknown> & {
  id: string;
  description: string;
  price: number;
  created_at: string;
};

export type EnrollmentRow = Record<string, unknown> & {
  id: string;
  tutorial_id: string;
  amount_paid: number | null;
  payment_reference: string | null;
  created_at: string;
};

function hasColumn(row: Record<string, unknown>, col: string): boolean {
  return col in row;
}

/** DB stores prices like 25000 for GHS 250. */
export function priceFromDb(price: number): number {
  const n = Number(price);
  if (Number.isNaN(n)) return 0;
  if (n >= 1000) return n / 100;
  return n;
}

export function priceToDb(priceGhs: number): number {
  const n = Number(priceGhs);
  if (Number.isNaN(n)) return 0;
  if (n < 1000) return Math.round(n * 100);
  return Math.round(n);
}

export function tutorialFromRow(row: TutorialRow): Tutorial {
  const legacyName = hasColumn(row, "name");
  const name = legacyName ? String(row.name) : String(row.title ?? "");
  const is_active = legacyName
    ? Boolean(row.is_active)
    : row.is_published !== false;

  return {
    id: String(row.id),
    name,
    description: String(row.description ?? ""),
    price: priceFromDb(Number(row.price)),
    is_active,
    coming_soon: Boolean(row.coming_soon ?? false),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at ?? row.created_at),
  };
}

export function tutorialToRow(
  tutorial: Pick<Tutorial, "name" | "description" | "price" | "is_active" | "coming_soon">,
): { live: Record<string, unknown>; legacy: Record<string, unknown> } {
  const base = {
    description: tutorial.description,
    price: priceToDb(tutorial.price),
    coming_soon: tutorial.coming_soon ?? false,
    updated_at: new Date().toISOString(),
  };

  return {
    live: {
      ...base,
      title: tutorial.name,
      is_published: tutorial.is_active,
    },
    legacy: {
      ...base,
      name: tutorial.name,
      is_active: tutorial.is_active,
    },
  };
}

export function pickTutorialSavePayload(
  payloads: ReturnType<typeof tutorialToRow>,
  errorMessage: string,
): Record<string, unknown> {
  if (
    errorMessage.includes("title") ||
    errorMessage.includes("is_published") ||
    errorMessage.includes("student_")
  ) {
    return payloads.legacy;
  }
  if (errorMessage.includes("'name'") || errorMessage.includes("is_active")) {
    return payloads.live;
  }
  return payloads.live;
}

export function enrollmentFromRow(row: EnrollmentRow): Enrollment {
  const tutorialJoin = row.tutorials as { name?: string; title?: string } | null | undefined;
  const tutorialName = tutorialJoin?.name ?? tutorialJoin?.title ?? undefined;

  const legacy = hasColumn(row, "email");

  return {
    id: String(row.id),
    tutorial_id: String(row.tutorial_id),
    full_name: legacy ? String(row.full_name ?? "") : String(row.student_name ?? ""),
    email: legacy ? String(row.email ?? "") : String(row.student_email ?? ""),
    phone: legacy ? String(row.phone ?? "") : String(row.student_phone ?? ""),
    amount_paid: row.amount_paid != null ? Number(row.amount_paid) : null,
    payment_reference: row.payment_reference != null ? String(row.payment_reference) : null,
    status: mapPaymentStatus(row),
    created_at: String(row.created_at),
    tutorials: tutorialName ? { name: tutorialName } : null,
  };
}

function mapPaymentStatus(row: EnrollmentRow): Enrollment["status"] {
  const raw = String(row.status ?? row.payment_status ?? "pending");
  if (raw === "paid" || raw === "failed" || raw === "pending") return raw;
  return "pending";
}

export function enrollmentInsertPayload(data: {
  tutorial_id: string;
  full_name: string;
  email: string;
  phone: string;
}): { live: Record<string, string>; legacy: Record<string, string> } {
  return {
    live: {
      tutorial_id: data.tutorial_id,
      student_name: data.full_name,
      student_email: data.email,
      student_phone: data.phone,
      payment_status: "pending",
    },
    legacy: {
      tutorial_id: data.tutorial_id,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      status: "pending",
    },
  };
}

export function enrollmentUpdatePaidPayload(
  amountPaid: number,
  paymentReference: string,
): { live: Record<string, string | number>; legacy: Record<string, string | number> } {
  return {
    live: {
      payment_status: "paid",
      amount_paid: amountPaid,
      payment_reference: paymentReference,
    },
    legacy: {
      status: "paid",
      amount_paid: amountPaid,
      payment_reference: paymentReference,
    },
  };
}

export function isSchemaColumnMismatch(message: string): boolean {
  return (
    message.includes("Could not find") ||
    message.includes("student_email") ||
    message.includes("student_name") ||
    message.includes("payment_status") ||
    message.includes("full_name") ||
    message.includes("'email'")
  );
}

export function pickEnrollmentUpdatePayload(
  payloads: ReturnType<typeof enrollmentUpdatePaidPayload>,
  errorMessage: string,
): Record<string, string | number> {
  if (errorMessage.includes("payment_status")) {
    return payloads.legacy;
  }
  if (errorMessage.includes("'status'")) {
    return payloads.live;
  }
  return payloads.live;
}

/** Tutorial column for enrollment admin join (name = migration schema, title = alternate). */
export function tutorialJoinColumns(): string[] {
  return ["name", "title"];
}
