import { categories } from "@/lib/allProducts";

const SportsCategories = () => {
  return (
    <div className="bg-black py-8 px-4 min-h-[150px]">
      <h2 className="text-white text-4xl font-bold text-center mb-8 mt-10">
        Shop by Category
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer whitespace-nowrap"
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportsCategories;
