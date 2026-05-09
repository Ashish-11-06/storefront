"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
    return (
        <div className="bg-[#f8f8f8] min-h-screen py-16">

            <div className="max-w-6xl mx-auto px-6 space-y-20">

                {/* 🌸 HERO */}
                <div className="text-center max-w-3xl mx-auto">

                    <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">
                        Contact Us
                    </p>

                    <h1 className="text-3xl lg:text-4xl font-serif text-gray-800 mb-4">
                        Get in Touch
                    </h1>

                    <p className="text-gray-600 leading-relaxed">
                        Have questions or need help choosing the perfect flowers?
                        We’re here to assist you with love and care.
                    </p>
                </div>

                {/* 🌼 GRID */}
                <div className="grid lg:grid-cols-2 gap-14">

                    {/* 📩 FORM */}
                    <div className="border border-gray-200 rounded-xl p-8 bg-white/60 backdrop-blur-sm">

                        <h2 className="text-xl font-serif text-gray-800 mb-6">
                            Send a Message
                        </h2>

                        <form className="space-y-5">

                            <div>
                                <label className="text-sm text-gray-600 mb-1 block">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-rose-300"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600 mb-1 block">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-rose-300"
                                    placeholder="Your email"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600 mb-1 block">
                                    Message
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-rose-300"
                                    placeholder="Your message..."
                                />
                            </div>

                            <Button
                                variant="premium"
                                className="rounded-full px-6 py-3 w-full"
                            >
                                Send Message
                            </Button>

                        </form>
                    </div>

                    {/* 📍 INFO */}
                    <div className="space-y-8">

                        <h2 className="text-xl font-serif text-gray-800">
                            Contact Information
                        </h2>

                        <div className="space-y-6 text-sm text-gray-600">

                            <div className="flex items-start gap-4">
                                <Mail className="w-5 h-5 text-rose-400 mt-1" />
                                <div>
                                    <p className="font-medium text-gray-800">Email</p>
                                    <p>support@bloomblossom.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Phone className="w-5 h-5 text-rose-400 mt-1" />
                                <div>
                                    <p className="font-medium text-gray-800">Phone</p>
                                    <p>+91 98765 43210</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <MapPin className="w-5 h-5 text-rose-400 mt-1" />
                                <div>
                                    <p className="font-medium text-gray-800">Address</p>
                                    <p>
                                        Bloom & Blossom,
                                        Pune, Maharashtra, India
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* 🌸 IMAGE */}
                        <div className="mt-6 rounded-xl overflow-hidden border border-gray-200">
                            <iframe
                                src="https://www.google.com/maps?q=Pune,Maharashtra,India&output=embed"
                                className="w-full h-[250px] border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}