
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4 bg-[#FEFEFE]">

            {/* Image */}
            <Image
                src="/page-not-found.png"
                alt="Page not found"
                width={600}
                height={600}
                className=""
                priority
            />
            {/* Button */}
            <Link href="/">
                <Button
                    size="lg"
                    className="mt-2 px-10 py-6 text-xl font-semibold rounded-2xl shadow-lg hover:scale-105 transition"
                >
                    Go Home
                </Button>
            </Link>
        </div>
    );
}