"use client";
import React, { useRef, useState } from "react";
import { GridItem } from "./GridItem";
import ItemDetail from "./ItemDetail";
import { CatalogItem } from "@/lib/type";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Catalog() {
  const [selectedCatalog, setSelectedCatalog] = useState<CatalogItem | null>(
    null,
  );
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (selectedCatalog) return;

      const cards = gsap.utils.toArray<HTMLElement>(".catalog-card");
      gsap.set(cards, { opacity: 0, y: 40, scale: 0.94 });

      const tl = gsap.timeline();
      tl.from(titleRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power2.out",
      }).to(
        cards,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "back.out(1.5)",
        },
        "-=0.25",
      );
    },
    { scope: sectionRef, dependencies: [selectedCatalog] },
  );
  const catalogs = [
    {
      id: 3,
      src: "/images/catalog/3.png",
      position: "object-top",
    },
    {
      id: 5,
      src: "/images/catalog/5.png",
      position: "object-top",
      item: [
        {
          id: 1,
          src: "/images/catalog/item/1.png",
          name: "Snow Dry Jacket",
          price: "1000",
          itemPosition: "top-120 md:top-2 left-60 md:left-40",

          radarPosition: "top-[60%] md:top-[70%] left-[45%]", // body
        },
        {
          id: 2,
          src: "/images/catalog/item/2.png",
          name: "Snow Dry Helmet",
          price: "1000",
          itemPosition: "top-2 right-3 md:right-40",

          radarPosition: "top-[28%] md:top-[32%] left-[50%]",
        },
      ],
    },
    {
      id: 2,
      src: "/images/catalog/2.png",
      position: "object-top",
    },

    {
      id: 4,
      src: "/images/catalog/4.png",
      position: "center",
    },

    {
      id: 1,
      src: "/images/catalog/1.png",
      position: "object-top",
    },
  ];
  const handleSelect = (item: CatalogItem, index: number) => {
    const cards = gsap.utils.toArray<HTMLElement>(".catalog-card");
    const clicked = cards[index];

    if (!clicked) {
      setSelectedCatalog(item);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => setSelectedCatalog(item),
    });

    tl.to(clicked, {
      scale: 1.07,
      duration: 0.22,
      ease: "power2.out",
    }).to(
      cards.filter((_, i) => i !== index),
      {
        opacity: 0,
        scale: 0.9,
        y: 20,
        duration: 0.35,
        stagger: 0.03,
        ease: "power2.inOut",
      },
      0,
    );
  };
  return (
    <section
      id="catalog"
      className="bg-linear-to-b from-[#6C97BD] to-[#E8F1F6]"
      ref={sectionRef}
    >
      <div className="min-h-screen max-h-screen bg-[url(/images/bg-snow.png)] px-4 py-10 md:py-12 flex flex-col items-center gap-10">
        <div
          className="flex flex-col justify-center items-center gap-1 md:gap-4"
          ref={titleRef}
        >
          <h1 className="header">Catalog</h1>
          <p className="sub-header">YOU CAN GET THIS ON THE SPOT!</p>
        </div>
        {!selectedCatalog ? (
          <div
            ref={gridRef}
            className="
               flex-1
              grid
              grid-cols-2
              grid-rows-1
              md:grid-cols-4
              md:grid-rows-3
              gap-2
              md:gap-6
              md:h-120
              md:py-6
px-4
              md:px-12
            "
          >
            {catalogs.map((item, i) => (
              <GridItem
                key={i}
                img={item.src}
                index={i}
                position={item.position}
                onClick={() => handleSelect(item, i)}
              />
            ))}
          </div>
        ) : (
          <ItemDetail
            item={selectedCatalog}
            onClose={() => setSelectedCatalog(null)}
          />
        )}
      </div>
    </section>
  );
}
