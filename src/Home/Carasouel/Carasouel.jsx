import React, { useState, useEffect } from "react";

const AutoCarousel = () => {
  const slides = [
    {
      id: 1,
      image: "https://images.olx.com.pk/thumbnails/437508562-800x600.webp",
      alt: "Slide 1",
    },
    {
      id: 2,
      image: "https://images.olx.com.pk/thumbnails/437508562-800x600.webp",
      alt: "Slide 2",
    },
    {
      id: 3,
      image: "https://images.olx.com.pk/thumbnails/437508562-800x600.webp",
      alt: "Slide 3",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically move to the next slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [slides.length]);

  return (
    <div className="relative w-full h-64 overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="flex-shrink-0 w-full">
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-gray-800" : "bg-gray-400"
            } focus:outline-none`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default AutoCarousel;
