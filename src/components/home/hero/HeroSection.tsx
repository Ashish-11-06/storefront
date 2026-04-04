import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-pink-600 via-rose-500 to-pink-700 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-gray-300">Trusted by 10,000+ customers</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Celebrate Every Moment
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-100">
                {" "}with Flowers
              </span>
            </h1>

            <p className="text-xl text-gray-100 mb-8 max-w-lg">
              Discover exotic flowers, pooja flowers, festive torans, and custom floral arrangements for all occasions.
              Fresh flowers delivered with love.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/products">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-3">
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-3">
                View Categories
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-200">1000+</div>
                <div className="text-gray-100">Flower Types</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-100">25K+</div>
                <div className="text-gray-100">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-200">4.8★</div>
                <div className="text-gray-100">Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <div className="aspect-square bg-gradient-to-br from-rose-400/30 to-pink-400/30 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-4xl">🌸</span>
                  </div>
                  <p className="text-gray-100">Fresh Floral Arrangements</p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-amber-300 text-black px-4 py-2 rounded-full font-semibold shadow-lg">
              🚚 Fresh Delivery
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-400 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
              💐 100% Fresh
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}