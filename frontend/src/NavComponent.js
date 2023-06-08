import React from "react";
import { NavLink } from "react-router-dom";

function NavComponent () {
    return (
        <nav>
            <NavLink to = "/">Jobly</NavLink>
            <NavLink to = "/companies">Companies</NavLink>
            <NavLink to = "/jobs">Jobs</NavLink>
            <NavLink to = "/login">Log in</NavLink>
            <NavLink to = "/signup">Sign Up</NavLink>
            <NavLink to = "/profile">Profile</NavLink>
        </nav>
        )
}

export default NavComponent;