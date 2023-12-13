import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import SinglePaymentStatus from "./SinglePaymentStatus";

function CompletePaymentStatus() {
  const ownerToken = localStorage.getItem("ownerToken");
  const [paymentStatusList, setPaymentStatusList] = React.useState([]);
  const [isDisabledLoader, setDisabledLoader] = React.useState(false);

  useEffect(() => {
    setDisabledLoader(true);
    async function getPaymentStatus() {
      try {
        const response = await axios.get(
          "https://davaivala.shop/payment-status/",
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + ownerToken,
            },
          }
        );
        const allPaymentStatus = response.data;
        console.log("API response: ", allPaymentStatus);
        setPaymentStatusList(allPaymentStatus);
        setDisabledLoader(false);
      } catch (error) {
        console.error("Failed to get the Payment Status list: ", error.message);
      }
    }
    getPaymentStatus();
  }, [ownerToken]);

  return (
    <div style={{ marginBottom: "5rem" }}>
      <h2
        style={{
          marginTop: "2rem",
          marginBottom: "-2rem",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        Payment's History
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
            display: isDisabledLoader ? "inline" : "none",
          }}
        />
      </Box>
      {paymentStatusList.map((paymentStatus, index) => (
        <SinglePaymentStatus
          key={index}
          roomid={paymentStatus.roomid}
          date={paymentStatus.date}
          username={paymentStatus.username}
          status={paymentStatus.status}
          visitingTime={paymentStatus.visiting_time}
          name={paymentStatus.name}
          contact={paymentStatus.contact}
          aggFees={paymentStatus.agg_fee}
          paymentStatus={paymentStatus.payment_status}
          paymentMode={paymentStatus.payment_mode}
          paymentSettlementDate={paymentStatus.payment_settlement_date}
          transactionID={paymentStatus.transcationid}
        />
      ))}
    </div>
  );
}

export default CompletePaymentStatus;
