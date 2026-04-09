/**
 * Demo-only “subscription” layer. No real payment processor — simulates
 * latency and returns a fake subscription id, then the app sets
 * `profiles.is_premium` via Supabase (see usePremium / premium page).
 */

export type BillingInterval = "monthly" | "yearly";

export interface MockPlan {
  id: string;
  name: string;
  interval: BillingInterval;
  priceUsd: number;
  periodLabel: string;
  highlight?: string;
}

export const MOCK_PLANS: MockPlan[] = [
  {
    id: "pro_monthly",
    name: "Yama Pro",
    interval: "monthly",
    priceUsd: 9,
    periodLabel: "per month",
    highlight: "Flexible — cancel anytime",
  },
  {
    id: "pro_yearly",
    name: "Yama Pro",
    interval: "yearly",
    priceUsd: 79,
    periodLabel: "per year",
    highlight: "Best value — about $6.58/mo",
  },
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface MockCheckoutInput {
  planId: string;
  /** Mock card number (any string; optional validation in UI) */
  cardNumber: string;
  nameOnCard: string;
}

export type MockSubscriptionResult =
  | {
      ok: true;
      mockSubscriptionId: string;
      planId: string;
      plan: MockPlan;
    }
  | { ok: false; error: string };

/**
 * Simulates payment authorization + subscription creation (800–2200ms).
 * Always succeeds for valid `planId` — suitable for demos and QA.
 */
export async function processMockSubscription(
  input: MockCheckoutInput,
): Promise<MockSubscriptionResult> {
  const plan = MOCK_PLANS.find((p) => p.id === input.planId);
  if (!plan) {
    return { ok: false, error: "Select a plan to continue." };
  }

  const trimmedName = input.nameOnCard.trim();
  if (trimmedName.length < 2) {
    return { ok: false, error: "Enter the name on card." };
  }

  const digits = input.cardNumber.replace(/\D/g, "");
  if (digits.length < 12) {
    return { ok: false, error: "Enter a mock card number (12+ digits)." };
  }

  await delay(800 + Math.random() * 1400);

  const mockSubscriptionId = `mock_sub_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

  return {
    ok: true,
    mockSubscriptionId,
    planId: plan.id,
    plan,
  };
}
