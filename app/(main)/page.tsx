"use client";
import HeroSection from "../landing/HeroSection/HeroSection";
import HowItWorks from "../landing/HowItWorks/HowItWorks";
import WhyChooseUs from "../landing/WhyChooseUs/WhyChooseUs";
import TrustedBy from "../landing/TrustedBy/TrustedBy";
import Testimonials from "../landing/Testimonials/Testimonials";
import Pricing from "../landing/Pricing/Pricing";
import CTA from "../landing/CTA/CTA";

export default function Home() {
  return (
    <main>
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
