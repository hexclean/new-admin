import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/SignUp.css";
import axios from "axios";
// import Footer from "./Footer";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const tokenLocal = localStorage.getItem("x-auth");

  const loginpress = () => {
    axios
      .post("/api/users", {
        username: username,
        password: password,
      })
      .then((response) => {
        try {
          const token = response.data.token;
          //   localStorage.setItem(
          //     "x-auth",
          //     JSON.stringify({
          //       login: true,
          //       token: token,
          //     })
          //   );
          //   console.log(token);
          console.log("react localstorage: ");
        } catch (error) {
          console.log(error);
        }
      });
  };

  return (
    // <div>
    //   {!tokenLocal ? (
    //     <div>
    //       <input
    //         type="text"
    //         placeholder="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //       <div>adsd</div>
    //       <input
    //         type="text"
    //         placeholder="password"
    // value={password}
    // onChange={(e) => setPassword(e.target.value)}
    //       />
    //       <button type="submit" onClick={loginpress}>
    //         Log In
    //       </button>
    //     </div>
    //   ) : (
    //     <div>
    //       <h1>dsadadasd</h1>
    //     </div>
    //   )}
    // </div>

    <div>
      <div className="main-container new-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 mx-auto">
              <div className="white-box">
                <form action="">
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
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          type="text"
                          className="form-control"
                          id="username"
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
                          value={password}
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
                          Jelszó újra <span>*</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control info-n text-center"
                          id="password-again"
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
                        <input type="text" className="form-control" id="name" />
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
                        <input type="text" className="form-control" id="name" />
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
                      <div className="gray-box">
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
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-8 d-flex justify-content-center">
                      <div className="form-group text-center">
                        <button
                          type="submit"
                          onClick={loginpress}
                          className="btn-green"
                        >
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
      {/* <Footer /> */}
    </div>
  );
};

export default Register;
