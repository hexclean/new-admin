import "../css/Partners.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import wave1 from "../wave1.svg";
import wave2 from "../wave2.svg";
import wave3 from "../wave3.svg";
import wave4 from "../wave4.svg";
import { Link } from "react-router-dom";

import Navigation from "./Navigation";

function Partners() {
  const [heroes, setHeroes] = useState([]);
  useEffect(() => {
    setHeroes([]);
    axios
      .get("/api/restaurants")
      .then((response) => {
        console.log("response", response);
        if (response.data) {
          setHeroes(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const getHeroes = () => {
    const heroesList = [];
    heroes.map((hero) =>
      heroesList.push(
        <div className="col-md-6 padding-right" key={hero.id}>
          <div className="partner-inkbx margbtm-15">
            <div className="partner-inkbxlft">
              <img src={hero.imageUrl} alt="" />
            </div>
            <div className="partner-inkbxrht">
              <h3>{hero.fullName}</h3>
              <ul className="icon-list">
                <li>
                  <img src="images/info-info-icon-1.png" alt="" />
                  {hero.open} - {hero.close}
                </li>
                <li>
                  <img src="images/info-icon-2.png" alt="" />
                  {hero.avgTransport} min
                </li>
                <li>
                  <img src="images/info-icon-3.png" alt="" />
                  50 RON+
                </li>
              </ul>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      )
    );
    return heroesList;
  };

  return (
    <div>
      <Navigation />
      <div className="banner-section">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h2 className="text-yellow">LEGJOBB KAJA LEGJOBB ÉRTÉK</h2>
              <p>
                Lorem ipsum dolor sit amet,
                <br />
                consectetuer adipiscing elit,
                <br />
                sed diam MOLENO MANO ET.
              </p>
              <a href="#" className="btn-yellow">
                PRÓBÁLD KI!
              </a>
            </div>
            <div className="col-md-5">
              <img src="images/burger.png" alt="" />
            </div>
          </div>
        </div>
        <div className="margtp50">
          <img src={wave1} alt="" />
        </div>
      </div>

      <div className="partner-ink black-yellow">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2 className="text-white babas-regular">PARNTEREINK</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-10 mx-auto">
              <div className="row"> {getHeroes()}</div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 text-center">
              <a href="#" className="text-white expand-link">
                TOVÁBBI ÉTTERMEK
                <img src="images/drop-arrow.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="black-bg">
        <div>
          <img src={wave2} alt="" />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2 className="text-yellow babas-regular">
                SPÓROLJ MEG HAVI 10%-ot!
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img src="images/home-pizza10.png" alt="" />
            </div>
            <div className="col-md-6">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                <br /> sed diam MOLENO MANO ET.
                <br />
                ipsum dolor sit amet, consectetuer adipiscing elit.{" "}
              </p>
              <a href="#" className="btn-yellow">
                PRÓBÁLD KI!
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="black-yellow happy-men">
        <div>
          <img src={wave3} alt="" />

          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="happymen-left paddtpbtm-100 ">
                  <h2 className="text-white">
                    TEDD EGYSZERŰBBÉ
                    <br />A VÁSÁRLÁST!
                  </h2>
                  <h3>
                    PRÓBÁLD KI INGYENES APPLIKÁCIÓNKAT,
                    <br />
                    MELY ELÉRHETŐ ANDROID ÉS IOS
                    <br />
                    KÉSZÜLÉKEKRE IS!{" "}
                  </h3>
                  <a href="#" className="margrht20">
                    <img src="images/appstore.png" alt="" />
                  </a>
                  <a href="#" className="">
                    <img src="images/googleplay.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-md-6">
                <div className="happymen-right">
                  <img src="images/happymen.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <img src={wave4} alt="" />
          </div>
        </div>
      </div>

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
}

export default Partners;
