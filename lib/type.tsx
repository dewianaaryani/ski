export type Product = {
  id: number;
  src: string;
  name: string;
  price: string;
  itemPosition: string;
  radarPosition: string;
};

export type CatalogItem = {
  id: number;
  src: string;
  position: string;
  item?: Product[];
};
// type CatalogItem = {
//   id: number;
//   src: string;
//   position: string;
//   item?: {
//     id: number;
//     src: string;
//     name: string;
//     price: string;
//   }[];
// };
