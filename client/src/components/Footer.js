import React from "react";
import "../css/Footer.css";

export const Footer = () => (
  <div>
    <footer className="black-bg">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="newletter text-center">
              <h2 className="text-white babas-regular">
                IRATKOZZ FEL HÍRLEVELEINKRE ÉS
                <br />
                <span className="babas-regular">
                  ERTESÜLJ ELSŐKÉNT LEGÚJABB PARTNEREINKRŐL!
                </span>
              </h2>
              <form action="#" method="Post">
                <input
                  type="text"
                  name="mail"
                  placeholder="Enter Your Email Id"
                />
                <button type="button" className="btn-yellow">
                  FELÍRATKOZÁS!
                </button>
              </form>
            </div>
          </div>
        </div>
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

export default Footer;
