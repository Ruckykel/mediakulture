import Image from "next/image";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Say goodbye to writer's block.",
      description: "Generate fresh, on-brand content ideas instantly with intelligent suggestions tailored to your audience and tone.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      bgColor: "bg-[#1e40af]"
    },
    {
      title: "Understand what's working, instantly.",
      description: "Track performance in real time and make smarter content decisions with visual insights and actionable data.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-4.7 6.3c-.37.5-.58 1.1-.58 1.7V20c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2z"/>
        </svg>
      ),
      bgColor: "bg-[#FBC75E]"
    },
    {
      title: "Manage brands and teams smoothly.",
      description: "Assign tasks, approve content, and work together efficiently—whether you're a solo creator or part of a large agency.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      bgColor: "bg-[#7c3aed]"
    },
    {
      title: "Enterprise-ready. Always reliable.",
      description: "Your data stays protected with advanced security protocols, while the platform scales effortlessly as your business grows.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
        </svg>
      ),
      bgColor: "bg-[#f97316]"
    }
  ];

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Section - Features */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <p className="text-[#20408B] text-sm font-bold uppercase tracking-wide">
                WHY CHOOSE US
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight mb-4">
                Why Top Brands & Creators Trust MediaKulture
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                From strategy to execution, MediaKulture empowers digital teams with the tools they need to create, collaborate, and grow – all in one seamless platform.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${feature.bgColor}`}>
                    {feature.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-black">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="relative">
            <Image
              src="/WhyChooseUs.png"
              alt="Why Choose MediaKulture"
              width={600}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
} 