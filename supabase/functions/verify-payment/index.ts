import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface VerifyBody {
  reference: string;
  enrollmentId: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const paystackSecret = Deno.env.get("PAYSTACK_SECRET_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail =
      Deno.env.get("FROM_EMAIL") ?? "SamsTek Services <onboarding@resend.dev>";
    const supportEmail = Deno.env.get("SUPPORT_EMAIL") ?? "support@samstek.com";
    const supportPhone = Deno.env.get("SUPPORT_PHONE") ?? "+233 XX XXX XXXX";

    if (!paystackSecret || !supabaseUrl || !serviceRoleKey) {
      return json({ error: "Server configuration incomplete" }, 500);
    }

    const { reference, enrollmentId } = (await req.json()) as VerifyBody;

    if (!reference || !enrollmentId) {
      return json({ error: "reference and enrollmentId are required" }, 400);
    }

    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: { Authorization: `Bearer ${paystackSecret}` },
      },
    );

    const verifyData = await verifyRes.json();

    if (!verifyRes.ok || !verifyData.status || verifyData.data?.status !== "success") {
      return json({ error: "Payment verification failed" }, 400);
    }

    const amountPaid = verifyData.data.amount / 100;
    const metadataEnrollmentId = verifyData.data.metadata?.enrollment_id;

    if (metadataEnrollmentId && metadataEnrollmentId !== enrollmentId) {
      return json({ error: "Enrollment mismatch" }, 400);
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data: enrollment, error: fetchError } = await supabase
      .from("enrollments")
      .select("*, tutorials(name)")
      .eq("id", enrollmentId)
      .single();

    if (fetchError || !enrollment) {
      return json({ error: "Enrollment not found" }, 404);
    }

    if (enrollment.status === "paid") {
      return json({
        success: true,
        alreadyPaid: true,
        enrollment,
      });
    }

    const { data: updated, error: updateError } = await supabase
      .from("enrollments")
      .update({
        status: "paid",
        amount_paid: amountPaid,
        payment_reference: reference,
      })
      .eq("id", enrollmentId)
      .select("*, tutorials(name)")
      .single();

    if (updateError) {
      return json({ error: updateError.message }, 500);
    }

    const tutorialName =
      (updated.tutorials as { name: string } | null)?.name ?? "Tutorial";

    if (resendApiKey) {
      const html = buildConfirmationEmail({
        studentName: updated.full_name,
        tutorialName,
        amountPaid,
        reference,
        supportEmail,
        supportPhone,
      });

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [updated.email],
          subject: "Enrollment Confirmation – SamsTek Services",
          html,
        }),
      });
    }

    return json({ success: true, enrollment: updated });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return json({ error: message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function buildConfirmationEmail(params: {
  studentName: string;
  tutorialName: string;
  amountPaid: number;
  reference: string;
  supportEmail: string;
  supportPhone: string;
}) {
  const { studentName, tutorialName, amountPaid, reference, supportEmail, supportPhone } =
    params;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1E293B;">
      <h1 style="color: #2563EB;">Enrollment Confirmed</h1>
      <p>Hi ${studentName},</p>
      <p>Thank you for enrolling with <strong>SamsTek Services</strong>. Your payment was successful.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
        <tr><td style="padding: 8px 0;"><strong>Tutorial:</strong></td><td>${tutorialName}</td></tr>
        <tr><td style="padding: 8px 0;"><strong>Amount Paid:</strong></td><td>GHS ${amountPaid.toFixed(2)}</td></tr>
        <tr><td style="padding: 8px 0;"><strong>Payment Reference:</strong></td><td>${reference}</td></tr>
      </table>
      <p>We will contact you shortly with access details. If you have questions, reach us at:</p>
      <ul>
        <li>Email: <a href="mailto:${supportEmail}">${supportEmail}</a></li>
        <li>Phone: ${supportPhone}</li>
      </ul>
      <p style="margin-top: 32px;">Best regards,<br/><strong>SamsTek Services Team</strong></p>
    </div>
  `;
}
