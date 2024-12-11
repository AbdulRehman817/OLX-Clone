import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../Cards/Cards";
import { useNavigate } from "react-router-dom";

const Allcards = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products?limit=100`); // Fetch more products initially
        setData(res.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleViewMore = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`); // Navigate to category page
  };

  const categories = [...new Set(data.map((item) => item.category))];

  return (
    <div className="bg-white">
      {loading ? (
        <p className="text-center text-xl">Loading...</p>
      ) : (
        categories.map((category) => (
          <div key={category} className="ml-10 mt-10">
            <div className="flex justify-between items-center mt-16">
              <h2 className="text-[#002f34] text-[2rem] capitalize font-bold mb-5">
                {category}
              </h2>
              <button
                onClick={() => handleViewMore(category)}
                className="text-blue-500 font-semibold text-sm hover:underline mr-10"
              >
                View more
              </button>
            </div>
            <div className="flex flex-wrap gap-10">
              {data
                .filter((item) => item.category === category)
                .slice(0, 3)
                .map((item) => (
                  <Cards
                    image={item.thumbnail}
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                  />
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Allcards;
