export default function CategoriesSection() {
  const categories = [
    { name: "Puja Offerings", img: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=400" },
    { name: "Exotic Bouquets", img: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=400" },
    { name: "Wedding Decor", img: "https://images.unsplash.com/photo-1490750967868-88cb44cb2754?auto=format&fit=crop&q=80&w=400" },
    { name: "Everyday Posy", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <section className="mt-28 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Shop by <span className="text-[#F59E0B]">Category</span></h2>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Explore our wide array of floral arrangements designed for every occasion.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <div key={i} className="group cursor-pointer flex flex-col items-center">
            <div className="w-full aspect-square rounded-[2rem] overflow-hidden mb-4 shadow-lg group-hover:shadow-[0_20px_40px_rgba(245,158,11,0.2)] transition-all duration-300 pb-[100%] relative">
              <img
                src={cat.img}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#F59E0B] transition-colors">{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}