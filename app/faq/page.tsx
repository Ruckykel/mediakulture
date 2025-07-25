"use client";

import Image from "next/image";
import { useState } from "react";

const faqs = [
  {
    question: "What platforms does MediaKulture support?",
    answer:
      "Instagram, Facebook, TikTok, LinkedIn, YouTube, Twitter/X, and more.",
  },
  {
    question: "How does the AI content generator work?",
    answer:
      "Just describe your post idea, and the AI suggests complete posts with captions, hashtags, and media prompts.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, all new users get a 7-day free trial with no credit card required.",
  },
  {
    question: "Can I collaborate with my team?",
    answer:
      "Yes, all new users get a 7-day free trial with no credit card required.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use end-to-end encryption and follow best-in-class data protection standards.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative min-h-screen flex items-end justify-center bg-[#f6faff] overflow-hidden">
      {/* Background image */}
      <Image
        src="/FAQBackground.png"
        alt="FAQ Background"
        fill
        className="object-cover object-center pointer-events-none select-none z-0"
        quality={90}
        priority
      />
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between px-4 md:px-8 gap-8 min-h-[600px]">
        {/* Woman image */}
        <div className="flex-1 flex justify-center md:justify-start relative">
          <div className="w-full h-full flex items-end">
            <div className="relative w-auto h-[340px] md:w-[350px] md:h-[500px] lg:w-[350px] lg:h-[500px] flex items-end">
              <Image
                src="/FAQWoman.png"
                alt="FAQ Woman"
                fill
                className="object-contain md:absolute md:bottom-0 md:left-0"
                priority
              />
            </div>
          </div>
        </div>
        {/* FAQ Card */}
        <div className="flex-1 max-w-2xl w-full bg-[#20408B] rounded-2xl shadow-xl py-10 px-4 md:px-10 text-white self-end flex flex-col justify-center my-12 md:my-20" style={{minHeight: 320, maxHeight: 500}}>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-5">Do you have questions?</h1>
          <div className="divide-y divide-white/20 text-xs md:text-sm">
            {faqs.map((faq, idx) => (
              <div key={faq.question}>
                <button
                  className="w-full flex justify-between items-center py-3 text-left focus:outline-none"
                  onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)}
                  aria-expanded={openIndex === idx}
                >
                  <span className="font-semibold text-xs md:text-sm">
                    {faq.question}
                  </span>
                  <span className="ml-4 text-base md:text-lg transition-transform duration-200" style={{ transform: openIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    &#x25BC;
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 text-xs md:text-sm text-white/90 ${openIndex === idx ? 'max-h-32 py-1' : 'max-h-0 py-0'}`}
                  style={{}}
                >
                  {openIndex === idx && <div>{faq.answer}</div>}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between mt-5 gap-2">
            <span className="text-white/80 text-xs md:text-sm">My question is not here. </span>
            <button className="flex items-center gap-2 bg-white text-[#20408B] font-medium px-8 py-3 rounded-full shadow-sm hover:bg-gray-100 transition-colors text-base">
              CONNECT US
              <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 