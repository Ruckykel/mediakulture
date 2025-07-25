"use client";

import { useState } from "react";
import Image from "next/image";

export default function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState(0);

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

  const handleFeatureClick = (index: number) => {
    setSelectedFeature(index);
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

        {/* Interactive Features */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Sidebar - Feature Navigation */}
          <div className="lg:w-1/3">
            <div className="space-y-2 relative">
              {/* Vertical slide bar */}
              <div className="absolute right-0 top-0 w-0.5 h-full bg-gray-200"></div>
              
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => handleFeatureClick(index)}
                  onTouchStart={() => handleFeatureClick(index)}
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
      </div>
    </section>
  );
} 