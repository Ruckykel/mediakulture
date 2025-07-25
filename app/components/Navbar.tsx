"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { name: "FAQ", href: "/faq" },
  { name: "Solutions", href: "/solutions" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
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

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-sm"
          : "bg-transparent"
      }`}
      style={{ backdropFilter: scrolled ? undefined : "blur(0px)" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/MediaKultureLogo.png"
            alt="MediaKulture Logo"
            width={160}
            height={160}
            priority
          />
        </Link>
        <div className="flex-1 flex justify-center">
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
        <div className="flex items-center gap-4">
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
      </div>
    </nav>
  );
} 