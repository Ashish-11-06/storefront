<<<<<<< HEAD
export default function WhyChooseUs() {
  const features = [
    { title: "Free Delivery", desc: "100% Free daily delivery", icon: "🚚", color: "from-blue-400 to-blue-600" },
    { title: "Cancel Anytime", desc: "No questions asked", icon: "✋", color: "from-purple-400 to-purple-600" },
    { title: "Farm Fresh", desc: "Direct from local growers", icon: "🌱", color: "from-green-400 to-green-600" },
    { title: "Premium Quality", desc: "Handpicked daily", icon: "✨", color: "from-[#FF9933] to-[#F59E0B]" }
  ];

  return (
    <section className="relative -mt-16 mx-4 md:mx-12 px-2 bg-white/90 backdrop-blur-2xl rounded-3xl p-6 lg:px-12 lg:py-8 flex flex-col md:flex-row justify-between items-center gap-8 shadow-[0_20px_50px_rgb(0,0,0,0.08)] border border-gray-100 z-20">
      {features.map((feature, i) => (
        <div key={i} className="flex items-center gap-5 w-full md:w-auto p-3 hover:bg-gray-50/80 rounded-2xl transition-all cursor-default group">
          <div className={`w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br ${feature.color} text-white text-2xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
            {feature.icon}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg tracking-tight">{feature.title}</h3>
            <p className="text-sm text-gray-500 font-medium">{feature.desc}</p>
          </div>
=======
import { Truck, Shield, Award, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Same-Day Delivery",
    description: "Fresh flowers delivered on the same day across major cities",
  },
  {
    icon: Shield,
    title: "Fresh Guarantee",
    description: "100% fresh flowers with a freshness guarantee or your money back",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Handpicked flowers from the best growers with premium arrangements",
  },
  {
    icon: HeadphonesIcon,
    title: "Expert Florists",
    description: "Professional florists available 24/7 for custom arrangements and queries",
  }
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 bg-[#f8f8f8] overflow-hidden">

      {/* 🌸 Soft Gradient Blobs */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-pink-200 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-rose-200 opacity-20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">
            Why Choose Us
          </p>

          <h2 className="text-3xl lg:text-4xl font-serif text-gray-800">
            Bloom & Blossom Experience
          </h2>

          <p className="text-gray-600 mt-4">
            We deliver more than flowers — we deliver emotions with premium quality and care.
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => {
            const IconComponent = feature.icon;

            return (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 text-center"
              >

                {/* ICON */}
                <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-rose-100 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <IconComponent className="w-7 h-7 text-rose-500" />
                </div>

                {/* TITLE */}
                <h3 className="text-lg font-medium text-gray-800 mb-2 group-hover:text-black transition">
                  {feature.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

              </div>
            );
          })}
>>>>>>> main
        </div>
      ))}
    </section>
  );
}