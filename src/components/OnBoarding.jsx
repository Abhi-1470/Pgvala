import React from "react";
import Button from "@mui/material/Button";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";

function OnBoarding() {
  return (
    <div >
      <h6 className="fw-bold fs-3 text-center my-3" >On Board your Pg search.</h6>
      <div className="onboarding-buttons my-3 mx-2 d-flex justify-content-evenly">
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button
            className="fs-4"
            color="error"
            variant="contained"
            startIcon={<AppRegistrationIcon />}
          >
            Register
          </Button>
        </Link>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button 
            className="fs-4" 
            color="error" variant="outlined"
            startIcon={<LoginIcon />}>
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default OnBoarding;
