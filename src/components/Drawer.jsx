import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Form from "react-bootstrap/Form";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import InputGroup from "react-bootstrap/InputGroup";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import ChairIcon from "@mui/icons-material/Chair";
import BedIcon from "@mui/icons-material/Bed";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function EditDrawer(props) {
  const ownerToken = localStorage.getItem("ownerToken");
  const [state, setState] = React.useState({
    bottom: false,
  });
  const [validatedRent, setValidatedRent] = React.useState(false);
  const [validatedTenant, setValidatedTenant] = React.useState(false);
  const [validatedFurnishing, setValidatedFurnishing] = React.useState(false);
  const [validatedAccommodation, setValidatedAccommodation] =
    React.useState(false);
  const [isDisabledLoader, setDisabledLoader] = React.useState(false);
  const [rentPrice, setRentPrice] = React.useState("");
  const [tenantType, setTenantType] = React.useState("");
  const [furnishingType, setFurnishingType] = React.useState("");
  const [accommodationType, setAccommodationType] = React.useState("");
  const [openRent, setOpenRent] = React.useState(false);
  const [openTenant, setOpenTenant] = React.useState(false);
  const [openFurnishing, setOpenFurnishing] = React.useState(false);
  const [openAccommodation, setOpenAccommodation] = React.useState(false);

  const handleCloseRent = () => {
    setOpenRent(false);
  };
  const handleCloseTenant = () => {
    setOpenTenant(false);
  };
  const handleCloseFurnishing = () => {
    setOpenFurnishing(false);
  };
  const handleCloseAccommodation = () => {
    setOpenAccommodation(false);
  };

  //   RENT PRICE UPDATE
  async function handleRentPriceUpdate(event) {
    event.preventDefault();
    setDisabledLoader(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidatedRent(true);
    try {
      const response = await axios.put(
        "https://davaivala.shop/room_detail_update/?roomid=" +
          props.roomid +
          "&field=rent_price&value=" +
          rentPrice,
        null,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + ownerToken,
          },
        }
      );
      console.log("API response: " + response.data.status);
      setOpenRent(true);
    } catch (error) {
      console.log("Failed to update the Rent Price: ", error.message);
    }
    setDisabledLoader(false);
  }

  //   TENANT TYPE UPDATE
  async function handleTenantTypeUpdate(event) {
    event.preventDefault();
    setDisabledLoader(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidatedTenant(true);
    try {
      const response = await axios.put(
        "https://davaivala.shop/room_detail_update/?roomid=" +
          props.roomid +
          "&field=tenant&value=" +
          tenantType,
        null,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + ownerToken,
          },
        }
      );
      console.log("API response: ", response.data.status);
      setOpenTenant(true);
    } catch (error) {
      console.error("Failed to update Tenant Type: ", error.message);
    }
    setDisabledLoader(false);
  }

  //   FURNISHING TYPE UPDATE
  async function handleFurnishingTypeUpdate(event) {
    event.preventDefault();
    setDisabledLoader(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidatedFurnishing(true);
    try {
      const response = await axios.put(
        "https://davaivala.shop/room_detail_update/?roomid=" +
          props.roomid +
          "&field=category&value=" +
          furnishingType,
        null,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + ownerToken,
          },
        }
      );
      console.log("API response: " + response.data.status);
      setOpenFurnishing(true);
    } catch (error) {
      console.log("Failed to update the Rent Price: ", error.message);
    }
    setDisabledLoader(false);
  }

  //   ACCOMMODATION TYPE UPDATE
  async function handleAccommodationTypeUpdate(event) {
    event.preventDefault();
    setDisabledLoader(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidatedAccommodation(true);
    try {
      const response = await axios.put(
        "https://davaivala.shop/room_detail_update/?roomid=" +
          props.roomid +
          "&field=accomotation_type&value=" +
          accommodationType,
        null,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + ownerToken,
          },
        }
      );
      console.log("API response: " + response.data.status);
      setOpenAccommodation(true);
    } catch (error) {
      console.log("Failed to update the Rent Price: ", error.message);
    }
    setDisabledLoader(false);
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box sx={{ width: anchor === "bottom" ? "auto" : 250 }} role="presentation">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="error" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            color="error"
            sx={{ fontWeight: "500", fontSize: "1.1rem" }}
          >
            <CurrencyRupeeIcon
              fontSize="small"
              color="error"
              sx={{ marginRight: "0.5rem", marginBottom: "0.2rem" }}
            />
            Update Rent Price
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Form
            noValidate
            validated={validatedRent}
            onSubmit={handleRentPriceUpdate}
          >
            <Form.Group className="mb-3" controlId="formBasicContact">
              <Form.Label>New Rent Price</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">₹</InputGroup.Text>

                <Form.Control
                  required
                  type="text"
                  autoComplete="off"
                  placeholder="Enter New Rent Price"
                  value={rentPrice}
                  onChange={(e) => {
                    setRentPrice(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  *New Rent Price is required
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
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
                  marginTop: "1rem",
                  display: isDisabledLoader ? "inline" : "none",
                }}
              />
            </Box>
            <Button
              variant="contained"
              type="submit"
              color="error"
              startIcon={<CurrencyRupeeIcon />}
              style={{ marginBottom: "1.5rem" }}
            >
              Update Rent Price
            </Button>
            <div>
              <BootstrapDialog
                onClose={handleCloseRent}
                aria-labelledby="customized-dialog-title"
                open={openRent}
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
                    ₹ Updated Rent Price
                  </Typography>
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleCloseRent}
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
                      New Rent Price:{" "}
                      <span style={{ fontWeight: "lighter" }}>
                        ₹{rentPrice}
                      </span>
                    </h5>
                  </Box>
                  <Box color="text.secondary">
                    <h6 style={{ fontWeight: "bold" }}>
                      *Please Refresh to see the changes
                    </h6>
                  </Box>
                </DialogContent>
              </BootstrapDialog>
            </div>
          </Form>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="error" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            color="error"
            sx={{ fontWeight: "500", fontSize: "1.1rem" }}
          >
            <PersonPinIcon
              fontSize="small"
              color="error"
              sx={{ marginRight: "0.5rem", marginBottom: "0.2rem" }}
            />
            Update Tenant Type
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Form
            noValidate
            validated={validatedTenant}
            onSubmit={handleTenantTypeUpdate}
          >
            <Form.Group className="mb-3" controlId="formBasicContact">
              <Form.Label>Select New Tenant Type</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <PersonPinIcon />
                </InputGroup.Text>

                <Form.Select
                  required
                  aria-label="Default select example"
                  value={tenantType}
                  onChange={(e) => setTenantType(e.target.value)}
                >
                  <option value="" disabled>
                    Choose a Tenant Type
                  </option>
                  <option value="Boys">Boys</option>
                  <option value="Girls">Girls</option>
                  <option value="Family">Family</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  *New Tenant Type is required
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
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
                  marginTop: "1rem",
                  display: isDisabledLoader ? "inline" : "none",
                }}
              />
            </Box>
            <Button
              variant="contained"
              type="submit"
              color="error"
              startIcon={<PersonPinIcon />}
              style={{ marginBottom: "1.5rem" }}
            >
              Update Tenant Type
            </Button>
            <div>
              <BootstrapDialog
                onClose={handleCloseTenant}
                aria-labelledby="customized-dialog-title"
                open={openTenant}
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
                    <PersonPinIcon color="error" /> Updated Tenant Type
                  </Typography>
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleCloseTenant}
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
                      New Tenant Type:{" "}
                      <span style={{ fontWeight: "lighter" }}>
                        {tenantType}
                      </span>
                    </h5>
                  </Box>
                  <Box color="text.secondary">
                    <h6 style={{ fontWeight: "bold" }}>
                      *Please Refresh to see the changes
                    </h6>
                  </Box>
                </DialogContent>
              </BootstrapDialog>
            </div>
          </Form>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="error" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            color="error"
            sx={{ fontWeight: "500", fontSize: "1.1rem" }}
          >
            <ChairIcon
              fontSize="small"
              color="error"
              sx={{ marginRight: "0.5rem", marginBottom: "0.2rem" }}
            />
            Update Furnishing Category
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Form
            noValidate
            validated={validatedFurnishing}
            onSubmit={handleFurnishingTypeUpdate}
          >
            <Form.Group className="mb-3" controlId="formBasicContact">
              <Form.Label>New Furnishing Type</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <ChairIcon />
                </InputGroup.Text>

                <Form.Select
                  required
                  aria-label="Default select example"
                  value={furnishingType}
                  onChange={(e) => setFurnishingType(e.target.value)}
                >
                  <option value="" disabled>
                    Choose a Furnishing Type
                  </option>
                  <option value="Fully Furnished">Fully Furnished</option>
                  <option value="Semi Furnished">Semi Furnished</option>
                  <option value="Non Furnished">Non Furnished</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  *New Furnishing Type is required
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
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
                  marginTop: "1rem",
                  display: isDisabledLoader ? "inline" : "none",
                }}
              />
            </Box>
            <Button
              variant="contained"
              type="submit"
              color="error"
              startIcon={<ChairIcon />}
              style={{ marginBottom: "1.5rem" }}
            >
              Update Furnishing Type
            </Button>
            <div>
              <BootstrapDialog
                onClose={handleCloseFurnishing}
                aria-labelledby="customized-dialog-title"
                open={openFurnishing}
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
                    <ChairIcon color="error" /> Updated Furnishing Type
                  </Typography>
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleCloseFurnishing}
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
                      New Furnishing Type:{" "}
                      <span style={{ fontWeight: "lighter" }}>
                        {furnishingType}
                      </span>
                    </h5>
                  </Box>
                  <Box color="text.secondary">
                    <h6 style={{ fontWeight: "bold" }}>
                      *Please Refresh to see the changes
                    </h6>
                  </Box>
                </DialogContent>
              </BootstrapDialog>
            </div>
          </Form>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="error" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            color="error"
            sx={{ fontWeight: "500", fontSize: "1.1rem" }}
          >
            <BedIcon
              fontSize="small"
              color="error"
              sx={{ marginRight: "0.5rem", marginBottom: "0.2rem" }}
            />
            Update Accommodation Type
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Form
            noValidate
            validated={validatedAccommodation}
            onSubmit={handleAccommodationTypeUpdate}
          >
            <Form.Group className="mb-3" controlId="formBasicContact">
              <Form.Label>New Accommodation Type</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <BedIcon />
                </InputGroup.Text>

                <Form.Select
                  required
                  aria-label="Default select example"
                  value={accommodationType}
                  onChange={(e) => setAccommodationType(e.target.value)}
                >
                  <option value="" disabled>
                    Choose a Accommodation Type
                  </option>
                  <option value="Single Sharing">Single Sharing</option>
                  <option value="Double Sharing">Double Shairng</option>
                  <option value="Triple Sharing">Triple Sharing</option>
                  <option value="1 bhk">1 bhk</option>
                  <option value="2 bhk">2 bhk</option>
                  <option value="3 bhk">3 bhk</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  *New Accommodation Type is required
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
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
                  marginTop: "1rem",
                  display: isDisabledLoader ? "inline" : "none",
                }}
              />
            </Box>
            <Button
              variant="contained"
              type="submit"
              color="error"
              startIcon={<BedIcon />}
              style={{ marginBottom: "1.5rem" }}
            >
              Update Accommodation Type
            </Button>
            <div>
              <BootstrapDialog
                onClose={handleCloseAccommodation}
                aria-labelledby="customized-dialog-title"
                open={openAccommodation}
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
                    <BedIcon color="error" /> Updated Accommodation Type
                  </Typography>
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleCloseAccommodation}
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
                      New Accommodation Type:{" "}
                      <span style={{ fontWeight: "lighter" }}>
                        {accommodationType}
                      </span>
                    </h5>
                  </Box>
                  <Box color="text.secondary">
                    <h6 style={{ fontWeight: "bold" }}>
                      *Please Refresh to see the changes
                    </h6>
                  </Box>
                </DialogContent>
              </BootstrapDialog>
            </div>
          </Form>
        </AccordionDetails>
      </Accordion>
    </Box>
  );

  return (
    <div>
      <React.Fragment key="bottom">
        <Button
          onClick={toggleDrawer("bottom", true)}
          variant="contained"
          startIcon={<EditIcon />}
          color="error"
          sx={{
            fontWeight: "bold",
            marginTop: "0.5rem",
            borderRadius: "15px",
          }}
        >
          Edit Room Details
        </Button>
        <Drawer
          sx={{ zIndex: "1000000" }}
          anchor="bottom"
          open={state["bottom"]}
          onClose={toggleDrawer("bottom", false)}
        >
          {list("bottom")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
