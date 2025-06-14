
import Image from "next/image";
import Link from "next/link";
import { allProducts } from "@/lib/allProducts";
import { Product } from "@/lib/type";

interface ProductCardProps {
  showAll?: boolean;
  products?: Product[];
}


export default function ProductCard({ showAll = false, products }: ProductCardProps) {
  
  const displayedProducts = products
    ? products
    : showAll
    ? allProducts
    : allProducts.slice(0, 8);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {displayedProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="group relative rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-[#0f172a] to-[#1e293b] cursor-pointer border border-blue-800 transform hover:scale-[1.02] flex flex-col h-full">
              <div className="flex justify-center">
                <Image
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  width={300}
                  height={300}
                  className="rounded-lg bg-gray-800 object-cover h-[250px] w-full"
                />
              </div>
              <div className="mt-4 flex-grow text-left">
  <h3 className="text-lg text-white font-semibold truncate">
    {product.name}
  </h3>
  <p className="text-sm text-gray-300 mt-1">
    {product.description.slice(0, 60)}...
  </p>
  <div className="flex justify-between items-center mt-2">
    <span className="text-green-400 font-bold">{product.price}</span>
    <span className="text-yellow-400 text-sm">⭐ {product.rating}/5</span>
  </div>
  <p className="inline-block mt-2 text-xs font-semibold text-blue-200 rounded-full">
    Category: {product.category}
  </p>
</div>
              <div className="mt-4 text-center">
                <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-md text-sm font-medium hover:bg-blue-700 transition">
                  View Product Details
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
