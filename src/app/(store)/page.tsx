import Link from "next/link";
import SeoContent from "@/components/common/SeoContent";
import CategoriesSection from "@/components/home/categories/CategoriesSection";
import Newsletter from "@/components/home/common/Newsletter";
import WhyChooseUs from "@/components/home/common/WhyChooseUs";
import HeroSection from "@/components/home/hero/HeroSection";
import FeaturedProducts from "@/components/home/products/FeaturedProducts";
import Header from "@/components/layout/Header";

export const metadata = {
  title: "Rajesh Flowers | Premium Floral Delivery",
  description: "Experience the vibrant spirit of traditional Indian florals.",
};

export default function HomePage() {
  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#FAFAF9] font-sans text-gray-800 selection:bg-[#F59E0B] selection:text-white overflow-x-hidden">
      <Header />
      <main className="max-w-7xl mx-auto pb-20">
        <HeroSection />
        <WhyChooseUs />
        <CategoriesSection />
        <FeaturedProducts />
        <SeoContent />
        <Newsletter />
      </main>

      {/* Elegant Footer */}
      <footer className="mt-20 bg-[#1C1917] text-white pt-24 pb-10 rounded-t-[3rem] md:rounded-t-[4rem] px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FF9933] via-[#F59E0B] to-[#BE123C]"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          <div className="md:col-span-5 text-center md:text-left">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF9933] to-[#F59E0B] flex items-center justify-center font-black text-white text-2xl shadow-[0_0_30px_rgba(245,158,11,0.3)] mb-6 mx-auto md:mx-0 border border-white/20">
              RF
            </div>
            <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">Rajesh <span className="text-[#FF9933]">Flowers</span></h2>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed mb-6 mx-auto md:mx-0">
              Elevating the art of devotion and celebration. Delivering handpicked, fresh flowers every single morning right to your doorstep.
            </p>
          </div>

          <div className="md:col-span-4 text-center md:text-left md:pl-10">
            <h3 className="font-bold text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-[#F59E0B] transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-[#F59E0B] transition-colors">Contact Support</Link></li>
              <li><Link href="#" className="hover:text-[#F59E0B] transition-colors">Refund Policy</Link></li>
              <li><Link href="#" className="hover:text-[#F59E0B] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 flex flex-col items-center md:items-start lg:items-end w-full">
            <h3 className="font-bold text-white text-lg mb-4 text-center lg:text-right">Follow Us</h3>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#F59E0B] hover:text-white hover:-translate-y-1 transition-all cursor-pointer">📸</div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#F59E0B] hover:text-white hover:-translate-y-1 transition-all cursor-pointer">🐦</div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#F59E0B] hover:text-white hover:-translate-y-1 transition-all cursor-pointer">👔</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500 tracking-wide">
          <p>© {new Date().getFullYear()} Rajesh Flowers. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-1">Crafted with <span className="text-[#BE123C]">♥</span> in India</span>
          </div>
        </div>
      </footer>
    </div>
=======
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <SeoContent />
      <Newsletter />
    </>
>>>>>>> main
  );
}