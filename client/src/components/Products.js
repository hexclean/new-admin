import React from "react";
import "../css/Products.css";

import wave1 from "../wave1.svg";
import wave2 from "../wave2.svg";
import Footer from "./Footer";

export const Products = () => (
  <div>
    <div className="mainnv">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
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
                    <a className="nav-link" href="#">
                      Restaurants <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Subscription
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link disabled text-yellow" href="#">
                      Download App
                    </a>
                  </li>
                </ul>

                <div className="mx-auto col-md-4 col-lg-5">
                  <a href="#" className="navbar-brand">
                    <img src="images/foodnet_logo.png" />
                  </a>
                  <a className="nav-link text-yellow" href="#">
                    Be my partner
                  </a>
                </div>

                <ul className="navbar-nav ml-auto col-md-3 mt-2 mt-lg-0 align-right col-lg-2">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <img src="images/profile.png" />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link disabled" href="#">
                      <img src="images/cart.png" />
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div className="banner-section">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="white-radiusbox">
              <img src="images/rexo.png" />
            </div>
          </div>
          <div className="col-md-9">
            <h2 className="text-yellow">CE DELICII DELIVERY</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              amet,consectetuer Lorem ipsum dolor. consectetuer adipiscing elit.
            </p>
            <ul className="info-list">
              <li>
                <img src="images/icon-1.png" />
                12:00 - 22:00
              </li>
              <li>
                <img src="images/icon-2.png" />
                10-15 min
              </li>
              <li>
                <img src="images/icon-3.png" />
                25 RON+
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="margtp50 wave1bottom">
        <img className="wave1bottom" src={wave1} />
      </div>
    </div>

    <div className="product-section partner-ink black-yellow">
      <div className="container">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="search-box">
              <div className="main">
                <div className="row">
                  <div className="col-md-6">
                    <h2 className="text-white">KÍnálatunk</h2>
                  </div>
                  <div className="col-md-6 search-box">
                    <div className="input-group">
                      <div className="input-group-append">
                        <button className="btn btn-secondary" type="button">
                          <img src="images/search-icon.png" />
                        </button>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="KERESÉS..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tab-main">
          <div className="row">
            <div className="col-1 menulist menu-list-first menu9169">
              <div className="yellow-graybx">
                <a href="#">
                  <img src="images/nextrest.png" />
                </a>
              </div>
            </div>
            <div className="col-10 listmenus">
              <div className="yellow-graybx tabbx menu-resp new523m newMen">
                <a href="#">
                  <img className="img-chicken" src="images/kaja1.png" />
                </a>
                <a href="#">
                  <img className="img-chicken" src="images/kaja2.png" />
                </a>

                <a href="#">
                  <img className="img-chicken" src="images/kaja3.png" />
                </a>
                <a href="#">
                  <img className="img-chicken" src="images/kaja4.png" />
                </a>
                <a href="#">
                  <img className="img-chicken" src="images/kaja5.png" />
                </a>

                <a href="#">
                  <img className="img-chicken" src="images/kaja6.png" />
                </a>
                <a href="#">
                  <img className="img-chicken" src="images/kaja7.png" />
                </a>
              </div>
            </div>
            <div className="col-1 menulist-ri menu-list-second menu91692">
              <div className="yellow-graybx">
                <a href="#">
                  <img src="images/allergen.png" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-12">
            <div className="row">
              <div className="col-md-6 products-down padding-right">
                <div className="partner-inkbxtp margbtm-15">
                  <div className="partner-inkbx">
                    <div className="partner-inkbxlft">
                      <img src="images/cover.png" />
                    </div>
                    <div className="partner-inkbxrht">
                      <h3>SÜLT POLIPKAROK</h3>
                      <p>
                        Lorem ipsum dolor sit amet, conse-ctetuer adipiscing. SI
                        ipsum dolor sit amet Lorem DOlor Si marto.
                      </p>
                      <ul className="wh-radius">
                        <li>
                          <a href="#">gramaj:&nbsp;700g</a>
                        </li>
                        <li>
                          <a href="#">17.00 RON</a>
                        </li>
                      </ul>
                      <ul className="size-list">
                        <li className="between-variants">
                          <a href="#">SMALL</a>
                        </li>
                        <li className="between-variants">
                          <a href="#">MEDIUM</a>
                        </li>
                        <li className="between-variants">
                          <a href="#">LARGE</a>
                        </li>
                        <li className="between-variants">
                          <a href="#">SMALL</a>
                        </li>
                        <li className="between-variants">
                          <a href="#">MEDIUM</a>
                        </li>
                        <li className="between-variants">
                          <a href="#">LARGE</a>
                        </li>

                        <li>
                          <a href="#" className="small-cart">
                            <img src="images/cart-small.png" />
                            KOSÁRBA RAKOM
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="clear"></div>
                  </div>
                  <div className="text-center">
                    <a href="#" className="extra-btn">
                      EXTRÁK <img src="images/drop-arrow.png" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 padding-right">
                <div className="partner-inkbxtp margbtm-15">
                  <div className="partner-inkbx">
                    <div className="partner-inkbxlft">
                      <img src="images/icon-img-1.png" />
                    </div>
                    <div className="partner-inkbxrht">
                      <h3>PARADICSOMSZENDVICS</h3>
                      <p>
                        Lorem ipsum dolor sit amet, conse-ctetuer adipiscing. SI
                        ipsum dolor sit amet Lorem DOlor Si marto.
                      </p>
                      <ul className="wh-radius">
                        <li>
                          <a href="#">gramaj:&nbsp;700g</a>
                        </li>
                        <li>
                          <a href="#">17.00 RON</a>
                        </li>
                      </ul>
                      <ul className="size-list">
                        <li>
                          <a href="#">SMALL</a>
                        </li>
                        <li>
                          <a href="#">MEDIUM</a>
                        </li>
                        <li>
                          <a href="#">LARGE</a>
                        </li>
                        <li>
                          <a href="#">
                            VÉLEMÉNYEK&nbsp;
                            <img src="images/drop-arrowsm.png" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img src="images/cart-small.png" />
                            KOSÁRBA RAKOM
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="clear"></div>
                  </div>
                  <div className="text-center">
                    <a href="#" className="extra-btn">
                      EXTRÁK <img src="images/drop-arrow.png" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="piza-section">
      <div>
        <img src={wave2} />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-9 mx-auto">
            <div className="piza-bg">
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12 text-center">
                    <h2 className="text-white babas-regular">
                      SPÓROLJ MEG HAVI 10%-ot!
                    </h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <img src="images/home-pizza10.png" />
                </div>
                <div className="col-md-6">
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit sed
                    diam MOLENO MANO ET.
                  </p>
                  <p>
                    ipsum dolor sit amet,consectetuer adipiscing elit,sed diam
                    MOLENO MANO ET.
                  </p>
                  <a href="#" className="btn-yellow">
                    PRÓBÁLD KI!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Products;
