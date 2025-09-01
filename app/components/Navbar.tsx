"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

const navLinks = [
  { name: "FAQ", href: "/faq" },
  { name: "Solutions", href: "/solutions" },
  { name: "Media Coverage", href: "/media-coverage" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check scroll position on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on outside tap/click, scroll attempts, or touchmove
  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (menuRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return;
      setMobileMenuOpen(false);
    };

    const handleScrollOrTouch = () => {
      setMobileMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    window.addEventListener("scroll", handleScrollOrTouch, { passive: true });
    window.addEventListener("touchmove", handleScrollOrTouch, { passive: true });

    // Prevent background scroll while menu is open
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      window.removeEventListener("scroll", handleScrollOrTouch as EventListener);
      window.removeEventListener("touchmove", handleScrollOrTouch as EventListener);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  // Auth actions are simplified for marketing navbar. If authenticated, show Dashboard link; no logout here.

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Avoid intercepting hash-only anchors for fade overlay
  // No special-casing needed anymore; global fade ignores same-path+hash

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-colors duration-300 ${
        mobileMenuOpen
          ? "bg-white shadow-sm"
          : scrolled
            ? "bg-white/80 backdrop-blur-sm"
            : "bg-transparent"
      }`}
      style={{ backdropFilter: scrolled && !mobileMenuOpen ? "" : "blur(0px)" }}
    >
      <div className="relative z-[60] max-w-7xl mx-auto flex items-center justify-between py-6 md:py-3 px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/MediaKultureLogo.png"
            alt="MediaKulture Logo"
            width={160}
            height={160}
            priority
            className="w-32 md:w-40"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium relative group pb-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-gray-900 rounded-full transition-all duration-300 group-hover:w-1/2"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {status === "authenticated" && session ? (
            <Link 
              href="/dashboard" 
              className="bg-[#20408B] hover:bg-[#16306a] text-white px-6 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/auth/login" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-transform hover:scale-105">
                Login
              </Link>
              <Link 
                href="/auth/signup" 
                className="bg-[#20408B] hover:bg-[#16306a] text-white px-6 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={toggleRef}
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block w-6 h-0.5 bg-[#20408B] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[#20408B] transition-all duration-300 mt-1 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[#20408B] transition-all duration-300 mt-1 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {/* Backdrop overlay (mobile only) placed below header but above page */}
      <div
        className={`md:hidden fixed inset-0 z-[40] bg-black/30 transition-opacity ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu (above overlay) */}
      <div id="mobile-menu" ref={menuRef} className={`md:hidden relative z-[50] ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Navigation Links */}
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="block text-gray-700 hover:text-gray-900 transition-colors text-base font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-gray-200">
              {status === "authenticated" && session ? (
                <div className="space-y-3">
                  <Link 
                    href="/dashboard" 
                    className="block bg-[#20408B] hover:bg-[#16306a] text-white px-6 py-3 rounded-full text-base font-medium text-center transition-all hover:scale-105"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link 
                    href="/auth/login" 
                    className="block border border-[#20408B] text-[#20408B] px-6 py-3 rounded-full text-base font-medium text-center transition-all hover:bg-[#20408B]/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/auth/signup" 
                    className="block bg-[#20408B] hover:bg-[#16306a] text-white px-6 py-3 rounded-full text-base font-medium text-center transition-all hover:scale-105"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 