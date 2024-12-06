// export default Navbar;
import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const Navbar = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Pakistan");

  // Fetch country names from REST Countries API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryNames = data.map((country) => country.name.common); // Extract country names
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <div className="bg-white shadow py-2 border-b-4 border-b-white border-b-solid">
      <div className="container mx-auto">
        <div className="flex items-center justify-start space-x-6 mb-3">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800">
            <span className="text-black">O</span>
            <span className="text-gray-800">L</span>
            <span className="text-black">X</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <button className="text-sm font-medium text-gray-600 hover:text-black focus:text-black">
              Motors
            </button>
            <button className="text-sm font-medium text-gray-600 hover:text-black focus:text-black">
              Property
            </button>
          </div>
        </div>

        {/* Location and Search Bar */}
        <div className="flex justify-around">
          <div className="flex items-center space-x-4 w-3/4 ">
            {/* Location Dropdown */}
            <div className="">
              {/* Location Icon on the Left */}
              <FaMapMarkerAlt className="text-gray-600 relative top-[28px] z-[2] h-[25px] left-[10px]" />
              <div className="border rounded-lg overflow-hidden relative bottom-[10px]">
                <select
                  className="select select-bordered w-[90%] ml-[20px]  max-w-xs  bg-white"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                >
                  {countries.map((country, index) => (
                    <option className="text-black" key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Input */}
            <div className="flex items-center w-full max-w-lg border rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Find Cars, Phones, and more..."
                className="input-md input-bordered w-full max-w-lg bg-white"
              />
              <button className="bg-teal-900 text-white px-4 flex items-center justify-center h-[62px] ml-[30px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.9 14.32a8 8 0 111.41-1.41l4.38 4.37a1 1 0 01-1.42 1.42l-4.37-4.38zM8 14a6 6 0 100-12 6 6 0 000 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Login and Sell Buttons */}
            <div className="flex items-center space-x-4 relative left-14">
              <button className="text-teal-600 font-semibold px-4 py-2 rounded-lg border-2 border-teal-600 hover:bg-teal-600 hover:text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105">
                Login
              </button>

              <button className="flex items-center space-x-2 px-6 py-3 rounded-full border-2 text-teal-600 font-semibold border-teal-600 shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out hover:bg-teal-600 hover:text-white">
                <i className="fas fa-plus text-sm"></i>
                <span>SELL</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
