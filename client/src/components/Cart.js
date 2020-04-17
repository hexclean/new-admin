import React from "react";
import "../css/Cart.css";

import Navigation from "./Navigation";
export const Cart = () => (
  <div>
    <div class="mainnv black-bg">
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
                      Restaurants <span class="sr-only">(current)</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      Subscription
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link disabled text-yellow" href="#">
                      Download App
                    </a>
                  </li>
                </ul>

                <div class="mx-auto col-md-4 col-lg-5">
                  <a href="#" class="navbar-brand">
                    <img src="/images/logo.png" />
                  </a>
                  <a class="nav-link text-yellow" href="#">
                    Be my partner
                  </a>
                </div>

                <ul class="navbar-nav ml-auto col-md-3 mt-2 mt-lg-0 align-right col-lg-2">
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <img src="/images/profile.png" />
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link disabled" href="#">
                      <img src="/images/cart.png" />
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-page">
      <div class="cart-header">
        <div class="container">
          <div class="row">
            <div class="col-md-2">
              <div class="white-radiusbox">
                <img src="/images/cover.png" />
              </div>
            </div>
            <div class="col-md-10">
              <h2>RENDELÉS ELKÜLDÉSE</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-body">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="cart-row">
                <div class="cart-img">
                  <div class="white-radiusbox">
                    <img src="/images/cover.png" />
                  </div>
                </div>
                <div class="cart-desc text-center">
                  <h4>SÜLT POLIPKAROK</h4>
                  <p>
                    Lorem ipsum dolor sit amet, conse-ctetuer adipiscing. SI
                    ipsum dolor,sit amet Lorem DOlor Si marto.
                  </p>
                  <p class="margtp">
                    gramaj: <strong>700g</strong>
                  </p>
                </div>
                <div class="cart-btngroup">
                  <div class="white-box">
                    <a href="#" class="bt-yellow">
                      small
                    </a>
                    <a href="#" class="bt-black">
                      medium
                    </a>
                    <a href="#" class="bt-yellow">
                      large
                    </a>
                  </div>
                </div>
                <div class="cart-close">
                  <img src="/images/btn-close.png" />
                </div>

                <div class="cart-incdec">
                  <div class="yellow-radius">
                    <button type="button">-</button>
                    <input type="text" placeholder="42" />
                    <button type="button">+</button>
                    <span class="info-text">DB</span>
                  </div>
                </div>

                <div class="cart-price">
                  <div class="yellow-radius">
                    <span class="white-radius">124.00</span>
                    <span class="info-text">LEJ</span>
                  </div>
                </div>
                <div class="clear"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-7">
              <div class="brown-panel">
                <div class="text-center">
                  <ul class="bottom-list tt">
                    <li>
                      <div class="box-c">
                        <p>
                          LOREM IPSUM <span>+ 12 LEJ</span>
                        </p>
                      </div>
                      <div class="box-c">
                        <p>
                          LOREM IPSUM <span>+ 12 LEJ</span>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div class="box-c">
                        <p>
                          LOREM IPSUM <span>+ 12 LEJ</span>
                        </p>
                      </div>
                      <div class="box-c">
                        <p>
                          LOREM IPSUM <span>+ 12 LEJ</span>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div class="box-c">
                        <p>
                          LOREM IPSUM <span>+ 12 LEJ</span>
                        </p>
                      </div>
                      <div class="box-c">
                        <p>
                          LOREM IPSUM <span>+ 12 LEJ</span>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="cart-row">
                <div class="cart-img">
                  <div class="white-radiusbox">
                    <img src="/images/icon-img-1.png" />
                  </div>
                </div>
                <div class="cart-desc text-center">
                  <h4>PARADICSOMSZENDVICS</h4>
                  <p>
                    Lorem ipsum dolor sit amet, conse-ctetuer adipiscing. SI
                    ipsum dolor,sit amet Lorem DOlor Si marto.
                  </p>
                  <p class="margtp">
                    gramaj: <strong>700g</strong>
                  </p>
                </div>
                <div class="cart-btngroup">
                  <div class="white-box">
                    <a href="#" class="bt-yellow">
                      small
                    </a>
                    <a href="#" class="bt-black">
                      medium
                    </a>
                    <a href="#" class="bt-yellow">
                      large
                    </a>
                  </div>
                </div>
                <div class="cart-close">
                  <img src="/images/btn-close.png" />
                </div>

                <div class="cart-incdec">
                  <div class="yellow-radius">
                    <button type="button">-</button>
                    <input type="text" placeholder="4" />
                    <button type="button">+</button>
                    <span class="info-text">DB</span>
                  </div>
                </div>

                <div class="cart-price">
                  <div class="yellow-radius">
                    <span class="white-radius">26.50</span>
                    <span class="info-text">LEJ</span>
                  </div>
                </div>
                <div class="clear"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-7">
              <div class="brown-panel">
                <div class="text-center">
                  <ul class="bottom-list tt">
                    <li>
                      <div class="box-c">
                        <p>
                          LOREM IPSUM <span>+ 12 LEJ</span>
                        </p>
                      </div>
                      <div class="box-c">
                        <p>
                          LOREM IPSUM <span>+ 12 LEJ</span>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div class="box-c">
                        <p>
                          LOREM IPSUM <span>+ 12 LEJ</span>
                        </p>
                      </div>
                      <div class="box-c">
                        <p>
                          LOREM IPSUM <span>+ 12 LEJ</span>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div class="box-c">
                        <p>
                          LOREM IPSUM <span>+ 12 LEJ</span>
                        </p>
                      </div>
                      <div class="box-c">
                        <p>
                          LOREM IPSUM <span>+ 12 LEJ</span>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="cart-row">
                <div class="cart-img">
                  <div class="white-radiusbox">
                    <img src="/images/cover.png" />
                  </div>
                </div>
                <div class="cart-desc text-center">
                  <h4>SÜLT POLIPKAROK</h4>
                  <p>
                    Lorem ipsum dolor sit amet, conse-ctetuer adipiscing. SI
                    ipsum dolor,sit amet Lorem DOlor Si marto.
                  </p>
                  <p class="margtp">
                    gramaj: <strong>700g</strong>
                  </p>
                </div>
                <div class="cart-btngroup">
                  <div class="white-box">
                    <a href="#" class="bt-yellow">
                      small
                    </a>
                    <a href="#" class="bt-black">
                      medium
                    </a>
                    <a href="#" class="bt-yellow">
                      large
                    </a>
                  </div>
                </div>
                <div class="cart-close">
                  <img src="/images/btn-close.png" />
                </div>

                <div class="cart-incdec">
                  <div class="yellow-radius">
                    <button type="button">-</button>
                    <input type="text" placeholder="4" />
                    <button type="button">+</button>
                    <span class="info-text">DB</span>
                  </div>
                </div>

                <div class="cart-price">
                  <div class="yellow-radius">
                    <span class="white-radius">26.50</span>
                    <span class="info-text">LEJ</span>
                  </div>
                </div>
                <div class="clear"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-7">
              <div class="brown-panel">
                <div class="text-center">
                  <ul class="bottom-list tt">
                    <li>
                      <div class="box-c">
                        <p>
                          LOREM IPSUM <span>+ 12 LEJ</span>
                        </p>
                      </div>
                      <div class="box-c">
                        <p>
                          LOREM IPSUM <span>+ 12 LEJ</span>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div class="box-c">
                        <p>
                          LOREM IPSUM <span>+ 12 LEJ</span>
                        </p>
                      </div>
                      <div class="box-c">
                        <p>
                          LOREM IPSUM <span>+ 12 LEJ</span>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div class="box-c">
                        <p>
                          LOREM IPSUM <span>+ 12 LEJ</span>
                        </p>
                      </div>
                      <div class="box-c">
                        <p>
                          LOREM IPSUM <span>+ 12 LEJ</span>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 text-left">
              <div class="black-radius">
                <span class="text-yellow">SZÁLLÍTÁSi dÍJ</span>
                <span class="white-radius text-right">+15.00</span>
                <span class="info-text">LEJ</span>
                <div class="clear"></div>
              </div>
            </div>
            <div class="col-md-6 text-right">
              <div class="black-radius">
                <span class="text-yellow">ÖSSZESEN</span>
                <span class="white-radius text-right">=526.70</span>
                <span class="info-text">LEJ</span>
                <div class="clear"></div>
              </div>
            </div>
          </div>

          <div class="form-section">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <h2 class="text-white babas-regular text-center">
                    KISZÁLLÍtási adatok
                  </h2>
                </div>
              </div>
              <div class="row">
                <div class="col-md-7 mx-auto">
                  <div class="form-bg">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <select class="form-control">
                            <option>-Vásárhely, Lorem Utca, 35. szám</option>
                            <option>-Vásárhely, Lorem Utca, 35. szám</option>
                            <option>-Vásárhely, Lorem Utca, 35. szám</option>
                          </select>
                        </div>
                      </div>
                    </div>{" "}
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <textarea
                            row="5"
                            cols="5"
                            class="form-control"
                            placeholder="MEGJEGYZÉS HOZZÁADÁSA..."
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 text-center">
                      <button class="bt-black">megrendelem</button>
                    </div>
                  </div>
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
  </div>
);

export default Cart;
