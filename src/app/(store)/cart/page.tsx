"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  GET_CART,
  UPDATE_CART_ITEM,
  REMOVE_CART_ITEM,
} from "@/graphql/queries/cartQueries";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import AuthGuard from "@/components/AuthGuard";

export default function CartPage() {
  const router = useRouter();
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/media/`;

  // ✅ Query
  const { data, loading, error } = useQuery(GET_CART, {
    fetchPolicy: "cache-and-network",
  });

  // ✅ SIMPLE + RELIABLE
  const [updateCartItem] = useMutation(UPDATE_CART_ITEM, {
    refetchQueries: [GET_CART],
  });

  const [removeCartItem] = useMutation(REMOVE_CART_ITEM, {
    refetchQueries: [GET_CART],
  });

  const items =
    data?.myCart?.items?.map((item: any) => {
      const product = item.product;
      const firstImage = product.images?.[0]?.image;

      return {
        id: Number(item.id),
        productId: Number(product.id),
        name: product.name,
        price: Number(product.price),
        discountPrice: Number(product.discountPrice || product.price),
        quantity: item.quantity,
        category: product.category?.name,
        unit: product.unit,
        measure: product.measureValue,
        image: firstImage
          ? firstImage.startsWith("http")
            ? firstImage
            : `${BASE_URL}${firstImage}`
          : "/collection/red-roses.png",
      };
    }) || [];

  // 🔼 Increase
  const increase = async (item: any) => {
    try {
      await updateCartItem({
        variables: {
          cartItemId: item.id,
          quantity: item.quantity + 1,
        },
      });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // 🔽 Decrease
  const decrease = async (item: any) => {
    if (item.quantity <= 1) return;

    try {
      await updateCartItem({
        variables: {
          cartItemId: item.id,
          quantity: item.quantity - 1,
        },
      });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // ❌ Remove
  const removeItem = async (item: any) => {
    try {
      await removeCartItem({
        variables: {
          cartItemId: item.id,
        },
      });

      toast.success(`${item.name} removed from cart!`);
    } catch (err: any) {
      toast.error(err.message || "Failed to remove item");
    }
  };

  // 💰 Calculations
  const subtotal = items.reduce(
    (acc: number, item: any) => acc + item.discountPrice * item.quantity,
    0
  );

  const originalTotal = items.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0
  );

  const discount = originalTotal - subtotal;
  const shipping = items.length > 0 ? 50 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (!items.length) {
      toast.error("Your cart is empty");
      return;
    }

    const cartData = items.map((item: any) => ({
      id: item.productId,
      quantity: item.quantity,
    }));

    router.push(`/order-summary?cart=${JSON.stringify(cartData)}`);
  };

  // 🟡 Loading
  if (loading && !data) {
    return (
      <div className="bg-background min-h-screen py-14 animate-pulse">
        <div className="max-w-7xl mx-auto px-6">
          <Skeleton className="h-8 w-48 mb-10" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-destructive">
        Failed to load cart
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="bg-background min-h-screen py-14">
        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-3xl font-heading mb-10">Your Cart</h1>

          {items.length === 0 ? (
            <p className="text-muted-foreground">Your cart is empty.</p>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12 items-start">

              {/* ITEMS */}
              <div className="lg:col-span-2 space-y-6">

                {items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b pb-6"
                  >
                    <div className="flex gap-5">

                      <img
                        src={item.image}
                        className="w-24 h-24 rounded-md object-cover"
                      />

                      <div>
                        <h2 className="font-medium text-lg">{item.name}</h2>

                        <p className="text-sm text-muted-foreground">
                          {item.category}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {item.measure} {item.unit}
                        </p>

                        <div className="mt-2">
                          <span className="font-semibold text-green-600">
                            ₹{item.discountPrice}
                          </span>
                          {item.price !== item.discountPrice && (
                            <span className="ml-2 text-sm line-through text-muted-foreground">
                              ₹{item.price}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-4">

                      <div className="flex border rounded-full">
                        <button
                          onClick={() => decrease(item)}
                          className="px-3"
                        >
                          −
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() => increase(item)}
                          className="px-3"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item)}
                        className="text-red-500"
                      >
                        <Trash2 />
                      </button>

                    </div>
                  </div>
                ))}

              </div>

              {/* BILL */}
              <div className="border rounded-xl p-6 bg-card">

                <h2 className="text-lg font-semibold mb-4">Bill Summary</h2>

                <div className="space-y-3 text-sm">

                  <div className="flex justify-between">
                    <span>Items ({items.length})</span>
                    <span>₹{originalTotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>- ₹{discount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{shipping}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between border-t pt-3 font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>

                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full mt-6 rounded-full py-3"
                >
                  Proceed to Checkout
                </Button>

              </div>

            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}