import React from "react";
import "../css/Home.css";
import waveBlackTop from "../wave-bl.svg";
import waveOrangeTop from "../wave-or2.svg";
import waveOrangeBottom from "../wave-or.svg";
import waveBlackBottom from "../wawexd.svg";
import Navigation from "./Navigation";
export const Home = () => (
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
    <section id="explore-head-section">
      <div className="container-fluid section-two-partners orange-bck test111 ">
        <div className="row">
          <div className="col text-center py-5 partners-block">
            <h1 className="display-4 partners-text-sec-two">PARTNEREINK</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 offset-lg-2 offset-sm-0 bg thumbnail">
            <div className="row">
              <div className="col-6 partners-image-info-box">
                <img
                  className="img-fluid pt-img"
                  src="/images/animation3.png"
                  alt="navtiagtion3"
                />
              </div>
              <div className="col-6 ppartners-detail-info-box">
                <p className="text-center">PARTNEREINK</p>
                <p className="text-center">PARTNEREINK</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4  thumbnail bg space-between-restaurants-hor">
            <div className="row">
              <div className="col-6 d-flex justify-content-center partners-image-info-box">
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
        <div className="row space-between-restaurants">
          <div className="col-lg-4 offset-lg-2 offset-sm-0 bg thumbnail">
            <div className="row">
              <div className="col-6 partners-image-info-box">
                <img
                  className="img-fluid pt-img"
                  src="/images/animation3.png"
                  alt="navtiagtion3"
                />
              </div>
              <div className="col-6 partners-detail-info-box">
                <p className="text-center">PARTNEREINK</p>
                <p className="text-center">PARTNEREINK</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 space-between-restaurants-hor thumbnail bg">
            <div className="row">
              <div className="col-6 d-flex justify-content-center partners-image-info-box">
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
            <h1 className="display-4 partners-text-sec-p">TOVÁBBI ÉTTERMEK</h1>
          </div>
          <div className="col-lg-12">
            <div className="row">
              <div class="col d-flex next-rest-icon justify-content-center">
                <img
                  className=""
                  src="/images/nextrest.png"
                  alt="navtiagtion3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* Sporolj meg */}
    <section id="explore-head-section1 test2">
      <div className="container-fluid wt-is what-is-section">
        <div className="row">
          <div className="col text-center py-5">
            <h1 className="display-4 what-is-section-title text-uppercase what-is-title ">
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
                <p className="align-self-start short-desc-wht">
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
      <img src={waveBlackBottom} alt="foodnet.ro" />
    </section>
    {/* end sporolj meg */}
    <div className="app-div">
      <img src={waveOrangeTop} />
      <div className="dark-overlay orange-bc">
        <div className="home-inner container">
          <div className="row">
            <div className="col-lg-7 header-text d-lg-block">
              <h1 className="display-4 text-white mx-auto store-section-text">
                LEGJOBB KAJA <br />
                LEGJOBB ÉRTÉK
              </h1>
              <div className="d-flex">
                <div className="align-self-start text-bcg-balck ">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </div>
              </div>
              <div className="d-flex store">
                <div className="align-self-start">
                  <img
                    className=""
                    src="/images/appstore.png"
                    alt="navtiagtion3"
                  />
                </div>
                <div className="align-self-start">
                  <img
                    className=""
                    src="/images/googleplay.png"
                    alt="navtiagtion3"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="row">
                <img
                  className="burger-header"
                  src="/images/happymen.png"
                  alt="navtiagtion1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="footer-top">
      <img src={waveBlackTop} />
      <div className="container-fluid wt-is">
        <div className="row">
          <div className="col text-center py-5">
            <h1 className="display-4 footer-title ">
              íratkozz fel hírlevelünkre és <br />
              értesülj elsőként legújabb partrenreinkről!
            </h1>
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
        <style></style>
      </defs>
      <title>svg wave</title>
      <path
        class="cls-1"
        d="M0,137.06S348.25,28.6,901.44,82.78,1920,22.81,1920,22.81V165.56H0Z"
        transform="translate(0 -22.81)"
      />
    </svg>
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 142.75"
    >
      <defs>
        <style></style>
      </defs>
      <title>svg wave</title>
      <path
        class="cls-1"
        d="M0,137.06S348.25,28.6,901.44,82.78,1920,22.81,1920,22.81V165.56H0Z"
        transform="translate(0 -22.81)"
      />
    </svg>
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 142.75"
    >
      <defs>
        <style></style>
      </defs>
      <title>svg wave</title>
      <path
        class="cls-1"
        d="M0,137.06S348.25,28.6,901.44,82.78,1920,22.81,1920,22.81V165.56H0Z"
        transform="translate(0 -22.81)"
      />
    </svg>
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 142.75"
    >
      <defs></defs>
      <title>svg wave2</title>
      <path
        class="cls-1"
        d="M1920,28.5S1571.75,137,1018.56,82.78,0,142.75,0,142.75V0H1920Z"
      />
    </svg>
  </div>
);

export default Home;
