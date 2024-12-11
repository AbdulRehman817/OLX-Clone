import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  onAuthStateChanged,
  auth,
  collection,
  getDocs,
  db,
} from "../../../FirebaseConfig/Firebase.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const fetchData = (value) => {
    const profileMenuItems = [
      { label: "Profile", onClick: () => alert("Profile clicked") },
      { label: "Settings", onClick: () => alert("Settings clicked") },
      { label: "Logout", onClick: () => alert("Logout clicked") },
    ];
    let userUid;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [Image, setImage] = useState();
    const [fullname, setFullname] = useState();

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("Pakistan");

    // Toggle menu state
    const closeMenu = () => setIsMenuOpen(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          userUid = user.uid;
          getData(userUid);
        }
      });
    }, []);

    const getData = async (uid) => {
      const q = collection(db, "userData");

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (uid === doc.data().uid) {
          setImage(doc.data().photoURL);
          setFullname(doc.data().firstName + " " + doc.data().lastName);
        }
      });
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
            <div className="flex items-center space-x-4 w-3/4">
              {/* Location Dropdown */}
              <div className="">
                <FaMapMarkerAlt className="text-gray-600 relative top-[28px] z-[2] h-[25px] left-[10px]" />
                <div className="border rounded-lg overflow-hidden relative bottom-[10px]">
                  <select
                    className="select select-bordered w-[90%] ml-[20px] max-w-xs bg-white"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                  >
                    {countries.map((country, index) => (
                      <option
                        className="text-black"
                        key={index}
                        value={country}
                      >
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
                  value={input}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="Find Cars, Phones, and more..."
                  className="input-md input-bordered w-full max-w-lg bg-white"
                />

                <button className="bg-teal-900 text-white px-4 flex items-center justify-center h-[62px] ">
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
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar transition-transform duration-300 ease-in-out transform hover:scale-105"
                  >
                    <div className="w-16 h-16 -ml-[105px] rounded-full overflow-hidden shadow-lg border-2 border-indigo-600">
                      <img
                        alt="User Avatar"
                        src={Image}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-xl z-[1] mt-4 w-64 p-4 shadow-xl transition-all duration-300 ease-out transform opacity-0 scale-95 dropdown-hover:opacity-100 dropdown-hover:scale-100"
                  >
                    <li>
                      <a className="flex justify-between items-center py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-200 ease-in-out transform hover:scale-105">
                        {fullname}
                        <span className="badge badge-primary ml-2 text-sm px-2 py-1 rounded-full bg-pink-300 text-gray-900">
                          New
                        </span>
                      </a>
                    </li>
                    <li>
                      <a className="py-2 px-4 rounded-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-200 ease-in-out transform">
                        Settings
                      </a>
                    </li>
                    <li>
                      <a className="py-2 px-4 rounded-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-200 ease-in-out transform">
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <button className="ml-[90px] flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
                <FontAwesomeIcon icon={faPlus} />
                <span>SELL</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
};
export default Navbar;
