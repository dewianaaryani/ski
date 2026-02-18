"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ProductItem({ item }: any) {
  const radarRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isActive = useRef(false);
  const isAnimating = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  useGSAP(() => {
    if (productRef.current && pathRef.current) {
      gsap.set(productRef.current, {
        opacity: 0,
        scale: 0.9,
        pointerEvents: "none",
      });

      gsap.set(pathRef.current, {
        opacity: 0,
      });
    }
  }, []);

  const playTargeting = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    if (
      !radarRef.current ||
      !productRef.current ||
      !pathRef.current ||
      !containerRef.current
    )
      return;
    if (isActive.current) {
      tlRef.current?.reverse();
      isActive.current = false;
      isAnimating.current = false;
      return;
    }

    const containerBox = containerRef.current.getBoundingClientRect();

    const radarBox = radarRef.current.getBoundingClientRect();

    const productBox = productRef.current.getBoundingClientRect();

    const startX = radarBox.left - containerBox.left + radarBox.width / 2;

    const startY = radarBox.top - containerBox.top + radarBox.height / 2;

    const endX = productBox.left - containerBox.left + productBox.width / 2;

    const endY = productBox.top - containerBox.top + productBox.height / 2;

    const controlX = (startX + endX) / 2;
    const controlY = startY - 80;

    const d = `M ${startX} ${startY}
               Q ${controlX} ${controlY}
               ${endX} ${endY}`;

    pathRef.current.setAttribute("d", d);

    const length = pathRef.current.getTotalLength();

    tlRef.current?.kill();
    tlRef.current?.kill();

    const tl = gsap.timeline({ paused: true });

    // reset line
    gsap.set(pathRef.current, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // show line
    tl.to(pathRef.current, {
      opacity: 1,
      duration: 0.15,
    });

    // show product
    tl.to(productRef.current, {
      opacity: 1,
      scale: 1,
      pointerEvents: "auto",
      duration: 0.3,
      ease: "power2.out",
    });

    // draw line
    tl.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 0.9,
      ease: "power2.out",
    });

    // highlight
    tl.to(
      productRef.current,
      {
        scale: 1.05,
        boxShadow: "0 0 25px #00e5ff",
        duration: 0.3,
      },
      "-=0.3",
    );

    tlRef.current = tl;

    tl.play();
    isActive.current = true;

    tl.eventCallback("onComplete", () => {
      isAnimating.current = false;
    });

    tl.eventCallback("onReverseComplete", () => {
      gsap.set(productRef.current, {
        pointerEvents: "none",
      });

      isAnimating.current = false;
    });
  };

  return (
    <div ref={containerRef} className="absolute left-0 top-0 w-full h-full">
      {/* Product */}
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
            ${item.itemPosition}
          `}
      >
        <img
          src={item.src}
          className="w-full h-20 md:h-32 object-contain rounded-xl mb-3"
        />
        <h3 className="font-semibold md:font-bold text-sm md:text-lg">
          {item.name}
        </h3>

        <p className="text-xs md:text-base">${item.price}</p>
      </div>
      {/* Radar */}
      <div
        ref={radarRef}
        onClick={playTargeting}
        className={`absolute ${item.radarPosition} pointer-events-auto cursor-pointer group size-6`}
      >
        {/* Scanner */}
        <div
          className="absolute inset-0 rounded-full border border-cyan-400/40
    animate-spin-slow"
        />

        {/* Pulse */}
        <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping" />

        {/* Glow */}
        <div className="absolute inset-1 rounded-full blur-sm bg-cyan-400/20" />

        {/* Core */}
        <div
          className="absolute inset-2 rounded-full bg-cyan-400
    shadow-[0_0_16px_rgba(34,211,238,0.9)]
    group-hover:scale-110 transition"
        />
      </div>

      {/* Line */}
      <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
        <path ref={pathRef} stroke="#00e5ff" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
}
