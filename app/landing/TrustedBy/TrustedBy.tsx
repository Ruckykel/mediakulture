"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function TrustedBy() {
  const logos = [
    { name: "Credolay", src: "/Credolay.png" },
    { name: "InformNaija", src: "/InformNaija.png" },
    { name: "BoxOutAfrica", src: "/BoxOutAfrica.png" },
    { name: "Standex", src: "/Standex.png" },
    { name: "Convivia", src: "/Convivia.png" },
    { name: "EasyMoveZone", src: "/EasyMoveZone.png" },
    { name: "EduBoosta", src: "/EduBoosta.png" },
    { name: "Rekruuter", src: "/Rekruuter.png" },
    { name: "ApplyCoachPro", src: "/ApplyCoachPro.png" },
    { name: "Najville", src: "/Najville.png" },
  ];

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        // Reset to beginning when we've scrolled through all logos
        if (prev >= logos.length * 200) {
          return 0;
        }
        return prev + 1;
      });
    }, 30); // Adjust speed here (lower = faster)

    return () => clearInterval(interval);
  }, [logos.length]);

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-base md:text-lg font-semibold text-black mb-4">
            Trusted by brands, creators, and agencies
          </h2>
        </div>

        {/* Logo Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Logo Carousel */}
          <div 
            className="flex gap-12 items-center"
            style={{
              transform: `translateX(-${scrollPosition}px)`,
              transition: 'transform 0.1s linear'
            }}
          >
            {/* Duplicate logos for seamless loop */}
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <div 
                key={`${logo.name}-${index}`} 
                className="flex-shrink-0 flex items-center justify-center"
                style={{ width: '200px' }}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                />
              </div>
            ))}
          </div>

          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
} 