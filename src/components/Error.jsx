import React from "react";
import errorImg from "../assets/images/error.png";
import ErrorIcon from "@mui/icons-material/Error";

function Error() {
  return (
    <div
      style={{
        marginTop: "2rem",
        overflowX: "hidden",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <ErrorIcon sx={{width: "100px", height: "100px"}} color="error" />
      <img
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        src={errorImg}
        alt="error-Img"
      />
      <h1 style={{ fontSize: "3rem", textAlign: "center" }}>
        404 Error, Page not found.
      </h1>
    </div>
  );
}

export default Error;
