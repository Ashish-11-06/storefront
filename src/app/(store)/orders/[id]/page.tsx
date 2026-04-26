"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import {
    GET_ORDER_BY_ID,
    GET_ORDER_TRACKING,
} from "@/graphql/queries/orderQueries";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrderDetailsPage() {
    const params = useParams();
    const orderId = Number(params.id);

    const { data, loading, error } = useQuery(GET_ORDER_BY_ID, {
        variables: { id: orderId },
        skip: !orderId,
    });

    const { data: trackingData, loading: trackingLoading } = useQuery(
        GET_ORDER_TRACKING,
        {
            variables: { orderId },
            skip: !orderId,
        }
    );

    const order = data?.order;
    const tracking = trackingData?.orderTracking || [];

    const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/media/`;
    const PLACEHOLDER = "https://via.placeholder.com/150";

    // LOADING
    if (loading) {
        return (
            <div className="bg-background min-h-screen py-10">
                <div className="max-w-5xl mx-auto px-4 space-y-8">

                    {/* HEADER */}
                    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-3">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-24" />
                    </div>

                    {/* ITEMS */}
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <Skeleton className="h-5 w-24 mb-4" />

                        <div className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex gap-4 border p-3 rounded-lg"
                                >
                                    <Skeleton className="w-20 h-20 rounded-md" />

                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-40" />
                                        <Skeleton className="h-3 w-24" />
                                        <Skeleton className="h-3 w-20" />
                                    </div>

                                    <Skeleton className="h-4 w-16" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PRICING */}
                    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-3">
                        <Skeleton className="h-5 w-40 mb-2" />

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-20" />
                            </div>

                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-4 w-20" />
                            </div>

                            <div className="flex justify-between pt-2 border-t">
                                <Skeleton className="h-5 w-24" />
                                <Skeleton className="h-5 w-24" />
                            </div>
                        </div>
                    </div>

                    {/* CUSTOMER */}
                    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-3">
                        <Skeleton className="h-5 w-40 mb-2" />
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-48" />
                    </div>

                    {/* PAYMENT */}
                    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-3">
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-4 w-48" />
                    </div>

                    {/* TRACKING */}
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <Skeleton className="h-5 w-32 mb-6" />

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
                    </div>

                </div>
            </div>
        );
    }

    // ERROR
    if (error || !order) {
        return (
            <div className="text-center py-20 text-red-500">
                Failed to load order
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen py-10">
            <div className="max-w-5xl mx-auto px-4 space-y-8">

                {/* HEADER */}
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <h1 className="text-xl font-semibold">
                        Order #{order.orderNumber}
                    </h1>

                    <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </p>

                    <p className="mt-1 text-sm">
                        Status:{" "}
                        <span className="font-medium">{order.status}</span>
                    </p>
                </div>

                {/* ITEMS */}
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <h2 className="font-semibold mb-4">Items</h2>

                    <div className="space-y-4">
                        {order.items.map((item: any, i: number) => {
                            // ✅ FIX: SUPPORT BOTH product & products
                            const product = item.products || item.product;

                            // ✅ SAFETY CHECK
                            if (!product) return null;

                            const img = product?.images?.[0]?.image
                                ? product.images[0].image.startsWith("http")
                                    ? product.images[0].image
                                    : `${BASE_URL}${product.images[0].image}`
                                : PLACEHOLDER;

                            const price =
                                product?.discountPrice || product?.price || 0;

                            return (
                                <div
                                    key={i}
                                    className="flex gap-4 border p-3 rounded-lg"
                                >
                                    <img
                                        src={img}
                                        className="w-20 h-20 object-cover rounded-md border"
                                        onError={(e) =>
                                        ((e.target as HTMLImageElement).src =
                                            PLACEHOLDER)
                                        }
                                    />

                                    <div className="flex-1">
                                        <p className="font-medium">
                                            {product?.name || "Product"}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {product?.measureValue || ""}{" "}
                                            {product?.unit || ""}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>

                                    <p className="font-medium">₹{item.subtotal}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* PRICING */}
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <h2 className="font-semibold mb-4">
                        Pricing Summary
                    </h2>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{order.totalAmount}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Final Amount</span>
                            <span>₹{order.finalAmount}</span>
                        </div>

                        <div className="flex justify-between font-semibold text-base pt-2 border-t">
                            <span>Total Paid</span>
                            <span>₹{order.finalAmount}</span>
                        </div>
                    </div>
                </div>

                {/* CUSTOMER */}
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <h2 className="font-semibold mb-4">
                        Customer Details
                    </h2>

                    <p>
                        {order.customer?.firstName}{" "}
                        {order.customer?.lastName}
                    </p>

                    <p className="text-sm text-gray-500">
                        {order.customer?.phone}
                    </p>

                    <p className="text-sm text-gray-500">
                        {order.customer?.email}
                    </p>
                </div>

                {/* PAYMENT */}
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <h2 className="font-semibold mb-4">Payment</h2>

                    <p className="text-sm">
                        Method:{" "}
                        <span className="font-medium">
                            Cash on Delivery / Online
                        </span>
                    </p>
                </div>

                {/* TRACKING */}
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <h2 className="font-semibold mb-6">Tracking</h2>

                    {trackingLoading ? (
                        <p>Loading...</p>
                    ) : tracking.length === 0 ? (
                        <p className="text-gray-500">
                            No tracking available
                        </p>
                    ) : (
                        <div className="relative pl-6">

                            {/* LINE */}
                            <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-gray-200"></div>

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
                                                {step.date && step.time
                                                    ? `${step.date} • ${step.time}`
                                                    : new Date(step.updatedAt).toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}