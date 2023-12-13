import * as React from "react";
import axios from "axios"; 
import Domain from "./Domain";
import  { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";



function OrderDetails(params) {

  const navigate = useNavigate();
   
  const [agentOrder, setAgentOrder] = useState([]);

  // api fetching

    useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzMyODk4NTYsImlhdCI6MTcwMTc1Mzg1Niwic2NvcGUiOiJhY2Nlc3NfdG9rZW4iLCJzdWIiOiIzIn0.ZypYdWYWolPZ8k1vimH13WoNMLn5sIsGMffARiIPjD0"
        const response = await axios.get( `${Domain}/today-order/`,
          {
            headers: {
              Accept: " application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const agentData =  response.data;
          setAgentOrder(agentData);
      } catch (error) {
        console.error('Error fetching data:', error);
        }
    };
    fetchData();
  }, []); 

   // navigate data to agent details page with id 

   const DetailsHandler = (orderno)=> {

   navigate("/agentdetail",{state :{id :orderno}});

  }

  return (
   //order cards 
    <div>
      {agentOrder.map((order, index) => (
        <div key={index}>
          <section  className=" gradient-custom-2">
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center h-100 mt-3">
                    <div className="col-md-10 col-lg-8 col-xl-6">
                        <div className="card card-stepper" >
                            <div className="card-header p-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p className="text-muted mb-2">  orderId 
                                          <span className="fw-bold text-body">{order.orderno}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-muted mb-0"> Time : 
                                          <span className="fw-bold text-body">{order.start_time}</span> 
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-4">
                                <div className="d-flex flex-column  mb-4 pb-2">
                                    <div className="flex-fill">
                                        <p className="text-dark fw-bold fs-3 mb-3"> {order.name} </p>
                                    
                                        <p className="mb-3"> Contact :
                                          <span className="small text-muted">{order.contact} </span>
                                        </p>
                                        <p className="text-muted mb-3">No of Sites :
                                          <span className="text-body">{order.no_of_visit}</span>
                                        </p>
                                        <p className="text-muted">Place On  : 
                                           <span className="text-body">{order.service_area}</span>
                                        </p>
                                    </div>
                                    <div className='mt-3 text-center'>
                                    <button type="button"
                                       
                                        onClick={() =>DetailsHandler(order.orderno)} 
                                        className="btn btn text-white bg-danger rounded-pill">View Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </section>
       </div>
      ))}
    </div>   
  );
};

export default OrderDetails;