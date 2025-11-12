import React from 'react'

const pricingPlans = [
    {
      name: "Basic",
      price: "$9",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      popular: false,
    },
    {
      name: "Pro",
      price: "$29",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      features: [
        "Feature 1",
        "Feature 2",
        "Feature 3",
        "Feature 4",
        "Feature 5",
      ],
      popular: false,
    },
  ];
const Pricing = () => {
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10">Pricing Plans</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`p-6 rounded-lg shadow-md bg-white border ${
              plan.popular ? "border-blue-500 scale-105" : ""
            } transform transition duration-300`}
          >
            {plan.popular && (
              <div className="text-xs uppercase bg-blue-500 text-white px-2 py-1 rounded-full inline-block mb-4">
                Most Popular
              </div>
            )}
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-3xl font-bold mb-4">{plan.price}/mo</p>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="text-gray-600">
                  • {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-2 rounded ${
                plan.popular
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              } transition`}
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Pricing
