import { Truck, Shield, Award, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Get your orders delivered within 24-48 hours across major cities",
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "100% secure checkout with multiple payment options and SSL encryption",
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    icon: Award,
    title: "Best Prices",
    description: "Competitive pricing with regular discounts and special offers",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Round-the-clock customer support to help you with any queries",
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose TechStore?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We're committed to providing the best shopping experience with premium products and exceptional service
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