"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TreePine,
  Mail,
  Loader2,
  Eye,
  EyeOff,
  Check,
  Circle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PASSWORD_RULES = [
  { id: "length", label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { id: "upper", label: "Uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { id: "lower", label: "Lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { id: "number", label: "Number", test: (p: string) => /\d/.test(p) },
  { id: "special", label: "Special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
] as const;

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const checks = useMemo(
    () => PASSWORD_RULES.map((r) => ({ ...r, passed: r.test(password) })),
    [password],
  );
  const allChecksPassed = checks.every((c) => c.passed);
  const passwordsMatch = password === confirmPassword;

  const signupDisabled =
    mode === "signup" && (!allChecksPassed || !passwordsMatch || !confirmPassword);

  function postAuthRedirectPath(): string {
    if (typeof window === "undefined") return "/map";
    const next = new URLSearchParams(window.location.search).get("next");
    if (next && next.startsWith("/") && !next.startsWith("//")) return next;
    return "/map";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (mode === "signup") {
      if (!allChecksPassed) {
        setError("Password does not meet all requirements.");
        setLoading(false);
        return;
      }
      if (!passwordsMatch) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else if (data.session) {
        // Email confirmation disabled or user auto-confirmed — signed in
        router.push(postAuthRedirectPath());
        router.refresh();
      } else {
        // Email confirmation required — no session until they click the link
        setMessage(
          "Check your email for a confirmation link to finish signing up. You can sign in here after you confirm.",
        );
        setPassword("");
        setConfirmPassword("");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        router.push(postAuthRedirectPath());
        router.refresh();
      }
    }

    setLoading(false);
  }

  function switchMode(next: "login" | "signup") {
    setMode(next);
    setError(null);
    setMessage(null);
    setConfirmPassword("");
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest text-white">
              <TreePine className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Yama
            </span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-stone-warm">
            {mode === "login"
              ? "Sign in to use the map. Saved spots, trips & journal are part of Pro."
              : "Join the yamadori scouting community"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-warm/50 hover:text-stone-warm transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Password requirements checklist (signup only) */}
          {mode === "signup" && password.length > 0 && (
            <ul className="space-y-1.5 pl-1 slide-up">
              {checks.map((c) => (
                <li
                  key={c.id}
                  className={cn(
                    "flex items-center gap-2 text-xs transition-colors",
                    c.passed ? "text-emerald-600" : "text-stone-warm/60",
                  )}
                >
                  {c.passed ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Circle className="h-3.5 w-3.5" />
                  )}
                  {c.label}
                </li>
              ))}
            </ul>
          )}

          {/* Confirm password (signup only) */}
          {mode === "signup" && (
            <div className="space-y-1.5 slide-up">
              <div className="relative">
                <Input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={cn(
                    "pr-10",
                    confirmPassword && !passwordsMatch && "border-red-400 focus-visible:ring-red-300/30",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-warm/50 hover:text-stone-warm transition-colors"
                  tabIndex={-1}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-xs text-red-500 pl-1">Passwords do not match</p>
              )}
              {confirmPassword && passwordsMatch && allChecksPassed && (
                <p className="text-xs text-emerald-600 pl-1 flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" />
                  Passwords match
                </p>
              )}
            </div>
          )}

          {/* Error / message */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          {message && (
            <p className="text-sm text-forest bg-forest/5 rounded-lg px-3 py-2">
              {message}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full gap-2"
            disabled={loading || signupDisabled}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Mail className="h-4 w-4" />
            )}
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        {/* Toggle mode */}
        <p className="text-center text-sm text-stone-warm">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => switchMode("signup")}
                className="font-medium text-forest hover:text-forest-light transition-colors"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => switchMode("login")}
                className="font-medium text-forest hover:text-forest-light transition-colors"
              >
                Sign in
              </button>
            </>
          )}
        </p>
        <p className="text-center text-xs text-stone-warm/80">
          <Link href="/premium" className="text-forest/90 hover:text-forest font-medium">
            Yama Pro
          </Link>{" "}
          — markers, journal &amp; more
        </p>
      </div>
    </div>
  );
}
