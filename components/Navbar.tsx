"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/10 backdrop-blur-xl border-b border-white/20 py-4"
                    : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="group flex items-center gap-2">
                    {/* Abstract Lightning/Banana Icon */}
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-orange-500 transform group-hover:rotate-12 transition-transform duration-300"
                    >
                        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
                        <path
                            d="M18 6L10 18H16L14 26L22 14H16L18 6Z"
                            fill="currentColor"
                            className="drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                        />
                    </svg>
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                        Nano Banana
                    </span>
                </Link>

                <div>
                    {/* Placeholder for menu or order button */}
                    <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300">
                        Order Now
                    </button>
                </div>
            </div>
        </motion.nav>
    );
}
