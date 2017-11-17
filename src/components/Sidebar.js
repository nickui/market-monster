import React from "react";

const Sidebar = () => {
    return (
 <div className="container-fluid">
    <div className="row">
        <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
            <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                    <a className="nav-link active" href="#">Dashboard <span className=
                    "sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Your Wallet</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Your Stocks</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Transaction History</a>
                </li>
            </ul>
            <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                    <a className="nav-link" href="#">League Stats</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Following</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Fact Of The Day</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Quote Of The Day</a>
                </li>
            </ul>
            <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                    <a className="nav-link" href="#">Learn More</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Profile</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Sign Out</a>
                </li>
            </ul>
        </nav>
    </div>
 </div> 
 );
};

export default Sidebar;