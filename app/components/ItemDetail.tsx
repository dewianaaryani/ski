"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import ProductItem from "./ProductItem";
import { CatalogItem, Product } from "@/lib/type";

export default function ItemDetail({
  item,
  onClose,
}: {
  item: CatalogItem;
  onClose: () => void;
}) {
  const detailRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(".detail-image", {
        opacity: 0,
        scale: 0.92,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
      })
        .from(
          ".detail-back",
          {
            opacity: 0,
            x: -24,
            duration: 0.35,
            ease: "power2.out",
          },
          "-=0.4",
        )
        .from(
          ".radar-point",
          {
            opacity: 0,
            scale: 0,
            duration: 0.45,
            stagger: 0.1,
            ease: "back.out(2.2)",
          },
          "-=0.15",
        );

      gsap.to(".radar-point", {
        scale: 1.08,
        duration: 1.1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.12,
      });
    },
    { scope: detailRef, dependencies: [item.id] },
  );
  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(".radar-point", {
      opacity: 0,
      scale: 0.7,
      duration: 0.2,
      stagger: 0.05,
      ease: "power2.in",
    }).to(
      ".detail-image, .detail-back",
      {
        opacity: 0,
        y: 20,
        duration: 0.25,
        ease: "power2.in",
      },
      "-=0.1",
    );
  };

  return (
    <div
      ref={detailRef}
      className="relative flex flex-1 flex-col items-center justify-between w-full"
    >
      {/* Main Image */}
      <div className="flex flex-1 items-center">
        <img
          src={item.src}
          className="h-100 md:h-125 rounded-3xl object-cover"
          alt="catalog-detail"
        />
      </div>
      {/* Back */}
      <button
        onClick={handleClose}
        className="flex z-50 text-white bg-black/50 px-4 py-3 md:py-4 rounded-full mr-auto gap-2"
      >
        ←<span className="hidden md:block">Back</span>
      </button>

      {/* Radar */}
      {/* Target Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {item.item?.map((product) => (
          <ProductItem key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
}
