const KEY = (userId: string) => `yama_premium_v1_${userId}`;

export function readPremiumCache(userId: string): boolean | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const v = sessionStorage.getItem(KEY(userId));
    if (v === "1") return true;
    if (v === "0") return false;
  } catch {
    /* ignore */
  }
  return undefined;
}

export function writePremiumCache(userId: string, isPremium: boolean): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(KEY(userId), isPremium ? "1" : "0");
  } catch {
    /* ignore */
  }
}

export function clearPremiumCache(userId: string): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(KEY(userId));
  } catch {
    /* ignore */
  }
}
