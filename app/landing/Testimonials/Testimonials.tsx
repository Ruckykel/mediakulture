"use client";

import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      text: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and.",
      name: "Serhiy Hipskyy",
      title: "CEO Universal",
      rating: 5
    },
    {
      id: 2,
      text: "Cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
      name: "Justus Menke",
      title: "CEO Eronaman",
      rating: 5
    },
    {
      id: 3,
      text: "Accusamus et iusto odi ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.",
      name: "Britain Eriksen",
      title: "CEO Universal",
      rating: 5
    },
    {
      id: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      name: "John Smith",
      title: "CEO TechCorp",
      rating: 5
    },
    {
      id: 5,
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      name: "Sarah Johnson",
      title: "CEO InnovateLab",
      rating: 5
    },
    {
      id: 6,
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      name: "Michael Brown",
      title: "CEO FutureTech",
      rating: 5
    }
  ];

  return (
    <section className="w-full bg-white py-20">
      {/* Header within max-width container */}
      <div className="max-w-7xl mx-auto px-8 mb-16">
        <div className="text-center">
          <p className="text-black text-sm font-semibold uppercase tracking-wide mb-4">
            TESTIMONIAL
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">
            What Our Happy User Says
          </h2>
        </div>
      </div>

      {/* Manual Carousel Container with max-width */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="relative overflow-hidden">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            {/* Duplicate testimonials for seamless loop */}
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
              <div 
                key={`${testimonial.id}-${index}`} 
                className="flex-shrink-0 bg-white rounded-lg shadow-lg p-6 w-80"
              >
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-[#20408B] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {testimonial.text}
                </p>

                {/* Separator */}
                <div className="border-t border-gray-200 mb-4"></div>

                {/* User Info */}
                <div className="flex items-center gap-3">
                  <Image
                    src="/testimonial.png"
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-black text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-xs">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
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