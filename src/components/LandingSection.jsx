 import React from "react";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

function LandingSection() {
  return (
    <div className="landing-page m-3 py-4">
      <div className="features-section my-3 d-flex justify-content-between">
        <div className="features mb-3 text-center">
          <LocationCityIcon sx={{color: "red"}} size="big"  />
          <p className="feature-number">10+</p>
          <p className="feature-name">Cities</p>
        </div>
        <div className="features mb-3 text-center">
          <MeetingRoomIcon sx={{color: "red"}} size="small" />
          <p className="feature-number">500+</p>
          <p className="feature-name">Pg's</p>
        </div>
        <div className="features mb-3 text-center">
          <VerifiedUserIcon sx={{color: "red"}} size="small" />
          <p className="feature-number">800+</p>
          <p className="feature-name">Reviews</p>
        </div>
        <div className="features mb-3 text-center ">
          <SentimentVerySatisfiedIcon sx={{color: "red"}} size="small" />
          <p className="feature-number">1000+</p>
          <p className="feature-name">Customers</p>
        </div>
      </div>
    </div>
  );
}

export default LandingSection;
