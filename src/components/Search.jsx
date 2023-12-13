import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";


function Search() {

  const token = localStorage.getItem("token");
  const [topCities, setTopCities] = React.useState([]);

  React.useEffect(() => {
    async function getCityList() {
      try {
        const response = await axios.get(
         ` https://davaivala.shop/get_city_list/`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        const cities = response.data;
        const cityNames = cities.map((city) => city.city_name);
        setTopCities(cityNames);
      } catch (error) {
        console.error("Error in getting the list of cities: ", error.message);
      }
    }
    getCityList();
  }, []);

  const [selectedCity, setSelectedCity] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (token) {
      if (!selectedCity) {
        // Show the error modal if no city is selected
        setIsModalOpen(true);
      } else {
        // Handle form submission or redirection here
        localStorage.setItem("selectedCity", selectedCity);
        navigate("/searchedcity");
      }
    } else {
      navigate("/card");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="m-2">
      <form method="post" onSubmit={handleSubmit} >
        <div id="search" className="search d-flex"  >
          <Autocomplete
            disablePortal
            size="small"
            id="combo-box-demo"
            options={topCities}
            sx={{
              width: "80%",
              backgroundColor: "#fff",
              padding: 0,
              borderRadius: "5px",
            }}
            onChange={(event, newValue) => {
              setSelectedCity(newValue);
            }}
            renderInput={(params) => (
              <TextField
                // required
                {...params}
                sx={{ borderRadius: "50px",}}
                label="City"
                placeholder="Search by City"
              />
            )}
          />
          <Button className="btn btn-danger text-white bg-danger w-25 rounded mx-2" variant="dark" type="submit" style={{ borderRadius: "50px" }}>
            Search
          </Button>
        </div>
        {/* Modal for displaying error */}
        
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="No City Selected"
        >
          <h2>No city has been selected.</h2>
          <button onClick={closeModal}>Close</button>
        </Modal>
      </form>
    </div>
    
  );
}

export default Search;
