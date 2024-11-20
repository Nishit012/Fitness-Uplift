import React from "react";
import {  useNavigate } from "react-router-dom";
import About from "./About";
import Feature from "./Feature";
import Offer from "./Offer";
import Contact from "./Contact";
import Navbar from "./Navbar";

function Home() {
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = Boolean(localStorage.getItem("accessToken")); 

  const handleJoinClick = () => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login if not logged in
    }
    // Optionally, you could navigate to the dashboard if the user is logged in
    else {
      navigate("/"); // Redirect to dashboard if already logged in
    }
  };

  return (
    <>
      <Navbar />
      <div id="main">
        <div className="name">
          <h2>SET UP YOUR</h2>
          <h1>
            <span>FITNESS</span> WITH US
          </h1>
          <p className="details">
            Build Your Body Fitness With Professional Touch
          </p>
          <div >
            {
              isLoggedIn ?(
                <p></p>
              ):(
                <button onClick={handleJoinClick} className="header-btn">
                  JOIN US  
                </button>
              )
            }
          </div>
        </div>
      </div>
      <Feature />
      <Offer />
      <About />
      <Contact />
    </>
  );
}

export default Home;
