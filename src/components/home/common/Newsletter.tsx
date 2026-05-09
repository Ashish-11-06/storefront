<<<<<<< HEAD
export default function Newsletter() {
  return (
    <section className="mt-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="relative bg-gradient-to-br from-[#FFFBF0] to-white border border-[#F59E0B]/20 rounded-[3rem] p-10 md:p-16 text-center shadow-[0_20px_50px_rgba(245,158,11,0.05)] overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FF9933]/20 to-[#F59E0B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 cursor-default pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#BE123C]/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 cursor-default pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-[#F59E0B] font-bold tracking-widest uppercase text-sm mb-4 block">Newsletter</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Get Fresh Blooms & Offers
          </h2>
          <p className="text-gray-500 text-lg mb-10">
            Subscribe to our newsletter to receive the latest updates on seasonal flowers, exclusive discounts, and floral arrangement tips directly to your inbox.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white px-6 py-4 rounded-full border border-gray-200 outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all text-gray-700 shadow-sm"
              required
            />
            <button
              type="submit"
              className="bg-[#F59E0B] text-white hover:bg-[#FF9933] font-bold py-4 px-10 rounded-full transition-all duration-300 active:scale-95 shadow-lg shadow-[#F59E0B]/30 whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>
=======
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

>>>>>>> main
        </div>
      </div>
    </section>
  );
}