"use client";

import { Providers } from "../providers";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { startGlobalFade } from "../components/useFadeNavigation";

interface Brand {
  id: string;
  name: string;
  logo: string;
  shortName: string;
}

const brands: Brand[] = [
  {
    id: "inform-naija",
    name: "InformNaija",
    logo: "/InformNaijaLogo.svg",
    shortName: "IN"
  },
  {
    id: "edu-boosta", 
    name: "EduBoosta",
    logo: "/EduBoostaLogo.svg",
    shortName: "EB"
  },
  {
    id: "easy-move-zone",
    name: "EasyMoveZone", 
    logo: "/EasyMoveZoneLogo.svg",
    shortName: "EMZ"
  },
  {
    id: "bloom-vest",
    name: "BloomVest",
    logo: "/BloomVestLogo.svg", 
    shortName: "BV"
  }
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedBrand, setSelectedBrand] = useState<Brand>(brands[0]);
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  // Close sidebar on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  // Close on outside tap/scroll/touchmove and lock body scroll
  useEffect(() => {
    if (!isMobileSidebarOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (sidebarRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return;
      setIsMobileSidebarOpen(false);
    };

    const onScroll = () => setIsMobileSidebarOpen(false);
    const onTouchMove = () => setIsMobileSidebarOpen(false);

    document.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("scroll", onScroll as EventListener);
      window.removeEventListener("touchmove", onTouchMove as EventListener);
      document.body.style.overflow = prevOverflow;
    };
  }, [isMobileSidebarOpen]);

  // Swipe to close
  useEffect(() => {
    const el = sidebarRef.current;
    if (!el) return;
    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0]?.clientX ?? null;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!isMobileSidebarOpen) return;
      const startX = touchStartX.current;
      const endX = e.changedTouches[0]?.clientX ?? 0;
      if (startX !== null && endX - startX < -40) {
        // swipe left to close
        setIsMobileSidebarOpen(false);
      }
      if (startX !== null && endX - startX > 40) {
        // swipe right also closes per request
        setIsMobileSidebarOpen(false);
      }
      touchStartX.current = null;
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart as EventListener);
      el.removeEventListener("touchend", onTouchEnd as EventListener);
    };
  }, [isMobileSidebarOpen]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // Get user initials from name
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const userInitials = session.user?.name ? getUserInitials(session.user.name) : 'U';

  const isActive = (href: string, exact?: boolean) => {
    if (!pathname) return false;
    if (exact) {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <Providers>
      <div className={`min-h-screen flex`}>
        {/* Backdrop (mobile) */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            aria-hidden="true"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar (collapsible on mobile, static on lg+) */}
        <div
          ref={sidebarRef}
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-200 lg:static ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Logo */}
          <div className="p-6">
            <Image
              src="/MediaKultureLogo.png"
              alt="MediaKulture"
              width={200}
              height={50}
              priority
              className="w-auto h-8 object-contain"
            />
          </div>

          {/* Brand Selector */}
          <div className="px-6 mb-6">
            <div className="relative">
              <button
                onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Image
                    src={selectedBrand.logo}
                    alt={selectedBrand.name}
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                  <span className="text-sm font-medium text-gray-900">{selectedBrand.name}</span>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    isBrandDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isBrandDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {brands.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => {
                        setSelectedBrand(brand);
                        setIsBrandDropdownOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 object-contain"
                      />
                      <span className="text-sm text-gray-900">{brand.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 overflow-y-auto">
            <div className="space-y-2">
              {/* Dashboard */}
              <Link
                href="/dashboard"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/dashboard', true) ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-600 hover:bg-gray-50'
                }`}
                aria-current={isActive('/dashboard', true) ? 'page' : undefined}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 01-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                </svg>
                <span>Dashboard</span>
              </Link>

              {/* Calendar */}
              <Link
                href="/dashboard/calendar"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/dashboard/calendar') ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-600 hover:bg-gray-50'
                }`}
                aria-current={isActive('/dashboard/calendar') ? 'page' : undefined}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Calendar</span>
              </Link>

              {/* Content */}
              <Link
                href="/dashboard/content"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/dashboard/content') ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-600 hover:bg-gray-50'
                }`}
                aria-current={isActive('/dashboard/content') ? 'page' : undefined}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Content</span>
              </Link>

              {/* Platforms */}
              <Link
                href="/dashboard/platforms"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/dashboard/platforms') ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-600 hover:bg-gray-50'
                }`}
                aria-current={isActive('/dashboard/platforms') ? 'page' : undefined}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>Platforms</span>
              </Link>

              {/* Tools */}
              <Link
                href="/dashboard/tools"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/dashboard/tools') ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-600 hover:bg-gray-50'
                }`}
                aria-current={isActive('/dashboard/tools') ? 'page' : undefined}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Tools</span>
              </Link>

              {/* Settings */}
              <Link
                href="/dashboard/settings"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/dashboard/settings') ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-600 hover:bg-gray-50'
                }`}
                aria-current={isActive('/dashboard/settings') ? 'page' : undefined}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <span>Settings</span>
              </Link>
            </div>

            {/* Sidebar Logout for mobile */}
            <div className="mt-6 lg:hidden">
              <button
                onClick={() => {
                  startGlobalFade("logout");
                  signOut({ callbackUrl: "/" });
                }}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Logout
              </button>
            </div>

            {/* Support Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Support
              </h3>
              <div className="space-y-2">
                <Link
                  href="/dashboard/help-center"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive('/dashboard/help-center') ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  aria-current={isActive('/dashboard/help-center') ? 'page' : undefined}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span>Help Center</span>
                </Link>

                <Link
                  href="/dashboard/team"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive('/dashboard/team') ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  aria-current={isActive('/dashboard/team') ? 'page' : undefined}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Team</span>
                </Link>
              </div>
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">{userInitials}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                <p className="text-xs text-gray-500">{session.user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar with hamburger, logo, welcome and logout (logout hidden on xs; in drawer instead) */}
          <header className="sticky top-0 z-[60] bg-white border-b border-gray-200 px-4 md:px-6 py-4 md:py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Link href="/dashboard" className="lg:hidden flex items-center gap-2">
                  <Image src="/MediaKultureLogo.png" alt="MediaKulture" width={110} height={28} className="h-6 w-auto" />
                </Link>
                <div className="hidden sm:flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">{userInitials}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Welcome, {session.user?.name || session.user?.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    startGlobalFade("logout");
                    signOut({ callbackUrl: "/" });
                  }}
                  className="hidden sm:inline-flex px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Logout
                </button>
                <button
                  ref={toggleRef}
                  className="lg:hidden inline-flex flex-col justify-center items-center w-8 h-8"
                  aria-label="Toggle sidebar"
                  aria-expanded={isMobileSidebarOpen}
                  onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                >
                  <span className={`block w-6 h-0.5 bg-gray-900 transition-transform ${isMobileSidebarOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-gray-900 transition-opacity my-1 ${isMobileSidebarOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`block w-6 h-0.5 bg-gray-900 transition-transform ${isMobileSidebarOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
                </button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 bg-gray-50">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 px-4 md:px-6 py-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-600">
              <span>© {new Date().getFullYear()} MediaKulture</span>
              <div className="flex items-center gap-4">
                <Link href="/dashboard/help-center" className="hover:text-gray-900">Support</Link>
                <Link href="/#pricing" className="hover:text-gray-900">Pricing</Link>
                <Link href="/terms" className="hover:text-gray-900">Terms</Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </Providers>
  );
} 