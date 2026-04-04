import Link from "next/link";
import { Product } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden">
      <CardContent className="p-0">
        <Link href={`/products/${product.slug}`}>
          <div className="relative overflow-hidden">
            {/* Product Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <span className="text-4xl">
                {product.name.includes('iPhone') && '📱'}
                {product.name.includes('Samsung') && '📱'}
                {product.name.includes('MacBook') && '💻'}
                {product.name.includes('Headphones') && '🎧'}
              </span>
            </div>

            {/* Wishlist Button */}
            <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
              <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
            </button>

            {/* Rating Badge */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">4.5</span>
            </div>
          </div>

          <div className="p-4">
            <h2 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
              <span className="text-sm text-gray-500 line-through">₹{(product.price * 1.2).toLocaleString()}</span>
              <span className="text-sm text-green-600 font-medium">17% off</span>
            </div>

            <div className="flex items-center gap-1 mb-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="text-xs text-gray-600">(124 reviews)</span>
            </div>
          </div>
        </Link>

        <div className="px-4 pb-4">
          <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}