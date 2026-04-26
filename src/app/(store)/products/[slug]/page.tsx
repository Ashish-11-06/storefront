"use client";

import { useQuery, useMutation } from "@apollo/client/react";
import { GET_PRODUCTS } from "@/graphql/queries/productQueries";
import { ADD_TO_CART } from "@/graphql/queries/cartQueries";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { GET_STOCK } from "@/graphql/queries/productQueries";

export default function ProductDetailPage(){
const router = useRouter();
const params = useParams();
const [quantity, setQuantity] = useState(1);
const [isInCart, setIsInCart] = useState(false);
const slug = params.slug as string;

const id = Number(slug.split("-").pop());
const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/media/`;

const { data, loading, error } = useQuery(GET_PRODUCTS, {
  variables: {
    first: 50,
    search: "",
    after: null,
  },
});

const [addToCart, { loading: cartLoading }] = useMutation(ADD_TO_CART);

const PLACEHOLDER = "https://via.placeholder.com/500x500?text=No+Image";

const products = data?.products?.products || [];
const product = products.find((p: any) => Number(p.id) === id);
const { data: stockData } = useQuery(GET_STOCK, {
  variables: { productId: id },
  skip: !product,
});

const availableQty = stockData?.stock?.availableQuantity || 0;
const isOutOfStock = availableQty === 0;
// ✅ Safe images processing
const images = useMemo(() => {
  if (!product?.images?.length) return [PLACEHOLDER];

  const validImages = product.images
    .map((img: any) => {
      if (!img?.image) return null;

      return img.image.startsWith("http")
        ? img.image
        : `${BASE_URL}${img.image}`;
    })
    .filter(Boolean);

  return validImages.length > 0 ? validImages : [PLACEHOLDER];
}, [product]);

// ✅ Initialize properly (never empty)
const [selectedImage, setSelectedImage] = useState<string>(PLACEHOLDER);

// ✅ Sync when images change
useEffect(() => {
  if (images.length > 0) {
    setSelectedImage(images[0]);
  }
}, [images]);
useEffect(() => {
  if (product) {
    setIsInCart(product.isAddedcart || false);
  }
}, [product]);

const handleAddToCart = async () => {
  if (!product) return;

  try {
    await addToCart({
      variables: {
        productId: Number(product.id),
        quantity,
      },
      update(cache) {
        cache.modify({
          fields: {
            products(existingData = {}) {
              return {
                ...existingData,
                products: existingData.products.map((p: any) =>
                  Number(p.id) === Number(product.id)
                    ? { ...p, isAddedcart: true }
                    : p
                ),
              };
            },
          },
        });
      },
    });

    setIsInCart(true);
  } catch (err) {
    console.error(err);
  }
};

const handleOrderNow = () => {
  if (!product) return;
  const params = new URLSearchParams({
    productId: String(product.id),
    quantity: String(quantity),
  });

  router.push(`/order-summary?${params.toString()}`);
};


if (!id) {
  return (
    <div className="text-center py-20 text-foreground">
      Invalid product
    </div>
  );
}

if (loading) {
  return (
    <div className="text-center py-20 text-muted-foreground">
      Loading product...
    </div>
  );
}

if (error) {
  return (
    <div className="text-center py-20 text-destructive">
      Error loading product
    </div>
  );
}

if (!product) {
  return (
    <div className="text-center py-20 text-muted-foreground">
      Product not found
    </div>
  );
}

return (
  <div className="bg-background min-h-screen py-14">
    <div className="max-w-7xl mx-auto px-6 space-y-20">

      <div className="grid lg:grid-cols-2 gap-14 items-start">

        {/* IMAGES */}
        <div className="flex gap-5">

          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {images.map((img: string, i: number) => (
              <div
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`
                    cursor-pointer rounded-lg overflow-hidden border transition-all duration-200
                    ${selectedImage === img
                    ? "border-primary ring-2 ring-primary/30 scale-105"
                    : "border-border hover:border-primary/40 hover:scale-105"
                  }
                  `}
              >
                <Image
                  src={img || PLACEHOLDER}
                  alt="thumbnail"
                  width={70}
                  height={70}
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 rounded-2xl overflow-hidden bg-card border border-border shadow-sm">
            <Image
              src={selectedImage || PLACEHOLDER}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-[520px] object-cover transition-transform duration-500 hover:scale-105"
              unoptimized
            />
          </div>

        </div>

        {/* DETAILS */}
        <div className="space-y-6">

          <h1 className="text-4xl font-heading font-semibold text-foreground leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 text-sm">
            <div className="flex text-primary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-muted-foreground">(120 reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-semibold text-foreground">
              ₹{product.discountPrice || product.price}
            </span>

            {product.discountPrice && (
              <span className="text-muted-foreground line-through text-lg">
                ₹{product.price}
              </span>
            )}
          </div>

          {/* Stock */}
          <p
            className={`text-sm font-medium ${isOutOfStock ? "text-destructive" : "text-primary"
              }`}
          >
            {isOutOfStock ? "Out of Stock" : "In Stock"}
          </p>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center border border-border rounded-full overflow-hidden w-fit">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 hover:bg-muted"
            >
              −
            </button>

            <span className="px-3 text-sm">{quantity}</span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 hover:bg-muted"
            >
              +
            </button>
          </div>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">

            <Button
              size="lg"
              onClick={() => {
                if (isInCart) {
                  router.push("/cart"); // ✅ go to cart
                } else {
                  handleAddToCart();
                }
              }}
              disabled={cartLoading}
              className={`flex-1 rounded-full py-3 text-base shadow-md hover:shadow-lg transition ${isInCart ? "bg-green-600 hover:bg-green-600 text-white" : ""
                }`}
            >
              {cartLoading ? (
                "Adding..."
              ) : isInCart ? (
                "Go to Cart"
              ) : (
                "Add to Cart"
              )}
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleOrderNow}
              disabled={isOutOfStock || !product}
              className="flex-1 rounded-full py-3 text-base border-primary text-primary hover:bg-primary hover:text-white"
            >
              Order Now
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="flex-1 rounded-full py-3 text-base hover:bg-muted"
            >
              Bulk Order
            </Button>

          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border text-sm">

            <div className="flex items-center gap-2 text-muted-foreground">
              <Truck className="w-4 h-4 text-primary" />
              Same-day delivery
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Freshness guarantee
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <RotateCcw className="w-4 h-4 text-primary" />
              Easy returns
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Description */}
      <div className="border border-border p-6 rounded-xl bg-card">
        <p className="text-muted-foreground">
          {product.description}
        </p>
      </div>

    </div>
  </div>
);
}