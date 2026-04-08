"use client";

import Link from "next/link";

const categories = [
  {
    name: "Exotic Flowers",
    image: "/categories/categ1.avif",
    href: "/products?category=exotic",
  },
  {
    name: "Pooja Flowers",
    image: "/categories/categ2.jpg",
    href: "/products?category=pooja",
  },
  {
    name: "Festive Torans",
    image: "/categories/categ3.avif",
    href: "/products?category=festive-torans",
  },
  {
    name: "Puja Garlands",
    image: "/categories/cate4.jpg",
    href: "/products?category=pooja-garlands",
  },
  {
    name: "Wedding Specials",
    image: "/categories/categ5.avif",
    href: "/products?category=wedding",
  },
  {
    name: "Customised Orders",
    image: "/categories/categ6.avif",
    href: "/products?category=customised",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl lg:text-5xl font-serif text-gray-800 mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-500 text-sm tracking-wide">
            Fresh flowers for every occasion
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>

              <div className="group cursor-pointer">

                {/* Image */}
                <div className="overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-[180px] object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Text */}
                <div className="mt-3 text-center">
                  <h3 className="text-sm tracking-wide text-gray-800 group-hover:text-black">
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