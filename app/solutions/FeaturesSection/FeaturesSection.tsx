"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      name: "AI Content Generator",
      title: "Get post ideas, captions, hashtags, and even media prompts.",
      description: "Let AI jumpstart your creativity with tailored suggestions for your niche, voice, and goals.",
      bgColor: "bg-[#20408B]"
    },
    {
      name: "Smart Scheduler",
      title: "Schedule posts across platforms with drag-and-drop ease.",
      description: "Plan a week or a month ahead—automate publishing and keep your content consistent.",
      bgColor: "bg-[#FBC75E]"
    },
    {
      name: "Performance Analytics",
      title: "Understand your audience and what content works best.",
      description: "Track engagement, reach, and conversions with easy-to-read insights that help you grow smarter.",
      bgColor: "bg-[#4535AF]"
    },
    {
      name: "Collaboration Tools",
      title: "Invite team members, assign roles, share feedback.",
      description: "Seamlessly co-create with clients or teammates using real-time comments, approvals, and tasking.",
      bgColor: "bg-[#FF6B35]"
    },
    {
      name: "Multi-Platform Management",
      title: "Instagram, TikTok, LinkedIn, Facebook, X, and more.",
      description: "Manage all your channels in one place—no need to log in and out or juggle apps.",
      bgColor: "bg-[#6B7280]"
    }
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotate on mobile - slower rotation
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setSelectedFeature((prev) => (prev + 1) % features.length);
    }, 15000); // 15 seconds per card - comfortable reading time

    return () => clearInterval(interval);
  }, [isMobile, features.length]);

  const handleFeatureClick = (index: number) => {
    setSelectedFeature(index);
  };

  const handleCardTap = () => {
    // Tap the card to go to next feature
    setSelectedFeature((prev) => (prev + 1) % features.length);
  };

  // Swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      // Swipe left - next feature
      setSelectedFeature((prev) => (prev + 1) % features.length);
    } else if (isRightSwipe) {
      // Swipe right - previous feature
      setSelectedFeature((prev) => (prev - 1 + features.length) % features.length);
    }

    // Reset touch values
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section id="features" className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight mb-4">
            Everything You Need, Built Right In
          </h2>
          <p className="text-sm text-gray-600 max-w-3xl mx-auto">
            MediaKulture combines powerful tools into one sleek workspace—so you can plan, create, manage, and grow without switching tabs.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-col lg:flex-row gap-12">
          {/* Left Sidebar - Feature Navigation */}
          <div className="lg:w-1/3">
            <div className="space-y-2 relative">
              {/* Vertical slide bar */}
              <div className="absolute right-0 top-0 w-0.5 h-full bg-gray-200"></div>
              
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => handleFeatureClick(index)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 relative touch-manipulation cursor-pointer ${
                    selectedFeature === index
                      ? "text-black font-semibold text-base"
                      : "text-gray-600 hover:text-black hover:font-semibold text-base"
                  }`}
                >
                  {selectedFeature === index && (
                    <div className="absolute right-0 top-0 w-1 h-full bg-[#20408B]"></div>
                  )}
                  {feature.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:w-2/3">
            <div className={`${features[selectedFeature].bgColor} rounded-xl p-8 text-white relative overflow-hidden`}>
              <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
                {/* Text Content */}
                <div className="lg:w-1/2 text-center lg:text-left">
                  <h3 className="text-xl md:text-2xl font-bold mb-4">
                    {features[selectedFeature].title}
                  </h3>
                  <p className="text-sm opacity-90 font-light tracking-wide">
                    {features[selectedFeature].description}
                  </p>
                </div>
                
                {/* Features Image */}
                <div className="lg:w-1/2 flex items-center justify-center">
                  <Image
                    src="/FeaturesImage.png"
                    alt="Features interface"
                    width={300}
                    height={200}
                    className="w-full h-auto max-w-xs rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Carousel Layout */}
        <div className="md:hidden">
          <div className="space-y-8">
            {/* Feature Names Above Cards */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-black">
                {features[selectedFeature].name}
              </h3>
            </div>

            {/* Single Large Card - Touchable with Swipe */}
            <div className="w-full">
              <div 
                ref={cardRef}
                className={`${features[selectedFeature].bgColor} rounded-xl p-6 text-white text-center cursor-pointer transition-transform active:scale-95 select-none`}
                onClick={handleCardTap}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCardTap();
                  }
                }}
              >
                <h3 className="text-xl font-bold mb-4">
                  {features[selectedFeature].title}
                </h3>
                <p className="text-sm opacity-90 font-light tracking-wide mb-6">
                  {features[selectedFeature].description}
                </p>
                
                {/* Features Image */}
                <div className="flex items-center justify-center">
                  <Image
                    src="/FeaturesImage.png"
                    alt="Features interface"
                    width={300}
                    height={200}
                    className="w-full h-auto max-w-xs rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFeature(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    selectedFeature === index ? 'bg-[#20408B]' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to feature ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 