import Image from "next/image";

export default function HowItWorks() {
  return (
    <section className="w-full bg-white min-h-[calc(100vh-160px)] pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-8 h-full flex flex-col justify-center">
        {/* Decorative Elements */}
        <div className="text-center mb-8">
          <div className="flex justify-center gap-2 mb-4">
            <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
            Create. Schedule. Optimize. In One Smart Flow.
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Transform your social media strategy with our all-in-one platform designed for modern creators and brands.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Step 1: Connect Platforms */}
          <div className="text-center relative">
            <div className="relative mb-6">
              {/* Number Circle */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center z-10">
                <span className="text-sm font-bold text-gray-700">1</span>
              </div>
              {/* Main Icon Circle */}
              <div className="w-20 h-20 bg-white border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center mx-auto relative">
                <svg className="w-10 h-10 text-[#1e40af]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              {/* Connecting Line beside Step 1 with color transition */}
              <div className="hidden md:block absolute top-1/2 left-full w-24 h-0.5 transform -translate-y-1/2 border-t-2 border-dashed border-gray-300">
                <div className="absolute -top-1 left-0 w-2 h-2 bg-[#1e40af] rounded-full"></div>
                <div className="absolute -top-1 right-0 w-2 h-2 bg-[#FBC75E] rounded-full"></div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-black mb-4">Connect Platforms</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Link all your social media accounts in one place.
            </p>
          </div>

          {/* Step 2: Generate Content */}
          <div className="text-center relative">
            <div className="relative mb-6">
              {/* Number Circle */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center z-10">
                <span className="text-sm font-bold text-gray-700">2</span>
              </div>
              {/* Main Icon Circle */}
              <div className="w-20 h-20 bg-white border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center mx-auto relative">
                <svg className="w-10 h-10 text-[#FBC75E]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              {/* Connecting Line beside Step 2 with color transition */}
              <div className="hidden md:block absolute top-1/2 left-full w-24 h-0.5 transform -translate-y-1/2 border-t-2 border-dashed border-gray-300">
                <div className="absolute -top-1 left-0 w-2 h-2 bg-[#FBC75E] rounded-full"></div>
                <div className="absolute -top-1 right-0 w-2 h-2 bg-[#4535AF] rounded-full"></div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-black mb-4">Generate Content</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Use AI to instantly create scroll-stopping posts.
            </p>
          </div>

          {/* Step 3: Track Performance */}
          <div className="text-center relative">
            <div className="relative mb-6">
              {/* Number Circle */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center z-10">
                <span className="text-sm font-bold text-gray-700">3</span>
              </div>
              {/* Main Icon Circle */}
              <div className="w-20 h-20 bg-white border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center mx-auto relative">
                <svg className="w-10 h-10 text-[#4535AF]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-black mb-4">Track Performance</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Monitor results and improve with real-time analytics.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button className="bg-[#20408B] hover:bg-[#16306a] text-white px-8 py-3 rounded-full text-base font-medium transition-all hover:scale-105">
            Start Creating
          </button>
        </div>
      </div>
    </section>
  );
} 