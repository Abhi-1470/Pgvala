import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Carousel from "react-bootstrap/Carousel";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import logo from "../assets/images/logo-2.jpeg";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedIcon from "@mui/icons-material/Bed";
import perksIcon from "../assets/images/perks.png";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import Box from "@mui/material/Box";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ChairIcon from "@mui/icons-material/Chair";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AlarmOnIcon from '@mui/icons-material/AlarmOn';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CardView(props) {
  const todaysDate = new Date();
  const [expanded, setExpanded] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(todaysDate); // State to store selected date
  const [selectedTime, setSelectedTime] = React.useState(null); // State to store selected time
  const [isDisabledLoader, setDisabledLoader] = React.useState(false);
  const [validated, setValidated] = React.useState(false);
  const [isInvalid, setIsInvalid] = React.useState(false); // State for input field validity
  const [ownerDetails, setOwnerDetails] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [showTimePicker, setShowTimePicker] = React.useState(false);

  function formatDate(string) {
    const visitDate = new Date(selectedDate);
    const year = visitDate.getFullYear();
    const month = String(visitDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1 and pad with 0 if needed
    const day = String(visitDate.getDate()).padStart(2, "0");
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  const handleClose = () => {
    setExpanded(false);
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function handleVisits() {
    navigate("/bookings");
  }

  function handleDateClose() {
    setShowDatePicker(false);
  }

  function handleTimeClose() {
    setShowTimePicker(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsInvalid(false); // Reset feedback
    setDisabledLoader(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setIsInvalid(true); // Show feedback
    } else if (!selectedDate || !selectedTime) {
      setIsInvalid(true); // Show feedback
      setDisabledLoader(false);
    } else {
      setValidated(true);

      const visitDate = new Date(selectedDate);
      const year = visitDate.getFullYear();
      const month = String(visitDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1 and pad with 0 if needed
      const day = String(visitDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}/${month}/${day}`;
      console.log(formattedDate);

      try {
        const response = await axios.post(
          "https://davaivala.shop/visting_time/",
          {
            date: formattedDate,
            username: "user",
            accid: props.accid,
            status: props.status,
            roomid: props.roomid,
            visting_time: selectedTime,
            agg_fee: 0.1*props.rentPrice,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("API response: ", response.data);
        try {
          const response = await axios.get(
            "https://davaivala.shop/get-owner-contact/?accid=" + props.accid,
            {
              headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
          const ownerData = response.data;
          
          console.log("API response: ", ownerData);
          setOwnerDetails(ownerData);
          setOpen(true);
        } catch (error) {
          console.error("Failed to get Owner's detail :", error.message);
        }
      } catch (error) {
        console.error("Failed to make an appointment: ", error.message);
      }
      setValidated(true);
      setDisabledLoader(true);
      setDisabledLoader(false);
    }
  };
  // Check if props.images exists
  if (!props.images) {
    return null; // or you can return a message or placeholder here
  }

  const imageArray = props.images;

  // Split the perks string into an array
  const perksList = props.perks ? props.perks.split(",") : ["Basic Amenities"];

  function capitalizeFirstLetter(string) {
    var splitStr = string.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  }

  return (
    <div
      className="card"
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
          backgroundColor: "green",
          color: "#fff",
          top: "6rem",
          left: "0.6rem",
          zIndex: "100001",
          border: "1px solid green",
          padding: "10px",
          borderBottomLeftRadius: 0,
          borderTopLeftRadius: 0,
          borderBottomRightRadius: "15px",
          borderTopRightRadius: "15px",
          boxShadow: "1px 1px 10px #000",
        }}
      >
        {capitalizeFirstLetter(props.status)}
      </div>
      <Card sx={{ maxWidth: "95%", boxShadow: "1px 1px 15px #000" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="pgs">
              <img
                src={logo}
                alt="company-logo"
                style={{ width: "50px", height: "50px" }}
              />
            </Avatar>
          }
          title={capitalizeFirstLetter(props.apartmentName)}
          subheader={capitalizeFirstLetter(props.apartmentAddress)}
        />
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
          <div variant="body2" className="amenities" color="text.secondary">
            <Accordion sx={{ marginBottom: "1rem" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ color: "red" }}>
                  See Amenities and Facilities
                </Typography>
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
                      padding: "3px",
                      border: "1px solid #000",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                    }}
                  >
                    {" "}
                    <img
                      style={{ margin: "0 0.5rem" }}
                      src={perksIcon}
                      alt="perks-icon"
                    />
                    {capitalizeFirstLetter(perk)}
                  </Typography>
                ))}
              </AccordionDetails>
            </Accordion>
          </div>
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
                {capitalizeFirstLetter(props.accomodationType)}
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
                {capitalizeFirstLetter(props.category)}
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
                {capitalizeFirstLetter(props.tenant)}
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
                {capitalizeFirstLetter(props.washroomStatus)}
              </Typography>
            </div>
          </Box>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#61677A",
              padding: "1rem 1rem 0 0",
              marginBottom: "-1rem",
            }}
          >
            ₹ {props.rentPrice}/{capitalizeFirstLetter(props.rate)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            variant="contained"
            startIcon={<EventAvailableIcon />}
            onClick={handleExpandClick}
            sx={{
              backgroundColor: "#F31559",
              "&:hover": { backgroundColor: "#C51605" },
            }}
          >
            Schedule Visit
          </Button>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div>
              <h3 style={{ fontFamily: "Noto Sans", fontWeight: "600" }}>
                Schedule a Visit
              </h3>
            </div>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Box>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "left",
                    alignItems: "start",
                  }}
                >
                  <div>
                    <Button
                      onClick={() => setShowDatePicker(true)}
                      variant="outlined"
                      color="error"
                      startIcon={<CalendarMonthIcon color="error" />}
                      sx={{ marginBottom: "1rem", fontWeight: "bold" }}
                    >
                      Select a Date:{" "}
                      <span
                        style={{
                          marginLeft: "1rem",
                          marginTop: "0.1rem",
                          fontWeight: "bold",
                          color: "#000",
                        }}
                      >
                        {formatDate(selectedDate)}
                      </span>
                    </Button>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "start",
                      alignItems: "left",
                    }}
                  >
                    <Button
                      onClick={() => setShowTimePicker(true)}
                      startIcon={<AccessTimeIcon color="error" />}
                      variant="outlined"
                      color="error"
                      sx={{ fontWeight: "bold" }}
                    >
                      Select a Time:{" "}
                      <span
                        style={{
                          marginLeft: "1rem",
                          marginTop: "0.1rem",
                          fontWeight: "bold",
                          color: "#000",
                        }}
                      >
                        {selectedTime}
                      </span>
                    </Button>
                  </div>
                </div>
              </Box>
              <Form.Control.Feedback
                type="invalid"
                style={{ display: isInvalid ? "block" : "none" }}
              >
                *Schedule Date and Time is required
              </Form.Control.Feedback>
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
                    marginTop: "0.5rem",
                    marginBottom: "0.5rem",
                    display: isDisabledLoader ? "inline" : "none",
                  }}
                />
              </Box>

              <div>
                <BootstrapDialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                >
                  <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Owner Details
                  </DialogTitle>
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  {ownerDetails.map((ownerDetail, index) => (
                    <DialogContent key={index} dividers>
                      <Box>
                        <h4 style={{ fontWeight: "bold" }}>
                          {ownerDetail.owner_name}
                        </h4>
                      </Box>
                      <Box sx={{ marginTop: "1rem" }}>
                        <h5 style={{ fontWeight: "100", fontSize: "1.2rem" }}>
                          Contact Number: {ownerDetail.contact1}
                        </h5>
                        <h5 style={{ fontWeight: "100", fontSize: "1.2rem" }}>
                          Contact Number: {ownerDetail.contact2}
                        </h5>
                      </Box>
                      <Box sx={{ marginTop: "1rem" }}>
                        <h6 style={{ fontWeight: "bold" }}>Address:</h6>
                        <h6>{ownerDetail.address}</h6>
                        <h6>
                          {ownerDetail.locality + ", " + ownerDetail.city}
                        </h6>
                      </Box>
                    </DialogContent>
                  ))}
                  <DialogActions sx={{ textAlign: "center", width: "100%" }}>
                    <Button
                      sx={{ textAlign: "center", width: "100%" }}
                      color="error"
                      autoFocus
                      onClick={handleVisits}
                      endIcon={<BookmarksIcon />}
                    >
                      See Visiting Schedules
                    </Button>
                  </DialogActions>
                </BootstrapDialog>
              </div>

              <Typography paragraph>
                <Button
                  type="submit"
                  endIcon={<EditCalendarIcon />}
                  sx={{
                    backgroundColor: "#F31559",
                    "&:hover": { backgroundColor: "#C51605" },
                    width: "100%",
                  }}
                  variant="contained"
                >
                  Schedule a Visit
                </Button>
              </Typography>
            </Form>

            <div>
              <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={showDatePicker}
                sx={{zIndex:"100000000"}}
              >
                <DialogContent dividers>
                  <Box>
                    <DatePicker
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                    />
                  </Box>
                </DialogContent>
                <DialogActions sx={{ textAlign: "center", width: "100%" }}>
                  <Button
                    sx={{ textAlign: "center", width: "100%" }}
                    color="error"
                    autoFocus
                    onClick={handleDateClose}
                    endIcon={<EventAvailableIcon />}
                  >
                    OK
                  </Button>
                </DialogActions>
              </BootstrapDialog>
            </div>
            <div>
              <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={showTimePicker}
                sx={{zIndex:"100000000"}}
              >
                <DialogContent dividers>
                  <Box>
                    <TimePicker
                      selectedTime={selectedTime}
                      setSelectedTime={setSelectedTime}
                    />
                  </Box>
                </DialogContent>
                <DialogActions sx={{ textAlign: "center", width: "100%" }}>
                  <Button
                    sx={{ textAlign: "center", width: "100%" }}
                    color="error"
                    autoFocus
                    onClick={handleTimeClose}
                    endIcon={<AlarmOnIcon />}
                  >
                    OK
                  </Button>
                </DialogActions>
              </BootstrapDialog>
            </div>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
