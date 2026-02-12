// "use client";

// import { Product } from "@/data/products";
// import { useMotionValueEvent, useScroll } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
// import ProductTextOverlays from "./ProductTextOverlays";

// interface ProductBottleScrollProps {
//     product: Product;
// }

// export default function ProductBottleScroll({ product }: ProductBottleScrollProps) {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const [images, setImages] = useState<HTMLImageElement[]>([]);
//     const [loaded, setLoaded] = useState(false);

//     // Hook into scroll progress of the container
//     const { scrollYProgress } = useScroll({
//         target: containerRef,
//         offset: ["start start", "end end"],
//     });

//     // Load images on mount or product change
//     useEffect(() => {
//         setLoaded(false);
//         const imageList: HTMLImageElement[] = [];
//         let loadCount = 0;
//         const totalFrames = 240;

//         const onImageLoad = () => {
//             loadCount++;
//             if (loadCount === totalFrames) {
//                 setImages(imageList);
//                 setLoaded(true);
//             }
//         };

//         for (let i = 1; i <= totalFrames; i++) {
//             const img = new Image();
//             // Using the correct file naming convention: ezgif-frame-{001..240}.jpg
//             const frameNumber = i.toString().padStart(3, '0');
//             img.src = `${product.folderPath}/ezgif-frame-${frameNumber}.jpg`;
//             img.onload = onImageLoad;
//             // Handle missing images gracefully
//             img.onerror = () => {
//                 loadCount++;
//                 if (loadCount === totalFrames) {
//                     setImages(imageList);
//                     setLoaded(true);
//                 }
//             }
//             imageList.push(img);
//         }
//     }, [product.folderPath]);

//     // Render frame based on scroll
//     const renderFrame = (index: number) => {
//         const canvas = canvasRef.current;
//         if (!canvas || !images[index]) return;

//         const ctx = canvas.getContext("2d");
//         if (!ctx) return;

//         const img = images[index];

//         // Safety check: Don't draw if image is broken or not loaded
//         if (!img || !img.complete || img.naturalWidth === 0) return;


//         // Clear canvas
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         // containment logic
//         const hRatio = canvas.width / img.width;
//         const vRatio = canvas.height / img.height;
//         const ratio = Math.min(hRatio, vRatio);

//         // Center the image
//         const centerShift_x = (canvas.width - img.width * ratio) / 2;
//         const centerShift_y = (canvas.height - img.height * ratio) / 2;

//         ctx.drawImage(
//             img,
//             0,
//             0,
//             img.width,
//             img.height,
//             centerShift_x,
//             centerShift_y,
//             img.width * ratio,
//             img.height * ratio
//         );
//     };

//     useMotionValueEvent(scrollYProgress, "change", (latest) => {
//         if (!loaded) return;
//         const totalFrames = 240;
//         // Map 0-1 to 0-239
//         const frameIndex = Math.min(
//             totalFrames - 1,
//             Math.floor(latest * totalFrames)
//         );
//         requestAnimationFrame(() => renderFrame(frameIndex));
//     });

//     // Resize canvas handler
//     useEffect(() => {
//         const handleResize = () => {
//             if (canvasRef.current) {
//                 canvasRef.current.width = window.innerWidth;
//                 canvasRef.current.height = window.innerHeight;
//                 // Re-render current frame if needed, or wait for next scroll
//             }
//         };
//         window.addEventListener("resize", handleResize);
//         handleResize(); // Init
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     // Initial draw
//     useEffect(() => {
//         if (loaded && images.length > 0) {
//             renderFrame(0);
//         }
//     }, [loaded, images]);


//     return (
//         <div ref={containerRef} className="h-[500vh] relative">
//             <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
//                 {/* Background Elements could go here */}

//                 <canvas ref={canvasRef} className="w-full h-full object-contain pointer-events-none z-10" />

//                 {/* Text Overlays - Integrated here for synchronous scrolling */}
//                 <ProductTextOverlays product={product} scrollYProgress={scrollYProgress} />

//                 {/* Loading Indicator */}
//                 {!loaded && (
//                     <div className="absolute inset-0 flex items-center justify-center z-50 bg-white/50 backdrop-blur-sm">
//                         <div className="text-xl font-bold animate-pulse text-orange-500">Blending Freshness...</div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }






"use client";

import { Product } from "@/data/products";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProductTextOverlays from "./ProductTextOverlays";

interface ProductBottleScrollProps {
    product: Product;
}

const TOTAL_FRAMES = 240;
const PRELOAD = 12;

// 🔴 PUT YOUR REAL SUPABASE URL HERE
const BASE = "https://xloutzcpybjntnlyvqfd.supabase.co/storage/v1/object/public/frames/";

export default function ProductBottleScroll({ product }: ProductBottleScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<(HTMLImageElement | null)[]>([]);
    const [loaded, setLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // INITIAL PRELOAD
    useEffect(() => {
        setLoaded(false);

        const arr: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
        setImages(arr);

        let loadedCount = 0;

        const loadFrame = (i:number) => {
            if(arr[i]) return;

            const img = new Image();
            const frame = String(i+1).padStart(3,'0');
            img.src = `${BASE}ezgif-frame-${frame}.jpg`;

            img.onload = () => {
                arr[i] = img;
                loadedCount++;
                if(loadedCount === PRELOAD) setLoaded(true);
            };
        };

        for(let i=0;i<PRELOAD;i++) loadFrame(i);

    }, [product]);

    // DRAW FRAME
    const renderFrame = (index:number) => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext("2d");
        if(!ctx) return;

        const img = images[index];
        if(!img) return;

        ctx.clearRect(0,0,canvas.width,canvas.height);

        const ratio = Math.min(canvas.width/img.width, canvas.height/img.height);
        const x = (canvas.width - img.width*ratio)/2;
        const y = (canvas.height - img.height*ratio)/2;

        ctx.drawImage(img,0,0,img.width,img.height,x,y,img.width*ratio,img.height*ratio);
    };

    // SCROLL HANDLER (lazy load next frames)
    useMotionValueEvent(scrollYProgress,"change",(latest)=>{
        if(!images.length) return;

        const frameIndex = Math.min(
            TOTAL_FRAMES-1,
            Math.floor(latest*TOTAL_FRAMES)
        );

        // load upcoming frames
        for(let i=frameIndex;i<frameIndex+PRELOAD && i<TOTAL_FRAMES;i++){
            if(!images[i]){
                const img=new Image();
                const frame=String(i+1).padStart(3,'0');
                img.src=`${BASE}ezgif-frame-${frame}.jpg`;
                images[i]=img;
            }
        }

        requestAnimationFrame(()=>renderFrame(frameIndex));
    });

    // RESIZE
    useEffect(()=>{
        const resize=()=>{
            if(canvasRef.current){
                canvasRef.current.width=window.innerWidth;
                canvasRef.current.height=window.innerHeight;
            }
        };
        resize();
        window.addEventListener("resize",resize);
        return()=>window.removeEventListener("resize",resize);
    },[]);

    // FIRST DRAW
    useEffect(()=>{
        if(loaded) renderFrame(0);
    },[loaded]);

    return (
        <div ref={containerRef} className="h-[500vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                <canvas ref={canvasRef} className="w-full h-full pointer-events-none z-10" />

                <ProductTextOverlays product={product} scrollYProgress={scrollYProgress} />

                {!loaded && (
                    <div className="absolute inset-0 flex items-center justify-center z-50 bg-white/50 backdrop-blur-sm">
                        <div className="text-xl font-bold animate-pulse text-orange-500">
                            Blending Freshness...
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
