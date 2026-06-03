import type { SupabaseClient } from "@supabase/supabase-js";
import { enrollmentInsertPayload, isSchemaColumnMismatch } from "./dbMappers";

function formatEnrollmentError(message: string): Error {
  if (message.includes("row-level security")) {
    return new Error(
      "Enrollment could not be saved (database permissions). In Supabase → SQL Editor, run the file supabase/migrations/005_fix_enrollment_insert_rls.sql then try again.",
    );
  }
  return new Error(message);
}

export async function createPendingEnrollment(
  client: SupabaseClient,
  data: {
    tutorial_id: string;
    full_name: string;
    email: string;
    phone: string;
  },
): Promise<{ error: Error | null }> {
  const payloads = enrollmentInsertPayload(data);

  // Standard schema (email, full_name, status) — your gmapwauaducyxldefgby project
  let { error } = await client.from("enrollments").insert(payloads.legacy);

  if (error && isSchemaColumnMismatch(error.message)) {
    const retry = await client.from("enrollments").insert(payloads.live);
    error = retry.error;
  }

  return { error: error ? formatEnrollmentError(error.message) : null };
}
