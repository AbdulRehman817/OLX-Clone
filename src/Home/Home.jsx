import React from "react";
import Navbar from "./Navbar/Navbar";
import Carasouel from "./Carasouel/Carasouel";
import Catagories from "./Categories/Catagories";
const Home = () => {
  return (
    <div className="bg-white">
      <Carasouel />
      <Catagories />
    </div>
  );
};

export default Home;
