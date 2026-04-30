"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Zap, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "@/graphql/queries/wishlistQueries";
import { ADD_TO_CART } from "@/graphql/queries/cartQueries";
// import { GET_STOCK } from "@/graphql/queries/productQueries";
import { useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  product: any;
}
import { ShoppingBag } from "lucide-react";
export default function ProductCard({ product }: Props) {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/media/`;
  const router = useRouter();

  /* ================= IMAGE ================= */
  const image = product.images?.[0]?.image
    ? `${BASE_URL}${product.images[0].image}`
    : "/placeholder.png";

  /* ================= SLUG ================= */
  const slug = `${(product.name || "product")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")}-${product.id}`;

  /* ================= PRICE ================= */
  const price = Number(product.price || 0);
  const discountPrice = Number(product.discountPrice || product.price || 0);
  // const { data: stockData, loading: stockLoading } = useQuery(GET_STOCK, {
  //   variables: { productId: Number(product.id) },
  // });
  /* ================= CATEGORY ================= */
  const categoryName = product.category?.name || "General";

  /* ================= UNIT ================= */
  const unitText =
    product.unit && product.measureValue
      ? `${product.measureValue} ${product.unit}`
      : null;

  /* ================= STATE ================= */
  const [isWishlisted, setIsWishlisted] = useState(
    product.isWishlisted || false,
  );

  const [isInCart, setIsInCart] = useState(product.isAddedcart || false);

  const [quantity, setQuantity] = useState(1);

  /* Sync when product changes */
  useEffect(() => {
    setIsWishlisted(product.isWishlisted || false);
    setIsInCart(product.isAddedcart || false);
  }, [product]);

  const [addToWishlist] = useMutation(ADD_TO_WISHLIST);
  const [removeFromWishlist] = useMutation(REMOVE_FROM_WISHLIST);
  const [addToCart] = useMutation(ADD_TO_CART);
  // const availableStock = stockData?.stock?.availableQuantity ?? 0;
  const availableStock = product?.stock?.availableQuantity ?? 0;
  const isOutOfStock = product?.stock?.isOutOfStock || availableStock === 0;
  /* ================= HANDLERS ================= */

  const handleWishlistToggle = async () => {
    try {
      if (isWishlisted) {
        await removeFromWishlist({
          variables: { productId: Number(product.id) },
        });

        setIsWishlisted(false);
        toast.success("Removed from wishlist!");
      } else {
        await addToWishlist({
          variables: { productId: Number(product.id) },
        });

        setIsWishlisted(true);
        toast.success("Added to wishlist!");
      }
    } catch (err: any) {
      toast.error(err.message || "Wishlist update failed");
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart({
        variables: {
          productId: Number(product.id),
          quantity,
        },
      });

      setIsInCart(true);
      toast.success("Added to cart!");
    } catch (err: any) {
      console.log(err);

      // 🔥 Extract GraphQL error message
      const message =
        err?.graphQLErrors?.[0]?.message ||
        err?.message ||
        "Something went wrong";

      if (message === "Login required") {
        toast.error("Please login to continue");

        // 👉 optional: redirect to login
        router.push(`/login?redirect=/cart`);
        return;
      }

      toast.error(message);
    }
  };

  const handleOrderNow = () => {
    const params = new URLSearchParams({
      productId: String(product.id),
      quantity: String(quantity),
    });

    router.push(`/order-summary?${params.toString()}`);
  };

  /* ================= UI ================= */

  return (
    <div className="group relative rounded-lg bg-card border border-border shadow-sm overflow-hidden hover:shadow-md transition">
      {/* ❤️ Wishlist */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 backdrop-blur cursor-pointer"
      >
        <Heart
          className={`w-5 h-5 ${
            isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"
          }`}
        />
      </button>

      {/* Product */}
      <Link href={`/products/${slug}`}>
        <div>
          <img
            src={image}
            alt={product.name}
            className="w-full h-56 object-cover"
          />

          <div className="px-4 py-2 space-y-1">
            {/* Category */}
            <p className="text-xs text-primary font-medium">{categoryName}</p>

            {/* Name */}
            <h2 className="font-medium text-foreground">{product.name}</h2>

            {/* Unit */}
            {unitText && (
              <p className="text-xs text-muted-foreground">{unitText}</p>
            )}

            {/* Price */}
            <div className="flex gap-2 items-center">
              <span className="font-semibold text-primary">
                ₹{discountPrice}
              </span>

              {discountPrice < price && (
                <span className="line-through text-muted-foreground text-sm">
                  ₹{price}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* CTA */}
      <div className="px-4 pb-4 pt-2 space-y-1">
        <div className="px-2 pb-3">
          <p
            className={`text-sm font-medium ${
              isOutOfStock ? "text-red-500" : "text-green-600"
            }`}
          >
            {isOutOfStock
              ? "Unavailable"
              : `${availableStock} items available`}
          </p>
        </div>
        {/* Buttons */}
        <div className="flex gap-2">
          {isOutOfStock ? (
            <Button
              aria-disabled
              className="w-full bg-gray-400 text-white opacity-70 cursor-not-allowed"
              onClick={(e) => e.preventDefault()}
            >
              Unavailable
            </Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  if (isInCart) {
                    router.push("/cart");
                  } else {
                    handleAddToCart();
                  }
                }}
                className={`flex-1 ${isInCart ? "bg-green-600 hover:bg-green-600" : ""}`}
              >
                {isInCart ? (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Go to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add to Cart
                  </>
                )}
              </Button>

              <Button
                onClick={handleOrderNow}
                variant="outline"
                className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
              >
                <ShoppingBag className="w-4 h-4 mr-1" />
                Buy Now
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
