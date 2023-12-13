import React from "react";
import CarouselComponent from "./Carousel";
import Search from "./Search";
import LandingSection from "./LandingSection";
import Reviews from "./Reviews";
import OnBoarding from "./OnBoarding";


import img1 from "../assets/images/home1-img.jpg";
import img2 from "../assets/images/home2-img.jpg";
import img3 from "../assets/images/home3-img.jpg";
import InstallButton from "./InstallButton";

function MainLandingPage() {
  

  return (
    <div>
      <CarouselComponent img1={img1} img2={img2} img3={img3} />
      <Search />
      <LandingSection />
      <Reviews />
      <OnBoarding />
      <InstallButton />
    </div>
  );
}

export default MainLandingPage;
