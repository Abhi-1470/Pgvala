import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./Navbar";
import MainLandingPage from "./MainLandingPage";
import FooterNav from "./FooterNav";
import Cards from "./Cards";
import Register from "./Register";
import Login from "./Login";
import OwnerLogin from "./OwnerLogin";
import AgentLogin from "./AgentLogin";
import AgentOrder from "./AgentOrder";
import AgentDetail from "./AgentDetail";
import Bookings from "./Bookings";
import RatingAndReview from "./RatingAndReview";
import AccommodationLists from "./AccommodationLists";
import ConstructionIcon from "@mui/icons-material/Construction";
import OwnerBookingSchedules from "./OwnerBookingSchedules";
import { HashRouter, Route, Routes } from "react-router-dom";
import CompletePaymentStatus from "./CompletePaytmentStatus";
import AgentPayment from "./AgentPayment";
import StudentForm from "./StudentForm";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <NavigationBar  />
        <FooterNav />
      </div>
      <Routes>
        <Route path="/" element={<MainLandingPage />} />
        <Route path="/searchedcity" element={<Cards />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ratingandreview" element={<RatingAndReview />} />
        <Route path="/accommodationlist" element={<AccommodationLists />} />
        <Route
          path="/roominputowner"
          element={
            <div
              style={{
                fontWeight: "bold",
                fontSize: "3rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "85vh",
                width: "100%",
              }}
            >
              <ConstructionIcon sx={{ fontSize: "5rem", color: "red" }} />
              COMING <span style={{ color: "red" }}>SOON...</span>
            </div>
          }
        />
        <Route path="/ownerlogin" element={<OwnerLogin/>} />
        <Route path="/agentlogin" element={<AgentOrder />} />
        <Route path="/agentorder" element={<AgentOrder />} />
        <Route path="/agentdetail" element={<AgentDetail />} />
        <Route path="/agentpayment" element={<AgentPayment/>} />
        <Route path="/studentform" element={<StudentForm/>} />
        <Route
          path="/ownerbookingschedule"
          element={<OwnerBookingSchedules />}
        />
        <Route path="/ownerpaymentstatus" element={<CompletePaymentStatus />} />
        <Route path="*" element={<MainLandingPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
