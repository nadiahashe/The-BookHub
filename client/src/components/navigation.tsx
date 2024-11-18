import React from "react";
import Auth from "../utils/auth.js"

const Navbar: React.FC = () => {


    if (!Auth.loggedIn()) {
        return (<></>)
    }

    else {
        return (
            <>
                {/* insert navigation bar here */}
            </>
        )
    }
}

export default Navbar