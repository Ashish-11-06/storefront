"use client";

import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES } from "@/graphql/queries/categoryQueries";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesSection() {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/media/`;

  const { data, loading, error } = useQuery(GET_CATEGORIES);

  // ✅ Transform data
  const categories =
    data?.allCategories
      ?.filter((cat: any) => cat.isActive)
      ?.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        image: cat.image
          ? cat.image.startsWith("http")
            ? cat.image
            : `${BASE_URL}${cat.image}`
          : "/placeholder.png",
        href: `/products?category=${cat.id}`, // better to use ID
      })) || [];

  // 🔄 States
  if (loading) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl lg:text-5xl font-heading text-foreground mb-3 font-serif">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-sm tracking-wide">
            Fresh flowers for every occasion
          </p>
        </div>

        {/* Darker Skeleton Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">

              {/* Image */}
              <Skeleton className="w-full h-[180px] rounded-lg bg-gray-300 dark:bg-gray-700" />

              {/* Text */}
              <Skeleton className="h-4 w-20 mx-auto bg-gray-300 dark:bg-gray-700" />

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

  if (error) {
    return (
      <div className="py-20 text-center text-destructive">
        Failed to load categories
      </div>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl lg:text-5xl font-heading text-foreground mb-3 font-serif">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-sm tracking-wide">
            Fresh flowers for every occasion
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category: any) => (
            <Link key={category.id} href={category.href}>

              <div className="group cursor-pointer">

                {/* Image */}
                <div className="overflow-hidden rounded-lg bg-muted">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-[180px] object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Text */}
                <div className="mt-3 text-center">
                  <h3 className="text-sm tracking-wide text-foreground group-hover:text-primary">
                    {category.name}
                  </h3>
                </div>

              </div>

            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}