import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Gift, Bell, Lock } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="relative py-16 bg-[#f8f8f8]">

      <div className="max-w-4xl mx-auto px-6 text-center">

        {/* SMALL LABEL (match SEO tone) */}
        <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">
          Stay Updated
        </p>

        {/* HEADING (less aggressive) */}
        <h2 className="text-2xl lg:text-3xl font-serif text-gray-800 mb-3">
          Get Fresh Flower Updates
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-600 text-sm mb-8 max-w-2xl mx-auto leading-relaxed">
          Be the first to know about new arrivals, exclusive offers, and seasonal collections.
          Enjoy <span className="text-rose-500 font-medium">15% off</span> your first order.
        </p>

        {/* INPUT + CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center max-w-lg mx-auto mb-8">

          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-full px-5 py-2.5 border border-gray-200 focus:border-rose-300 focus:ring-0 bg-white"
          />

          <Button
            variant="premium"
            className="rounded-full px-5 py-2.5 font-medium"
          >
            Subscribe
          </Button>
        </div>

        {/* TRUST POINTS (lighter + inline) */}
        <div className="flex flex-wrap justify-center gap-5 text-xs text-gray-500">

          <div className="flex items-center gap-1.5">
            <Gift className="w-3.5 h-3.5 text-rose-400" />
            <span>Exclusive deals</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-rose-400" />
            <span>New arrivals</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-rose-400" />
            <span>No spam</span>
          </div>

        </div>
      </div>
    </section>
  );
}