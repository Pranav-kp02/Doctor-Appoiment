import React, { useEffect } from "react";
import "./Home.css";
import Carsol from "../Componets/Home/Carsol";
import Department from "../Componets/Home/Department";
import EyeContent from "../Componets/Home/EyeContent";
import AboutUs from "../Componets/Home/AboutUs";
import Review from "../Componets/Home/Review";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <Carsol />
      <Department />
      <EyeContent />
      <AboutUs />
      <Review />
    </>
  );
};

export default Home;
