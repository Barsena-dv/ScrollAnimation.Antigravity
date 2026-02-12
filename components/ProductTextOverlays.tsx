"use client";

import { Product } from "@/data/products";
import { motion, MotionValue, useTransform } from "framer-motion";

interface ProductTextOverlaysProps {
    product: Product;
    scrollYProgress: MotionValue<number>;
}

function Section({
    title,
    subtitle,
    progress,
    range,
}: {
    title: string;
    subtitle: string;
    progress: MotionValue<number>;
    range: [number, number];
}) {
    const [start, end] = range;
    const fadeInStart = start - 0.05;
    const fadeOutEnd = end + 0.05;

    const opacity = useTransform(
        progress,
        [fadeInStart, start, end, fadeOutEnd],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        progress,
        [fadeInStart, end],
        [50, -50]
    );

    const scale = useTransform(
        progress,
        [fadeInStart, end],
        [0.9, 1.1]
    );

    return (
        <motion.div
            style={{ opacity, y, scale }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-30 pointer-events-none"
        >
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-white drop-shadow-xl stroke-black">
                {title}
            </h2>
            <p className="text-xl md:text-3xl font-medium text-white/90 drop-shadow-lg max-w-4xl">
                {subtitle}
            </p>
        </motion.div>
    );
}

export default function ProductTextOverlays({ product, scrollYProgress }: ProductTextOverlaysProps) {
    // Mapping scroll progress (0 to 1 over the 500vh) to text sections
    // 0.1 - 0.25: Section 1
    // 0.35 - 0.5: Section 2
    // 0.6 - 0.75: Section 3
    // 0.85 - 0.95: Section 4

    return (
        <div className="absolute inset-0 w-full h-screen pointer-events-none">
            {/* Section 1 */}
            <Section
                title={product.section1.title}
                subtitle={product.section1.subtitle}
                progress={scrollYProgress}
                range={[0.05, 0.2]}
            />

            {/* Section 2 */}
            <Section
                title={product.section2.title}
                subtitle={product.section2.subtitle}
                progress={scrollYProgress}
                range={[0.3, 0.45]}
            />

            {/* Section 3 */}
            <Section
                title={product.section3.title}
                subtitle={product.section3.subtitle}
                progress={scrollYProgress}
                range={[0.55, 0.7]}
            />

            {/* Section 4 */}
            <Section
                title={product.section4.title}
                subtitle={product.section4.subtitle}
                progress={scrollYProgress}
                range={[0.8, 0.95]}
            />
        </div>
    );
}
