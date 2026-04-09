"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  TreePine,
  Sparkles,
  Check,
  Loader2,
  MapPin,
  BookOpen,
  CreditCard,
  ArrowRight,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/lib/hooks/useAuth";
import { usePremium } from "@/lib/hooks/usePremium";
import { MOCK_PLANS, processMockSubscription, type MockPlan } from "@/lib/mockSubscription";
import { cn } from "@/lib/utils";

const FEATURES = [
  "Saved catalog spots, trip plans, and collection journal in one hub",
  "Private tree markers on the map",
  "GPX export and extended notes on spots you save",
];

type Step = "choose" | "checkout" | "processing" | "success";

export default function PremiumPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { isPremium, loading: premiumLoading, upgradeToPremium } = usePremium();

  const [step, setStep] = useState<Step>("choose");
  const [selectedPlan, setSelectedPlan] = useState<MockPlan | null>(null);
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [receiptId, setReceiptId] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login?next=/premium");
    }
  }, [authLoading, user, router]);

  async function handleSubscribe() {
    if (!selectedPlan || !user) return;
    setError(null);
    setStep("processing");

    const result = await processMockSubscription({
      planId: selectedPlan.id,
      nameOnCard,
      cardNumber,
    });

    if (!result.ok) {
      setError(result.error);
      setStep("checkout");
      return;
    }

    setReceiptId(result.mockSubscriptionId);
    await upgradeToPremium();
    setStep("success");
  }

  if (authLoading || premiumLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 border-2 border-forest/30 border-t-forest rounded-full animate-spin" />
      </div>
    );
  }

  if (isPremium && step !== "success") {
    return (
      <div className="page-transition">
        <div className="mx-auto max-w-lg px-4 sm:px-6 py-16 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 mb-6">
            <Sparkles className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">You&apos;re on Yama Pro</h1>
          <p className="text-stone-warm mb-8">
            Your account already has premium access. Explore markers, journal, and trip tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="gap-2">
              <Link href="/map">
                <MapPin className="h-4 w-4" />
                Open map
              </Link>
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <Link href="/saved?tab=journal">
                <BookOpen className="h-4 w-4" />
                Collection
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-transition min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 justify-center mb-6 text-foreground">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest text-white">
              <TreePine className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold tracking-tight">Yama Pro</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
            {step === "success" ? "Welcome to Pro" : "Upgrade your scouting workflow"}
          </h1>
          <p className="text-lg text-stone-warm max-w-xl mx-auto">
            {step === "success"
              ? "Premium is active on your account."
              : "Mock checkout for demos — no real charges. Unlocks markers, journal, and more."}
          </p>
        </div>

        {step === "success" && receiptId && (
          <div className="rounded-2xl border border-forest/20 bg-forest/5 p-8 text-center mb-8 slide-up">
            <p className="text-sm text-stone-warm mb-1">Mock subscription id</p>
            <p className="font-mono text-sm text-foreground break-all">{receiptId}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="gap-2">
                <Link href="/map">
                  <MapPin className="h-4 w-4" />
                  Go to map
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/saved">Collection</Link>
              </Button>
            </div>
          </div>
        )}

        {step !== "success" && (
          <>
            {step === "choose" && (
              <div className="space-y-10 slide-up">
                <ul className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
                  {FEATURES.map((f) => (
                    <li key={f} className="flex gap-3 text-sm text-bark">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                        <Check className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {MOCK_PLANS.map((plan) => {
                    const selected = selectedPlan?.id === plan.id;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedPlan(plan)}
                        className={cn(
                          "rounded-2xl border p-6 text-left transition-all hover:shadow-md",
                          selected
                            ? "border-forest bg-forest/5 ring-2 ring-forest/30"
                            : "border-sand/80 bg-white hover:border-forest/30",
                        )}
                      >
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                          <span className="font-semibold text-foreground">{plan.name}</span>
                          {plan.interval === "yearly" && (
                            <span className="text-[10px] font-bold uppercase tracking-wide text-forest bg-forest/10 px-2 py-0.5 rounded-full">
                              Save vs monthly
                            </span>
                          )}
                        </div>
                        <p className="text-3xl font-bold text-foreground mt-2">
                          ${plan.priceUsd}
                          <span className="text-base font-normal text-stone-warm ml-1">
                            / {plan.interval === "monthly" ? "mo" : "yr"}
                          </span>
                        </p>
                        <p className="text-xs text-stone-warm mt-2">{plan.highlight}</p>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-center">
                  <Button
                    size="lg"
                    className="gap-2 min-w-[200px]"
                    disabled={!selectedPlan}
                    onClick={() => {
                      setStep("checkout");
                      setError(null);
                    }}
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {(step === "checkout" || step === "processing") && selectedPlan && (
              <div className="max-w-md mx-auto space-y-6 slide-up">
                <div className="rounded-xl bg-sand-light/50 border border-sand/80 px-4 py-3 text-sm text-bark">
                  <p className="font-medium text-foreground">{selectedPlan.name}</p>
                  <p className="text-stone-warm">
                    ${selectedPlan.priceUsd} {selectedPlan.periodLabel} — demo only
                  </p>
                </div>

                <div className="rounded-xl border border-sand/80 bg-white p-6 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <CreditCard className="h-4 w-4 text-forest" />
                    Mock payment
                  </div>
                  <p className="text-xs text-stone-warm -mt-2 mb-2">
                    Use any name and a fake card with 12+ digits (e.g. 4242 4242 4242 4242).
                  </p>
                  <div>
                    <label className="text-xs font-medium text-stone-warm mb-1.5 block">
                      Name on card
                    </label>
                    <Input
                      value={nameOnCard}
                      onChange={(e) => setNameOnCard(e.target.value)}
                      placeholder="Jordan Scout"
                      autoComplete="cc-name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-warm mb-1.5 block">
                      Card number
                    </label>
                    <Input
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      inputMode="numeric"
                      autoComplete="cc-number"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-stone-warm">
                  <Shield className="h-4 w-4 shrink-0 text-forest/70 mt-0.5" />
                  This flow does not contact a payment provider. Your profile is updated in Supabase
                  only after the mock succeeds.
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
                )}

                <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between">
                  <Button
                    variant="ghost"
                    disabled={step === "processing"}
                    onClick={() => setStep("choose")}
                  >
                    Back
                  </Button>
                  <Button
                    className="gap-2 sm:min-w-[180px]"
                    disabled={step === "processing"}
                    onClick={handleSubscribe}
                  >
                    {step === "processing" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing…
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Subscribe (demo)
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
