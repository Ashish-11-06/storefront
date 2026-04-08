
export default function MapSection() {
    return (
        <section className="mt-28 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Find <span className="text-[#F59E0B]">Us</span></h2>
                <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Visit our flagship store in Vadodara to experience the freshness yourself.</p>
            </div>

            <div className="relative w-full h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.1)] border border-gray-100 bg-white p-2">
                <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118106.70010221669!2d73.17308625!3d22.3071588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8ab91a3ddab%3A0xac39d3bfe1473fb8!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="filter contrast-[1.05] opacity-90 grayscale-[0.2]"
                        title="Rajesh Flowers Location"
                    ></iframe>

                    {/* Overlay Info Card */}
                    <div className="absolute top-6 left-6 md:top-10 md:left-10 bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-gray-100 max-w-sm">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF9933] to-[#F59E0B] flex items-center justify-center font-black text-white text-lg mb-4 shadow-sm">
                            RF
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Rajesh Flowers HQ</h3>
                        <p className="text-gray-600 text-sm mb-4 flex items-start gap-2">
                            <span className="mt-0.5 text-[#F59E0B]">📍</span>
                            123 Floral Avenue, Alkapuri, <br /> Vadodara, Gujarat 390007
                        </p>
                        <p className="text-gray-600 text-sm mb-4 flex items-start gap-2">
                            <span className="mt-0.5 text-[#F59E0B]">📞</span>
                            +91 98765 43210
                        </p>
                        <button className="w-full bg-gray-900 text-white hover:bg-[#F59E0B] transition-colors py-2.5 rounded-xl font-bold text-sm">
                            Get Directions
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
