import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function SinglePaymentStatus(props) {
  function capitalizeFirstLetter(string) {
    if (string) {
      var splitStr = string.toLowerCase().split(" ");
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] =
          splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      return splitStr.join(" ");
    } else {
      return ""; // Handle the case when string is undefined or empty
    }
  }

  const paymentMode = props.paymentMode ? props.paymentMode : "--";
  const paymentSettlementDate = props.paymentSettlementDate
    ? props.paymentSettlementDate
    : "--";
  const transactionID = props.transactionID ? props.transactionID : "--";
  const name = props.name === "" ? "Name" : props.name;

  return (
    <div
      style={{
        marginTop: "2rem",
        marginBottom: "1rem",
        border: "none",
        position: "relative",
        marginLeft: "0.55rem",
        width: "95%",
      }}
    >
      <Card
        sx={{
          maxWidth: "100%",
          borderRadius: "15px",
          boxShadow: "1px 1px 5px #000",
        }}
      >
        <CardContent>
          <Typography sx={{ fontWeight: "bold" }}>
            Room ID:{" "}
            <span style={{ fontWeight: "lighter", color: "red" }}>
              {props.roomid}
            </span>
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Date:{" "}
            <span style={{ fontWeight: "lighter", color: "red" }}>
              {props.date}
            </span>
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Visiting Time:{" "}
            <span style={{ fontWeight: "lighter", color: "red" }}>
              {props.visitingTime}
            </span>
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Name:{" "}
            <span style={{ fontWeight: "lighter", color: "red" }}>
              {capitalizeFirstLetter(name)}
            </span>
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Conatact:{" "}
            <span style={{ fontWeight: "lighter", color: "red" }}>
              {props.contact}
            </span>
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Aggregate Fees:{" "}
            <span style={{ fontWeight: "lighter", color: "red" }}>
              {props.aggFees}
            </span>
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Payment Status:{" "}
            <span style={{ fontWeight: "lighter", color: "red" }}>
              {capitalizeFirstLetter(props.paymentStatus)}
            </span>
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Visiting Status:{" "}
            <span style={{ fontWeight: "lighter", color: "red" }}>
              {capitalizeFirstLetter(props.status)}
            </span>
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Payment Mode:{" "}
            <span style={{ fontWeight: "lighter", color: "red" }}>
              {capitalizeFirstLetter(paymentMode)}
            </span>
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Payment Settlement Date:{" "}
            <span style={{ fontWeight: "lighter", color: "red" }}>
              {paymentSettlementDate}
            </span>
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Transaction ID:{" "}
            <span style={{ fontWeight: "lighter", color: "red" }}>
              {transactionID}
            </span>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
