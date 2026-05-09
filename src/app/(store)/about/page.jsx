import React from "react";
import { Flower, Truck, Gem, Heart } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="bg-[#f8f8f8] min-h-screen py-16">

            <div className="max-w-6xl mx-auto px-6 space-y-20">

                {/* 🌸 HERO */}
                <div className="text-center max-w-3xl mx-auto">

                    <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">
                        About Us
                    </p>

                    <h1 className="text-3xl lg:text-4xl font-serif text-gray-800 mb-4">
                        Bloom & Blossom
                    </h1>

                    <p className="text-gray-600 leading-relaxed">
                        Bringing nature’s beauty closer to you with fresh, handpicked flowers
                        crafted for every occasion — from everyday moments to life’s most
                        special celebrations.
                    </p>
                </div>

                {/* 🌼 IMAGE + STORY */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Image */}
                    <div>
                        <img
                            src="/hero-image.avif"
                            alt="Flower Shop"
                            className="w-full h-[420px] object-cover rounded-xl shadow-sm"
                        />
                    </div>

                    {/* Content */}
                    <div className="space-y-5">
                        <h2 className="text-2xl font-serif text-gray-800">
                            Our Story
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            Bloom & Blossom started with a simple vision — to deliver fresh,
                            premium flowers with elegance and care. Every bouquet is thoughtfully
                            arranged to reflect beauty, emotion, and craftsmanship.
                        </p>

                        <p className="text-gray-600 leading-relaxed">
                            From pooja flowers to luxury wedding arrangements, we bring together
                            tradition and modern design to create unforgettable floral experiences.
                        </p>
                    </div>
                </div>

                {/* 🌿 VALUES */}
                <div>

                    <div className="flex items-center gap-4 justify-center mb-10">
                        <h2 className="text-xl lg:text-2xl font-serif text-gray-800">
                            Why Choose Us
                        </h2>
                        <div className="w-12 h-[1px] bg-gray-400"></div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">

                        {/* 🌸 Fresh Flowers */}
                        <div className="space-y-3 group">
                            <div className="w-12 h-12 mx-auto bg-rose-100 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                                <Flower className="w-5 h-5 text-rose-500" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-800">
                                Fresh Flowers
                            </h3>
                            <p className="text-sm text-gray-500">
                                Handpicked daily for maximum freshness
                            </p>
                        </div>

                        {/* 🚚 Fast Delivery */}
                        <div className="space-y-3 group">
                            <div className="w-12 h-12 mx-auto bg-rose-100 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                                <Truck className="w-5 h-5 text-rose-500" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-800">
                                Fast Delivery
                            </h3>
                            <p className="text-sm text-gray-500">
                                Same-day delivery available
                            </p>
                        </div>

                        {/* 💎 Premium Quality */}
                        <div className="space-y-3 group">
                            <div className="w-12 h-12 mx-auto bg-rose-100 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                                <Gem className="w-5 h-5 text-rose-500" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-800">
                                Premium Quality
                            </h3>
                            <p className="text-sm text-gray-500">
                                Carefully curated floral arrangements
                            </p>
                        </div>

                        {/* ❤️ Crafted with Love */}
                        <div className="space-y-3 group">
                            <div className="w-12 h-12 mx-auto bg-rose-100 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                                <Heart className="w-5 h-5 text-rose-500" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-800">
                                Crafted with Love
                            </h3>
                            <p className="text-sm text-gray-500">
                                Designed for every special moment
                            </p>
                        </div>

                    </div>
                </div>

                {/* 🌺 CTA */}
                <div className="text-center">

                    <h2 className="text-2xl font-serif text-gray-800 mb-4">
                        Let Flowers Speak for You
                    </h2>

                    <p className="text-gray-600 mb-6">
                        Discover our beautiful collection and find the perfect arrangement.
                    </p>

                    <a
                        href="/products"
                        className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition"
                    >
                        Explore Collection
                        <span className="w-6 h-[1px] bg-white"></span>
                    </a>

                </div>

            </div>
        </div>
    );
}