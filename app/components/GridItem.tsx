export function GridItem({
  img,
  index,
  position,
  onClick,
}: {
  img: string;
  index: number;
  position: string;
  onClick: () => void;
}) {
  const layouts = [
    "col-span-1 row-span-1", // A
    "col-span-1 md:col-span-2 row-span-1 md:row-span-3", // B
    "col-span-1 row-span-1 md:row-span-2", // C
    "col-span-1 row-span-1 md:row-span-2", // D
    "col-span-1 md:col-span-1 row-span-1", // F
  ];

  return (
    <div
      onClick={onClick}
      className={`
        relative
        overflow-hidden
        rounded-2xl
        ${layouts[index]}
        cursor-pointer
        hover:scale-105
        transition duration-300
        transform-gpu
      
      `}
    >
      <img
        src={img}
        alt={img}
        className={`w-full h-full object-cover ${position}`}
      />
    </div>
  );
}
