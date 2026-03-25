export default function HeroSection() {
  return (
    <section className="bg-gray-100 py-20 px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Discover the Best Products
      </h1>
      <p className="text-gray-600 mb-6">
        Shop latest gadgets, electronics and more
      </p>

      <a
        href="/products"
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Shop Now
      </a>
    </section>
  );
}