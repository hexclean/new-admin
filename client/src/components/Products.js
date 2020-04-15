import React from "react";
import "../css/Products.css";

import wave1 from "../wave1.svg";
import wave2 from "../wave2.svg";
import Navigation from "./Navigation";

export const Products = () => (
  <div>
    <Navigation />

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
      <div className="margtp50">
        <img src={wave1} alt="" />
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
                  <div className="col-md-6">
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

        <div className="tab-main margin">
          <div className="row">
            <div className="col-1">
              <div className="yellow-graybx">
                <a href="#">
                  <img src="images/nextrest.png" />
                </a>
              </div>
            </div>
            <div className="col-10">
              <div className="yellow-graybx tabbx">
                <a href="#">
                  <img src="images/kaja1.png" />
                </a>
                <a href="#">
                  <img src="images/kaja2.png" />
                </a>

                <a href="#">
                  <img src="images/kaja3.png" />
                </a>
                <a href="#">
                  <img src="images/kaja4.png" />
                </a>
                <a href="#">
                  <img src="images/kaja5.png" />
                </a>

                <a href="#">
                  <img src="images/kaja6.png" />
                </a>
                <a href="#">
                  <img src="images/kaja7.png" />
                </a>
              </div>
            </div>
            <div className="col-1">
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
              <div className="col-md-6 padding-right">
                <div className="partner-inkbxtp margbtm-15">
                  <div className="partner-inkbx">
                    <div className="partner-inkbxlft">
                      <img src="/images/pr2.png" />
                    </div>
                    <div className="partner-inkbxrht">
                      <h3>SÜLT POLIPKAROK</h3>
                      <p>
                        Lorem ipsum dolor sit amet, conse-ctetuer adipiscing. SI
                        ipsum dolor sit amet Lorem DOlor Si marto.
                      </p>
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
                      <img src="images/pr4.png" />
                    </div>
                    <div className="partner-inkbxrht">
                      <h3>PARADICSOMSZENDVICS</h3>
                      <p>
                        Lorem ipsum dolor sit amet, conse-ctetuer adipiscing. SI
                        ipsum dolor sit amet Lorem DOlor Si marto.
                      </p>
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

              <div className="col-md-6 padding-right">
                <div className="partner-inkbxtp margbtm-15">
                  <div className="partner-inkbx">
                    <div className="partner-inkbxlft">
                      <img src="images/pr3.png" />
                    </div>
                    <div className="partner-inkbxrht">
                      <h3>SÜLT POLIPKAROK</h3>
                      <p>
                        Lorem ipsum dolor sit amet, conse-ctetuer adipiscing. SI
                        ipsum dolor sit amet Lorem DOlor Si marto.
                      </p>
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
                    <ul className="bottom-list tt">
                      <li>
                        <div className="box-c">
                          <img src="images/ico.png" className="img-fluid" />
                          <p>
                            LOREM IPSUM <span>+ 12 LEJ</span>
                          </p>
                        </div>
                        <div className="box-c">
                          <img src="images/ico.png" className="img-fluid" />
                          <p>
                            LOREM IPSUM <span>+ 12 LEJ</span>
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="box-c">
                          <img src="images/ico.png" className="img-fluid" />
                          <p>
                            LOREM IPSUM <span>+ 12 LEJ</span>
                          </p>
                        </div>
                        <div className="box-c">
                          <img src="images/ico.png" className="img-fluid" />
                          <p>
                            LOREM IPSUM <span>+ 12 LEJ</span>
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="box-c">
                          <img src="images/ico.png" className="img-fluid" />
                          <p>
                            LOREM IPSUM <span>+ 12 LEJ</span>
                          </p>
                        </div>
                        <div className="box-c">
                          <img src="images/ico.png" className="img-fluid" />
                          <p>
                            LOREM IPSUM <span>+ 12 LEJ</span>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 padding-right">
                <div className="partner-inkbxtp margbtm-15">
                  <div className="partner-inkbx">
                    <div className="partner-inkbxlft">
                      <img src="images/pr6.png" />
                    </div>
                    <div className="partner-inkbxrht">
                      <h3>PARADICSOMSZENDVICS</h3>
                      <p>
                        Lorem ipsum dolor sit amet, conse-ctetuer adipiscing. SI
                        ipsum dolor sit amet Lorem DOlor Si marto.
                      </p>
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
              <div className="col-md-6 padding-right">
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
              <div className="col-md-6 padding-right">
                <div className="partner-inkbxtp margbtm-15">
                  <div className="partner-inkbx">
                    <div className="partner-inkbxlft">
                      <img src="images/pr2.png" />
                    </div>
                    <div className="partner-inkbxrht">
                      <h3>PARADICSOMSZENDVICS</h3>
                      <p>
                        Lorem ipsum dolor sit amet, conse-ctetuer adipiscing. SI
                        ipsum dolor sit amet Lorem DOlor Si marto.
                      </p>
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
              <div className="col-md-6 padding-right">
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
                    <ul className="bottom-list tt">
                      <li>
                        <div className="box-c">
                          <img src="images/ico.png" className="img-fluid" />
                          <p>
                            LOREM IPSUM <span>+ 12 LEJ</span>
                          </p>
                        </div>
                        <div className="box-c">
                          <img src="images/ico.png" className="img-fluid" />
                          <p>
                            LOREM IPSUM <span>+ 12 LEJ</span>
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="box-c">
                          <img src="images/ico.png" className="img-fluid" />
                          <p>
                            LOREM IPSUM <span>+ 12 LEJ</span>
                          </p>
                        </div>
                        <div className="box-c">
                          <img src="images/ico.png" className="img-fluid" />
                          <p>
                            LOREM IPSUM <span>+ 12 LEJ</span>
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="box-c">
                          <img src="images/ico.png" className="img-fluid" />
                          <p>
                            LOREM IPSUM <span>+ 12 LEJ</span>
                          </p>
                        </div>
                        <div className="box-c">
                          <img src="images/ico.png" className="img-fluid" />
                          <p>
                            LOREM IPSUM <span>+ 12 LEJ</span>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 padding-right">
                <div className="partner-inkbxtp margbtm-15">
                  <div className="partner-inkbx">
                    <div className="partner-inkbxlft">
                      <img src="images/pr9.png" />
                    </div>
                    <div className="partner-inkbxrht">
                      <h3>PARADICSOMSZENDVICS</h3>
                      <p>
                        Lorem ipsum dolor sit amet, conse-ctetuer adipiscing. SI
                        ipsum dolor sit amet Lorem DOlor Si marto.
                      </p>
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
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 text-center">
            <a href="#" className="text-white expand-link">
              TOVÁBBI ÉTTERMEK
              <img src="images/drop-arrow.png" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <div className="piza-section">
      <div>
        <img src={wave2} alt="" />
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

    <footer className="black-bg">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="footer-body">
              <h2 className="text-yellow">KÖVESS MINKET:</h2>

              <ul className="footer-social">
                <li>
                  <a href="#">
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                    /foodnetofﬁcial
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                    @foodnetofﬁcial
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-youtube-play" aria-hidden="true"></i>
                    /foodnetofﬁcial
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="footer-body">
              <h2 className="text-yellow">EGYÉB OLDALAK:</h2>
              <ul className="normal-list">
                <li>
                  <a href="#">Termeni și Condiții</a>
                </li>
                <li>
                  <a href="#">Politica de conﬁdențialitate</a>
                </li>
                <li>
                  <a href="#">Returnare produse</a>
                </li>
                <li>
                  <a href="#">Drepturi de autor</a>
                </li>
                <li>
                  <a href="#">ANPC</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="footer-bottom text-center">
              <p>©2020-2021 foodnet.ro - Minden jog fenntartva.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default Products;
