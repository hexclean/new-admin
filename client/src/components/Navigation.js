import React from "react";
import { Link } from "react-router-dom";
import "../css/Navigation.css";

export const Navigation = () => (
  <div>
    <div class="mainnv">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <nav class="navbar navbar-expand-lg navbar-light">
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#collapsibleNavbar"
              >
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0 col-md-5 col-lg-5">
                  <li class="nav-item active">
                    <a class="nav-link" href="#">
                      Ettermek <span class="sr-only">(current)</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      Subscription
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link disabled text-yellow" href="#">
                      App letoltese
                    </a>
                  </li>
                </ul>

                <div class="mx-auto col-md-4 col-lg-5">
                  <a href="#" class="navbar-brand">
                    <img src="images/foodnet_logo.png" />
                  </a>
                  <a class="nav-link text-yellow" href="#">
                    Legy a partnerunk!
                  </a>
                </div>

                <ul class="navbar-nav ml-auto col-md-3 mt-2 mt-lg-0 align-right col-lg-2">
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <img className="menu-icons" src="images/profile.png" />
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link disabled" href="#">
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
