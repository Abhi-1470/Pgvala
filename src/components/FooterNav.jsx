import * as React from "react";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import HomeIcon from "@mui/icons-material/Home";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";

function FooterNav() {
  const [value, setValue] = React.useState(1);
  const [bottomNavigator, setBottomNavigator] = React.useState();

  const isMobile = window.innerWidth < 768; // Define a threshold for mobile view

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const ownerToken = localStorage.getItem("ownerToken");

  // Define the routes for each case
  const scheduleVisitRoute = token
    ? "/bookings"
    : ownerToken
    ? "/ownerbookingschedule"
    : "/bookings";
  const cashbackRoute = token
    ? "/roominputowner"
    : ownerToken
    ? "/ownerpaymentstatus"
    : "/roominputowner";
  const homeRoute = token ? "/" : ownerToken ? "/accommodationlist" : "/";

  function handleScheduleVisitClick() {
    setBottomNavigator(1);
    navigate(scheduleVisitRoute);
  }

  function handleCashbackClick() {
    setBottomNavigator(2);
    navigate(cashbackRoute);
  }

  function handleHomeClick() {
    setBottomNavigator(3);
    navigate(homeRoute);
  }

  return (
    <div
      className="footer-nav"
      style={{
        boxShadow: "1px 1px 10px #000",
        position: "fixed",
        zIndex: "1000000",
      }}
    >
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0, // Apply different styles for mobile and larger screens
          ...(isMobile
            ? {
                width: "100%",
              }
            : {
                width: "375px",
                marginLeft: "35.3%"
              }),
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            onClick={handleScheduleVisitClick}
            label={
              token
                ? "Schedule Visit"
                : ownerToken
                ? "Visit"
                : "Schedule a Visit"
            }
            icon={<EventAvailableIcon sx={{ color: "red" }} />}
            sx={{
              "&.Mui-selected": {
                color: "red",
                fontWeight: "bold",
              },
            }}
          />
          <BottomNavigationAction
            onClick={handleHomeClick}
            label="Home"
            icon={<HomeIcon sx={{ color: "red" }} />}
            sx={{
              "&.Mui-selected": {
                color: "red",
                fontWeight: "bold",
              },
            }}
          />
          <BottomNavigationAction
            onClick={handleCashbackClick}
            label={token ? "Cashback" : ownerToken ? "Transaction" : "Cashback"}
            icon={<CurrencyRupeeIcon sx={{ color: "red" }} />}
            sx={{
              "&.Mui-selected": {
                color: "red",
                fontWeight: "bold",
              },
            }}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
}

export default FooterNav;
