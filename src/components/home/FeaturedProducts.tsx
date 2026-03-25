import ProductCard from "@/components/common/ProductCard";
import { PRODUCTS } from "@/constants/products";

export default function FeaturedProducts() {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Featured Products
      </h2>

      <div className="grid grid-cols-4 gap-6">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}