"use client";

import { useQuery } from "@apollo/client/react";
import { GET_FILTERED_PRODUCTS } from "@/graphql/queries/productFilterQueries";
import ProductCard from "@/components/common/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
type Props = {
  selectedCategories?: number[];
  sortBy?: string | null;
  isFeatured?: boolean | null;
};

export default function ProductsClient({
  selectedCategories = [],
  sortBy,
  isFeatured,
}: Props) {
  const { data, loading, error, refetch } = useQuery(GET_FILTERED_PRODUCTS, {
    variables: {
      first: 10,
      search: "",
      after: null,
      sortBy: sortBy || null,
      isFeatured: isFeatured,
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    refetch();
  }, [selectedCategories, sortBy, isFeatured]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-xl space-y-4">

            {/* Image */}
            <Skeleton className="w-full h-48 rounded-lg" />

            {/* Title */}
            <Skeleton className="h-4 w-3/4" />

            {/* Price */}
            <Skeleton className="h-4 w-1/2" />

            {/* Button */}
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
        ))}
      </div>
    );
  }
  if (error) return <p className="text-center py-10 text-red-500">{error.message}</p>;

  const products = data?.products?.products || [];

  // ✅ category filter (still frontend)
  const filteredProducts =
    selectedCategories.length > 0
      ? products.filter((p: any) =>
        selectedCategories.includes(Number(p?.category?.id))
      )
      : products;

  if (filteredProducts.length === 0) {
    return <p className="text-center py-10">No products found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredProducts.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}