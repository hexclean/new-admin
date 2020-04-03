import React from "react";
import "../css/Navigation.css";

export const Navigation = () => (
  <div>
    <div className="mainnv">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 col-md-5">
              <li className="nav-item active">
                <a className="nav-link fonts-1" href="#">
                  Restaurants
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fonts-1" href="#">
                  Subscription
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled text-yellow fonts-1" href="#">
                  Download App
                </a>
              </li>
            </ul>

            <div className="mx-auto col-md-2">
              <a href="#" className="navbar-brand">
                <img src="images/logo.png" alt="foodnet.ro" />
              </a>
            </div>

            <ul className="navbar-nav ml-auto col-md-5 mt-2 mt-lg-0 align-right">
              <li className="nav-item active">
                <a className="nav-link text-yellow fonts-1" href="#">
                  Be my partner
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <img src="images/profile.png" alt="foodnet.ro" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">
                  <img src="images/cart.png" alt="foodnet.ro" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
);

export default Navigation;
