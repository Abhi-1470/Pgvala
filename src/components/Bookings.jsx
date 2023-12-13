import React, { useEffect, useState } from "react";
import Booking from "./Booking";
import axios from "axios";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function Bookings() {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [isDisabledLoader, setDisabledLoader] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setDisabledLoader(true);
    async function scheduledVisits() {
      try {
        const response = await axios.get(
          "https://davaivala.shop/vist_schedule/",
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const scheduledVisits = response.data;
        console.log("API response: ", scheduledVisits);
        setBookingDetails(scheduledVisits);
        setDisabledLoader(false);
      } catch (error) {
        console.error("Failed to fetch your scheduled visits: ", error.message);
      }
    }
    scheduledVisits();
  }, [token]);

  return (
    <div className="bookings" style={{ marginBottom: "7rem" }}>
      <h2 style={{ paddingTop: "2rem", fontWeight: "bold" }}>
        Your Schedule Visits
      </h2>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <CircularProgress
          color="error"
          sx={{
            marginTop: "2rem",
            display: isDisabledLoader ? "block" : "none",
          }}
        />
      </Box>
      {bookingDetails.map((bookingDetail, index) => (
        <Booking
          key={index}
          entery_id={bookingDetail.entery_id}
          date={bookingDetail.date}
          latitude={bookingDetail.latitude}
          longitude={bookingDetail.longitude}
          visiting_time={bookingDetail.visting_time}
          status={bookingDetail.status}
          apartment_name={bookingDetail.apartment_name}
          address={bookingDetail.address}
          locality={bookingDetail.locality}
          contact1={bookingDetail.contact1}
          contact2={bookingDetail.contact2}
          owner_name={bookingDetail.owner_name}
        />
      ))}
    </div>
  );
}

export default Bookings;
