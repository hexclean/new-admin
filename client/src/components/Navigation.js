import React from "react";
import { Link } from "react-router-dom";
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
            data-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 col-md-5 col-lg-5">
              <li className="nav-item active">
                <a className="nav-link">
                  Restaurants <span className="sr-only">(current)</span>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link">Subscription</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled text-yellow">Download App</a>
              </li>
            </ul>

            <div className="mx-auto col-md-4 col-lg-5">
              <a className="navbar-brand">
                <img src="images/logo.png" />
              </a>
              <a className="nav-link text-yellow">Be my partner</a>
            </div>

            <ul className="navbar-nav ml-auto col-md-3 mt-2 mt-lg-0 align-right col-lg-2">
              <li className="nav-item">
                <a className="nav-link">
                  <img src="data:image/webp;base64,UklGRnQBAABXRUJQVlA4TGgBAAAvI4AIENejoG0bxvxJ77Qg5n/+FbZt24YqqVuR27YNcpot8w2MGQgARADAzAGEjQBAAAKYDEaCiTABBACrKADhHK9kCMaKjQAWJgQIInD2SBHuMx/8jH4J4pcBCyKACf6gu+UjAACItm2bbk5sFqmD2gxr27YVG+f7L87NF0T0fwJA3BpaO79/Opz3gsLuZ2TX1k1k/iQKHlMZH1E4RjSH4nd6mgOJ+hCJ610CEyRdaZlNEn9Z5oSmInNK0leS2Sdp+ZZZJoFjmVGaWYk3O431RSwBxMMFkQstFUyVeNcOoB94YGQ2bECt63GAZXx1ayfcqQF3K03HZeWmF9japeRfwiDnO8ojYuY+Hgj6R7Z/GoiNj4hZrO2giOxGuVyuIvdrwSIwmEPyCw1Hc4cKo5wZVHnLOVOC04x+VHvG2FOEIQDwZVVtAsAKqs60W12/ynBxLIzqU687TYD/k03weQkTVw93Sl93PU4=" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">
                  <img src="data:image/webp;base64,UklGRpIBAABXRUJQVlA4TIYBAAAvIoAIEMejoG0byfxJ35ONw/zPv8K2bdtQJXUTTdswV5W9gXEG7MH6FMA6hPgQByCABRAEAAtChDAhhDhPFysbHiYmwkR4CE0yRKExAcBKhg0Q1nJgon9lyJKMGwAQJEk2bfWzbZvfxv22bdvm7P++O++cHUT0fwKUw4PjHhPk/hIRDUoi9Y1XTufoMhFtzS2LXptMA/A9kdyHBKBfkkT9APpl9QLIvcv5TwOwHspZtgHAuJTfHNTVLxmrpgaWUxl1NF6UcGDWaP0S1wZN972wE4cWdoQpYPaKuvZy4t9i/hSwd8Q8u3jzYvrAHv4ket7d3WMfLpTArr0T/bRYmrQawbYdEz0VITf/RnRa7xBa1kq+kvi8BmYldGt5xi4vTs8vm704O73bCGkBzlDM7wryPe5wNGgENzmxPeBFk5XplXYDJ/VMREcB3hAR0YyZsU7qER3Hf6X6LjAeGywZOdkXFXUx9hsoOk7kVvVfZeQ/iOgmBraimrUzkFk8nkqCb2jfPFDsAAA=" />
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
