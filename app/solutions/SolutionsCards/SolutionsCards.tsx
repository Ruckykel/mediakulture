export default function SolutionsCards() {
  const solutions = [
    {
      title: "For Brands",
      description: "Manage multiple channels, teams, and campaigns at scale.",
      iconBg: "bg-[#20408B]",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h6v2H7v-2z"/>
        </svg>
      )
    },
    {
      title: "For Creators",
      description: "Generate, post, and track content across all platforms, effortlessly.",
      iconBg: "bg-[#FBC75E]",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      title: "For Agencies",
      description: "Onboard clients, assign roles, collaborate in one central workspace.",
      iconBg: "bg-[#4535AF]",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-4.7 6.3c-.37.5-.58 1.1-.58 1.7V20c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2z"/>
        </svg>
      )
    },
    {
      title: "For Teams",
      description: "Coordinate strategies, feedback, and publishing seamlessly.",
      iconBg: "bg-[#FF6B35]",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    }
  ];

  return (
    <section className="w-full bg-white pt-20 pb-0 md:pb-20">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#20408B] text-sm font-bold uppercase tracking-wide mb-4">
            Solutions
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">
            Designed for Every Digital Role
          </h2>
        </div>

        {/* Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-gray-100 border border-gray-200 rounded-xl p-8 hover:scale-105 transition-all duration-300">
              <div className={`w-12 h-12 ${solution.iconBg} rounded-lg flex items-center justify-center mb-6`}>
                {solution.icon}
              </div>
              <h3 className="text-lg font-bold text-black mb-4">
                {solution.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 