import React, { useEffect } from "react";
import AccomodationList from "./Accommodation";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

function AccomodationLists() {
  const ownerToken = localStorage.getItem("ownerToken");
  const [ownerRoomList, setOwnerRoomList] = React.useState([]);
  const [isDisabledLoader, setDisabledLoader] = React.useState(false);

  useEffect(() => {
    setDisabledLoader(true);
    async function getRoomList() {
      try {
        const response = await axios.get("https://davaivala.shop/room_list/", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + ownerToken,
          },
        });
        const ownerRoomDetails = response.data;
        console.log("API response: ", ownerRoomDetails);
        setOwnerRoomList(ownerRoomDetails);
        setDisabledLoader(false);
      } catch (error) {
        console.error("Failed to get the room list: ", error.message);
      }
    }
    getRoomList();
  }, [ownerToken]);

  const defaultImage = [
    "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais",
  ];

  return (
    <div style={{ marginBottom: "5rem" }}>
      <h2
        style={{
          marginTop: "2rem",
          marginBottom: "-2rem",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        Accommodation List
      </h2>
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
      {ownerRoomList.map((ownerRooms, index) => {
        if (ownerRooms.images) {
          let imageArray;
          try {
            const imagesObject = JSON.parse(ownerRooms.images);
            imageArray = Object.values(imagesObject).filter((image) => !!image); // Filter out null or undefined images
          } catch (error) {
            imageArray = [];
          }

          return (
            <AccomodationList
              key={index}
              roomid={ownerRooms.roomid}
              images={imageArray}
              washroomStatus={ownerRooms.washroom_status}
              accomodationType={ownerRooms.accomotation_type}
              category={ownerRooms.category}
              status={ownerRooms.status}
              tenant={ownerRooms.tenant}
              rentPrice={ownerRooms.rent_price}
              rate={ownerRooms.rate}
              perks={ownerRooms.perks}
            />
          );
        } else {
          return (
            <AccomodationList
              key={index}
              roomid={ownerRooms.roomid}
              images={defaultImage}
              washroomStatus={ownerRooms.washroom_status}
              accomodationType={ownerRooms.accomotation_type}
              category={ownerRooms.category}
              status={ownerRooms.status}
              rentPrice={ownerRooms.rent_price}
              rate={ownerRooms.rate}
              perks={ownerRooms.perks}
            />
          );
        }
      })}
    </div>
  );
}

export default AccomodationLists;
