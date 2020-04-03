import React from "react";
import "../css/Home.css";
import logo from "../wave2.svg";
import logo2 from "../wabe-bt.svg";
export const Home = () => (
  <div>
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
                <img
                  className="burger-size"
                  src="/images/animation1.png"
                  alt="navtiagtion1"
                />
              </div>
              <div className="row animation2">
                <img
                  className="burger-size"
                  src="/images/animation2.png"
                  alt="navtiagtion2"
                />
              </div>
              <div className="row animation3">
                <img
                  className="burger-size"
                  src="/images/animation3.png"
                  alt="navtiagtion3"
                />
              </div>
              <div className="row animation4">
                <img
                  className="burger-size"
                  src="/images/animation4.png"
                  alt="navtiagtion4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <img src={logo} />
    </header>

    <section id="explore-head-section">
      <div className="container-fluid orange-bck">
        <div className="row">
          <div className="col text-center py-5">
            <h1 className="display-4 partners">PARTNEREINK</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 offset-lg-2 offset-sm-0 bg thumbnail">
            <div className="row">
              <div className="col-6 partners-ph">
                <img
                  className="img-fluid pt-img"
                  src="/images/animation3.png"
                  alt="navtiagtion3"
                />
              </div>
              <div className="col-6 partners-info">
                <p className="text-center">PARTNEREINK</p>
                <p className="text-center">PARTNEREINK</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4  thumbnail bg">
            <div className="row">
              <div className="col-6 d-flex justify-content-center partners-ph">
                <img
                  className="img-fluid pt-img"
                  src="/images/animation3.png"
                  alt="navtiagtion3"
                />
              </div>
              <div className="col-6 partners-info">
                <p className="text-center">PARTNEREINK</p>
                <p className="text-center">PARTNEREINK</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col text-center py-5">
            <h1 className="display-4 partners">TOVÁBBI ÉTTERMEK</h1>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
