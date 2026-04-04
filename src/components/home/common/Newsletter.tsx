import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Gift, Bell } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="bg-gradient-to-r from-slate-900 to-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
              <Mail className="w-8 h-8" />
            </div>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Stay Updated with Latest Deals
          </h2>

          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about exclusive deals,
            new product launches, and special offers. Get up to 20% off on your first order!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white"
            />
            <Button className="bg-white text-black hover:bg-gray-100 px-8">
              Subscribe Now
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              <span>Exclusive deals & offers</span>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span>New product alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>Unsubscribe anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}