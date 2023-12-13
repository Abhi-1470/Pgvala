import * as React from "react";
import Rating from "@mui/material/Rating";

function StaticRating() {
  return (
    <div >
      <Rating
        name="half-rating-read"
        size="small"
        sx={{marginLeft: "10px"}}
        defaultValue={4.5}
        precision={0.5}
        readOnly
      />
    </div>
  );
}

export default StaticRating;
