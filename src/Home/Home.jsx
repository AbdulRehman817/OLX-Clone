import React from "react";
import Navbar from "./Navbar/Navbar";
import Carasouel from "./Carasouel/Carasouel";
import Catagories from "./Categories/Catagories";
import Allcards from "./AllCards/Allcards";
import Signup from "./Signup/Signup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  auth,
  collection,
  getDocs,
  db,
} from "../../FirebaseConfig/Firebase.js";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);
  return (
    <div className="bg-white">
      <Carasouel />
      <Catagories />
      <Allcards />
      {/* <Signup /> */}
    </div>
  );
};

export default Home;
