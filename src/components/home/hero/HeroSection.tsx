<<<<<<< HEAD
export default function HeroSection() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 w-full mt-6 group">
      <div className="relative w-full h-[85vh] min-h-[600px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.15)] flex items-center bg-gray-900 group">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-out group-hover:scale-110"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=2000')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

        <div className="relative z-10 px-8 md:px-16 w-full max-w-3xl">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F59E0B] text-sm font-semibold tracking-widest uppercase mb-6 shadow-xl">
            Est. 2022 • Premium Floral Delivery
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-[1.05] drop-shadow-2xl">
            Rajesh <span className="text-[#FF9933] inline-block transform hover:rotate-2 transition-transform duration-300">Flowers</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light mb-10 max-w-xl leading-relaxed drop-shadow-md">
            Experience the vibrant spirit of traditional Indian florals. Handpicked, pristine, and delivered fresh to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-gradient-to-r from-[#FF9933] to-[#F59E0B] text-white hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95 font-bold py-4 px-10 rounded-full text-lg tracking-wide border-0">
              Start Free Trial
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20 transition-all duration-300 font-bold py-4 px-10 rounded-full text-lg tracking-wide">
              Explore Collections
            </button>
=======
"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#f8f8f8] min-h-[80vh] flex items-center">

      {/* 🌸 Soft Pink Gradient Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-pink-400 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-80px] w-[350px] h-[350px] bg-rose-600 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute top-[40%] right-[10%] w-[200px] h-[200px] bg-pink-100 opacity-20 rounded-full blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-8 py-16 w-full relative z-10">
        <div className="grid lg:grid-cols-2 items-center gap-10">

          {/* LEFT CONTENT */}
          <div className="space-y-8">

            {/* Tagline */}
            <div className="flex items-center gap-3 text-xs tracking-[0.3em] text-gray-500 uppercase">
              <div className="w-10 h-[1px] bg-gray-400"></div>
              <span>Trusted by 10,000+ customers</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl lg:text-6xl font-serif text-gray-800 leading-tight">
              Celebrate Every Moment
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-amber-200">
                with Flowers
              </span>
            </h1>

            {/* CTA */}
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 text-sm tracking-wider text-white bg-black px-6 py-3 rounded-full hover:bg-gray-900 transition-all duration-300 shadow-md"
            >
              SHOP NOW
              <span className="w-6 h-[1px] bg-white group-hover:w-10 transition-all duration-300"></span>
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center">

            {/* Glow behind image */}
            <div className="absolute w-[80%] h-[80%] bg-pink-200 opacity-20 blur-3xl rounded-full"></div>

            <img
              src="/hero-image.avif"
              alt="Flowers"
              className="relative z-10 w-full max-w-xl object-cover rounded-2xl shadow-xl"
            />
>>>>>>> main
          </div>

        </div>
      </div>
    </section>
  );
}