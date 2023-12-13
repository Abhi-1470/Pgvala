import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Review from "./Review";

function RatingAndReview() {
  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
  const [value, setValue] = React.useState(3.5);
  const [hover, setHover] = React.useState(-1);
  return (
    <div className="rating-review">
      <div className="new-review" style={{ overflowX: "hidden" }}>
        <h3>Rate and Review your stay</h3>
        <form action="post" className="review-form">
          <Box
            sx={{
              width: 200,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>
          <textarea
            type="text"
            placeholder="Please leave a review..."
            row="3"
          ></textarea>
          <IconButton
            color="error"
            size="large"
            sx={{
              position: "absolute",
              bottom: "0.5rem",
              right: "4.5rem",
              fontSize: "2.5rem",
            }}
            aria-label="add"
          >
            <AddCircleIcon size="large" fontSize="inherit" />
          </IconButton>
        </form>
      </div>
      <div
        style={{
          borderTop: "1px solid #B4B4B3",
          paddingTop: "2rem",
        }}
      >
        <h4 style={{ textAlign: "center" }}>Past reviews from our curtomers</h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            marginTop: "2rem",
            marginBottom: "4rem",
          }}
          className="reviews"
        >
          <Review content="I recently used this PG website to find accommodation, and I'm extremely satisfied with the service. It was so easy to filter options, and I found the perfect PG that suits my needs. The website's interface is user-friendly and helped me save a lot of time" />
          <Review content="I highly recommend this PG website to anyone searching for hassle-free accommodation. The listings are up-to-date, and the detailed descriptions and photos gave me a clear idea of what to expect. It made my PG hunting experience stress-free." />
          <Review content="Finding a safe and comfortable PG can be a challenge, but this website made it a breeze. The verification and reviews for each listing provide peace of mind. I'm grateful for this platform, as it helped me find the ideal PG." />
        </div>
      </div>
    </div>
  );
}

export default RatingAndReview;
