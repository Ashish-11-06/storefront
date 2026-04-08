import { getProductBySlug } from "@/lib/getProductBySlug";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: `Buy ${product.name} at best price ₹${product.price}`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return notFound();

  return (
    <div className="bg-[#f8f8f8] min-h-screen py-14">

      <div className="max-w-7xl mx-auto px-6 space-y-20">

        {/* ================= TOP SECTION ================= */}
        <div className="grid lg:grid-cols-2 gap-14">

          {/* 🌸 LEFT IMAGES */}
          <div className="flex gap-4">

            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4].map((_, i) => (
                <img
                  key={i}
                  src={product.image}
                  className="w-16 h-16 object-cover rounded-md border border-gray-200 cursor-pointer hover:opacity-80 transition"
                />
              ))}
            </div>

            {/* Main */}
            <div className="flex-1">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[520px] object-cover rounded-xl shadow-sm"
              />
            </div>
          </div>

          {/* 🌼 RIGHT DETAILS */}
          <div className="space-y-6">

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-serif text-gray-800 leading-snug">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 text-sm">
              <div className="flex text-rose-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-gray-500">(120 reviews)</span>
            </div>

            {/* Price */}
            <div className="text-2xl font-semibold text-gray-900">
              ₹{product.price.toLocaleString()}
            </div>

            {/* Unit */}
            {product.unit && (
              <span className="inline-block text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                {product.unit}
              </span>
            )}

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              Fresh and handpicked {product.name.toLowerCase()} crafted to bring
              elegance, fragrance, and joy to every occasion.
            </p>

            {/* CTA */}
            <Button
              variant="premium"
              className="rounded-full px-8 py-3 text-sm font-medium"
            >
              Add to Cart
            </Button>

            {/* Trust (UPGRADED) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t text-sm">

              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-rose-400" />
                <span className="text-gray-600">Same-day delivery</span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-rose-400" />
                <span className="text-gray-600">Freshness guarantee</span>
              </div>

              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-rose-400" />
                <span className="text-gray-600">Easy returns</span>
              </div>

            </div>

          </div>
        </div>

        {/* ================= DESCRIPTION ================= */}
        <div>

          {/* Tabs */}
          <div className="flex items-center gap-8 border-b text-sm">
            <button className="pb-3 border-b-2 border-black font-medium">
              Description
            </button>
            <button className="pb-3 text-gray-500 hover:text-black transition">
              Reviews (120)
            </button>
          </div>

          {/* Content */}
          <div className="mt-6 border border-gray-200 rounded-xl p-6 bg-white/60 backdrop-blur-sm">
            <p className="text-gray-600 leading-relaxed mb-4">
              Fresh and handpicked {product.name.toLowerCase()} crafted with care.
              Perfect for gifting, celebrations, pooja rituals, and special occasions.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our flowers are sourced from premium farms ensuring freshness,
              fragrance, and long-lasting beauty for every arrangement.
            </p>
          </div>
        </div>

        {/* ================= RELATED ================= */}
        <div>

          {/* Heading */}
          <div className="flex items-center gap-4 justify-center mb-12">
            <h2 className="text-xl lg:text-2xl font-serif text-gray-800 tracking-wide">
              Related Products
            </h2>
            <div className="w-12 h-[1px] bg-gray-400"></div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">

            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="group">

                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                <h3 className="text-sm mt-3 text-gray-700 truncate group-hover:text-black transition">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-900 font-medium">
                  ₹{product.price}
                </p>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}