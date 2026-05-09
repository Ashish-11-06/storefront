<<<<<<< HEAD
export default function CategoriesSection() {
  const categories = [
    { name: "Puja Offerings", img: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=400" },
    { name: "Exotic Bouquets", img: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=400" },
    { name: "Wedding Decor", img: "https://images.unsplash.com/photo-1490750967868-88cb44cb2754?auto=format&fit=crop&q=80&w=400" },
    { name: "Everyday Posy", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <section className="mt-28 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Shop by <span className="text-[#F59E0B]">Category</span></h2>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Explore our wide array of floral arrangements designed for every occasion.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <div key={i} className="group cursor-pointer flex flex-col items-center">
            <div className="w-full aspect-square rounded-[2rem] overflow-hidden mb-4 shadow-lg group-hover:shadow-[0_20px_40px_rgba(245,158,11,0.2)] transition-all duration-300 pb-[100%] relative">
              <img
                src={cat.img}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#F59E0B] transition-colors">{cat.name}</h3>
          </div>
        ))}
=======
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
>>>>>>> main
      </div>
    </section>
  );
}
