import HeroSection from "@/components/home/hero/HeroSection";
import CategoriesSection from "@/components/home/categories/CategoriesSection";
import FeaturedProducts from "@/components/home/products/FeaturedProducts";
import WhyChooseUs from "@/components/home/common/WhyChooseUs";
import SeoContent from "@/components/common/SeoContent";
import Newsletter from "@/components/home/common/Newsletter";

export const metadata = {
  title: "Home | Storefront",
  description: "Best place to buy electronics online",
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <SeoContent />
      <Newsletter />
    </main>
  );
}   