import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-black to-gray-800 text-white py-24 text-center">
      <h1 className="text-5xl font-bold mb-4">
        Upgrade Your Tech Lifestyle
      </h1>

      <p className="text-gray-300 mb-6">
        Discover premium gadgets at unbeatable prices
      </p>

      <Link href="/products">
        <Button size="lg" className="bg-white text-black">
          Shop Now
        </Button>
      </Link>
    </section>
  );
}