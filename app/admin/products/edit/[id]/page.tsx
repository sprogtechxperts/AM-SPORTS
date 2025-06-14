"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { allProducts } from "@/lib/allProducts";
import { toast } from "react-toastify";
import Image from "next/image";

export default function EditProductPage() {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === parseInt(id as string));

  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price || "",
    description: product?.description || "",
    rating: product?.rating || "",
    category: product?.category || "",
    imageSrc: product?.imageSrc || "",
    imageAlt: product?.imageAlt || "",
    colors: product?.colors.join(", ") || "",
    sizes: product?.sizes.join(", ") || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, imageSrc: imageUrl }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // const updatedProduct = {
    //   ...form,
    //   colors: form.colors.split(",").map((c) => c.trim()),
    //   sizes: form.sizes.split(",").map((s) => s.trim()),
    // };

    // console.log("Updated Product:", updatedProduct);
    toast.success(" Product updated successfully!");

    // Reset form (optional)
    // setForm({ ... }); // Keep or reset form if needed

    // TODO: Replace this with actual update logic (e.g., API call)
  };

  if (!product) return <p className="text-red-500">Product not found.</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Edit Product - {product.name}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900"
        />
        <input
          type="text"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price (e.g., ₹399)"
          className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900"
          rows={4}
        />
        <input
          type="number"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating (e.g., 4.5)"
          className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900"
          step="0.1"
          min="0"
          max="5"
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900"
        />

        <input
          type="text"
          name="imageSrc"
          value={form.imageSrc}
          onChange={handleChange}
          placeholder="Paste image URL or use file upload"
          className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900 text-white"
        />

        {form.imageSrc && (
          <Image
            width={250}
            height={250}
            src={form.imageSrc}
            alt="Preview"
            className="mt-2 w-48 h-48 object-contain border border-gray-700 rounded"
          />
        )}

        <input
          type="text"
          name="imageAlt"
          value={form.imageAlt}
          onChange={handleChange}
          placeholder="Image Alt Text"
          className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900"
        />
        <input
          type="text"
          name="colors"
          value={form.colors}
          onChange={handleChange}
          placeholder="Colors (comma-separated: Red, Blue)"
          className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900"
        />
        <input
          type="text"
          name="sizes"
          value={form.sizes}
          onChange={handleChange}
          placeholder="Sizes (comma-separated: S, M, L, XL)"
          className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900"
        />

        <button
          type="submit"
          className="bg-green-600 px-6 py-2 rounded text-white font-semibold hover:bg-green-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
