"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  TreePine,
  Map,
  BookOpen,
  Menu,
  X,
  LogIn,
  LogOut,
  User,
  Sparkles,
  Library,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/hooks/useAuth";
import { usePremium } from "@/lib/hooks/usePremium";
import { clearPremiumCache } from "@/lib/premiumCache";

const navLinks = [
  { href: "/map", label: "Explore Map", icon: Map },
  { href: "/species", label: "Species Guide", icon: BookOpen },
  { href: "/saved", label: "Collection", icon: Library },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const { isPremium, loading: premiumLoading } = usePremium();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const isMapPage = pathname === "/map";
  const supabase = createClient();

  async function handleSignOut() {
    if (user) clearPremiumCache(user.id);
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  const avatarUrl =
    user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0];

  const showProUpsell = user && !premiumLoading && !isPremium;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-sand/80 backdrop-blur-md",
        isMapPage ? "bg-white/95" : "bg-background/95"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest text-white transition-transform group-hover:scale-105">
            <TreePine className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-foreground leading-tight">
              Yama
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-stone-warm leading-none">
              Yamadori Scouting
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <nav className="flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <Button
                  variant={pathname === href ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "gap-2",
                    pathname === href && "pointer-events-none"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Button>
              </Link>
            ))}
          </nav>

          {showProUpsell && (
            <Link href="/premium" className="hidden md:inline-flex">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 border-amber-200/90 text-amber-900 bg-amber-50/60 hover:bg-amber-50"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                Pro
              </Button>
            </Link>
          )}

          <div className="ml-2 pl-2 border-l border-sand/80">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-sand-light transition-colors"
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt=""
                      className="h-7 w-7 rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="h-7 w-7 rounded-full bg-forest/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-forest" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-bark max-w-[120px] truncate">
                    {displayName}
                  </span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 rounded-lg bg-white shadow-lg border border-sand/70 p-1 slide-up z-50">
                    <div className="px-3 py-2 border-b border-sand/50 mb-1">
                      <p className="text-xs text-stone-warm truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm text-bark hover:bg-sand-light transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-sand-light transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5 text-foreground" />
          ) : (
            <Menu className="h-5 w-5 text-foreground" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-sand/80 bg-white slide-up">
          <nav className="flex flex-col p-4 gap-1">
            {showProUpsell && (
              <Link href="/premium" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 border-amber-200/90 text-amber-900 bg-amber-50/60"
                >
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  Yama Pro
                </Button>
              </Link>
            )}
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant={pathname === href ? "default" : "ghost"}
                  className="w-full justify-start gap-3"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Button>
              </Link>
            ))}
            <div className="border-t border-sand/80 mt-2 pt-2">
              {user ? (
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3"
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="default" className="w-full justify-start gap-3">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
