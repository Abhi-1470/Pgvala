import * as React from "react";
import Button from "@mui/material/Button";
import Carousel from "react-bootstrap/Carousel";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Radio from '@mui/material/Radio';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Modal from '@mui/material/Modal';
import logo from "../assets/images/logo-2.jpeg";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedIcon from "@mui/icons-material/Bed";
import perksIcon from "../assets/images/perks.png";
import ChairIcon from "@mui/icons-material/Chair";
import {useEffect,useState} from "react";
import axios from "axios"; 
import Domain from "./Domain";
import Form from "react-bootstrap/Form";
import { useLocation } from 'react-router-dom';
import { comment } from "postcss";

const AgentDetail = () => {

  // fetch order id from agent order page

  const location = useLocation();

  const [agentDetails, setAgentDetails] = useState([]);
  const [carouselImg, setCarouselImg] = useState([]);
  
  
    


  // Api data using orderid
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzMyODk4NTYsImlhdCI6MTcwMTc1Mzg1Niwic2NvcGUiOiJhY2Nlc3NfdG9rZW4iLCJzdWIiOiIzIn0.ZypYdWYWolPZ8k1vimH13WoNMLn5sIsGMffARiIPjD0"
        const response = await axios.get( `${Domain}/order_detail/?orderno=${location.state.id}`,
          {
            headers: {
              Accept: " application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

       
        const agentDetails =  response.data;
       
       // console.log(agentDetails)
        setAgentDetails(agentDetails);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  },[location]); 

    
    

  // js styling
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "350px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '20px',
    margin :"10px"

  };
  

 const parseImage =( data)=>{
  const imagesObject = JSON.parse(data);
  const imageArray = Object.values(imagesObject);
   return imageArray;
 }



    

  //  status button work
  const [status, setStatus] = React.useState("deal done");

  // const statusChange = (e) => {
  //   setStatusValue(e.target.value);
  //   console.log(statusValue);

  // };

  function handleChange(params) {

    setStatus(params.value);

    if(status === "deal done"){

      
      console.log(status)

    }
    

  }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    

    // feedback butoon work 

    const [feedback, setFeedback] = React.useState(false);
    const openfeedbackhandler = () => setFeedback(true);
    const closefeedbackhandler = () => setFeedback(false);

    const [reviewData, setreviewData] = useState("")

    async function handleReview(e) {
      
      e.preventDefault();

    setreviewData(e.target.value)

}
      useEffect(() => {
        const fetchData = async () => {
          try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzMyODk4NTYsImlhdCI6MTcwMTc1Mzg1Niwic2NvcGUiOiJhY2Nlc3NfdG9rZW4iLCJzdWIiOiIzIn0.ZypYdWYWolPZ8k1vimH13WoNMLn5sIsGMffARiIPjD0"
            const response = axios.put( `${Domain}/agent_feedback_to_landlord/ `, {
              
            clid : null,
            comment :reviewData,


            }, {
              headers: {
                Accept: " application/json",
                Authorization: "Bearer " + token,
              },
            })
              .then(response => {
                setreviewData(reviewData)
              })
              .catch(error => {
                throw error
              });
            console.log(response.data.status);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        
        fetchData();
      },[reviewData ]); 
  
    

  return (
    
    <div className="container-fluid  position-absolute bottom-10 mt-4 ">
       <h2 className="text-center fs-3 font-weight-bold">Order Details</h2>
       {agentDetails.map((detail,index) =>(
           

            <div className="container">
            <div className="row ">
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body">
                      <div className="d-flex">
                        <div className="dropdown">
                          <button className="btn btn-link p-0 text-muted" type="button" data-bs-toggle="dropdown">
                            <i class="bi bi-three-dots-vertical"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-4  agentdetails" >
                    <div className="card-body  " style={{style}}>
                      <div className="row d-flex flex-column " >
                        <div className="d-flex   align-items-center ">
                          <img
                            src={logo}
                            alt="company-logo"
                            style={{ width: "80px", height: "70px",  borderRadius:"50%"}}
                          />
                          <div className="mx-3">
                            <p className="fw-medium">{detail.apartment_name}</p>
                            <p>{detail.locality}</p>
                            <p>{detail.address}</p>
                          </div>
                        </div>
                        <div>
                          {parseImage(detail.images).map((image)=> (
                            <div key={index}>
                              <div className="carousel mt-3">
                                <Carousel data-bs-theme="dark" >
                                  <Carousel.Item   interval={1000}>
                                    <div  className="carousel-img" style={{ position: "relative" }}>
                                      <img
                                     
                                      className="d-block w-100  img-1 "
                                      src={`https://pgvala.s3.amazonaws.com/${image}`}
                                      alt="First Slide"
                                      height="100px"
                                      />
                                    </div>
                                  </Carousel.Item>
                                </Carousel>
                              </div> 
                            </div>
                          ))}
                        </div>
                      </div>
                       {/* <CardContent>
                        <div variant="body2" className="amenities" color="text.secondary">
                          <Accordion sx={{ marginBottom: "1rem" }}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography sx={{ color: "red" }}>
                                See Amenities and Facilities
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "left",
                                alignItems: "start",
                                flexWrap: "wrap",
                                gap: "0.5rem",
                              }}
                            >
                              {perksList.map((perk, index) => (
                                <Typography
                                  key={index}
                                  sx={{
                                    padding: "3px",
                                    border: "1px solid #000",
                                    borderRadius: "20px",
                                    fontSize: "0.8rem",
                                  }}
                                >
                                  {" "}
                                  <img
                                    style={{ margin: "0 0.5rem" }}
                                    src={perksIcon}
                                    alt="perks-icon"
                                  />
                                  {capitalizeFirstLetter(perk)}
                                </Typography>
                              ))}
                            </AccordionDetails>
                          </Accordion>
                        </div>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            width: "100%",
                            paddingTop: "1rem",
                            textAlign: "center",
                          }}
                        >
                          <div
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              width: "max-content",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <BedIcon color="error" />
                            <Typography sx={{ fontSize: "0.7rem", color: "#B4B4B3" }}>
                              {capitalizeFirstLetter(props.accomodationType)}
                            </Typography>
                          </div>
                          <div
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              width: "max-content",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <ChairIcon color="error" />
                            <Typography sx={{ fontSize: "0.7rem", color: "#B4B4B3" }}>
                              {capitalizeFirstLetter(props.category)}
                            </Typography>
                          </div>
                          <div
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              width: "max-content",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <PersonPinIcon color="error" />
                            <Typography sx={{ fontSize: "0.7rem", color: "#B4B4B3" }}>
                              {capitalizeFirstLetter(props.tenant)}
                            </Typography>
                          </div>
                          <div
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              width: "max-content",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <BathtubIcon color="error" />
                            <Typography sx={{ fontSize: "0.7rem", color: "#B4B4B3" }}>
                              {capitalizeFirstLetter(props.washroomStatus)}
                            </Typography>
                          </div>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            color: "#61677A",
                            padding: "1rem 1rem 0 0",
                            marginBottom: "-1rem",
                          }}
                        >
                          ₹ {props.rentPrice}/{capitalizeFirstLetter(props.rate)}
                        </Typography>
                      </CardContent> */}

                      
                      <div className="mb-3 d-flex  justify-content-between">
                      <div className="mt-2">
                        <p className="text-warning "> Room ID : <span class="me-3 text-dark">{detail.roomid}</span></p>              
                        <p className="font-weight-bold my-3"> Owner Name : <span className="me-3">{detail.owner_name}</span></p>
                        <p className="text-success"> Contact 1 : <span className="me-3 text-dark">{detail.contact1}</span></p>
                        <p className="text-success"> Contact 2 : <span className="me-3 text-dark">{detail.contact2}</span></p>
                      </div>                      
                      </div>
                    </div>              
                    <div className=" d-flex  my-3 justify-content-center justify-content-around">
                      <button className="btn btn text-white bg-danger rounded mx-2">Diraction</button>
    
                      {/* review button */}
                      <Button onClick={openfeedbackhandler} className="btn btn text-white bg-dark rounded ">Feedback</Button>
                        <Modal
                          open={feedback}
                          onClose={closefeedbackhandler}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Form className=" mx-2 my-5" onSubmit={handleReview }>
                              <h2 className="fw-bold fs-3 text-center text-muted">Feedback </h2>
                              <div className="form-group">
                                <label for="review" className="mt-3 mb-2">Feedback</label>
                                <textarea 
                                className="form-control"
                                 id="review" rows="3" 
                                 value={reviewData}
                                 placeholder="Please Drop Your Feedback ...."
                                 required
                                 onChange={(e)=>(setreviewData(e.target.value))}
                                />                          
                              </div>
                              <Button type="submit" className="btn btn mt-3 mb-2  text-white bg-primary rounded mx-2">Submit</Button>
                            </Form>
                          </Box>
                        </Modal>
    
                        {/* status button */}
                      <Button onClick={handleOpen} className="btn btn text-white bg-success rounded mx-2">Status</Button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >

                          <Box sx={style}>
                             <Switch
                                checked={!status}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': ! 'controlled' }}
                              />
                        </Box>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>

       ))}
      
            <br /><br /> <br /><br /><br /><br /><br /><br />
    </div>
    );
};

export default AgentDetail;