// InstallButton.js

import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";

function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsAppInstalled(true);
    }
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div>
    {isAppInstalled ? (
      // Render something else when the app is installed
      <div style={{margin: "5rem"}}>
        
        {/* You can render other content here */}
      </div>
    ) : (
      // Render the install button when the app is not installed
      <div
        style={{
          paddingTop: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F4EEEE",
        }}
      >
        <h6
          style={{ fontWeight: "bold", fontSize: "1.3rem", marginBottom: "1rem" }}
        >
          Install the App Now.
        </h6>
        <Button
          color="error"
          size="large"
          sx={{
            marginBottom: "5rem",
            border: "1px solid red",
            borderRadius: "25px",
            padding: "5px 15px",
            boxShadow: "1px 1px 8px #000",
            fontWeight: "bold"
          }}
          variant="contained"
          onClick={handleInstallClick}
          endIcon={<DownloadIcon />}
        >
          Install
        </Button>
      </div>
    )}
  </div>
);
}

export default InstallButton;