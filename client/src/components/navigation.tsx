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


        return (<>
            {loginCheck? (
                <header className="header-navbar">
                    <div className="container d-flex justify-content-start">
                        <img src={logo} alt="Logo" className="logo" />
                        <h1 className="header-text">The Book Hub</h1>
                    </div>
                    <ul className="navbar">
                        <NavLink to="/profile" className="cta-button btn btn-primary">My Profile</NavLink>
                        <NavLink to="/bookSearch" className="cta-button btn btn-primary">Search Books</NavLink>
                        <NavLink to="" onClick={()=>{Auth.logout()}} className="cta-button btn btn-primary btn-logout">Logout</NavLink>
                    </ul>
                </header>) : (<></>)
            }
        </>)
}

export default Navbar