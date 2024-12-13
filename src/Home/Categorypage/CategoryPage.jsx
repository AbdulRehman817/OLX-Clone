import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://dummyjson.com/products/category/${encodeURIComponent(
            category
          )}`
        ); // Fetch products for the specific category
        setProducts(res.data.products);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching category products:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  const handleCall = () => {
    alert("Call button clicked!");
  };

  const handleChat = () => {
    alert("Chat button clicked!");
  };

  return (
    <div className="flex flex-col flex-wrap gap-1 bg-white m-[1px] p-[20px]">
      <h1 className="text-4xl font-bold mb-5 tracking-tighter text-[#002f34] text-center">
        {category}
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner text-info w-28"></span>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : products.length > 0 ? (
        products.map((item) => (
          <ProductCard
            key={item.id}
            image={item.thumbnail}
            price={`$${item.price}`}
            title={item.title}
            location="Unknown Location"
            time="Just now"
            onCall={handleCall}
            onChat={handleChat}
          />
        ))
      ) : (
        <p className="text-center">No products found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
