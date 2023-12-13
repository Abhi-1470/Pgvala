import React, { useEffect, useState } from "react";
import OwnerBookingSchedule from "./OwnerBookingSchedule";
import axios from "axios";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function OwnerBookingSchedules() {
  const [ownerBookingDetails, setOwnerBookingDetails] = useState([]);
  const [isDisabledLoader, setDisabledLoader] = useState(false);
  const ownerToken = localStorage.getItem("ownerToken");

  useEffect(() => {
    setDisabledLoader(true);
    async function scheduledVisits() {
      try {
        const response = await axios.get(
          "https://davaivala.shop/visting_client/",
          {
            headers: {
              Accept: "application/json",
                Authorization: "Bearer " + ownerToken,
              
            },
          }
        );
        const scheduledVisits = response.data;
        console.log("API response: ", scheduledVisits);
        setOwnerBookingDetails(scheduledVisits);
        setDisabledLoader(false);
      } catch (error) {
        console.error("Failed to fetch your scheduled visits: ", error.message);
      }
    }
    scheduledVisits();
  }, [ownerToken]);

  return (
    <div className="bookings" style={{ marginBottom: "7rem" }}>
      <h2 style={{ paddingTop: "2rem" }}>Your Visiter Schedule</h2>
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
      {ownerBookingDetails.map((ownerBookingDetail, index) => (
        <OwnerBookingSchedule
          key={index}
          entery_id={ownerBookingDetail.entery_id}
          date={ownerBookingDetail.date}
          username={ownerBookingDetail.username}
          visiting_time={ownerBookingDetail.visting_time}
          name={ownerBookingDetail.name}
          city={ownerBookingDetail.city}
          status={ownerBookingDetail.status}
          contact={ownerBookingDetail.contact}
          roomid={ownerBookingDetail.roomid}
        />
      ))}
    </div>
  );
}

export default OwnerBookingSchedules;
