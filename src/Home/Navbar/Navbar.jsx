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
    <div className="bg-white shadow py-2">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">OLX</div>

        {/* Location and Search */}
        <div className="flex items-center space-x-4">
          {/* Location Dropdown */}
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-gray-600" />
            <select
              className="border rounded-lg px-3 py-2 bg-white"
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
              className="px-4 py-2 w-72 bg-white"
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
                className="w-10 h-10 object-cover border"
              />
            </button>
            {isMenuOpen && (
              <ul className="absolute right-0 bg-white shadow rounded-lg p-2">
                <li className="px-4 py-2">{fullname || "Guest"}</li>
                <li className="px-4 py-2 cursor-pointer hover:bg-gray-200">
                  Logout
                </li>
              </ul>
            )}
          </div>

          {/* Sell Button */}
          <button className="bg-gradient-to-r from-teal-500 to-teal-700 text-white px-4 py-2 rounded-lg">
            <FontAwesomeIcon icon={faPlus} />
            <span className="ml-2">SELL</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
