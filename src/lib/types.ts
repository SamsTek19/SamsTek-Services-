export interface Tutorial {
  id: string;
  name: string;
  description: string;
  price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  tutorial_id: string;
  full_name: string;
  email: string;
  phone: string;
  amount_paid: number | null;
  payment_reference: string | null;
  status: "pending" | "paid" | "failed";
  created_at: string;
  tutorials?: { name: string } | null;
}

export interface EnrollmentFormData {
  fullName: string;
  email: string;
  phone: string;
}

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: PaystackOptions) => { openIframe: () => void };
    };
  }
}

export interface PaystackOptions {
  key: string;
  email: string;
  amount: number;
  currency?: string;
  ref?: string;
  metadata?: Record<string, string>;
  callback: (response: { reference: string }) => void;
  onClose: () => void;
}
