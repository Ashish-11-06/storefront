export default function Newsletter() {
  return (
    <section className="mt-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="relative bg-gradient-to-br from-[#FFFBF0] to-white border border-[#F59E0B]/20 rounded-[3rem] p-10 md:p-16 text-center shadow-[0_20px_50px_rgba(245,158,11,0.05)] overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FF9933]/20 to-[#F59E0B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 cursor-default pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#BE123C]/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 cursor-default pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-[#F59E0B] font-bold tracking-widest uppercase text-sm mb-4 block">Newsletter</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Get Fresh Blooms & Offers
          </h2>
          <p className="text-gray-500 text-lg mb-10">
            Subscribe to our newsletter to receive the latest updates on seasonal flowers, exclusive discounts, and floral arrangement tips directly to your inbox.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white px-6 py-4 rounded-full border border-gray-200 outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all text-gray-700 shadow-sm"
              required
            />
            <button
              type="submit"
              className="bg-[#F59E0B] text-white hover:bg-[#FF9933] font-bold py-4 px-10 rounded-full transition-all duration-300 active:scale-95 shadow-lg shadow-[#F59E0B]/30 whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}