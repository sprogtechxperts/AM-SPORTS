"use client"; // Next.js Client Component
import React, { useState } from "react";
import Image from "next/image";


const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <h1>A.M. Sports</h1>
        </div>
        <nav className={menuOpen ? "navMenu open" : "navMenu"}>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Contact Us</a></li>
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
          <a href="#" className="ctaButton">Shop Now</a>
        </div>
        <Image src="/hero-image.jpg" alt="Sports Banner" width={1400} height={600} />
      </section>

      {/* About Us Section */}
      <section className="about">
        <h3>About Us</h3>
        <p>We provide top-quality sports equipment for all levels. Your success is our mission!</p>
      </section>

      {/* Featured Products Section */}
      <section className="featuredProducts">
        <h3>Featured Products</h3>
        <div className="productGrid">
          <div className="product">
            <Image src="/product1.jpg" alt="Sports Shoes" width={200} height={200} />
            <p>Sports Shoes</p>
            <p>₹1999</p>
            <a href="#">View Details</a>
          </div>
          <div className="product">
            <Image src="/product2.jpg" alt="Football" width={200} height={200} />
            <p>Football</p>
            <p>₹899</p>
            <a href="#">View Details</a>
          </div>
          <div className="product">
            <Image src="/product3.jpg" alt="Tennis Racket" width={200} height={200} />
            <p>Tennis Racket</p>
            <p>₹1499</p>
            <a href="#">View Details</a>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer>
        <div className="footerContent">
          <p>Contact Us: 1234567890 | info@amsports.com</p>
          <p>Follow us: <a href="#">Facebook</a> | <a href="#">Instagram</a></p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
