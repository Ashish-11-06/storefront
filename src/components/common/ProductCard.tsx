import Link from "next/link";
import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="border rounded-xl p-4 hover:shadow-md transition cursor-pointer">
        <div className="h-40 bg-gray-100 mb-3 rounded" />

        <h2 className="font-semibold text-lg">{product.name}</h2>
        <p className="text-gray-600">₹{product.price}</p>
      </div>
    </Link>
  );
}