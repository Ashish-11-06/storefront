import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, User, Menu } from "lucide-react";

export default function Header() {
  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#1C1917] text-[#FAFAF9] text-center py-2.5 text-xs sm:text-sm font-semibold tracking-widest uppercase">
        Delivering fresh blooms daily across Pune
      </div>

      {/* Floating Navbar */}
      <div className="sticky top-6 z-50 px-4 md:px-8 flex justify-center w-full mt-4">
        <nav className="w-full max-w-6xl bg-white/80 backdrop-blur-xl rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 flex items-center justify-between px-4 py-3 transition-all duration-300">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link href="/" className="relative group cursor-pointer pl-1">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF9933] to-[#F59E0B] rounded-full blur-md opacity-50 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-[#FF9933] to-[#F59E0B] flex items-center justify-center font-black text-white text-lg shadow-sm border border-white/20">
                RF
              </div>
            </Link>
            {/* Nav Links */}
            <div className="hidden lg:flex gap-8 ml-6 font-medium text-gray-600 text-sm tracking-wide">
              <Link href="#" className="hover:text-[#F59E0B] transition-colors">Puja Flowers Subscription</Link>
              <Link href="#" className="hover:text-[#F59E0B] transition-colors">Exotic Flowers</Link>
              <Link href="#" className="hover:text-[#F59E0B] transition-colors">Events & Weddings</Link>
              <Link href="#" className="hover:text-[#F59E0B] transition-colors">Store</Link>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pr-1">
            <div className="hidden md:flex bg-gray-50/80 rounded-full px-4 py-2 items-center border border-gray-200/60 focus-within:ring-2 focus-within:ring-[#F59E0B]/40 focus-within:bg-white transition-all">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input type="text" placeholder="Search flowers..." className="bg-transparent outline-none text-sm w-32 placeholder:text-gray-400" />
            </div>
            <Link href="/login" className="hidden sm:block text-sm font-semibold text-gray-700 hover:text-[#F59E0B] transition-colors">Log In</Link>
            <div className="relative cursor-pointer bg-[#FFFBF0] p-2.5 rounded-full text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white transition-all duration-300 shadow-sm border border-[#F59E0B]/20 overflow-hidden group">
              <ShoppingCart className="w-5 h-5 relative z-10 inline-block" />
              <span className="absolute top-0 right-0 bg-[#BE123C] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold z-20 border border-white">0</span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}