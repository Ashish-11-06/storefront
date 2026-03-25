import Link from "next/link";
import { Product } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Card className="hover:shadow-lg transition cursor-pointer">
      <CardContent className="p-4">
        <Link href={`/products/${product.slug}`}>
          <div className="h-40 bg-gray-100 rounded mb-3" />

          <h2 className="font-semibold text-lg">{product.name}</h2>
          <p className="text-gray-600 mb-3">₹{product.price}</p>
        </Link>

        <Button className="w-full">Add to Cart</Button>
      </CardContent>
    </Card>
  );
}