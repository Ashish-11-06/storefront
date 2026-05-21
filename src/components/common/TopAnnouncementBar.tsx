"use client";

import { useEffect, useState } from "react";
import { Clock3, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";


export default function TopAnnouncementBar() {
    const [timeLeft, setTimeLeft] = useState("");
    const [afterCutoff, setAfterCutoff] = useState(false);
    const [closed, setClosed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);

        const updateCountdown = () => {
            const now = new Date();

            const cutoff = new Date();
            cutoff.setHours(19, 0, 0, 0);

            const diff = cutoff.getTime() - now.getTime();

            // AFTER 7 PM
            if (diff <= 0) {
                setAfterCutoff(true);
                setLoading(false);
                return;
            }

            // BEFORE 7 PM
            setAfterCutoff(false);

            const hours = Math.floor(
                diff / (1000 * 60 * 60)
            );

            const minutes = Math.floor(
                (diff % (1000 * 60 * 60)) /
                (1000 * 60)
            );

            setTimeLeft(`${hours}h ${minutes}m`);

            // SHOW CONTENT ONLY AFTER TIME IS READY
            setLoading(false);
        };

        // SMALL DELAY FOR SMOOTH UX
        setTimeout(() => {
            updateCountdown();
        }, 500);

        const interval = setInterval(
            updateCountdown,
            60000
        );

        return () => clearInterval(interval);
    }, []);

    // HIDE BAR
    if (closed) return null;

    return (
        <div className="bg-black text-white border-b relative z-[60]">

            <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-center">

                {/* CONTENT */}
                <div className="flex items-center gap-2 text-xs sm:text-sm tracking-wide text-center">

                    <Clock3 className="w-4 h-4 text-primary shrink-0" />

                    {!mounted || loading ? (

                        <div className="flex items-center gap-2">
                            <Skeleton className="h-3 w-44 bg-white/20 rounded-full" />
                        </div>

                    ) : !afterCutoff ? (

                        <p>
                            Order within{" "}
                            <span className="font-semibold text-primary">
                                {timeLeft}
                            </span>{" "}
                            for same-day delivery
                        </p>

                    ) : (

                        <p>
                            Orders placed after{" "}
                            <span className="font-semibold text-primary">
                                7:00 PM
                            </span>{" "}
                            will be delivered the next day
                        </p>
                    )}
                </div>

                {/* CLOSE BUTTON */}
                <button
                    onClick={() => setClosed(true)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-primary transition"
                    aria-label="Close announcement"
                >
                    <X className="w-4 h-4" />
                </button>

            </div>

        </div>
    );
}