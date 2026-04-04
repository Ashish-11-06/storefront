import { Flower, Leaf, Gift, Heart, Sparkles, Palette } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Exotic Flowers",
    icon: Flower,
    description: "Rare & exotic flowers from around the world",
    color: "from-rose-500 to-rose-600",
    href: "/products?category=exotic"
  },
  {
    name: "Pooja Flowers",
    icon: Leaf,
    description: "Traditional flowers for spiritual ceremonies",
    color: "from-orange-500 to-orange-600",
    href: "/products?category=pooja"
  },
  {
    name: "Festive Torans",
    icon: Sparkles,
    description: "Decorative floral torans for celebrations",
    color: "from-yellow-500 to-yellow-600",
    href: "/products?category=festive-torans"
  },
  {
    name: "Pooja Garlands",
    icon: Heart,
    description: "Sacred garlands for prayers & rituals",
    color: "from-pink-500 to-pink-600",
    href: "/products?category=pooja-garlands"
  },
  {
    name: "Wedding Specials",
    icon: Gift,
    description: "Bridal & ceremonial floral arrangements",
    color: "from-red-500 to-red-600",
    href: "/products?category=wedding"
  },
  {
    name: "Customized Orders",
    icon: Palette,
    description: "Create your own floral masterpiece",
    color: "from-purple-500 to-purple-600",
    href: "/products?category=customized"
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our collection of fresh flowers, festive arrangements, and customized creations for every special occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link key={category.name} href={category.href}>
                <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center text-primary font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                    Shop Now →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}