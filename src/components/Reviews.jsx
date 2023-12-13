import React from "react";
import Review from "./Review";
import Button from "@mui/material/Button";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { Link } from "react-router-dom";

function Reviews() {
  return (
    <div className="shadow-none" style={{ backgroundColor: "#F4EEEE", marginBottom: "5px" }}>
      <h6 className="pt-3 fs-4"
        style={{
          padding: "10px",
          fontWeight: "bold",
          marginTop: "-3rem",
          marginBottom: "2rem",
        }}
      >
        What do customers have to say about us?
      </h6>
      <div className="reviews">
        <Review content="Great selection of PG accommodations at various price ranges. The website offers a variety of filters, which made it easy for me to find a PG in my preferred location and within my budget. I had a seamless experience using this platform." />
        <Review content="I'm new to the city, and this PG website was a lifesaver. It connected me with trustworthy PG options, and I was able to make an informed decision. I appreciate the transparency and accuracy of the information provided" />
        <Review content="The website's mobile app is convenient and made my PG search convenient while on the go. The real-time notifications for new listings and updates are a bonus. I found my perfect PG within a few days, thanks to this platform." />
        <div
          style={{
            padding : "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "0.5rem",
          }}
        >
          <p
            className="fs-3"
            style={{
              fontWeight: "bold",
              marginBottom: "0.3rem",
              textAlign: "center",
            }}
          >
            And Many More &gt;&gt;
          </p>
          <div className="more-reviews">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", paddingBottom: "1rem" }}>
        <Link to="/ratingandreview" style={{ textDecoration: "none" }}>
          <Button
            className="fs-5"
            variant="outlined"
            size="small"
            color="error"
            sx={{
              width: "95%",
            }}
            endIcon={<ReviewsIcon sx={{ color: "red" }} />}
          >
            Have a say in your stay
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Reviews;
