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
  return (
    <div className="relative flex flex-1 flex-col items-center justify-between w-full">
      {/* Main Image */}
      <div className="flex flex-1 items-center">
        <img
          src={item.src}
          className="h-100 md:h-125 rounded-3xl object-cover"
        />
      </div>
      {/* Back */}
      <button
        onClick={onClose}
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
