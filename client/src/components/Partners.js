import React from "react";
import "../css/Home.css";
import logo3 from "../wave-bl.svg";
import logo from "../wave-or2.svg";
import logo2 from "../wave-or.svg";
import Navigation from "./Navigation";
export const Partners = () => (
  <div>
    <header id="home-section">
      <Navigation />
      <div className="dark-overlay">
        <div className="home-inner container">
          <div className="row">
            <div className="col-lg-7 header-text d-lg-block">
              <h1 className="display-4 header-title mx-auto">
                LEGJOBB KAJA <br />
                LEGJOBB ÉRTÉK
              </h1>
              <div className="d-flex">
                <div className="align-self-start header-subtitle ">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </div>
              </div>
              <div className="d-flex">
                <div className="align-self-start">
                  <button
                    type="button"
                    className="btn btn-warning header-button"
                  >
                    próbáld ki!
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="row">
                <img
                  className="burger-header"
                  src="/images/burger.png"
                  alt="navtiagtion1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 142.75"
      >
        <defs>
          <style>.cls-1</style>
        </defs>
        <title>svg wave</title>
        <path
          class="cls-1"
          d="M0,137.06S348.25,28.6,901.44,82.78,1920,22.81,1920,22.81V165.56H0Z"
          transform="translate(0 -22.81)"
        />
      </svg>
    </header>
  </div>
);

export default Partners;
