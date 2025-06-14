"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const images = [
  {
    url: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "Gear Up for the Game",
    subtitle: "Get up to 50% off on fitness & sportswear!",
  },
  {
    url: "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "Run Faster, Go Further",
    subtitle: "Best running shoes from ₹999",
  },
  {
    url: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "Cricket Essentials",
    subtitle: "Bats, balls, gloves & more at unbeatable prices",
  },
  {
    url: "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "Football Season Sale",
    subtitle: "Shoes, kits & accessories starting at ₹599",
  },
];

const SportsCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  return (
    <div className="relative w-full h-[50vh] overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={img.url}
              alt={img.title}
              fill
              className="object-cover"
              priority={i === current}
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start px-8">
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                {img.title}
              </h2>
              <p className="text-sm sm:text-xl text-white font-medium drop-shadow">
                {img.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-white/30 text-white p-2 rounded-full hover:bg-white/50 z-20"
      >
        ⬅
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-white/30 text-white p-2 rounded-full hover:bg-white/50 z-20"
      >
        ➡
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              idx === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SportsCarousel;
