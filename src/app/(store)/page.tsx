import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import SeoContent from "@/components/home/SeoContent";

export const metadata = {
  title: "Home | Storefront",
  description: "Buy best products online at great prices",
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <SeoContent />
    </main>
  );
}