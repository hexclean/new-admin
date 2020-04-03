import React from "react";
import "../css/Home.css";
import logo3 from "../wave-bl.svg";
import logo from "../wave-or2.svg";
import logo2 from "../wave-or.svg";
export const Partners = () => (
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
                  className="burger-size animation1"
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
                  className="burger-size animation4"
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
      <img src={logo2} />
    </section>
    {/* Sporolj meg */}
    <section id="explore-head-section1">
      <img src={logo3} />
      <div className="container-fluid wt-is">
        <div className="row">
          <div className="col text-center py-5">
            <h1 className="display-4 what-is text-uppercase">
              SPÓROLJ MEG HAVI 10%-ot!
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 partners  offset-lg-1 d-flex justify-content-center">
            <img
              className="new-img"
              src="/images/home-pizza10.png"
              alt="navtiagtion3"
            />
          </div>
          <div className="col-lg-4">
            <div className="row">
              <div className="col-6 partners">
                <p className="text-center">
                  Lorem ipsum dolor sit ametpsum dolor sit ametpsum dolor sit
                  ametpsum dolor sit amet
                </p>
                <button type="button" className="btn btn-warning">
                  Warning
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="test" src={logo} />
    </section>
    {/* end sporolj meg */}
  </div>
);

export default Partners;
