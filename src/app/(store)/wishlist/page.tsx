"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart } from "lucide-react";

const initialWishlist = [
  {
    id: "1",
    name: "Red Roses Bouquet",
    price: 1299,
    image: "/collection/red-roses.png",
    unit: "1 bunch",
  },
  {
    id: "2",
    name: "Orchid Exotic Mix",
    price: 2499,
    image: "/images/orchid-mix.jpg",
    unit: "1 bunch",
  },
];

export default function WishlistPage() {
  const [items, setItems] = useState(initialWishlist);

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-[#f8f8f8] min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-10">
          <h1 className="text-xl lg:text-3xl font-serif text-gray-800 tracking-wide">
            My Wishlist
          </h1>
          <div className="w-12 h-[1px] bg-gray-400"></div>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-500 text-center">
            Your wishlist is empty.
          </p>
        ) : (
          <div className="space-y-6">

            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-6"
              >
                {/* LEFT */}
                <div className="flex items-center gap-5">

                  {/* Image */}
                  <img
                    src={item.image}
                    className="w-20 h-20 object-cover rounded-md"
                  />

                  {/* Info */}
                  <div>
                    <h2 className="text-gray-800 font-medium">
                      {item.name}
                    </h2>

                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      <span>₹{item.price}</span>

                      {item.unit && (
                        <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                          {item.unit}
                        </span>
                      )}
                    </div>
                  </div>

                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">

                  {/* Add to Cart */}
                  <Button
                    variant="premium"
                    className="rounded-full px-4 py-2 flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </Button>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-rose-500 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}