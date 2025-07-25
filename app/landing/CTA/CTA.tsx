export default function CTA() {
  return (
    <section className="w-full bg-[#20408B] py-20 relative overflow-hidden">
      {/* Faint white wave decoration */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 Q300,100 600,200 T1200,200 L1200,400 L0,400 Z"
            fill="white"
          />
          <path
            d="M0,250 Q300,150 600,250 T1200,250 L1200,400 L0,400 Z"
            fill="white"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center">
          {/* Main Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-6">
            Ready to Streamline Your<br />
            Digital Marketing?
          </h2>

          {/* Sub-text */}
          <p className="text-sm text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds already using MediaKulture to power their content and growth.
          </p>

          {/* CTA Button */}
          <button className="bg-white hover:bg-gray-100 text-[#20408B] px-8 py-3 rounded-full font-medium text-base transition-colors duration-200">
            Join Now
          </button>
        </div>
      </div>
    </section>
  );
} 