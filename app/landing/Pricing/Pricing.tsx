export default function Pricing() {
  const plans = [
    {
      name: "FREE",
      description: "Organize across all apps by hand",
      price: "0",
      features: [
        "Pricing Feature",
        "Pricing Feature", 
        "Pricing Feature",
        "Pricing Feature",
        "Pricing Feature"
      ],
      isHighlighted: false,
      buttonColor: "bg-orange-500 hover:bg-orange-600",
      buttonTextColor: "text-white"
    },
    {
      name: "STANDARD",
      description: "Organize across all apps by hand",
      price: "10",
      features: [
        "Pricing Feature",
        "Pricing Feature",
        "Pricing Feature", 
        "Pricing Feature",
        "Pricing Feature"
      ],
      isHighlighted: true,
      buttonColor: "bg-white hover:bg-gray-100",
      buttonTextColor: "text-[#20408B]"
    },
    {
      name: "BUSINESS",
      description: "Organize across all apps by hand",
      price: "99",
      features: [
        "Pricing Feature",
        "Pricing Feature",
        "Pricing Feature",
        "Pricing Feature",
        "Pricing Feature"
      ],
      isHighlighted: false,
      buttonColor: "bg-orange-500 hover:bg-orange-600",
      buttonTextColor: "text-white"
    }
  ];

  return (
    <section id="pricing" className="w-full bg-white pt-0 md:pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#20408B] text-sm font-bold uppercase tracking-wide mb-4">
            PRICING
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">
            Flexible Plans That Grow with You
          </h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`rounded-2xl p-8 text-center ${
                plan.isHighlighted 
                  ? 'bg-[#20408B] text-white' 
                  : 'bg-gray-50 text-black'
              }`}
            >
              {/* Plan Name */}
              <h3 className={`text-xl font-bold mb-2 ${
                plan.isHighlighted ? 'text-white' : 'text-black'
              }`}>
                {plan.name}
              </h3>

              {/* Description */}
              <p className={`text-sm mb-6 ${
                plan.isHighlighted ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <span className={`text-4xl font-bold ${
                  plan.isHighlighted ? 'text-white' : 'text-black'
                }`}>
                  ${plan.price}
                </span>
                <span className={`text-sm ml-2 ${
                  plan.isHighlighted ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Per Month
                </span>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div 
                    key={featureIndex}
                    className={`text-sm ${
                      plan.isHighlighted ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {feature}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button 
                className={`w-full py-3 px-6 rounded-full font-medium transition-colors duration-200 ${plan.buttonColor} ${plan.buttonTextColor}`}
              >
                Order Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 