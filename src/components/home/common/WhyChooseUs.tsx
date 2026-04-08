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
        </div>
      ))}
    </section>
  );
}