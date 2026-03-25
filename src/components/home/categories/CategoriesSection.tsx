const categories = [
  "Mobiles",
  "Laptops",
  "Accessories",
  "Headphones",
];

export default function CategoriesSection() {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>

      <div className="grid grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat}
            className="border p-6 text-center rounded-lg hover:shadow-md cursor-pointer"
          >
            {cat}
          </div>
        ))}
      </div>
    </section>
  );
}