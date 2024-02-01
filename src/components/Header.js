import React from "react";
import { NavLink,useLocation } from "react-router-dom";

let Header=()=>{
    let location=useLocation();
    let currentPath=location.pathname;
    return (
        <div>
            <div className="Navbar">
                <div className="Shadow"></div>
                <NavLink to="/" className={currentPath ==="/" ? "active" : ""}>Signup</NavLink>
                <NavLink to="/podcast" className={currentPath==="/podcast"?"active":""}>Podcast</NavLink>
                <NavLink to="/create-a-podcast" className={currentPath==="/startapodcast"?"active":""}>Start A Podcast</NavLink>
                <NavLink to="/profile" className={currentPath==="/profile"?"active":""}>Profile</NavLink>
            </div>
        </div>
    )
}
export default Header;