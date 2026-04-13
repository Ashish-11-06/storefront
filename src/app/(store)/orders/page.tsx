"use client";

import { Button } from "@/components/ui/button";

const orders = [
  {
    id: "ORD12345",
    date: "12 April 2026",
    status: "Delivered",
    total: 1299,
    items: [
      {
        name: "Red Roses Bouquet",
        image: "/collection/red-roses.png",
        price: 1299,
      },
    ],
  },
  {
    id: "ORD67890",
    date: "10 April 2026",
    status: "Processing",
    total: 2499,
    items: [
      {
        name: "Orchid Exotic Mix",
        image: "/images/orchid-mix.jpg",
        price: 2499,
      },
    ],
  },
];

export default function OrdersPage() {
  return (
    <div className="bg-[#f8f8f8] min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-10">
          <h1 className="text-xl lg:text-3xl font-[var(--font-heading)] text-gray-800 tracking-wide">
            My Orders
          </h1>
          <div className="w-12 h-[1px] bg-gray-400"></div>
        </div>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">
            You have no orders yet.
          </p>
        ) : (
          <div className="space-y-8">

            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl p-6 shadow-sm border"
              >
                {/* TOP */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5 gap-3">

                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID: <span className="font-medium text-gray-800">{order.id}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Date: {order.date}
                    </p>
                  </div>

                  {/* STATUS */}
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Processing"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>

                </div>

                {/* ITEMS */}
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div className="flex items-center gap-4">

                        <img
                          src={item.image}
                          className="w-16 h-16 object-cover rounded-md"
                        />

                        <div>
                          <h2 className="text-gray-800 font-medium">
                            {item.name}
                          </h2>
                          <p className="text-sm text-gray-500">
                            ₹{item.price}
                          </p>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>

                {/* BOTTOM */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-5 gap-3">

                  <p className="font-semibold text-gray-800">
                    Total: ₹{order.total}
                  </p>

                  <div className="flex gap-3">

                    <Button variant="premium" className="rounded-full px-4">
                      View Details
                    </Button>

                    <Button variant="outline" className="rounded-full px-4">
                      Track Order
                    </Button>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}