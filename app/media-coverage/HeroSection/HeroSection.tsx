"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

export default function HeroSection() {

	const [isVideoReady, setIsVideoReady] = useState(false);

	const handleVideoReady = useCallback(() => {
		setIsVideoReady(true);
	}, []);

	return (
		<section className="relative w-full min-h-screen pt-24 md:pt-28 overflow-hidden">
			{/* Background image fallback (visible until video is ready) */}
			<div className={`absolute inset-0 transition-opacity duration-700 ${isVideoReady ? "opacity-0" : "opacity-100"}`} aria-hidden={!isVideoReady}>
				<Image
					src="/camera.png"
					alt="Camera background"
					fill
					priority
					className="object-cover"
				/>
				{/* Light overlay for readability */}
				<div className="absolute inset-0 bg-white/50" />
			</div>

			{/* Background video */}
			<div className={`absolute inset-0 ${isVideoReady ? "opacity-100" : "opacity-0"} transition-opacity duration-700`}>
				<video
					className="w-full h-full object-cover"
					src="/Camera.mp4"
					autoPlay
					muted
					loop
					playsInline
					onCanPlayThrough={handleVideoReady}
					onLoadedData={handleVideoReady}
				/>
				<div className="absolute inset-0 bg-white/40" />
			</div>

			{/* Content */}
			<div className="relative z-10">
			<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between h-full px-4 md:px-8 pb-4 md:pb-0">
        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start max-w-full md:max-w-xl w-full text-center md:text-left">
          <h1 className="text-4xl md:text-5xl  font-extrabold text-black leading-tight mb-4 md:mb-6">
            Capture Every Moment. <br />
            Tell Every Story. <br />
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
		  Professional event photography and videography<br />
		  that bring your brand moments to life.<br />
		  From corporate events to product launches,<br />
		  we deliver stunning visuals that last beyond the day.
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
      </div>
			</div>
		</section>
	);
}


