export type Product = {
  id: number;
  name: string;
  description: string;
  price: string; // e.g., "₹399"
  rating: number;
  category: string;
  imageSrc: string;
  imageAlt: string;
  colors: string[];
  sizes: string[];
};
