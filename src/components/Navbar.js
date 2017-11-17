import React from "react";

const Navbar = () => {
return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="#">Market Monster</a> 
    <button aria-controls="navbarSupportedContent" aria-expanded="false" 
        aria-label="Toggle navigation" className="navbar-toggler" data-target="#navbarSupportedContent" 
        data-toggle="collapse" type="button"><span className="navbar-toggler-icon"></span></button>
    <div className="collapse navbar-collapse navbar-toggler-right" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a className="nav-link" href="#">About</a>
            </li>
        </ul>
        <button className="btn btn-outline-primary my-2 my-sm-0" type="button">Log Out</button>
    </div>
</nav>
)
};

export default Navbar;