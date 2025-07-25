"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { name: "FAQ", href: "/faq" },
  { name: "Solutions", href: "/solutions" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check scroll position on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-sm"
          : "bg-transparent"
      }`}
      style={{ backdropFilter: scrolled ? undefined : "blur(0px)" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-6 md:py-3 px-4 md:px-8">
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
                <a
                  href={link.href}
                  className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium relative group pb-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-gray-900 rounded-full transition-all duration-300 group-hover:w-1/2"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {status === "authenticated" && session ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-800 font-medium">
                Welcome, {session.user?.name || session.user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-transform hover:scale-105"
              >
                Logout
              </button>
            </div>
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
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8"
          aria-label="Toggle mobile menu"
        >
          <span className={`block w-6 h-0.5 bg-[#20408B] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[#20408B] transition-all duration-300 mt-1 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[#20408B] transition-all duration-300 mt-1 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Navigation Links */}
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="block text-gray-700 hover:text-gray-900 transition-colors text-base font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-gray-200">
              {status === "authenticated" && session ? (
                <div className="space-y-3">
                  <div className="text-gray-800 font-medium text-sm">
                    Welcome, {session.user?.name || session.user?.email}
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-700 hover:text-gray-900 text-base font-medium py-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link 
                    href="/auth/login" 
                    className="block text-gray-700 hover:text-gray-900 text-base font-medium py-2"
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