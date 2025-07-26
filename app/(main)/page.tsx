"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeroSection from "../landing/HeroSection/HeroSection";
import HowItWorks from "../landing/HowItWorks/HowItWorks";
import WhyChooseUs from "../landing/WhyChooseUs/WhyChooseUs";
import TrustedBy from "../landing/TrustedBy/TrustedBy";
import Testimonials from "../landing/Testimonials/Testimonials";
import Pricing from "../landing/Pricing/Pricing";
import CTA from "../landing/CTA/CTA";

export default function Home() {
  const [isFading, setIsFading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Listen for clicks on login/signup, FAQ, contact, solutions, pricing, and features links
    const handleNavigationClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const authLink = target.closest('a[href^="/auth/"]');
      const faqLink = target.closest('a[href="/faq"]');
      const contactLink = target.closest('a[href="/contact"]');
      const solutionsLink = target.closest('a[href="/solutions"]');
      const pricingLink = target.closest('a[href="#pricing"]');
      const featuresLink = target.closest('a[href="/solutions#features"]');
      const signupLink = target.closest('a[href="/auth/signup"]');

      if (authLink || faqLink || contactLink || solutionsLink || featuresLink || signupLink) {
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
          } else if (featuresLink) {
            router.push('/solutions#features');
          } else if (signupLink) {
            router.push('/auth/signup');
          }
        }, 300);
      } else if (pricingLink) {
        e.preventDefault();
        // Scroll to pricing section on the same page
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleNavigationClick);

    return () => {
      document.removeEventListener('click', handleNavigationClick);
    };
  }, [router]);

  return (
    <main className={`transition-opacity duration-300 ${isFading ? 'opacity-30' : 'opacity-100'}`}>
      <HeroSection />
      <HowItWorks />
      <WhyChooseUs />
      <TrustedBy />
      <Testimonials />
      <Pricing />
      <CTA />
    </main>
  );
}
