"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Pricing from "../landing/Pricing/Pricing";
import HeroSection from "./HeroSection/HeroSection";
import SolutionsCards from "./SolutionsCards/SolutionsCards";
import FeaturesSection from "./FeaturesSection/FeaturesSection";
import CTASection from "./CTASection/CTASection";

export default function SolutionsPage() {
  const [isFading, setIsFading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Listen for clicks on all navigation links
    const handleNavigationClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const authLink = target.closest('a[href^="/auth/"]');
      const faqLink = target.closest('a[href="/faq"]');
      const contactLink = target.closest('a[href="/contact"]');
      const solutionsLink = target.closest('a[href="/solutions"]');
      const pricingLink = target.closest('a[href="#pricing"]');
      const featuresLink = target.closest('a[href="/solutions#features"]');
      const homeLink = target.closest('a[href="/"]');
      const signupLink = target.closest('a[href="/auth/signup"]');

      if (authLink || faqLink || contactLink || solutionsLink || pricingLink || homeLink || signupLink) {
        e.preventDefault();
        setIsFading(true);

        // Navigate after fade animation
        setTimeout(() => {
          if (authLink) {
            router.push(authLink.getAttribute('href') || '/auth/login');
          } else if (faqLink) {
            router.push('/faq');
          } else if (contactLink) {
            router.push('/contact');
          } else if (solutionsLink) {
            router.push('/solutions');
          } else if (pricingLink) {
            router.push('/#pricing');
          } else if (homeLink) {
            router.push('/');
          } else if (signupLink) {
            router.push('/auth/signup');
          }
        }, 300);
      } else if (featuresLink) {
        e.preventDefault();
        // Scroll to features section on the same page
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
          featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleNavigationClick);

    return () => {
      document.removeEventListener('click', handleNavigationClick);
    };
  }, [router]);

  return (
    <div className={`min-h-screen bg-white transition-opacity duration-300 ${isFading ? 'opacity-30' : 'opacity-100'}`}>
      <HeroSection />
      <SolutionsCards />
      <FeaturesSection />
      <Pricing />
      <CTASection />
    </div>
  );
} 