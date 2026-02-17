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
          name: "Snow Dry Helmet",
          price: "1000",
          position: "top-2 left-2",
        },
        {
          id: 2,
          src: "/images/catalog/item/2.png",
          name: "Snow Dry Jacket",
          price: "1000",
          position: "top-2 right-3",
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
      <div className="min-h-screen bg-[url(/images/bg-snow.png)] px-4 py-12 flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col justify-center items-center gap-1 md:gap-4">
          <h1 className="header">Catalog</h1>
          <p className="sub-header">YOU CAN GET THIS ON THE SPOT!</p>
        </div>
        {!selectedCatalog ? (
          <div
            className="
              grid
              grid-cols-2
              grid-rows-1
              md:grid-cols-4
              md:grid-rows-3
              gap-6
              h-150
              md:h-120
              px-12
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
