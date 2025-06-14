"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    rating: "",
    category: "",
    imageSrc: "",
    imageAlt: "",
    colors: "",
    sizes: "",
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

    const newProduct = {
      ...form,
      colors: form.colors.split(",").map((c) => c.trim()),
      sizes: form.sizes.split(",").map((s) => s.trim()),
    };

    // Replace with actual save logic
    console.log("Product Added:", newProduct);

    toast.success("Product added successfully!");
    setForm({
      name: "",
      price: "",
      description: "",
      rating: "",
      category: "",
      imageSrc: "",
      imageAlt: "",
      colors: "",
      sizes: "",
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900"
        />
        <input
          type="text"
          name="price"
          placeholder="Price (e.g., ₹399)"
          value={form.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900"
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (0 - 5)"
          value={form.rating}
          onChange={handleChange}
          step="0.1"
          min="0"
          max="5"
          className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900"
        />
        <input
          type="text"
          name="imageSrc"
          placeholder="Paste image URL or use file upload"
          value={form.imageSrc}
          onChange={handleChange}
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
            src={form.imageSrc}
            alt="Preview"
            className="mt-2 w-48 h-48 object-contain border border-gray-700 rounded"
          />
        )}
        <input
          type="text"
          name="imageAlt"
          placeholder="Image Alt Text"
          value={form.imageAlt}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900"
        />
        <input
          type="text"
          name="colors"
          placeholder="Colors (comma-separated: Red, Blue)"
          value={form.colors}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900"
        />
        <input
          type="text"
          name="sizes"
          placeholder="Sizes (comma-separated: S, M, L, XL)"
          value={form.sizes}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900"
        />

        <button
          type="submit"
          className="bg-blue-600 px-6 py-2 rounded text-white font-semibold hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
