import { NavLink } from "react-router-dom";
import './css/Landing.css'
import logo from "../assets/logo.png"

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
        <div className="hero-content" style={{ backgroundColor: "#faefe0", height: "100vh" }}>
          <NavLink to="/login" className="cta-button">LogIn</NavLink>
        </div>
      </section>
    </>
  );
}