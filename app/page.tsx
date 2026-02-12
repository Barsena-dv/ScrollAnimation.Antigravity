"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductBottleScroll from "@/components/ProductBottleScroll";
import { products } from "@/data/products";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const product = products[currentIndex];

    useEffect(() => {
        // Reset scroll when product changes
        window.scrollTo(0, 0);

        // Update Theme CSS Variable
        document.documentElement.style.setProperty('--product-gradient', product.gradient);

        // Cleanup
        return () => {
            // Optional: Reset to default or keep last
        };
    }, [currentIndex, product]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    return (
        <main className="min-h-screen relative">
            <Navbar />

            <AnimatePresence mode="wait">
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    {/* Scroll Sequence */}
                    <ProductBottleScroll product={product} />

                    {/* Additional Content Sections */}
                    <div className="relative z-20 bg-white bg-opacity-95 backdrop-blur-lg rounded-t-[3rem] -mt-20 pt-20 pb-20 shadow-[-10px_-10px_30px_rgba(0,0,0,0.1)]">

                        {/* Product Details */}
                        <div className="container mx-auto px-6 mb-20">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="grid md:grid-cols-2 gap-12 items-center"
                            >
                                <div>
                                    <h3 className="text-sm font-bold tracking-widest text-orange-500 uppercase mb-2">Detailed Analysis</h3>
                                    <h2 className="text-4xl font-black mb-6">{product.detailsSection.title}</h2>
                                    <p className="text-xl text-gray-700 leading-relaxed">{product.detailsSection.description}</p>
                                </div>
                                <div className="bg-gray-100 p-8 rounded-3xl">
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-6">
                                        {product.stats.map((stat, i) => (
                                            <div key={i} className="text-center p-4 bg-white rounded-xl shadow-sm">
                                                <div className="text-3xl font-black text-gray-900">{stat.val}</div>
                                                <div className="text-sm text-gray-500 uppercase tracking-widest">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Freshness Section */}
                        <div className="container mx-auto px-6 mb-20">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-black text-white p-12 rounded-[3rem] relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0"></div>
                                <div className="relative z-10 max-w-3xl mx-auto text-center">
                                    <h2 className="text-4xl md:text-5xl font-black mb-6">{product.freshnessSection.title}</h2>
                                    <p className="text-xl text-gray-300 leading-relaxed mb-8">{product.freshnessSection.description}</p>
                                    <div className="flex justify-center gap-4 flex-wrap">
                                        {product.buyNowSection.processingParams.map((param, i) => (
                                            <span key={i} className="px-4 py-2 border border-white/20 rounded-full text-sm font-bold uppercase tracking-wider">
                                                {param}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Buy Now Section */}
                        <div className="container mx-auto px-6 text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="max-w-4xl mx-auto bg-gradient-to-r from-orange-500 to-pink-500 p-[2px] rounded-3xl"
                            >
                                <div className="bg-white rounded-[22px] p-12">
                                    <h2 className="text-5xl font-black mb-2">{product.price}</h2>
                                    <p className="text-gray-500 mb-8">{product.buyNowSection.unit}</p>

                                    <button className="w-full md:w-auto px-12 py-4 bg-black text-white text-xl font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-xl mb-8">
                                        Add to Cart
                                    </button>

                                    <div className="grid md:grid-cols-2 gap-8 text-left text-sm text-gray-600">
                                        <div className="flex items-start gap-3">
                                            <span className="text-green-500 text-xl">🚚</span>
                                            <p>{product.buyNowSection.deliveryPromise}</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-blue-500 text-xl">🛡️</span>
                                            <p>{product.buyNowSection.returnPolicy}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Next Flavor CTA */}
                        <div className="mt-20 text-center">
                            <button
                                onClick={handleNext}
                                className="group relative inline-flex items-center justify-center px-8 py-6 overflow-hidden font-bold text-white transition-all duration-300 bg-gray-900 rounded-lg hover:bg-gray-800 hover:scale-105"
                            >
                                <span className="mr-2 text-xl">Next Flavor</span>
                                <svg className="w-6 h-6 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </button>
                        </div>

                        <Footer />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows (Fixed) */}
            <div className="fixed top-1/2 left-4 z-40 -translate-y-1/2 hidden md:block">
                <button onClick={handlePrev} className="p-4 bg-white/10 backdrop-blur hover:bg-white/20 rounded-full text-white transition-all">
                    <svg className="w-8 h-8 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
            </div>
            <div className="fixed top-1/2 right-4 z-40 -translate-y-1/2 hidden md:block">
                <button onClick={handleNext} className="p-4 bg-white/10 backdrop-blur hover:bg-white/20 rounded-full text-white transition-all">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
            </div>

            {/* Flavor Menu Pills */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-2 bg-black/80 backdrop-blur-md p-2 rounded-full shadow-2xl">
                {products.map((p, idx) => (
                    <button
                        key={p.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${currentIndex === idx ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {p.name}
                    </button>
                ))}
            </div>
        </main>
    );
}
