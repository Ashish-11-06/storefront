import { PRODUCTS } from "@/constants/products";
import { Product } from "@/types/product";

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}