import React from "react";
import { Link } from "react-router-dom";
import "../css/Navigation.css";

export const Navigation = () => (
  <div>
    <div className="mainnv">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <nav className="navbar navbar-expand-lg navbar-light">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#collapsibleNavbar"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0 col-md-5 col-lg-5">
                  <li className="nav-item active">
                    <a className="nav-link" href="#">
                      Ettermek <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Subscription
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link disabled text-yellow" href="#">
                      App letoltese
                    </a>
                  </li>
                </ul>

                <div className="mx-auto col-md-4 col-lg-5">
                  <a href="#" className="navbar-brand">
                    <img src="images/foodnet_logo.png" />
                  </a>
                  <a className="nav-link text-yellow" href="#">
                    Legy a partnerunk!
                  </a>
                </div>

                <ul className="navbar-nav ml-auto col-md-3 mt-2 mt-lg-0 align-right col-lg-2">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <img className="menu-icons" src="images/profile.png" />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link disabled" href="#">
                      <img className="menu-icons" src="images/cart.png" />
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Navigation;
