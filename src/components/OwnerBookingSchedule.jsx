import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CallIcon from "@mui/icons-material/Call";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LightIcon from "@mui/icons-material/Light";
import BadgeIcon from "@mui/icons-material/Badge";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function OwnerBookingSchedule(props) {
  const ownerToken = localStorage.getItem("ownerToken");
  const [formattedVisitingDate, setFormattedVisitingDate] = React.useState(""); // State to store the formatted date
  const [formattedTime, setFormattedTime] = React.useState(""); // State to store the formatted time
  const [open, setOpen] = React.useState(false);
  const [isAlloted, setAlloted] = React.useState(false);
  const [isDisabled, setDisabled] = React.useState(false);

  function handleClose() {
    setOpen(false);
  }

  function handleAlert() {
    setOpen(true);
  }

  async function handleAllotment() {
    try {
      const response = await axios.put(
        "https://davaivala.shop/room_detail_update/?roomid=" +
          props.roomid +
          "&field=username&value=" +
          props.entery_id,
        null,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + ownerToken,
          },
        }
      );
      console.log("API response: ", response.data.status);
      setAlloted(true);
      setDisabled(true);
      setOpen(false);
    } catch (error) {
      console.error("Failed to change the allotment status: ", error.message);
    }
  }

  React.useEffect(() => {
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
      let minutes = timeParts[1];

      // Determine whether it's AM or PM based on hours
      const amOrPm = hours >= 12 ? "PM" : "AM";

      // Convert hours to 12-hour format
      let formattedHours = hours % 12 || 12;

      if (formattedHours === undefined || minutes === undefined) {
        formattedHours = 12;
        minutes = 0;
      }

      return `${formattedHours}:${minutes} ${amOrPm}`;
    }
    setFormattedVisitingDate(formattedDate());
    setFormattedTime(formatTime());
  }, [props.date, props.visiting_time]);

  function getButtonColor() {
    // Return the color based on the 'props.status' value
    if (props.status === "visit" || props.status === "available") {
      return "green";
    } else if (props.status === "Cancelled") {
      return "red";
    } else {
      return "#000"; // Set a default color or choose any other color
    }
  }

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

  const city = props.city === "" ? "City" : props.city;
  const name = props.name === "" ? "User" : props.name;

  return (
    <div
      className="booking-card"
      style={{
        marginTop: "2rem",
        marginBottom: "-1rem",
        border: "none",
        width: "95%",
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "max-content",
                marginLeft: "2rem",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                Status:{" "}
                <span style={{ color: getButtonColor() }}>
                  {props.status === "visit" || props.status === "available"
                    ? "Scheduled"
                    : props.status === "Cancelled"
                    ? "Cancelled"
                    : "Uncertain"}
                </span>
              </Typography>
              <Button
                disabled={isDisabled}
                size="small"
                sx={{
                  marginLeft: "2rem",
                  borderRadius: "25px",
                  padding: "0.6rem",
                }}
                // Set the color using the 'getButtonColor' function
                color="error"
                variant="contained"
                endIcon={<CheckCircleIcon />}
                aria-label="allot-button"
                onClick={handleAlert}
              >
                {isAlloted ? "Alloted" : "Allot"}
              </Button>
              <div>
                <BootstrapDialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                  sx={{ zIndex: 10000001 }}
                >
                  <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <Typography
                      color="error"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.3rem",
                        marginRight: "0.5rem",
                      }}
                    >
                      Alert
                    </Typography>
                  </DialogTitle>
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      marginLeft: "2rem",
                      color: (theme) => theme.palette.grey[500],
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <DialogContent dividers>
                    <Box>
                      <Typography style={{ fontWeight: "bold" }}>
                        Do you want to allot the room {props.roomid}?
                      </Typography>
                    </Box>
                  </DialogContent>
                  <DialogActions>
                    <Button color="error" onClick={handleAllotment}>
                      OK
                    </Button>
                  </DialogActions>
                </BootstrapDialog>
              </div>
            </Box>
          }
          title={formattedVisitingDate}
          subheader={formattedTime}
        />
        <CardContent style={{ borderTop: "1px solid #B4B4B3" }}>
          <Box variant="body2">
            <div className="booker">
              <div className="booker-details">
                <h6 style={{ marginTop: "0.1rem", fontWeight: "bold" }}>
                  <LightIcon
                    color="error"
                    sx={{ marginRight: "0.5rem", marginBottom: "0.2rem" }}
                  />
                  Room ID:{" "}
                  <span style={{ fontWeight: "lighter" }}>{props.roomid}</span>
                </h6>
                <p style={{ marginTop: "0.1rem", fontWeight: "bold" }}>
                  <BadgeIcon
                    color="error"
                    sx={{ marginRight: "0.5rem", marginBottom: "0.2rem" }}
                  />
                  Name:{" "}
                  <span style={{ fontWeight: "lighter" }}>
                    {capitalizeFirstLetter(name)}
                  </span>
                </p>
                <p style={{ marginTop: "0.1rem", fontWeight: "bold" }}>
                  <CallIcon
                    color="error"
                    sx={{ marginRight: "0.5rem", marginBottom: "0.2rem" }}
                  />
                  Conatct:{" "}
                  <span style={{ fontWeight: "lighter" }}>{props.contact}</span>
                </p>
                <p style={{ marginTop: "0.1rem", fontWeight: "bold" }}>
                  <LocationCityIcon
                    color="error"
                    sx={{ marginRight: "0.5rem", marginBottom: "0.2rem" }}
                  />
                  Place:{" "}
                  <span style={{ fontWeight: "lighter" }}>
                    {capitalizeFirstLetter(city)}
                  </span>
                </p>
              </div>
            </div>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
