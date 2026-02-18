"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

export default function ItemDetail({ item, onClose }: any) {
  const radarRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isActive = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const isAnimating = useRef(false);

  const [path, setPath] = useState("");
  const playTargeting = () => {
    if (
      !radarRef.current ||
      !productRef.current ||
      !pathRef.current ||
      !containerRef.current
    )
      return;

    // IF ACTIVE → FADE OUT
    if (isActive.current) {
      if (isAnimating.current) return;

      isAnimating.current = true;

      tlRef.current?.reverse();
      isActive.current = false;

      return;
    }

    // IF already animating forward
    if (isAnimating.current) return;
    isAnimating.current = true;

    // ===== ACTIVATE =====

    const containerBox = containerRef.current.getBoundingClientRect();

    const radarBox = radarRef.current.getBoundingClientRect();

    const productBox = productRef.current.getBoundingClientRect();

    const startX = radarBox.left - containerBox.left + radarBox.width / 2;

    const startY = radarBox.top - containerBox.top + radarBox.height / 2;

    const endX = productBox.left - containerBox.left + productBox.width / 2;

    const endY = productBox.top - containerBox.top + productBox.height / 2;

    const controlX = (startX + endX) / 2;
    const controlY = startY - 120;

    const d = `M ${startX} ${startY}
             Q ${controlX} ${controlY}
             ${endX} ${endY}`;

    pathRef.current.setAttribute("d", d);

    const length = pathRef.current.getTotalLength();

    // Reset visuals
    gsap.set(pathRef.current, {
      opacity: 0,
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.set(productRef.current, {
      scale: 1,
      boxShadow: "none",
    });

    // Kill old timeline
    tlRef.current?.kill();

    // Create timeline
    const tl = gsap.timeline({ paused: true });

    tl.to(pathRef.current, {
      opacity: 1,
      duration: 0.15,
    });

    tl.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 1.1,
      ease: "power2.out",
    });

    tl.to(
      productRef.current,
      {
        scale: 1.07,
        boxShadow: "0 0 30px #00e5ff",
        duration: 0.4,
      },
      "-=0.2",
    );

    // Unlock when done
    tl.eventCallback("onComplete", () => {
      isAnimating.current = false;
    });

    tl.eventCallback("onReverseComplete", () => {
      isAnimating.current = false;
    });

    tlRef.current = tl;

    tl.play();
    isActive.current = true;
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full"
    >
      {/* Back */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 z-50 text-white bg-black/50 px-4 py-2 rounded-full"
      >
        ← Back
      </button>

      {/* Main Image */}
      <img src={item.src} className="h-125 rounded-3xl object-cover" />

      {/* Radar */}
      <div
        ref={radarRef}
        className="absolute top-[40%] left-[55%] cursor-pointer"
        onClick={playTargeting}
      >
        <span className="radar-dot" />
        <span className="radar-pulse" />
      </div>

      {/* SVG Line */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width="100%"
        height="100%"
      >
        <path
          ref={pathRef}
          fill="none"
          stroke="#00E5FF"
          strokeWidth="2"
          strokeLinecap="round"
          className="line-glow"
          d=""
        />
      </svg>

      {/* Product (Single target for now) */}
      {item.item?.[0] && (
        <div
          ref={productRef}
          className={`
            bg-sky-200
            backdrop-blur-xl
            rounded-3xl
            border border-white/30
            shadow-xl
            px-6 py-4
            text-white
            absolute
            ${item.item[0].position}
          `}
        >
          <img
            src={item.item[0].src}
            className="w-full h-32 object-contain rounded-xl mb-3"
          />

          <h3 className="font-bold text-lg">{item.item[0].name}</h3>

          <p>${item.item[0].price}</p>
        </div>
      )}
    </div>
  );
}
