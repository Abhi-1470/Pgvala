import * as React from "react";
import axios from "axios"; 
import Domain from "./Domain";
import  { useState, useEffect } from 'react';

function AgentPayment() {

  const [agentPayments, setAgentPayments] = useState([]);
  
//fetching api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzMyODk4NTYsImlhdCI6MTcwMTc1Mzg1Niwic2NvcGUiOiJhY2Nlc3NfdG9rZW4iLCJzdWIiOiIzIn0.ZypYdWYWolPZ8k1vimH13WoNMLn5sIsGMffARiIPjD0"
        const response = await axios.get (`${Domain}/task-payment/`,
          {
            headers: {
              Accept: " application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const agentData =  response.data;
          setAgentPayments(agentData);
  
      } catch (error) {
        console.error('Error fetching data:', error);
        }
    };

   fetchData();
  }, []); 

  return (
    <div>
      <div className="container ">
       <h1 className='text-center my-3 fs-4 fw-bold'>Payments History</h1>
       <div class="col-lg-3 mb-3">
        <div class="card position-sticky top-0">
          <div class="p-3 bg-light bg-opacity-10">
            <h6 class="card-title mb-3"> total Order payment: bnjnjhs</h6> 
             <p>Total Amount done : kkdkd</p>
          </div>
        </div>
      </div>
      <div>

        {/* total order details  */}

        {agentPayments.map((agentpayment)=>(
          <div class="col-lg-3 my-3">
            <div class="card position-sticky top-0 bottom-2">
              <div class="p-3 bg-light bg-opacity-10">
                <h5 class="card-title mb-3">Order Id : {agentpayment.orderno}</h5>
                <h6 class="card-title mb-3">Service Area : {agentpayment.service_area}</h6>
                <div class="d-flex justify-content-between mb-1 small">
                  <span >Rating</span> <span>{agentpayment.agent_rating}</span>
                </div>
                <div class="d-flex justify-content-between mb-1 small">
                  <span>Visited Date :</span> <span>{agentpayment.vist_date}</span>
                </div>
                <div class="d-flex justify-content-between mb-1 small">
                  <span>Start Time</span> <span class="text-danger">{agentpayment.start_time}</span>
                </div>
                <div class="d-flex justify-content-between mb-1 small">
                  <span>End Time</span> <span class="text-danger">{agentpayment.end_time}</span>
                </div>
                <hr/>
                <div>
                    <div className='my-2'>
                        <b >
                            Review : 
                        </b>
                        <span > Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, dicta?</span>
                    </div>
                </div>
                <div class="btn btn-warning w-100 mt-2">{agentpayment.payment_status}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      <br /><br /><br /><br />
    </div>
 
    
  );
}

export default AgentPayment
