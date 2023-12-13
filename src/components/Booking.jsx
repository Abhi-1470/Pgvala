import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box } from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import DirectionsIcon from "@mui/icons-material/Directions";
import BadgeIcon from "@mui/icons-material/Badge";

export default function Booking(props) {
  const [formattedBookingDate, setFormattedBookingDate] = React.useState(""); // State to store the formatted date
  const [formattedTime, setFormattedTime] = React.useState(""); // State to store the formatted time
  const [isHidden, setHidden] = React.useState(false);
  const [isDisabledLoader, setDisabledLoader] = React.useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // State to store the booking status (e.g., "cancelled")
  const [bookingStatus, setBookingStatus] = React.useState("");

  function handleLocation() {
    const latitude = props.latitude;
    const longitude = props.longitude;
    const googleMapsURL = `https://www.google.com/maps?daddr=${latitude},${longitude}`;
    window.open(googleMapsURL);
  }

  React.useEffect(() => {
    const storedStatus = localStorage.getItem(
      `bookingStatus_${props.entery_id}`
    );
    if (storedStatus) {
      setBookingStatus(storedStatus);
    }
    function formattedDate() {
      const userDate = new Date(props.date);
      const day = userDate.getDate().toString().padStart(2, "0");
      const month = (userDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
      const year = userDate.getFullYear();

      return `${day}/${month}/${year}`;
    }

    function formatTime() {
      const timeParts = props.visiting_time.split(":"); // Split the time into hours and minutes
      const hours = timeParts[0];
      const minutes = timeParts[1];

      // Determine whether it's AM or PM based on hours
      const amOrPm = hours >= 12 ? "PM" : "AM";

      // Convert hours to 12-hour format
      const formattedHours = hours % 12 || 12;

      return `${formattedHours}:${minutes} ${amOrPm}`;
    }
    setFormattedBookingDate(formattedDate());
    setFormattedTime(formatTime());
  }, [props.date, props.entery_id, props.visiting_time]);

  async function handleCancelVisit() {
    setDisabledLoader(true);
    try {
      const response = await axios.put(
        "https://davaivala.shop/cancel_schedule/?id=" + props.entery_id,
        null, // PUT request typically doesn't have a request body
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("API response: ", response.data.status);
      // Update the booking status in the state
      setBookingStatus("cancelled");
      localStorage.setItem(`bookingStatus_${props.entery_id}`, "cancelled");
      navigate("/bookings");
    } catch (error) {
      console.error("Failed to cancel your visit: ", error.message);
    }
    setDisabledLoader(false);
    setHidden(true);
  }

  if (bookingStatus === "cancelled") {
    return null; // Return null to hide the component when status is "cancelled"
  }

  return (
    bookingStatus !== "cancelled" && (
      <div
        className="booking-card"
        style={{
          marginTop: "2rem",
          marginBottom: "-1rem",
          border: "none",
          width: "95%",
          display: bookingStatus === "cancelled" ? "none" : "block",
        }}
      >
        <Card
          sx={{
            maxWidth: "100%",
            borderRadius: "25px",
            padding: "0.5rem",
          }}
        >
          <CardHeader
            action={
              <Button
                sx={{ marginLeft: "2rem", borderRadius: "25px" }}
                color="error"
                variant="contained"
                aria-label="cancel-button"
                onClick={handleCancelVisit}
              >
                Cancel
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <CircularProgress
                    sx={{
                      color: "#fff",
                      marginTop: "0.5rem",
                      marginLeft: "1rem",
                      marginBottom: "0.5rem",
                      display: isDisabledLoader ? "block" : "none",
                    }}
                  />
                </Box>
              </Button>
            }
            title={formattedBookingDate}
            subheader={formattedTime}
          />
          <CardContent style={{ borderTop: "1px solid #B4B4B3" }}>
            <Box variant="body2" color="text.secondary">
              <div className="booker">
                <div className="booker-details">
                  <h5 style={{ marginBottom: "1rem", fontWeight: "bold" }}>
                    <BadgeIcon
                      color="error"
                      sx={{ marginBottom: "0.4rem", marginRight: "0.2rem" }}
                    />
                    <span style={{ color: "#000" }}>Owner Name:</span>{" "}
                    {props.owner_name}
                  </h5>
                  <a
                    href={`tel:${props.contact1}`}
                    style={{ textDecoration: "none" }}
                  >
                    <p style={{ marginTop: "-0.2rem", fontWeight: "bold" }}>
                      <CallIcon
                        color="error"
                        sx={{ marginBottom: "0.4rem", marginRight: "0.2rem" }}
                      />
                      <span style={{ color: "#000" }}>Contact:</span>{" "}
                      {props.contact1}
                    </p>
                  </a>
                  <a
                    href={`tel:${props.contact2}`}
                    style={{ textDecoration: "none" }}
                  >
                    <p style={{ marginTop: "-0.8rem", fontWeight: "bold" }}>
                      <CallIcon
                        color="error"
                        sx={{ marginBottom: "0.4rem", marginRight: "0.2rem" }}
                      />
                      <span style={{ color: "#000" }}>Contact:</span>{" "}
                      {props.contact2}
                    </p>
                  </a>
                  <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
                    <LocationCityIcon
                      color="error"
                      sx={{ marginBottom: "0.4rem", marginRight: "0.2rem" }}
                    />
                    <span style={{ color: "#000" }}>Apartment:</span>{" "}
                    {props.apartment_name}
                  </p>
                  <p style={{ marginTop: "-1rem", fontWeight: "bold" }}>
                    <LocationOnIcon
                      color="error"
                      sx={{ marginBottom: "0.4rem", marginRight: "0.2rem" }}
                    />
                    <span style={{ color: "#000" }}>Address:</span>{" "}
                    {props.address}
                  </p>
                  <p style={{ marginTop: "-1rem", fontWeight: "bold" }}>
                    {props.locality}
                  </p>
                </div>
              </div>
              <Button
                variant="contained"
                color="error"
                size="small"
                sx={{ borderRadius: "15px" }}
                startIcon={<DirectionsIcon />}
                onClick={handleLocation}
              >
                Get Direction
              </Button>
            </Box>
          </CardContent>
        </Card>
      </div>
    )
  );
}
