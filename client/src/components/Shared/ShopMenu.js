import React from "react";
import { Link } from "react-router-dom";

export const ShopMenu = () => (
  <nav class="navbar container-bg navbar-expand-lg  static-top">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img className="logo-header" src="images/foodnet.png" alt="" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              <Link to={"/registration/"}>REGISZTRÁCIÓ</Link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              BELÉPÉS
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default ShopMenu;
