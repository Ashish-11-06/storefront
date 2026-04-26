"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client/react";
import {
  GET_ORDERS,
  GET_ORDER_TRACKING,
} from "@/graphql/queries/orderQueries";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function OrdersPage() {
  const { data, loading, error } = useQuery(GET_ORDERS);

  // ✅ STRICT NUMBER TYPE
  const [selectedOrderId, setSelectedOrderId] = useState<number | undefined>(undefined);
  const [openTracking, setOpenTracking] = useState(false);

  // ✅ SAFE QUERY (never runs with string)
  const {
    data: trackingData,
    loading: trackingLoading,
    refetch,
  } = useQuery(GET_ORDER_TRACKING, {
    variables: {
      orderId: selectedOrderId as number,
    },
    skip: typeof selectedOrderId !== "number",
    fetchPolicy: "network-only",
  });

  // Refetch when user opens page / order changes
  useEffect(() => {
    if (selectedOrderId) {
      refetch();
    }
  }, [selectedOrderId]);

  const tracking = trackingData?.orderTracking || [];

  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/media/`;
  const PLACEHOLDER = "https://via.placeholder.com/150";

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "confirmed":
        return "bg-blue-100 text-blue-700";

      case "dispatched":
        return "bg-purple-100 text-purple-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ✅ FORCE NUMBER HERE (VERY IMPORTANT)
  const orders =
    data?.allOrders?.map((order: any) => ({
      id: Number(order.id), // 🔥 FIX
      orderNumber: order.orderNumber,
      status: order.status,
      total: Number(order.totalAmount),
      date: new Date().toLocaleDateString("en-IN"),
      items:
        order.items?.map((item: any) => ({
          name: item.product?.name,
          quantity: item.quantity,
          subtotal: item.subtotal,
          image: item.product?.images?.[0]?.image,
        })) || [],
    })) || [];

  if (loading) {
    return (
      <div className="bg-background min-h-screen py-14">
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <Skeleton className="h-8 w-40 mb-10" />

          <div className="space-y-8">

            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border shadow-sm space-y-5"
              >
                {/* TOP */}
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>

                {/* ITEMS */}
                <div className="space-y-3">
                  {[1, 2].map((_, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-4 border p-3 rounded-lg"
                    >
                      <Skeleton className="w-16 h-16 rounded-md" />

                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-24" />
                      </div>

                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>

                {/* BOTTOM */}
                <div className="flex justify-between items-center">
                  <Skeleton className="h-5 w-20" />

                  <div className="flex gap-3">
                    <Skeleton className="h-9 w-20 rounded-md" />
                    <Skeleton className="h-9 w-28 rounded-md" />
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load orders
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-2xl font-semibold mb-10">My Orders</h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders yet</p>
        ) : (
          <div className="space-y-8">

            {orders.map((order: any) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-xl border shadow-sm"
              >
                {/* TOP */}
                <div className="flex justify-between mb-5">
                  <div>
                    <p className="text-sm">
                      Order No:{" "}
                      <span className="font-medium">
                        {order.orderNumber}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap capitalize ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* ITEMS */}
                <div className="space-y-3">
                  {order.items.map((item: any, i: number) => {
                    const img = item.image
                      ? item.image.startsWith("http")
                        ? item.image
                        : `${BASE_URL}${item.image}`
                      : PLACEHOLDER;

                    return (
                      <div
                        key={i}
                        className="flex items-center gap-4 border p-3 rounded-lg"
                      >
                        <img
                          src={img}
                          className="w-16 h-16 object-cover rounded-md border"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              PLACEHOLDER;
                          }}
                        />

                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <p className="font-medium">₹{item.subtotal}</p>
                      </div>
                    );
                  })}
                </div>

                {/* BOTTOM */}
                <div className="flex justify-between mt-5 items-center">
                  <p className="font-semibold">₹{order.total}</p>

                  <div className="flex gap-3">


                    <Link href={`/orders/${order.id}`}>
                      <Button variant="outline">View</Button>
                    </Link>

                    <Button
                      onClick={() => {
                        // ✅ ALWAYS NUMBER NOW
                        setSelectedOrderId(order.id);
                        setOpenTracking(true);
                      }}
                    >
                      Track Order
                    </Button>
                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* 🔥 TRACKING MODAL */}
      {openTracking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-lg rounded-xl p-6 relative max-h-[80vh] overflow-y-auto">

            <button
              className="absolute top-3 right-3 text-gray-400"
              onClick={() => setOpenTracking(false)}
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-6">
              Order Tracking
            </h2>

            {trackingLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <Skeleton className="w-4 h-4 rounded-full mt-1" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-60" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            ) : tracking.length === 0 ? (
              <p className="text-center text-gray-500">
                No tracking found
              </p>
            ) : (
              <div className="relative pl-6">

                {/* LINE */}
                <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-gray-200"></div>

                {/* ✅ FIXED TIMELINE */}
                {[...tracking].reverse().map((step: any, i: number) => {
                  const isLatest = i === 0;

                  return (
                    <div key={i} className="mb-8 relative">

                      <div className="absolute -left-[6px]">
                        {isLatest ? (
                          <span className="relative flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                          </span>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                        )}
                      </div>

                      <div className="ml-6">
                        <p className="font-medium capitalize">
                          {step.status}
                        </p>

                        {step.notes && (
                          <p className="text-sm text-gray-500">
                            {step.notes}
                          </p>
                        )}

                        <p className="text-xs text-gray-400 mt-1">
                          {step.date} • {step.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}