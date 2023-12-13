import * as React from "react";
import Card from "@mui/material/Card";
import Carousel from "react-bootstrap/Carousel";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedIcon from "@mui/icons-material/Bed";
import ChairIcon from "@mui/icons-material/Chair";
import EditDrawer from "./Drawer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AccomodationList(props) {
  const [open, setOpen] = React.useState(false);
  const [rentPrice, setRentPrice] = React.useState(props.rentPrice);
  const [accommodationType, setAccommodationType] = React.useState(
    props.accomodationType
  );
  const [tenantType, setTenantType] = React.useState(props.tenant);
  const [washroomStatus, setWashroomStatus] = React.useState(
    props.washroomStatus
  );
  const [category, setCategory] = React.useState(props.category);
  const [roomStatus, setRoomStatus] = React.useState(props.status); // State to track room status
  const [isLoading, setIsLoading] = React.useState(false); // State to track loading state
  const [isSwitchChecked, setIsSwitchChecked] = React.useState(
    roomStatus === "available"
  ); // New state for controlling the Switch
  const imageArray = props.images;

  React.useEffect(() => {
    // This effect will run whenever refreshKey changes, triggering a re-render
    // console.log(refreshKey);
    // console.log(roomStatus);
    setIsSwitchChecked(props.status === "available");
  }, [props.status]);

  const perksList = props.perks ? props.perks.split(",") : ["Basic Perks"];

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

  const handleClose = () => {
    setOpen(false);
  };

  // Function to make an API call when the switch is turned on (checked)
  const handleSwitchOn = async () => {
    if (roomStatus !== "available") {
      setIsLoading(true);
      try {
        // Make an API call when the switch is turned off
        const response = await axios.put(
          "https://davaivala.shop/room_detail_update/?roomid=" +
            props.roomid +
            "&field=status&value=available",
          null,
          {
            headers: {
              Accept: "application/json",
              // Authorization: "Bearer " + ownerToken,
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3Mjk4NjU3NTQsImlhdCI6MTY5ODMyOTc1NCwic2NvcGUiOiJhY2Nlc3NfdG9rZW4iLCJzdWIiOiJhY2MwNiJ9.KFNQGODX-gUg6RKmCKMByGlDbvKNn--oVo4tq4uwGkU",
            },
          }
        );
        console.log("Switch is turned on, API response:", response.data.status);
        setRoomStatus("available"); // Update room status in state
        setOpen(true);
      } catch (error) {
        console.error("Error when turning on the switch:", error);
      } finally {
        setIsLoading(false); // Reset loading state
        setIsSwitchChecked(roomStatus === "booked");
      }
    }
  };

  // Function to make an API call when the switch is turned off (unchecked)
  const handleSwitchOff = async () => {
    if (props.status !== "booked") {
      setIsLoading(true); // Set loading state
      try {
        // Make an API call when the switch is turned off
        const response = await axios.put(
          "https://davaivala.shop/room_detail_update/?roomid=" +
            props.roomid +
            "&field=status&value=booked",
          null,
          {
            headers: {
              Accept: "application/json",
              // Authorization: "Bearer " + ownerToken,
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3Mjk4NjU3NTQsImlhdCI6MTY5ODMyOTc1NCwic2NvcGUiOiJhY2Nlc3NfdG9rZW4iLCJzdWIiOiJhY2MwNiJ9.KFNQGODX-gUg6RKmCKMByGlDbvKNn--oVo4tq4uwGkU",
            },
          }
        );
        console.log(
          "Switch is turned off, API response:",
          response.data.status
        );
        setRoomStatus("booked"); // Update room status in state
        setOpen(true);
      } catch (error) {
        console.error("Error when turning off the switch:", error);
      } finally {
        setIsLoading(false); // Reset loading state
        setIsSwitchChecked(roomStatus === "booked");
      }
    }
  };

  return (
    <div
      className="owner-card"
      style={{
        marginTop: "2rem",
        marginBottom: "1rem",
        border: "none",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "max-content",
          height: "max-content",
          position: "absolute",
          backgroundColor: "red",
          color: "#fff",
          top: "1.5rem",
          left: "1rem",
          zIndex: "100001",
          border: "1px solid green",
          padding: "10px",
          borderRadius: "15px",
          boxShadow: "1px 1px 5px #000",
        }}
      >
        ₹ {rentPrice + "/" + capitalizeFirstLetter(props.rate)}
      </div>
      <Card
        sx={{
          maxWidth: "95%",
          borderRadius: "15px",
          boxShadow: "1px 1px 5px #000",
        }}
      >
        <Carousel style={{ zIndex: "1000" }} data-bs-theme="dark">
          {imageArray.map((imageUrl, index) => (
            <Carousel.Item key={index} interval={1000}>
              {imageUrl !==
              "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais" ? (
                <img
                  style={{ objectFit: "cover", height: "300px" }}
                  className="d-block w-100 img"
                  alt="pgImg"
                  src={"https://pgvala.s3.amazonaws.com/" + imageUrl}
                />
              ) : (
                <img
                  style={{ objectFit: "cover", height: "300px" }}
                  className="d-block w-100 img"
                  alt="pgImg"
                  src={imageUrl}
                />
              )}
            </Carousel.Item>
          ))}
        </Carousel>
        <CardContent>
          <Box>
            <Typography
              sx={{
                padding: "0.2rem 0.5rem",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Room ID: <span style={{ fontWeight: "100" }}>{props.roomid}</span>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
                gap: "5px",
                paddingTop: "10px",
              }}
            >
              <div
                style={{ width: "100%" }}
                variant="body2"
                className="amenities"
                color="text.secondary"
              >
                <Accordion sx={{ marginBottom: "1rem" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography sx={{ color: "red" }}>See Perks</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "left",
                      alignItems: "start",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    {perksList.map((perk, index) => (
                      <Typography
                        key={index}
                        sx={{
                          padding: "0.2rem",
                          border: "1px solid #000",
                          borderRadius: "20px",
                          fontSize: "0.8rem",
                        }}
                      >
                        {" "}
                        <AutoAwesomeIcon
                          sx={{ marginRight: "0.5rem" }}
                          color="error"
                        />
                        {capitalizeFirstLetter(perk)}
                      </Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    width: "100%",
                    paddingTop: "1rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "max-content",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <BedIcon color="error" />
                    <Typography sx={{ fontSize: "0.7rem", color: "#B4B4B3" }}>
                      {capitalizeFirstLetter(accommodationType)}
                    </Typography>
                  </div>
                  <div
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "max-content",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <PersonPinIcon color="error" />
                    <Typography sx={{ fontSize: "0.7rem", color: "#B4B4B3" }}>
                      {capitalizeFirstLetter(tenantType)}
                    </Typography>
                  </div>
                  <div
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "max-content",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <BathtubIcon color="error" />
                    <Typography sx={{ fontSize: "0.7rem", color: "#B4B4B3" }}>
                      {capitalizeFirstLetter(washroomStatus)}
                    </Typography>
                  </div>
                  <div
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "max-content",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ChairIcon color="error" />
                    <Typography sx={{ fontSize: "0.7rem", color: "#B4B4B3" }}>
                      {capitalizeFirstLetter(category)}
                    </Typography>
                  </div>
                </Box>
              </div>
            </Box>
            <Typography
              style={{
                marginTop: "1rem",
                fontSize: "0.9rem",
                fontWeight: "bold",
              }}
            >
              Room Status:{" "}
              <span
                style={{
                  fontWeight: "100",
                  color:
                    roomStatus === "available"
                      ? "green"
                      : roomStatus === "booked"
                      ? "red"
                      : "",
                }}
              >
                {capitalizeFirstLetter(roomStatus)}
              </span>
              <Switch
                checked={isSwitchChecked} // Use the controlled state variable here
                sx={{
                  marginTop: "0rem",
                  width: 62,
                  height: 40,
                }}
                color={
                  roomStatus === "available"
                    ? "success"
                    : roomStatus === "booked"
                    ? "default"
                    : ""
                }
                onChange={(event) => {
                  if (event.target.checked) {
                    handleSwitchOn(); // Call API when the switch is turned on
                  } else {
                    handleSwitchOff(); // Call API when the switch is turned off
                  }
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Typography>
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
                      marginRight: "0.5rem",
                    }}
                  >
                    <ChangeCircleIcon color="error" /> Updated the Room
                    Availability Status
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
                    <h5 style={{ fontWeight: "bold" }}>
                      New Room Status:{" "}
                      <span style={{ fontWeight: "lighter" }}>
                        {capitalizeFirstLetter(roomStatus)}
                      </span>
                    </h5>
                  </Box>
                  <Box>
                    <h5 style={{ fontWeight: "bold" }}>
                      Previous Room Status:{" "}
                      <span style={{ fontWeight: "lighter" }}>
                        {capitalizeFirstLetter(props.status)}
                      </span>
                    </h5>
                  </Box>
                </DialogContent>
              </BootstrapDialog>
            </div>
            <Box
              sx={{
                display: isLoading ? "inline" : "none",
                marginBottom: "1rem",
              }}
            >
              <Typography>Updating...</Typography>
            </Box>
            <EditDrawer roomid={props.roomid} />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
