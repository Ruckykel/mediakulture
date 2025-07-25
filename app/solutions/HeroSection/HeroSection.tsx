import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-r from-[#d3dbeb] to-white min-h-screen pt-28">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between h-full px-8">
        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-center items-start max-w-xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black leading-tight mb-6">
            Smart Tools.<br />
            Real Results.
          </h1>
          <p className="text-sm text-gray-700 mb-8 leading-relaxed tracking-wide" >
            Explore MediaKulture&apos;s powerful features — tailored<br />
            for brands, creators, and agencies to simplify content<br />
            creation, distribution, and performance.
          </p>
          <div className="flex gap-6">
            <button className="bg-[#20408B] hover:bg-[#16306a] text-white px-8 py-3 rounded-full text-base font-medium transition-all hover:scale-105">
              Join Now
            </button>
            <button className="flex items-center gap-2 border border-black px-6 py-3 rounded-full text-base font-medium text-black hover:bg-gray-100 transition-all hover:scale-105 group">
              <span className="inline-block w-5 h-5 rounded-full border-2 border-black flex items-center justify-center transition-transform group-hover:rotate-180">
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M6 11V5l5 3-5 3z" fill="currentColor"/></svg>
              </span>
              View Demo
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex justify-end items-center mt-12 md:mt-0 relative">
          <div className="transform transition-transform hover:scale-102">
            <Image
              src="/ManPointing.png"
              alt="Professional man pointing to insights"
              width={500}
              height={600}
              className=""
              priority
            />
          </div>
          
          {/* Curved Arrow - positioned to link left text to right image */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16">
            <Image
              src="/CurvedArrow.svg"
              alt="Curved arrow pointing to insights"
              width={120}
              height={80}
              className="w-auto h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
} 