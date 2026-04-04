import { Truck, Shield, Award, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Same-Day Delivery",
    description: "Fresh flowers delivered on the same day across major cities",
    color: "text-rose-600",
    bgColor: "bg-rose-100"
  },
  {
    icon: Shield,
    title: "Fresh Guarantee",
    description: "100% fresh flowers with a freshness guarantee or your money back",
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Handpicked flowers from the best growers with premium arrangements",
    color: "text-pink-600",
    bgColor: "bg-pink-100"
  },
  {
    icon: HeadphonesIcon,
    title: "Expert Florists",
    description: "Professional florists available 24/7 for custom arrangements and queries",
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose Bloom & Blossom?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {"We're committed to delivering the freshest flowers with premium quality and exceptional service"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <IconComponent className={`w-10 h-10 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}