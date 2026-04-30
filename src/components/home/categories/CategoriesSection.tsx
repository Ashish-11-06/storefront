"use client";

import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES } from "@/graphql/queries/categoryQueries";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesSection() {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/media/`;

  const { data, loading, error } = useQuery(GET_CATEGORIES);

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
        href: `/products?category=${cat.id}`,
      })) || [];

  const isCarousel = categories.length > 6;

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-serif">Shop by Category</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-[180px] rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="py-20 text-center">Failed to load categories</div>;
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl lg:text-5xl font-heading mb-3">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-sm">
            Fresh flowers for every occasion
          </p>
        </div>

        {/* 🔥 CONDITIONAL LAYOUT */}
        {isCarousel ? (
          // 👉 Carousel
          <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {categories.map((category: any) => (
              <Link
                key={category.id}
                href={category.href}
                className="min-w-[180px] snap-start"
              >
                <div className="group cursor-pointer">
                  <div className="overflow-hidden rounded-lg bg-muted">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-[180px] object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="mt-3 text-center">
                    <h3 className="text-sm group-hover:text-primary">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // 👉 Centered Grid
          <div className="flex justify-center">
            <div className="flex gap-6 justify-center items-center flex-wrap sm:flex-nowrap">
              {categories.map((category: any) => (
                <Link key={category.id} href={category.href}>
                  <div className="group cursor-pointer w-[180px] shrink-0">
                    <div className="overflow-hidden rounded-lg bg-muted">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-[180px] object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>

                    <div className="mt-3 text-center">
                      <h3 className="text-sm group-hover:text-primary">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
