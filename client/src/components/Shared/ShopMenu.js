import React from "react";
import { Link } from "react-router-dom";

export const ShopMenu = () => (
  <nav className="navbar container-bg navbar-expand-lg  static-top">
    <div className="container">
      <Link className="navbar-brand" to="/">
        <img className="logo-header" src="images/foodnet.png" alt="" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="/navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              <Link to={"/registration/"}>REGISZTRÁCIÓ</Link>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              BELÉPÉS
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default ShopMenu;
