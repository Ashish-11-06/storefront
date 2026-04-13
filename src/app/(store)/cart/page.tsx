"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const initialCartItems = [
  {
    id: "1",
    name: "Rose Bouquet - Premium",
    price: 220,
    quantity: 1,
    image: "/collection/red-roses.png",
    unit: "1 bunch",
  },
  {
    id: "2",
    name: "Rose Bouquet - Premium",
    price: 220,
    quantity: 1,
    image: "/collection/red-roses.png",
    unit: "1 bunch",
  },
];

export default function CartPage() {
  const [items, setItems] = useState(initialCartItems);

  // 🔼 Increase
  const increase = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // 🔽 Decrease
  const decrease = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item
      )
    );
  };

  // ❌ Remove item
  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 💰 Totals
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = items.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-[#f8f8f8] min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-10">
          <h1 className="text-xl lg:text-3xl font-serif text-gray-800 tracking-wide">
            Your Cart
          </h1>
          <div className="w-12 h-[1px] bg-gray-400"></div>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">

            {/* 🛒 ITEMS */}
            <div className="lg:col-span-2 space-y-6">

              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-6"
                >
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
                  <div className="flex items-center gap-6">

                    {/* 🔢 Quantity Selector */}
                    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">

                      <button
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 active:scale-95 transition"
                        onClick={() => decrease(item.id)}
                      >
                        −
                      </button>

                      <span className="px-4 text-sm font-medium text-gray-800">
                        {item.quantity}
                      </span>

                      <button
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 active:scale-95 transition"
                        onClick={() => increase(item.id)}
                      >
                        +
                      </button>

                    </div>

                    {/* 🗑 Remove */}
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

            {/* 💳 TOTAL */}
            <div className="border border-gray-200 rounded-xl p-6 bg-white/60 backdrop-blur-sm h-fit">

              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-lg font-serif text-gray-800">
                  Cart Totals
                </h2>
                <div className="w-10 h-[1px] bg-gray-400"></div>
              </div>

              <div className="space-y-4 text-sm">

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>₹{shipping}</span>
                </div>

                <div className="flex justify-between font-medium text-gray-900 border-t pt-4">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

              </div>

              <Button
                variant="premium"
                className="w-full mt-6 rounded-full py-3"
              >
                Proceed to Checkout
              </Button>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}