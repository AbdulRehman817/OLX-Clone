import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../../FirebaseConfig/Firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [image, setImage] = useState();
  const [fullname, setFullname] = useState();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Pakistan");
  const [searchInput, setSearchInput] = useState("");

  // Toggle menu state
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Fetch country names from REST Countries API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data.map((country) => country.name.common));
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch user data from Firestore
  useEffect(() => {
    const getUserData = async (uid) => {
      const userCollection = collection(db, "userData");
      const snapshot = await getDocs(userCollection);
      snapshot.forEach((doc) => {
        if (doc.data().uid === uid) {
          setImage(doc.data().photoURL);
          setFullname(`${doc.data().firstName} ${doc.data().lastName}`);
        }
      });
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserData(user.uid);
      }
    });
  }, []);

  return (
    <div className="bg-white shadow pt-5 pb-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">OLX</div>

        {/* Location and Search */}
        <div className="flex items-center space-x-4">
          {/* Location Dropdown */}
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-gray-600 relative left-8" />
            <select
              className="border rounded-lg pl-8 py-2 bg-white w-72"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Find Cars, Phones, and more..."
              className="px-4 py-2 w-96 bg-white"
            />
            <button className="bg-teal-900 text-white px-4 h-[40px]">
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
        </div>

        {/* User Profile and Sell Button */}
        <div className="flex items-center space-x-4">
          {/* User Avatar */}
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="rounded-full overflow-hidden"
            >
              <img
                src={image || "default-avatar.png"}
                alt="User Avatar"
                className="w-12 h-12 object-cover"
              />
            </button>
            {isMenuOpen && (
              <ul className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-2xl py-4 z-20 transform scale-95 opacity-0 transition-transform duration-300 ease-out hover:scale-100 hover:opacity-100">
                <li className="px-4 py-3 rounded-t-lg bg-gradient-to-r from-gray-50 to-white text-gray-800 font-medium shadow-inner border-b border-gray-200">
                  {fullname || "Guest"}
                </li>
                <li className="px-4 py-3 cursor-pointer rounded-lg flex items-center space-x-2 hover:bg-teal-100 hover:text-teal-900 hover:shadow-md transform hover:scale-105 transition-transform duration-200 ease-in-out text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-teal-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span>Logout</span>
                </li>
                <li className="px-4 py-3 cursor-pointer rounded-lg flex items-center space-x-2 hover:bg-teal-100 hover:text-teal-900 hover:shadow-md transform hover:scale-105 transition-transform duration-200 ease-in-out text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-teal-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v18l15-9-15-9z"
                    />
                  </svg>
                  <span>Favorite</span>
                </li>
              </ul>
            )}
          </div>

          {/* Sell Button */}
          <button className="bg-gradient-to-r from-teal-500 to-teal-700 text-white pr-3 pl-0 py-2 rounded-lg">
            <FontAwesomeIcon icon={faPlus} className="relative left-4" />
            <span className="ml-[30px]">SELL</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
