import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/SignUp.css";
import Axios from "axios";
import HeaderLoggedIn from "../Header/HeaderLoggedIn";
import HeaderLoggedOut from "../Header/HeaderLoggedOut";

function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [fullName, setFullName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [loggedIn, setLoggedIn] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await Axios.post("/api/register", {
        email: email,
        password: password,
        fullName: fullName,
        phoneNumber: phoneNumber,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {loggedIn ? (
        <HeaderLoggedIn setLoggedIn={setLoggedIn} />
      ) : (
        <HeaderLoggedOut setLoggedIn={setLoggedIn} />
      )}
      <div className="main-container new-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 mx-auto">
              <div className="white-box">
                <form onSubmit={handleSubmit}>
                  <h2>FELHASZNÁLÓI ADATOK MEGADÁSA</h2>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group info-n text-center">
                        <label>
                          E-mail <span>*</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-8 ">
                      <div className="form-group ">
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          type="text"
                          className="form-control"
                          id="email"
                        />
                        <p className="short-desc">
                          Később az email címed segítségével tudsz belépni
                          hozzánk.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="separator"></div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group info-n text-center">
                        <label>
                          Jelszó <span>*</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          type="text"
                          className="form-control"
                          id="password"
                        />
                        <p className="short-desc">
                          A jelszavadnak legalább 5 karakter hosszúnak kell
                          lennie. A fiókod biztonsága érdekében kerüld az
                          egyszerű jelszavak használatát!
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="separator"></div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group info-n text-center">
                        <label>
                          Név <span>*</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input
                          onChange={(e) => setFullName(e.target.value)}
                          type="text"
                          className="form-control"
                          id="fullName"
                        />
                        <p className="short-desc">
                          A teljes nevedet érdemes megadni, hogy így könnyebben
                          elérjünk, és a kiszállításkor is gond nélkül
                          megtaláljunk.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group info-n text-center">
                        <label>
                          Telefonszám <span>*</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          type="text"
                          className="form-control"
                          id="phoneNumber"
                        />
                        <p className="short-desc">
                          Mobiltelefonszámot érdemes megadnod, így közvetlenül
                          téged tudunk keresni. A telefonszám helyes formátuma:
                          +40753541070
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="separator"></div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group"></div>
                    </div>
                    <div className="col-md-8 cheked-title-text">
                      <label>
                        A regisztrációval tudomásul veszem és elfogadom
                      </label>
                      {/* <div className="gray-box">
                        <div className="form-group">
                          <label className="lable-container cheked-title-text">
                            az Általános Szerződési Feltételekben (ÁSZF)
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                          </label>
                          <label className="lable-container cheked-title-text">
                            és az Adatkezelési Tájékoztatóban foglaltakat
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div> */}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-8 d-flex justify-content-center">
                      <div className="form-group text-center">
                        <button type="submit" className="btn-green">
                          Regisztráció
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
