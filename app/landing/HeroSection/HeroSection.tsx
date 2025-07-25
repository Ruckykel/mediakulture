import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-r from-[#d3dbeb] to-white min-h-screen pt-28">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between h-full px-8">
        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-center items-start max-w-xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black leading-tight mb-6">
            Unleashing<br />
            Digital Impact<br />
            for Brands &<br />
            Creators
          </h1>
          <div className="w-full mb-6">
            <Image src="/CurvedBar.svg" alt="Curved Bar" width={400} height={30} />
          </div>
          <p className="text-sm text-gray-700 mb-8 leading-relaxed tracking-wide">
            One smart tool to create, schedule, and optimize content across platforms.<br />
            Powered by AI. Designed for digital marketers.
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
        <div className="flex-1 flex justify-end items-center mt-12 md:mt-0 -mr-8">
          <div className="transform transition-transform hover:scale-102">
            <Image
              src="/man.png"
              alt="Man with Laptop"
              width={500}
              height={500}
              className=""
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
} 