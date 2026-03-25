import { getProductBySlug } from "@/lib/getProductBySlug";
import { notFound } from "next/navigation";

// ✅ Dynamic SEO
export async function generateMetadata({ params }: any) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: `Buy ${product.name} at best price ₹${product.price}`,
    openGraph: {
      title: product.name,
      description: `Buy ${product.name} online`,
      images: [product.image || ""],
    },
  };
}

// ✅ Page
export default function ProductDetailPage({ params }: any) {
  const product = getProductBySlug(params.slug);

  if (!product) return notFound();

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-10">
        {/* Image */}
        <div className="h-96 bg-gray-100 rounded" />

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <p className="text-xl text-gray-700 mb-4">
            ₹{product.price}
          </p>

          <button className="bg-black text-white px-6 py-2 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}