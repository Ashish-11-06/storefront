export default function HeroSection() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 w-full mt-6 group">
      <div className="relative w-full h-[85vh] min-h-[600px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.15)] flex items-center bg-gray-900 group">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-out group-hover:scale-110"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=2000')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

        <div className="relative z-10 px-8 md:px-16 w-full max-w-3xl">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F59E0B] text-sm font-semibold tracking-widest uppercase mb-6 shadow-xl">
            Est. 2022 • Premium Floral Delivery
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-[1.05] drop-shadow-2xl">
            Rajesh <span className="text-[#FF9933] inline-block transform hover:rotate-2 transition-transform duration-300">Flowers</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light mb-10 max-w-xl leading-relaxed drop-shadow-md">
            Experience the vibrant spirit of traditional Indian florals. Handpicked, pristine, and delivered fresh to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-gradient-to-r from-[#FF9933] to-[#F59E0B] text-white hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95 font-bold py-4 px-10 rounded-full text-lg tracking-wide border-0">
              Start Free Trial
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20 transition-all duration-300 font-bold py-4 px-10 rounded-full text-lg tracking-wide">
              Explore Collections
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}