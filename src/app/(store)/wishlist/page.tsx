"use client";

import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart } from "lucide-react";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  GET_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "@/graphql/queries/wishlistQueries";
import { ADD_TO_CART } from "@/graphql/queries/cartQueries";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function WishlistPage() {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/media/`;

  const { data, loading, error, refetch } = useQuery(GET_WISHLIST, {
  fetchPolicy: "network-only",        
  nextFetchPolicy: "network-only",  
});

  const [removeFromWishlist] = useMutation(REMOVE_FROM_WISHLIST);
  const [addToCart] = useMutation(ADD_TO_CART);

  // ✅ Transform data
  const items =
    data?.myWishlist?.map((item: any) => {
      const firstImage = item.product.images?.[0]?.image;

      return {
        id: item.product.id,
        wishlistId: item.id,
        name: item.product.name,
        price: Number(item.product.price),
        image: firstImage
          ? firstImage.startsWith("http")
            ? firstImage
            : `${BASE_URL}${firstImage}`
          : "/collection/red-roses.png",
      };
    }) || [];

  // ❌ Remove
  const handleRemove = async (productId: number) => {
  try {
    await removeFromWishlist({
      variables: { productId },
    });

    refetch();

    toast.success("Removed from wishlist!");

  } catch (err: any) {
    toast.error(err.message || "Failed to remove");
  }
};

  // 🛒 Add to cart
  const handleAddToCart = async (productId: number) => {
  try {
    await addToCart({
      variables: {
        productId,
        quantity: 1,
      },
    });

    toast.success("Added to cart!");

  } catch (err: any) {
    toast.error(err.message || "Failed to add to cart");
  }
};

  // 🔄 States
  if (loading) {
  return (
    <div className="bg-background min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-10">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="w-12 h-[1px]" />
        </div>

        <div className="space-y-6">

          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-border pb-6"
            >
              {/* LEFT */}
              <div className="flex items-center gap-5">

                {/* Image */}
                <Skeleton className="w-20 h-20 rounded-md" />

                {/* Info */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-44" />
                  <Skeleton className="h-3 w-20" />
                </div>

              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-4">

                {/* Button */}
                <Skeleton className="h-10 w-32 rounded-full" />

                {/* Delete icon */}
                <Skeleton className="w-5 h-5 rounded-full" />

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
      <div className="py-20 text-center text-destructive">
        Failed to load wishlist
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-10">
          <h1 className="text-xl lg:text-3xl font-heading text-foreground tracking-wide">
            My Wishlist
          </h1>
          <div className="w-12 h-[1px] bg-border"></div>
        </div>

        {items.length === 0 ? (
          <p className="text-muted-foreground text-center">
            Your wishlist is empty.
          </p>
        ) : (
          <div className="space-y-6">

            {items.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-border pb-6"
              >
                {/* LEFT */}
                <div className="flex items-center gap-5">

                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />

                  {/* Info */}
                  <div>
                    <h2 className="text-foreground font-medium">
                      {item.name}
                    </h2>

                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span>₹{item.price}</span>
                    </div>
                  </div>

                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">

                  {/* 🛒 Add to Cart */}
                  <Button
                    onClick={() => handleAddToCart(Number(item.id))}
                    className="rounded-full px-4 py-2 flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </Button>

                  {/* ❌ Remove */}
                  <button
                    onClick={() => handleRemove(Number(item.id))}
                    className="text-muted-foreground hover:text-destructive transition"
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