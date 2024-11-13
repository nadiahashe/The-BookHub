import { NavLink } from "react-router-dom";

export default function Landing() {
  return (
    <section id="hero">
      <div style={{backgroundColor: "#faefe0"}}>
        <NavLink to="/login" className="cta-button">LogIn</NavLink>
      </div>
    </section>
  );
}