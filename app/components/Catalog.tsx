"use client";
import React, { useState } from "react";
import { GridItem } from "./GridItem";
import ItemDetail from "./ItemDetail";
import { CatalogItem } from "@/lib/type";

export default function Catalog() {
  const [selectedCatalog, setSelectedCatalog] = useState<CatalogItem | null>(
    null,
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
  return (
    <section
      id="catalog"
      className="bg-linear-to-b from-[#6C97BD] to-[#E8F1F6]"
    >
      <div className="min-h-screen max-h-screen bg-[url(/images/bg-snow.png)] px-4 py-10 md:py-12 flex flex-col items-center gap-10">
        <div className="flex flex-col justify-center items-center gap-1 md:gap-4">
          <h1 className="header">Catalog</h1>
          <p className="sub-header">YOU CAN GET THIS ON THE SPOT!</p>
        </div>
        {!selectedCatalog ? (
          <div
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
                onClick={() => setSelectedCatalog(item)}
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
