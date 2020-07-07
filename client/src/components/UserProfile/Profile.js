import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/UserProfile/PersonalData.css";
import axios from "axios";
import Menu from "../Shared/Menu";
const Profile = () => {
  return (
    <div>
      <div class="container">
        <h1>My First Bootstrap Page</h1>
        <p>This is some text.</p>
      </div>
      <div class="main-content personal-data">
        <div class="container">
          <div class="row">
            <Menu />

            <div class="col-md-8">
              <div class="white-box">
                <form action="">
                  <h2>SZEMÉLYES ADATAIM SZERKESZTÉSE</h2>
                  <p>
                    Itt változtathatod meg a személyes adataidat, és
                    kapcsolhatod össze a már meglévő fiókodat a Facebook
                    profiloddal, hogy még gyorsabban és könnyebben rendelhess
                    legközelebb!
                  </p>
                  <div class="d-flex justify-content-center">
                    <div class="row my-details">Személyes adataim</div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group my-details-title">
                        <label for="email">
                          E-mail <span>*</span>:
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          placeholder="E-mail"
                          id="email"
                        />
                        <p className="my-details-desc">
                          Később az email címed segítségével tudsz belépni
                          hozzánk.
                        </p>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group my-details-title">
                        <label for="name">
                          Név <span>*</span>:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Név"
                          id="name"
                        />
                        <p className="my-details-desc">
                          A teljes nevedet érdemes megadni, hogy így könnyebben
                          elérjünk, és a kiszállításkor is gond nélkül
                          megtaláljunk.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group my-details-title">
                        <label for="phone">
                          Telefonszám <span>*</span>:
                        </label>
                        <input
                          type="phone"
                          class="form-control"
                          placeholder="Telefonszám"
                          id="phone"
                        />
                        <p className="my-details-desc">
                          Mobiltelefonszámot érdemes megadnod, így közvetlenül
                          téged tudunk keresni. A telefonszám helyes formátuma:
                          +40753541070
                        </p>

                        {/* <p>
                          A telefonszámod megerősítése számos előnnyel jár: be
                          tudod váltani akciós kuponjaidat, különleges
                          kiszolgálást kapsz ügyfélszolgálatunkon, és biztosan
                          elérnek az éttermek és futárok.
                        </p> */}
                      </div>
                    </div>
                  </div>
                  <div class="row d-flex justify-content-center">
                    <div class="col-md-6">
                      <div class="form-group">
                        <button type="submit" class="btn-green">
                          MÓDOSÍTOM
                        </button>
                      </div>
                    </div>

                    {/* <div class="col-md-6">
                      <div class="form-group">
                        <a href="#" class="btn-blue">
                          <i
                            class="fa fa-facebook-square"
                            aria-hidden="true"
                          ></i>
                          Facebook connection
                        </a>
                        <p>
                          Link your NetWaiter account to your Facebook profile
                          so you can order next time even faster and easier!
                        </p>
                      </div>
                    </div> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
