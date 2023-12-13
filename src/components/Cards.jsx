import * as React from "react";
import CardView from "./Card";
import axios from "axios";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function Cards() {
  const selectedCity = localStorage.getItem("selectedCity");
  const token = localStorage.getItem("token");
  const [pgDataList, setPgDataList] = React.useState([]);
  const [isDisabledLoader, setDisabledLoader] = React.useState(false);

  React.useEffect(() => {
    setDisabledLoader(true);
    async function pgDetails() {
      try {
        const response = await axios.get(
          "https://davaivala.shop/accommodation_list/?city=" + selectedCity,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const pgs = response.data;
        // console.log("API response: ", pgs);
        setPgDataList(pgs);
        setDisabledLoader(false);
      } catch (error) {
        console.error(
          "Failed to retrieve details of the Pg's: ",
          error.message
        );
      }
    }
    pgDetails();
    
  }, [selectedCity, token]);

  const defaultImage = [
    "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais",
  ];

  return (
    <div style={{ marginBottom: "5rem" }}>
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
            marginTop: "2rem",
            display: isDisabledLoader ? "inline" : "none",
          }}
        />
      </Box>
      {pgDataList.map((pgData, index) => {
        if (pgData.images) {
          let imageArray;
          try {
            const imagesObject = JSON.parse(pgData.images);
            imageArray = Object.values(imagesObject).filter((image) => !!image); // Filter out null or undefined images
          } catch (error) {
            imageArray = [];
          }

          return (
            <CardView
              key={index}
              accid={pgData.accid}
              roomid={pgData.roomid}
              images={imageArray}
              washroomStatus={pgData.washroom_status}
              accomodationType={pgData.accomotation_type}
              tenant={pgData.tenant}
              category={pgData.category}
              status={pgData.status}
              rentPrice={pgData.rent_price}
              rate={pgData.rate}
              perks={pgData.perks}
              apartmentName={pgData.apartment_name}
              apartmentAddress={pgData.locality + ", " + pgData.city}
            />
          );
        } else {
          return (
            <CardView
              key={index}
              accid={pgData.accid}
              roomid={pgData.roomid}
              images={defaultImage}
              washroomStatus={pgData.washroom_status}
              accomodationType={pgData.accomotation_type}
              tenant={pgData.tenant}
              category={pgData.category}
              status={pgData.status}
              rentPrice={pgData.rent_price}
              rate={pgData.rate}
              perks={pgData.perks}
              apartmentName={pgData.apartment_name}
              apartmentAddress={pgData.locality + ", " + pgData.city}
            />
          );
        }
      })}
    </div>
  );
}

export default Cards;
