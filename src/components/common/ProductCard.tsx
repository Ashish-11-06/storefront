"use client";

import Link from "next/link";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Heart, Star, ShoppingCart } from "lucide-react";
interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="group relative rounded-lg bg-white/70 backdrop-blur-md border border-white/40 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">

      {/* 🌸 Soft Gradient Glow */}
      {/* <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-br from-pink-300/10 to-rose-300/20"></div> */}

      <Link href={`/products/${product.slug}`}>

        {/* IMAGE */}
        <div className="relative overflow-hidden rounded-lg">

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110 rounded-b-lg"
          />

          {/* Wishlist */}
          <button className="absolute top-3 right-3 p-2 bg-white/70 backdrop-blur-md rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition hover:bg-white">
            <Heart className="w-4 h-4 text-gray-600 hover:text-rose-500 transition" />
          </button>

          {/* Rating */}
          {/* <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md rounded-full px-2 py-1 flex items-center gap-1 shadow-sm">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-gray-700">4.5</span>
          </div> */}
        </div>

        {/* CONTENT */}
        <div className="p-5 space-y-2 relative z-10">

          {/* Title */}
          <h2 className="font-medium text-gray-800 text-lg leading-snug truncate group-hover:text-black transition">
            {product.name}
          </h2>

          {/* Unit (FIXED POSITION ✅) */}
          {product.unit && (
            <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {product.unit}
            </span>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ₹{(product.price * 1.2).toLocaleString()}
            </span>
            <span className="text-xs text-green-600 font-medium">
              17% off
            </span>
          </div>
        </div>
      </Link>

      {/* CTA */}
      <div className="px-5 pb-5">
        <Button
          variant="premium"
          className="w-full rounded-full gap-2 font-medium tracking-wide"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}