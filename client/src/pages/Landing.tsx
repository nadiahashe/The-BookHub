import { NavLink, useNavigate } from "react-router-dom";
import './css/Landing.css'
import logo from "../assets/logo.png"
import hero from "../assets/bookhub.png"
import { useEffect } from "react";
import Auth from "../utils/auth.js"

export default function Landing() {

const navigate = useNavigate()

useEffect(()=>{
  if (Auth.loggedIn()) {
    navigate('/profile')
  }
},[])

  return (
    <>
      <header >
        <div className="container d-flex justify-content-start">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="header-text">The Book Hub</h1>
        </div>
        <NavLink to="/login" className="cta-button btn btn-primary">LogIn</NavLink>
      </header>
      <section id="hero">
        <div className="hero-content container-fluid" style={{ backgroundColor: "#faefe0", height: "100vh" }}>
          <div className="row h-100">
            {/* Left Column: Text */}
            <div className="col-md-6 d-flex ">
              <div className="hero-text">
                <h1>Where Stories Connect Us All</h1>
              </div>
            </div>

            {/* Right Column: Hero Image */}
            <div className="col-md-6">
              <img src={hero} alt="Hero" className="hero-image" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}