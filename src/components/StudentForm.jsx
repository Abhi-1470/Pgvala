import * as React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Domain from "./Domain";

import Alert from "@mui/material/Alert";
function Register() {
  const [isSubmit, setisSubmit] = React.useState(false);
  const [isDisabled, setDisabled] = React.useState(false);
  const [formData, setFormData] = React.useState({
    date: "",
    name: "",
    contact: "",
    owner_name: "",
    owner_contact1: "",
    owner_contact2: "",
    address: ""
  });
  
  const navigate = useNavigate();

  function CurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1; 
    let day = today.getDate();
  
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
  
    const currentDate = `${year}-${month}-${day}`;
    return currentDate;
  }
  
  async function handleStudentForm(event) {
    
    event.preventDefault();
    setDisabled(true);

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else if (
      // Add additional checks for all the required fields here
      !formData.name ||
      !formData.contact ||
      !formData.owner_name ||
      !formData.owner_contact1 ||
      !formData.address
    ) {
      event.stopPropagation();
    } else {
      // If the form is valid and all required fields are filled, proceed with the API request
      try {
        const response = await axios.post(
          `${Domain}/new_pg_listing_student/`,
          {
            // Send data from the form
            date : CurrentDate(),
            name: formData.name,
            contact: formData.contact,
            owner_name: formData.owner_name,
            owner_contact1: formData.owner_contact1,
            owner_contact2: formData.owner_contact2,
            address: formData.address,
            
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        
        // Navigate to the next component
        navigate("/");

        setisSubmit(true);
        // Optionally, you can handle the API response data as needed
        console.log("API Response:", response.data.status);
      } catch (error) {
        // Handle any errors that occur during the request
        console.error("Failed to make request: ", error.message);
      }
    }
    
    setDisabled(false);

  }

  return (
    <div className=" container ">
      <Alert
        severity="success"
        sx={{ display: isSubmit ? "block" : "none", marginBottom: "2rem" }}
      >
        You have been successfully Submited!
      </Alert>
      <h3 className="fs-1 fw-bold my-4 text-center ">Submit Form</h3>
      <Form onSubmit={handleStudentForm} >
        <Form.Group className="mb-3" >
          <Form.Label className="fw-medium fs-2">Name</Form.Label>
          <Form.Control
          className=" fs-4 p-3"
            required
            type="text"
            placeholder="Enter your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Form.Control.Feedback className="mt-2 fs-5" type="invalid">
            *Name is required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label className="fw-medium fs-2" >Contact</Form.Label>
          <Form.Control
          className=" fs-4 p-3"
            required
            type="text"
            placeholder="Enter your Contact"
            value={formData.contact}
            onChange={(e) =>
              setFormData({ ...formData, contact: e.target.value })
            }
          />
          <Form.Control.Feedback className="mt-2 fs-5" type="invalid">
            *Contact Details are required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label className="fw-medium fs-2">Owner Name</Form.Label>
          <Form.Control
            className=" fs-4 p-3"
            required
            type="text"
            placeholder="Enter Owner name"
            value={formData.owner_name}
            onChange={(e) =>
              setFormData({ ...formData, owner_name: e.target.value })
            }
          />
          <Form.Control.Feedback className="mt-2 fs-5" type="invalid">
            *Owner name is required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label className="fw-medium fs-2">Owner Contact </Form.Label>
          <Form.Control
          className=" fs-4 p-3"
            required
            type="text"
            placeholder="Enter owner contact"
            value={formData.owner_contact1}
            onChange={(e) => setFormData({ ...formData,owner_contact1: e.target.value })}
          />
          <Form.Control.Feedback className="mt-2 fs-5" type="invalid">
            *City is required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label className="fw-medium fs-2">owner_contact2</Form.Label>
          <Form.Control
          className=" fs-4 p-3"
            type="text"
            placeholder="Enter owner contact (optional)"
            value={formData.owner_contact2}
            onChange={(e) =>
              setFormData({ ...formData, owner_contact2: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label className="fw-medium fs-2">PG Address</Form.Label>
          <Form.Control
          className=" fs-4 p-3"
            required
            type="text"
            placeholder="Enter pg Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <Form.Control.Feedback className="mt-2 fs-5" type="invalid">
            *Address is required
          </Form.Control.Feedback>
        </Form.Group>
        <Button style ={{marginBottom :"4rem"}}
          className="w-50  text-white btn btn-danger bg-danger py-2 fw-medium fs-3 "
          sx={{ display: "flex", flexDirection: "row" }}
         
          disabled={isDisabled}
          type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default Register;
