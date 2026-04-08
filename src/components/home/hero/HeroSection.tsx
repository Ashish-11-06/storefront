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
          </div>

        </div>
      </div>
    </section>
  );
}