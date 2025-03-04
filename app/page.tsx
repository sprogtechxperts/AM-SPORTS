"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  subcategory: {
    id: number;
    name: string;
    category: { id: number; name: string };
  };
}

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Open Modal
  const handleShopNowClick = () => {
    setIsModalOpen(true);
  };

  // Image URL Helper
  const getImageUrl = (image: string | null) =>
    image
      ? `http://127.0.0.1:8000/storage/${image}`
      : "/placeholder.jpg";

  return (
    <div>
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <h1>A.M. Sports</h1>
        </div>
        <nav className={menuOpen ? "navMenu open" : "navMenu"}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </nav>
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="heroContent">
          <h2>Your One-Stop Shop for Sports Equipment</h2>
          <p>From beginners to pros, we provide top-notch sports gear!</p>
          <button onClick={handleShopNowClick} className="ctaButton">
            Shop Now
          </button>
        </div>
        <Image
          src="/hero-image.jpg"
          alt="Sports Banner"
          width={1400}
          height={600}
        />
      </section>

      {/* Featured Products Section */}
      <section className="featuredProducts">
        <h3>Featured Products</h3>
        <div className="productGrid">
          {products.map((product) => (
            <div className="productCard" key={product.id}>
              <Image
                src={getImageUrl(product.image)}
                alt={product.name}
                width={300}
                height={300}
              />
              <h5>{product.name}</h5>
              <p><strong>Category:</strong> {product.subcategory.category.name}</p>
              <p><strong>Subcategory:</strong> {product.subcategory.name}</p>
              <p><strong>Price:</strong> ₹{product.price}</p>
              <Link href={`/product/${product.id}`} className="viewDetails">View Details</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Register & Login */}
      {isModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <button className="closeButton" onClick={() => setIsModalOpen(false)}>✖</button>
            <h2>{showRegister ? "Register" : "Login"}</h2>
            {showRegister ? (
              <form className="form">
                <input type="text" placeholder="Name" required />
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Register</button>
                <p onClick={() => setShowRegister(false)}>Already have an account? Login</p>
              </form>
            ) : (
              <form className="form">
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Login</button>
                <p onClick={() => setShowRegister(true)}>Don't have an account? Register</p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer>
        <p>Contact Us: 1234567890 | info@amsports.com</p>
        <p>Follow us: <a href="#">Facebook</a> | <a href="#">Instagram</a></p>
      </footer>
    </div>
  );
};

export default Home;
