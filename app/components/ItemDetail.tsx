type Product = {
  id: number;
  src: string;
  name: string;
  price: string;
  position: string;
};

type CatalogItem = {
  id: number;
  src: string;
  position: string;
  item?: Product[];
};

export default function ItemDetail({
  item,
  onClose,
}: {
  item: CatalogItem;
  onClose: () => void;
}) {
  console.log("ITEM DETAIL DATA:", item);

  return (
    <div className="relative flex items-center justify-center w-full ">
      {/* Back */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 text-white bg-black/50 px-4 py-2 rounded-full"
      >
        ← Back
      </button>

      {/* Main Image */}
      <img
        src={item.src}
        className="h-125 rounded-3xl object-cover"
        alt={item.src}
      />

      {/* Products */}
      <div className="flex gap-2 flex-col absolute w-full h-full">
        {item.item?.map((product) => (
          <div
            key={product.id}
            className={`
             bg-sky-200
              backdrop-blur-xl
              rounded-3xl
              border border-white/30
              shadow-xl
              px-6 py-4
              text-white
              absolute
              ${product.position}
            `}
          >
            <img
              src={product.src}
              className="w-full h-32 object-contain rounded-xl mb-3"
            />

            <h3 className="font-bold text-lg">{product.name}</h3>

            <p className="opacity-90">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
