"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Global navigation fade overlay. Intercepts internal link clicks to add a fade
 * effect before navigating. Also listens for a custom 'app:fade-start' event
 * that other components can dispatch to trigger the fade (e.g., on logout).
 */
export default function NavigationFade() {
	const router = useRouter();
	const pathname = usePathname();
	const [isFading, setIsFading] = useState(false);
	const watchdog = useRef<number | null>(null);
	const startedAtMs = useRef<number | null>(null);
	const searchParams = useSearchParams();
	const currentSearch = searchParams?.toString() || "";

	const MIN_VISIBLE_MS = 200;
	const WATCHDOG_MS = 5000;

	const startFadeWithWatchdog = () => {
		setIsFading(true);
		startedAtMs.current = Date.now();
		if (watchdog.current) {
			window.clearTimeout(watchdog.current);
		}
		watchdog.current = window.setTimeout(() => {
			// Safety: auto-clear fade if navigation stalls
			setIsFading(false);
			startedAtMs.current = null;
			watchdog.current = null;
		}, WATCHDOG_MS);
	};

	useEffect(() => {
		// When route changes complete (pathname/search updates), remove fade after minimum visible time
		if (isFading) {
			const now = Date.now();
			const started = startedAtMs.current ?? now;
			const elapsed = now - started;
			const delay = Math.max(0, MIN_VISIBLE_MS - elapsed);
			const t = window.setTimeout(() => {
				setIsFading(false);
				startedAtMs.current = null;
			}, delay);
			if (watchdog.current) {
				window.clearTimeout(watchdog.current);
				watchdog.current = null;
			}
			return () => window.clearTimeout(t);
		}
	}, [pathname, currentSearch, isFading]);

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement | null;
			if (!target) return;

			const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
			if (!anchor) return;

			const href = anchor.getAttribute("href") || "";
			const isExternal = /^(https?:)?\/\//i.test(href);
			const isHashOnly = href.startsWith("#");
			const isNewTab = anchor.target === "_blank" || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey;

			// Internal same-origin navigations that change pathname or search
			if (!isExternal && !isHashOnly && !isNewTab) {
				const targetUrl = new URL(href, window.location.href);
				const samePathAndSearch =
					targetUrl.pathname === window.location.pathname && targetUrl.search === window.location.search;
				if (samePathAndSearch) {
					// Let browser handle (may be same-page hash or just no-op)
					return;
				}
				// Do not prevent default so Next.js can perform fast client-side nav
				// Start fade immediately and keep until path/search updates or watchdog clears
				startFadeWithWatchdog();
			}
		};

		const handleFadeStart = (e: Event) => {
			// Always start fade; for logout we keep the same behavior but could customize if needed
			startFadeWithWatchdog();
		};

		document.addEventListener("click", handleClick);
		window.addEventListener("app:fade-start", handleFadeStart as EventListener);

		const handleHashChange = () => setIsFading(false);
		window.addEventListener("hashchange", handleHashChange);

		return () => {
			document.removeEventListener("click", handleClick);
			window.removeEventListener("app:fade-start", handleFadeStart as EventListener);
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, [router]);

	return (
		<div
			aria-hidden="true"
			className={`fixed inset-0 z-[9999] transition-opacity duration-200 ${
				isFading ? "opacity-100 pointer-events-auto bg-white/90 backdrop-blur-sm" : "opacity-0 pointer-events-none"
			}`}
		>
			{isFading && (
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="h-8 w-8 animate-spin rounded-full border-4 border-[#20408B]/30 border-t-[#20408B]" />
				</div>
			)}
		</div>
	);
}


