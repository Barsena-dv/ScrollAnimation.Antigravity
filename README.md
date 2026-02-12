## 🚀 Scroll Animation – Antigravity Product Experience

A high-performance scroll-driven product showcase built using **Next.js + Canvas + Framer Motion**.
The page renders a smooth 240-frame animation synced to scroll position to simulate a cinematic product reveal.

Instead of traditional video, the animation is generated from image frames and drawn onto a canvas for better performance and control.

---

## 🎯 Features

* Smooth frame-by-frame scroll animation
* Canvas rendering for performance
* Lazy image streaming (no heavy initial load)
* CDN hosted frames (Supabase storage)
* Responsive full-screen layout
* Text overlays synchronized with animation
* Optimized for modern browsers

---

## 🧠 How It Works

1. Scroll progress is tracked using **Framer Motion**
2. Scroll value maps to frame index (0 → 239)
3. Frames load dynamically from CDN
4. Canvas renders only required frame
5. Nearby frames preload for smooth playback

This avoids:

* heavy video files
* huge repo sizes
* long loading times

---

## 🛠 Tech Stack

* **Next.js (App Router)**
* **React**
* **Framer Motion**
* **HTML5 Canvas API**
* **Supabase Storage CDN**
* **TypeScript**
* **TailwindCSS**

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Barsena-dv/ScrollAnimation.Antigravity.git
cd ScrollAnimation.Antigravity
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

## ⚠ Important Note

Animation frames are hosted externally (Supabase CDN) and are **not included in the repository** to keep the project lightweight.

---

## 📁 Project Structure

```
components/
  ProductBottleScroll.tsx   → Canvas animation engine
  ProductTextOverlays.tsx   → Scroll synced text

data/
  products.ts                → Product configuration

public/
  images                     → Static assets only (no animation frames)
```

---

## 💡 Performance Strategy

Instead of loading 240 images at once:

* First 12 frames preload
* Remaining frames stream while scrolling
* Canvas redraws only required frame

This keeps:

* fast initial load
* low memory usage
* smooth animation

---

## 📸 Preview

*(Add screenshots or GIF here later for portfolio impact)*

---

## 👨‍💻 Author

Dhruv

---

## 📜 License

This project is for educational and portfolio purposes.

---

