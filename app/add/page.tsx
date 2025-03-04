"use client"; // Next.js Client Component

import React, { useState, useEffect } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);

  // Fetch categories and subcategories
  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
      try {
        const [categoryRes, subcategoryRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/categories"),
          fetch("http://127.0.0.1:8000/api/subcategories"),
        ]);

        const [categoryData, subcategoryData] = await Promise.all([
          categoryRes.json(),
          subcategoryRes.json(),
        ]);

        setCategories(categoryData);
        setSubcategories(subcategoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategoriesAndSubcategories();
  }, []);

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category_id", categoryId);
    formData.append("subcategory_id", subcategoryId);

    if (image) {
      formData.append("image", image); // Image file
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/products", {
        method: "POST",
        body: formData, // Send form data with image
      });

      if (response.ok) {
        alert("Product added successfully!");
        setName("");
        setPrice("");
        setImage(null);
        setCategoryId("");
        setSubcategoryId("");
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error occurred while adding the product.");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Price (₹):</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <label>Category:</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <label>Subcategory:</label>
        <select
          value={subcategoryId}
          onChange={(e) => setSubcategoryId(e.target.value)}
          required
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;