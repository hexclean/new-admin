import React from "react";
import "../css/Products.css";

import wave1 from "../wave1.svg";
import wave2 from "../wave2.svg";
import Navigation from "./Navigation";

export const Products = () => (
  <div>
    <Navigation />
    <body>
      <div class="banner-section">
        <div class="container">
          <div class="row">
            <div class="col-md-3">
              <div class="white-radiusbox">
                <img src="images/rexo.png" />
              </div>
            </div>
            <div class="col-md-9">
              <h2 class="text-yellow">CE DELICII DELIVERY</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                amet,consectetuer Lorem ipsum dolor. consectetuer adipiscing
                elit.
              </p>
              <ul class="info-list">
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
        <div class="margtp50">
          <img src={wave1} />
        </div>
      </div>
      <div class="product-section partner-ink black-yellow">
        <div class="container">
          <div class="row">
            <div class="col-md-10 mx-auto">
              <div class="search-box">
                <div class="main">
                  <div class="row">
                    <div class="col-md-6">
                      <h2 class="text-white">KÍnálatunk</h2>
                    </div>
                    <div class="col-md-6">
                      <div class="input-group">
                        <div class="input-group-append">
                          <button class="btn btn-secondary" type="button">
                            <img src="images/search-icon.png" />
                          </button>
                        </div>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="KERESÉS..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tab-main">
            <div class="row">
              <div class="col-1">
                <div class="yellow-graybx">
                  <a href="#">
                    <img src="images/nextrest.png" />
                  </a>
                </div>
              </div>
              <div class="col-10">
                <div class="yellow-graybx tabbx">
                  <a href="#" className="img-min-res-menu">
                    <img className="img-size-menu" src="images/kaja1.png" />
                  </a>
                  <a href="#" className="img-min-res-menu">
                    <img className="img-size-menu" src="images/kaja2.png" />
                  </a>

                  <a href="#" className="img-min-res-menu">
                    <img className="img-size-menu" src="images/kaja3.png" />
                  </a>
                  <a href="#">
                    <img className="img-size-menu" src="images/kaja4.png" />
                  </a>
                  <a href="#" className="img-min-res-menu">
                    <img className="img-size-menu" src="images/kaja5.png" />
                  </a>

                  <a href="#" className="img-min-res-menu">
                    <img className="img-size-menu" src="images/kaja6.png" />
                  </a>
                  <a href="#" className="img-min-res-menu">
                    <img className="img-size-menu" src="images/kaja7.png" />
                  </a>
                </div>
              </div>
              <div class="col-1">
                <div class="yellow-graybx">
                  <a href="#">
                    <img src="images/allergen.png" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-12">
              <div class="row">
                <div class="col-md-6 padding-right">
                  <div class="partner-inkbxtp margbtm-15">
                    <div class="partner-inkbx">
                      <div class="partner-inkbxlft">
                        <img src="images/cover.png" />
                      </div>
                      <div class="partner-inkbxrht">
                        <h3>SÜLT POLIPKAROK</h3>
                        <p>
                          Lorem ipsum dolor sit amet, conse-ctetuer adipiscing.
                          SI ipsum dolor sit amet Lorem DOlor Si marto.
                        </p>
                        <ul class="wh-radius">
                          <li>
                            <a href="#">gramaj:&nbsp;700g</a>
                          </li>
                          <li>
                            <a href="#">17.00 RON</a>
                          </li>
                        </ul>
                        <ul class="size-list">
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
                            <a href="#" class="small-cart">
                              <img src="images/cart-small.png" />
                              KOSÁRBA RAKOM
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div class="clear"></div>
                    </div>
                    <div class="text-center">
                      <a href="#" class="extra-btn">
                        EXTRÁK <img src="images/drop-arrow.png" />
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padding-right">
                  <div class="partner-inkbxtp margbtm-15">
                    <div class="partner-inkbx">
                      <div class="partner-inkbxlft">
                        <img src="images/icon-img-1.png" />
                      </div>
                      <div class="partner-inkbxrht">
                        <h3>PARADICSOMSZENDVICS</h3>
                        <p>
                          Lorem ipsum dolor sit amet, conse-ctetuer adipiscing.
                          SI ipsum dolor sit amet Lorem DOlor Si marto.
                        </p>
                        <ul class="wh-radius">
                          <li>
                            <a href="#">gramaj:&nbsp;700g</a>
                          </li>
                          <li>
                            <a href="#">17.00 RON</a>
                          </li>
                        </ul>
                        <ul class="size-list">
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
                      <div class="clear"></div>
                    </div>
                    <div class="text-center">
                      <a href="#" class="extra-btn">
                        EXTRÁK <img src="images/drop-arrow.png" />
                      </a>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padding-right">
                  <div class="partner-inkbxtp margbtm-15">
                    <div class="partner-inkbx">
                      <div class="partner-inkbxlft">
                        <img src="images/cover.png" />
                      </div>
                      <div class="partner-inkbxrht">
                        <h3>SÜLT POLIPKAROK</h3>
                        <p>
                          Lorem ipsum dolor sit amet, conse-ctetuer adipiscing.
                          SI ipsum dolor sit amet Lorem DOlor Si marto.
                        </p>
                        <ul class="wh-radius">
                          <li>
                            <a href="#">gramaj:&nbsp;700g</a>
                          </li>
                          <li>
                            <a href="#">17.00 RON</a>
                          </li>
                        </ul>
                        <ul class="size-list">
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
                      <div class="clear"></div>
                    </div>
                    <div class="text-center">
                      <ul class="bottom-list tt">
                        <li>
                          <div class="box-c">
                            <img src="images/ico.png" class="img-fluid" />
                            <p>
                              LOREM IPSUM <span>+ 12 LEJ</span>
                            </p>
                          </div>
                          <div class="box-c">
                            <img src="images/ico.png" class="img-fluid" />
                            <p>
                              LOREM IPSUM <span>+ 12 LEJ</span>
                            </p>
                          </div>
                        </li>
                        <li>
                          <div class="box-c">
                            <img src="images/ico.png" class="img-fluid" />
                            <p>
                              LOREM IPSUM <span>+ 12 LEJ</span>
                            </p>
                          </div>
                          <div class="box-c">
                            <img src="images/ico.png" class="img-fluid" />
                            <p>
                              LOREM IPSUM <span>+ 12 LEJ</span>
                            </p>
                          </div>
                        </li>
                        <li>
                          <div class="box-c">
                            <img src="images/ico.png" class="img-fluid" />
                            <p>
                              LOREM IPSUM <span>+ 12 LEJ</span>
                            </p>
                          </div>
                          <div class="box-c">
                            <img src="images/ico.png" class="img-fluid" />
                            <p>
                              LOREM IPSUM <span>+ 12 LEJ</span>
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padding-right">
                  <div class="partner-inkbxtp margbtm-15">
                    <div class="partner-inkbx">
                      <div class="partner-inkbxlft">
                        <img src="images/icon-img-1.png" />
                      </div>
                      <div class="partner-inkbxrht">
                        <h3>PARADICSOMSZENDVICS</h3>
                        <p>
                          Lorem ipsum dolor sit amet, conse-ctetuer adipiscing.
                          SI ipsum dolor sit amet Lorem DOlor Si marto.
                        </p>
                        <ul class="wh-radius">
                          <li>
                            <a href="#">gramaj:&nbsp;700g</a>
                          </li>
                          <li>
                            <a href="#">17.00 RON</a>
                          </li>
                        </ul>
                        <ul class="size-list">
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
                      <div class="clear"></div>
                    </div>
                    <div class="text-center">
                      <a href="#" class="extra-btn">
                        EXTRÁK <img src="images/drop-arrow.png" />
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padding-right">
                  <div class="partner-inkbxtp margbtm-15">
                    <div class="partner-inkbx">
                      <div class="partner-inkbxlft">
                        <img src="images/cover.png" />
                      </div>
                      <div class="partner-inkbxrht">
                        <h3>SÜLT POLIPKAROK</h3>
                        <p>
                          Lorem ipsum dolor sit amet, conse-ctetuer adipiscing.
                          SI ipsum dolor sit amet Lorem DOlor Si marto.
                        </p>
                        <ul class="wh-radius">
                          <li>
                            <a href="#">gramaj:&nbsp;700g</a>
                          </li>
                          <li>
                            <a href="#">17.00 RON</a>
                          </li>
                        </ul>
                        <ul class="size-list">
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
                      <div class="clear"></div>
                    </div>
                    <div class="text-center">
                      <a href="#" class="extra-btn">
                        EXTRÁK <img src="images/drop-arrow.png" />
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padding-right">
                  <div class="partner-inkbxtp margbtm-15">
                    <div class="partner-inkbx">
                      <div class="partner-inkbxlft">
                        <img src="images/icon-img-1.png" />
                      </div>
                      <div class="partner-inkbxrht">
                        <h3>PARADICSOMSZENDVICS</h3>
                        <p>
                          Lorem ipsum dolor sit amet, conse-ctetuer adipiscing.
                          SI ipsum dolor sit amet Lorem DOlor Si marto.
                        </p>
                        <ul class="wh-radius">
                          <li>
                            <a href="#">gramaj:&nbsp;700g</a>
                          </li>
                          <li>
                            <a href="#">17.00 RON</a>
                          </li>
                        </ul>
                        <ul class="size-list">
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
                      <div class="clear"></div>
                    </div>
                    <div class="text-center">
                      <a href="#" class="extra-btn">
                        EXTRÁK <img src="images/drop-arrow.png" />
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padding-right">
                  <div class="partner-inkbxtp margbtm-15">
                    <div class="partner-inkbx">
                      <div class="partner-inkbxlft">
                        <img src="images/cover.png" />
                      </div>
                      <div class="partner-inkbxrht">
                        <h3>SÜLT POLIPKAROK</h3>
                        <p>
                          Lorem ipsum dolor sit amet, conse-ctetuer adipiscing.
                          SI ipsum dolor sit amet Lorem DOlor Si marto.
                        </p>
                        <ul class="wh-radius">
                          <li>
                            <a href="#">gramaj:&nbsp;700g</a>
                          </li>
                          <li>
                            <a href="#">17.00 RON</a>
                          </li>
                        </ul>
                        <ul class="size-list">
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
                      <div class="clear"></div>
                    </div>
                    <div class="text-center">
                      <ul class="bottom-list tt">
                        <li>
                          <div class="box-c">
                            <img src="images/ico.png" class="img-fluid" />
                            <p>
                              LOREM IPSUM <span>+ 12 LEJ</span>
                            </p>
                          </div>
                          <div class="box-c">
                            <img src="images/ico.png" class="img-fluid" />
                            <p>
                              LOREM IPSUM <span>+ 12 LEJ</span>
                            </p>
                          </div>
                        </li>
                        <li>
                          <div class="box-c">
                            <img src="images/ico.png" class="img-fluid" />
                            <p>
                              LOREM IPSUM <span>+ 12 LEJ</span>
                            </p>
                          </div>
                          <div class="box-c">
                            <img src="images/ico.png" class="img-fluid" />
                            <p>
                              LOREM IPSUM <span>+ 12 LEJ</span>
                            </p>
                          </div>
                        </li>
                        <li>
                          <div class="box-c">
                            <img src="images/ico.png" class="img-fluid" />
                            <p>
                              LOREM IPSUM <span>+ 12 LEJ</span>
                            </p>
                          </div>
                          <div class="box-c">
                            <img src="images/ico.png" class="img-fluid" />
                            <p>
                              LOREM IPSUM <span>+ 12 LEJ</span>
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padding-right">
                  <div class="comment-box">
                    <div class="desc-section">
                      <h3>KELEMEN JÁNOS</h3>
                      <p>
                        “Lorem ipsum dolor sit amet, consectetuer adipiscing. SI
                        ipsum dolor sit amet Lorem DOlor Si marto. consectetuer
                        adipiscing. consectetuer adipiscing.”
                      </p>

                      <h3 class="border-head">Jánosi ANITA</h3>
                      <p>
                        “Lorem ipsum dolor sit amet, consectetuer adipiscing. SI
                        ipsum dolor sit amet Lorem DOlor Si marto.”
                      </p>

                      <h3 class="border-head">Jánosi ANITA</h3>
                      <p>
                        “Lorem ipsum dolor sit amet, consectetuer adipiscing. SI
                        ipsum dolor sit amet Lorem DOlor Si marto.”
                      </p>
                    </div>
                    <h3 class="border-head margtp20">BLÉNESI MÁRTON</h3>
                    <textarea rows="3" cols="3" class="form-control">
                      {" "}
                    </textarea>
                    <div class="text-center pos-re">
                      <button type="button" class="yel-btn">
                        VÉLEMÉNY ELKÜLDÉSE
                      </button>
                      <a href="#" class="pull-right caret-dwn">
                        <i class="fa fa-caret-up"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 text-center">
              <a href="#" class="text-white expand-link">
                TOVÁBBI ÉTTERMEK
                <img src="images/drop-arrow.png" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="piza-section">
        <div>
          <img src={wave2} />
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md-9 mx-auto">
              <div class="piza-bg">
                <div class="row">
                  <div class="col-md-12">
                    <div class="col-md-12 text-center">
                      <h2 class="text-white babas-regular">
                        SPÓROLJ MEG HAVI 10%-ot!
                      </h2>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <img src="images/home-pizza10.png" />
                  </div>
                  <div class="col-md-6">
                    <p>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                      sed diam MOLENO MANO ET.
                    </p>
                    <p>
                      ipsum dolor sit amet,consectetuer adipiscing elit,sed diam
                      MOLENO MANO ET.
                    </p>
                    <a href="#" class="btn-yellow">
                      PRÓBÁLD KI!
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer class="black-bg">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="footer-body">
                <h2 class="text-yellow">KÖVESS MINKET:</h2>

                <ul class="footer-social">
                  <li>
                    <a href="#">
                      <i class="fa fa-facebook" aria-hidden="true"></i>
                      /foodnetofﬁcial
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-instagram" aria-hidden="true"></i>
                      @foodnetofﬁcial
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-youtube-play" aria-hidden="true"></i>
                      /foodnetofﬁcial
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-6">
              <div class="footer-body">
                <h2 class="text-yellow">EGYÉB OLDALAK:</h2>
                <ul class="normal-list">
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
          <div class="row">
            <div class="col-md-12">
              <div class="footer-bottom text-center">
                <p>©2020-2021 foodnet.ro - Minden jog fenntartva.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </body>
  </div>
);

export default Products;
