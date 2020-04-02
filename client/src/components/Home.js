import React from "react";
import "../css/Home.css";

export const Home = () => (
  <header id="home-section">
    <div className="dark-overlay">
      <div className="home-inner container">
        <div className="row">
          <div className="col-lg-7 header-text d-lg-block">
            <h1 className="display-4 header-title mx-auto">
              LEGJOBB KAJA <br />
              LEGJOBB ÉRTÉK
            </h1>
            <div className="d-flex">
              <div className="align-self-start header-p ">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              </div>
            </div>
            <div className="d-flex">
              <div className="align-self-start">
                <button type="button" className="btn btn-warning">
                  Warning
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="row animation1">
              <img src="/images/animation1.png" alt="navtiagtion1" />
            </div>
            <div className="row animation2">
              <img src="/images/animation2.png" alt="navtiagtion2" />
            </div>
            <div className="row animation3">
              <img src="/images/animation3.png" alt="navtiagtion3" />
            </div>
            <div className="row animation4">
              <img src="/images/animation4.png" alt="navtiagtion4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Home;
