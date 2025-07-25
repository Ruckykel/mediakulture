"use client";

import { useState } from "react";
import TrustedBy from "../landing/TrustedBy/TrustedBy";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-32">
          <div className="space-y-16">
            {/* Top Section - Get Started */}
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-600">Get Started</p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
                  Get in touch with us.
                  <br />
                  We&apos;re here to assist you.
                </h1>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Middle Section - Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name, Email, Phone on one line */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-gray-300 py-3 px-0 bg-transparent focus:border-black outline-none transition-colors text-base"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-gray-300 py-3 px-0 bg-transparent focus:border-black outline-none transition-colors text-base"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number (optional)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-gray-300 py-3 px-0 bg-transparent focus:border-black outline-none transition-colors text-base"
                  />
                </div>
              </div>

              {/* Message on separate line */}
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full border-b-2 border-gray-300 py-3 px-0 bg-transparent focus:border-black outline-none transition-colors text-base resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-[#20408B] hover:bg-[#16306a] text-white px-8 py-3 rounded-full font-medium transition-all hover:scale-105 flex items-center gap-2"
              >
                Leave us a Message →
              </button>
            </form>

            {/* Bottom Section - Contact Info */}
            <div className="flex flex-col md:flex-row items-start justify-between gap-8">
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-600">Contact Info</p>
                <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">
                  We are always
                  <br />
                  happy to assist you
                </h2>
              </div>

              {/* Email Column */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-600">Email Address</p>
                <div className="w-8 h-0.5 bg-black"></div>
                <p className="text-lg font-bold text-black">help@info.com</p>
                <p className="text-sm text-gray-600">Monday - Friday 6 am to 8 pm EST</p>
              </div>

              {/* Phone Column */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-600">Number</p>
                <div className="w-8 h-0.5 bg-black"></div>
                <p className="text-lg font-bold text-black">(808) 998-34256</p>
                <p className="text-sm text-gray-600">Monday - Friday 6 am to 8 pm EST</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TrustedBy Section */}
      <TrustedBy />
    </>
  );
} 