import "../css/Partners.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
        <div class="product-infobx">
          <div class="product-infoleft">
            <img src={hero.imageUrl} />
          </div>
          <div class="product-infocenter">
            <h4>Duo Food Bar Pizzeria</h4>
            <p className="short-desc-comp">
              9 years with us pizza, hamburger, hungarian, italian, american,
              algida
            </p>
            <ul class="info-list info-panel">
              <li className="avg-delivery">
                <div>
                  <h5>Átlag szállítási idő</h5>
                  <h6>100 perc</h6>
                </div>
              </li>
              <li className="avg-order">
                <div>
                  <h5>Min. Rendelés</h5>
                  <h6>25 Lei</h6>
                </div>
              </li>
              <li className="delivery-price">
                <div>
                  <h5>Szállítási díj</h5>
                  <h6>0 Lei</h6>
                </div>
              </li>
              <div class="clear"></div>
            </ul>
          </div>
          <div class="product-inforight">
            <a href="#" class="menu-btn text-menu">
              Menu
            </a>
            <div class="discount">-&nbsp;8%</div>
          </div>
          <div class="clear"></div>
        </div>
      )
    );
    return heroesList;
  };

  return (
    <div>
      <div class="container-bg">
        <div class="container">
          {/* <img src="images/foodnet.png" /> */}
          dsad
        </div>
      </div>
      <div className="main-container">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="whitebox margin-bottom-30">
                <div className="graybox-heading">CURRENT FILTERS</div>
                <div className="graybox-body">
                  <ul className="chip-list">
                    <li>
                      <div className="chip">
                        <div className="chip-content">Hamburger</div>
                        <div className="chip-close">
                          <i className="fa fa-times" aria-hidden="true"></i>
                        </div>
                      </div>
                    </li>
                  </ul>

                  <a href="#" className="more-button">
                    CLEAR ALL FILTERS
                  </a>
                </div>
              </div>

              <div className="graybox margin-bottom-30">
                <div className="graybox-heading">USEFUL</div>
                <div className="graybox-body">
                  <ul className="check-list">
                    <li>
                      {" "}
                      <div className="checkbox">
                        <input id="checkbox1" type="checkbox" />
                        <label for="checkbox1">No shipping cost (40)</label>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <div className="checkbox">
                        <input id="checkbox2" type="checkbox" />
                        <label for="checkbox2">Within 35 minutes (47)</label>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <div className="checkbox">
                        <input id="checkbox3" type="checkbox" />
                        <label for="checkbox3">Photo menu (67)</label>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <div className="checkbox">
                        <input id="checkbox4" type="checkbox" />
                        <label for="checkbox4">Food (12)</label>
                      </div>
                    </li>
                    <li>
                      <div className="checkbox">
                        <input id="checkbox5" type="checkbox" />
                        <label for="checkbox5">News (16)</label>
                      </div>{" "}
                    </li>
                    <li>
                      <div className="checkbox">
                        <input id="checkbox6" type="checkbox" />
                        <label for="checkbox6">NetWaiter GO (38)</label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="graybox margin-bottom-30">
                <div className="graybox-heading"> KITCHENS</div>
                <div className="graybox-body">
                  <ul className="check-list">
                    <li>
                      {" "}
                      <div className="checkbox">
                        <input id="checkbox1" type="checkbox" />
                        <label for="checkbox1">Hamburger (57)</label>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <div className="checkbox">
                        <input id="checkbox2" type="checkbox" />
                        <label for="checkbox2">Pizza (59)</label>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <div className="checkbox">
                        <input id="checkbox3" type="checkbox" />
                        <label for="checkbox3">Algida (10)</label>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <div className="checkbox">
                        <input id="checkbox4" type="checkbox" />
                        <label for="checkbox4">Hungarian (65)</label>
                      </div>
                    </li>
                    <li>
                      <div className="checkbox">
                        <input id="checkbox5" type="checkbox" />
                        <label for="checkbox5">Thai (7)</label>
                      </div>{" "}
                    </li>
                    <li>
                      <div className="checkbox">
                        <input id="checkbox6" type="checkbox" />
                        <label for="checkbox6">Italian (32)</label>
                      </div>
                    </li>

                    <li>
                      <div className="checkbox">
                        <input id="checkbox6" type="checkbox" />
                        <label for="checkbox6">Mexican (12)</label>
                      </div>
                    </li>

                    <li>
                      <div className="checkbox">
                        <input id="checkbox6" type="checkbox" />
                        <label for="checkbox6">Indian (3)</label>
                      </div>
                    </li>

                    <li>
                      <div className="checkbox">
                        <input id="checkbox6" type="checkbox" />
                        <label for="checkbox6">Chinese (5)</label>
                      </div>
                    </li>

                    <li>
                      <div className="checkbox">
                        <input id="checkbox6" type="checkbox" />
                        <label for="checkbox6">Japan (5)</label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="graybox margin-bottom-30">
                <div className="graybox-heading"> PAYMENT OPTIONS</div>
                <div className="graybox-body">
                  <ul className="check-list">
                    <li>
                      {" "}
                      <div className="checkbox">
                        <input id="checkbox1" type="checkbox" />
                        <label for="checkbox1">Cash (138)</label>
                      </div>
                    </li>

                    <li>
                      {" "}
                      <div className="checkbox">
                        <input id="checkbox1" type="checkbox" />
                        <label for="checkbox1">
                          Credit card (1 click payment also) - recommended (183)
                        </label>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <div className="checkbox">
                        <input id="checkbox1" type="checkbox" />
                        <label for="checkbox1">NICE card (167)</label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="tab-menu">
                <ul>
                  <li>
                    <a href="#">
                      <img src="images/photo-line.png" />
                      <p>Photo menu</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="images/hamburger-line.png" />
                      <p>Hamburger</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="images/pizza-line.png" />
                      <p>Pizza</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="images/ice-cream-line.png" />
                      <p>Algida</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="images/food-line.png" />
                      <p>Food</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="images/hungarian-line.png" />
                      <p>Hungarian</p>
                    </a>
                  </li>

                  <li>
                    <a href="#">
                      <img src="images/thai-line.png" />
                      <p>Thai</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="images/italian-line.png" />
                      <p>Italian</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="images/shop-list-cuisines-more.min.png" />
                      <p>More kitchens</p>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="product-search">
                <div className="container">
                  <div className="row">
                    <div className="col-md-9">
                      <form
                        className="example"
                        action="../../action_page.php.html"
                      >
                        <button type="submit">
                          <i className="fa fa-search search-black"></i>
                        </button>
                        <input
                          type="text"
                          placeholder="Étterem keresése"
                          name="search"
                        />
                        <div className="info-box">
                          <span>181 találat</span>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-3">
                      <div className="dropdown">
                        <button
                          className="btn btn-primary dropdown-toggle"
                          type="button"
                          data-toggle="dropdown"
                        >
                          Rendezés
                          <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a href="#">By name</a>
                          </li>
                          <li>
                            <a href="#">According to evaluation</a>
                          </li>
                          <li>
                            <a href="#">By price category</a>
                          </li>
                          <li>
                            <a href="#">According to shipping cost</a>
                          </li>
                          <li>
                            <a href="#">By delivery time</a>
                          </li>
                          <li>
                            <a href="#">Default</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {getHeroes()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partners;
