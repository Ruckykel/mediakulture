"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeroSection from "./HeroSection/HeroSection";

export default function MediaCoveragePage() {
  const [isFading, setIsFading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleNavigationClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const homeLink = target.closest('a[href="/"]');
      const faqLink = target.closest('a[href="/faq"]');
      const contactLink = target.closest('a[href="/contact"]');
      const solutionsLink = target.closest('a[href="/solutions"]');
      const mediaCoverageLink = target.closest('a[href="/media-coverage"]');
      const pricingLink = target.closest('a[href="/#pricing"]');
      const authLink = target.closest('a[href^="/auth/"]');

      if (authLink || faqLink || contactLink || solutionsLink || mediaCoverageLink || pricingLink || homeLink) {
        e.preventDefault();
        setIsFading(true);
        setTimeout(() => {
          if (authLink) {
            router.push((authLink as HTMLAnchorElement).getAttribute('href') || '/auth/login');
          } else if (faqLink) {
            router.push('/faq');
          } else if (contactLink) {
            router.push('/contact');
          } else if (solutionsLink) {
            router.push('/solutions');
          } else if (mediaCoverageLink) {
            router.push('/media-coverage');
          } else if (pricingLink) {
            router.push('/#pricing');
          } else if (homeLink) {
            router.push('/');
          }
        }, 300);
      }
    };

    document.addEventListener('click', handleNavigationClick);
    return () => document.removeEventListener('click', handleNavigationClick);
  }, [router]);

  return (
    <main className={`min-h-screen bg-white transition-opacity duration-300 ${isFading ? 'opacity-30' : 'opacity-100'}`}>
      <HeroSection />
    </main>
  );
}


