import React, { useEffect, useState } from "react";
import Auth from "../utils/auth.js"
import { NavLink } from "react-router-dom";
import './css/navigation.css'
import logo from "../assets/logo.png"

const Navbar: React.FC = () => {

    const [loginCheck, setLoginCheck] = useState(false)

    const checkLogin = ()=> {
        if (Auth.loggedIn()) {
            setLoginCheck(true)
        }
    }

    useEffect(()=>{
        checkLogin()
    },[])


    return (
        <>
          {loginCheck ? (
            <header id='nav-header' className="header-navbar">
              <div className="container-nav">
                <img src={logo} alt="Logo" className="logo" />
                <h1 className="header-text">The Book Hub</h1>
              </div>
              <ul className="navbar">
                <li><NavLink to="/profile">Profile</NavLink></li>
                <li><NavLink to="/library">Library</NavLink></li>
                <li><NavLink to="/bookSearch">Search Books</NavLink></li>
                <li><NavLink to="" onClick={() => { Auth.logout() }}>Logout</NavLink></li>
              </ul>
            </header>
          ) : (
            <></>
          )}
        </>
      );
      
}

export default Navbar