import { NavLink } from "react-router-dom";
import './css/Landing.css'
import logo from "../assets/logo.png"
import hero from "../assets/bookhub.png"

export default function Landing() {
  return (
    <>
      <header >
        <div className="container d-flex justify-content-start">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="header-text">The Book Hub</h1>
        </div>
      </header>
      <section id="hero">
        <div className="hero-content container-fluid" style={{ backgroundColor: "#faefe0", height: "100vh" }}>
          <div className="row h-100">
            {/* Left Column: Text */}
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <div className="hero-text">
                <h1>Where Stories Connect Us All</h1>
                <NavLink to="/login" className="cta-button btn btn-primary">LogIn</NavLink>
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