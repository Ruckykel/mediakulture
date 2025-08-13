"use client";

type FadeReason = "generic" | "logout";

export function startGlobalFade(reason: FadeReason = "generic") {
  if (typeof window !== "undefined") {
    // Schedule on next frame to avoid blocking current click handler
    requestAnimationFrame(() => {
      const evt = new CustomEvent("app:fade-start", { detail: { type: reason } });
      window.dispatchEvent(evt);
    });
  }
}


