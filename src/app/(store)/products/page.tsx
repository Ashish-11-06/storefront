import ProductCard from "@/components/common/ProductCard";
import { PRODUCTS } from "@/constants/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

export const revalidate = 60; // ISR

const categories = [
  { id: 'all', name: 'All Products', count: PRODUCTS.length },
  { id: 'exotic', name: 'Exotic Flowers', count: PRODUCTS.filter(p => p.category === 'exotic').length },
  { id: 'pooja', name: 'Pooja Flowers', count: PRODUCTS.filter(p => p.category === 'pooja').length },
  { id: 'pooja-garlands', name: 'Pooja Garlands', count: PRODUCTS.filter(p => p.category === 'pooja-garlands').length },
  { id: 'festive-torans', name: 'Festive Torans', count: PRODUCTS.filter(p => p.category === 'festive-torans').length },
  { id: 'wedding', name: 'Wedding Specials', count: PRODUCTS.filter(p => p.category === 'wedding').length },
  { id: 'customized', name: 'Customized', count: PRODUCTS.filter(p => p.category === 'customized').length },
];

export default async function ProductsPage() {
  const products = PRODUCTS;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Products</span>
          </nav>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Flower Collection</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our premium collection of exotic flowers, pooja essentials, and festive decorations.
              Fresh, beautiful, and perfect for every occasion.
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <Select defaultValue="featured">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex border rounded-lg">
                <Button variant="ghost" size="sm" className="rounded-r-none">
                  <Grid className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-l-none border-l">
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Filter Button */}
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Categories */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border p-6 sticky top-32">
              <h3 className="font-semibold text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={category.id === 'all' ? '/products' : `/products?category=${category.id}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-gray-700 group-hover:text-primary transition-colors">
                      {category.name}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </Link>
                ))}
              </div>

              {/* Price Range */}
              <div className="mt-8">
                <h4 className="font-semibold mb-4">Price Range</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="ml-2 text-sm">Under ₹500</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="ml-2 text-sm">₹500 - ₹1000</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="ml-2 text-sm">₹1000 - ₹2000</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="ml-2 text-sm">₹2000 - ₹5000</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="ml-2 text-sm">Above ₹5000</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing <span className="font-medium text-gray-900">{products.length}</span> products
              </p>

              {/* Mobile Category Filter */}
              <div className="lg:hidden">
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More / Pagination */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Products
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}