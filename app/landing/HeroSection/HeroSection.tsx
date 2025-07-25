import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-r from-[#d3dbeb] to-white min-h-screen pt-24 md:pt-28 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between h-full px-4 md:px-8 pb-4 md:pb-0">
        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start max-w-full md:max-w-xl w-full text-center md:text-left">
          <h1 className="text-4xl md:text-5xl  font-extrabold text-black leading-tight mb-4 md:mb-6">
            Unleashing<br />
            Digital Impact<br />
            for Brands &<br />
            Creators
          </h1>
          <div className="w-full mb-4 md:mb-6 flex justify-center md:justify-start">
            <Image 
              src="/CurvedBar.svg" 
              alt="Curved Bar" 
              width={400} 
              height={30} 
              className="w-full max-w-xs sm:max-w-sm md:max-w-md"
            />
          </div>
          <p className="text-xs sm:text-sm text-gray-700 mb-6 md:mb-8 leading-relaxed tracking-wide">
            One smart tool to create, schedule, and optimize content across platforms.<br />
            Powered by AI. Designed for digital marketers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full justify-center md:justify-start">
            <button className="bg-[#20408B] hover:bg-[#16306a] text-white px-4 sm:px-6 md:px-8 py-3 rounded-full text-sm sm:text-base font-medium transition-all hover:scale-105">
              Join Now
            </button>
            <button className="flex items-center justify-center gap-2 border border-black px-4 sm:px-6 py-3 rounded-full text-sm sm:text-base font-medium text-black hover:bg-gray-100 transition-all hover:scale-105 group">
              <span className="inline-block w-5 h-5 rounded-full border-2 border-black flex items-center justify-center transition-transform group-hover:rotate-180">
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M6 11V5l5 3-5 3z" fill="currentColor"/></svg>
              </span>
              View Demo
            </button>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex-1 flex justify-center md:justify-end items-center mt-8 md:mt-12 lg:mt-0 md:-mr-8">
          <div className="transform transition-transform hover:scale-102 max-w-full">
            <Image
              src="/man.png"
              alt="Man with Laptop"
              width={500}
              height={500}
              className="w-80 sm:w-96 md:w-80 lg:w-96 xl:w-[500px] h-auto max-w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
} 