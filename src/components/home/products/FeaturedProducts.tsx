export default function FeaturedProducts() {
  return (
    <section className="mt-28 px-4 sm:px-6 lg:px-8 flex flex-col w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Our <span className="text-[#F59E0B]">Best Sellers</span></h2>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Curated floral arrangements for ceremonies, everyday rituals, and grand celebrations.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 pl-2 pr-2">
        {/* Card 1 */}
        <div className="group relative rounded-[2.5rem] bg-white border border-gray-100 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
          <div className="relative h-80 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549492196-857c28c89da4?auto=format&fit=crop&q=80&w=800')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#1C1917] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">Subscription</span>
          </div>
          <div className="p-8">
            <h3 className="text-3xl font-black text-gray-900 mb-3 group-hover:text-[#F59E0B] transition-colors tracking-tight">Everyday Puja</h3>
            <p className="text-gray-500 mb-8 text-base leading-relaxed">
              Get a pristine daily supply of marigolds, roses, and mixed petals perfectly curated for your spiritual rituals.
            </p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-2xl font-bold text-gray-900">₹44 <span className="text-sm text-gray-400 font-medium">/ day</span></span>
              <button className="bg-gray-900 text-white hover:bg-[#F59E0B] font-bold py-3.5 px-8 rounded-full transition-all duration-300 active:scale-95 shadow-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group relative rounded-[2.5rem] bg-white border border-gray-100 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
          <div className="relative h-80 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
            <span className="absolute top-4 left-4 bg-gradient-to-r from-[#BE123C] to-[#E11D48] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">Premium</span>
          </div>
          <div className="p-8">
            <h3 className="text-3xl font-black text-gray-900 mb-3 group-hover:text-[#BE123C] transition-colors tracking-tight">Festive & Wedding</h3>
            <p className="text-gray-500 mb-8 text-base leading-relaxed">
              Lush bespoke garlands, floral setups, and breathtaking torans exclusively hand-crafted for grand celebrations.
            </p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-2xl font-bold text-gray-900">Custom <span className="text-sm text-gray-400 font-medium">Pricing</span></span>
              <button className="bg-[#BE123C] text-white hover:bg-gray-900 font-bold py-3.5 px-8 rounded-full transition-all duration-300 active:scale-95 shadow-md shadow-rose-900/20">
                Explore Store
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}