import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  return (
    <section className="bg-black text-white text-center py-10">
      <h2 className="text-2xl font-bold mb-2">
        Stay Updated
      </h2>

      <p className="mb-4">Get latest deals & offers</p>

      <div className="flex justify-center gap-2">
        <Input placeholder="Enter your email" className="max-w-sm" />
        <Button variant="secondary">Subscribe</Button>
      </div>
    </section>
  );
}