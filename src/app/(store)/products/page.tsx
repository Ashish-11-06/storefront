import ProductCard from "@/components/common/ProductCard";
import { PRODUCTS } from "@/constants/products";

export const revalidate = 60; // ISR

export default async function ProductsPage() {
  const products = PRODUCTS;
  console.log("Fetched products:", products);
  console.log("Products count:", products.length);
  console.log("First product:", products[0]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}