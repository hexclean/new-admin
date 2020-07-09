import React, { useState, useEffect } from "react";
import "../css/PartnersPage.css";
import { FoodDialog } from "./FoodDialog/FoodDialog";
import axios from "axios";
import { Link } from "react-router-dom";

function PartnerPage(props) {
  const [openFood, setOpenFood] = useState();
  const [heroes, setHeroes] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    setHeroes([]);
    axios
      .get("/api/products/test")
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

  // useEffect(() => {
  //   setFilteredProducts(
  //     heroes.filter((hero) => {
  //       return hero.fullName.toLowerCase().includes(search.toLowerCase());
  //     })
  //   );
  // }, [search, heroes]);

  const getHeroes = () => {
    const heroesList = [];
    for (var i = 0; i < heroes.length; i++) {
      var test = heroes[i].length;
      for (let j = 0; j < test; j++) {
        // console.log("heroes+categoryName", heroes[i][j].categoryName);
        heroesList.push(
          <div>
            <div className="page-header">
              <h2>{heroes[i][j].categoryName}</h2>
            </div>
            <div className="product-infobx">
              <a href="#" data-toggle="modal" data-target="#myModal">
                <h4>{heroes[i][j].productTitle}</h4>
                <div className="product-infoleft">
                  <img src={"/" + heroes[i][j].productImageUrl} />
                </div>
                <div className="product-infocenter">
                  <p className="short-desc">{heroes[i][j].productDesc}</p>
                </div>
                <div className="product-inforight">
                  <div className="incre-box">
                    <div className="incre-left d-flex justify-content-center">
                      {heroes[i][j].productFinalPrice}
                    </div>
                    <div className="incre-right" onClick={() => setOpenFood()}>
                      +
                    </div>
                    <div className="clear"></div>
                  </div>

                  <div className="extra-optional d-flex justify-content-center">
                    extra elérhető
                  </div>
                </div>
                <div className="clear"></div>
              </a>
            </div>
          </div>
        );
      }
    }
    return heroesList;
  };

  return (
    <div>
      <div className="container-bg">
        <div className="container">
          {/* <img src="images/foodnet.png" /> */}
          FOODNET
        </div>
      </div>

      <div className="back">
        <div className="container">
          {/* <img src="images/foodnet.png" /> */}
          Vissza a listahoz
        </div>
      </div>

      <div>{openFood}</div>
      <FoodDialog />
      <div className="main-container">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-xl-9">
              <div className="hero-header">
                <div className="shadow">
                  <div className="logo">
                    <img src="images/logo1.png" alt="KFC Óbuda" />
                  </div>
                  <div className="info short">
                    <h1>{props.match.params.partnerId}</h1>
                    <div className="adress-header">
                      1030 Budapest Szentendrei út 104
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="graybox margin-bottom-30">
                <div className="graybox-body">
                  <div id="custom-search-input">
                    <div className="input-group">
                      <span className="input-group-btn">
                        <button className="btn btn-danger" type="button">
                          <span className="fa fa-search"></span>
                        </button>
                      </span>
                      <input
                        type="text"
                        className="search-query form-control"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="graybox margin-bottom-30 mobi-hide">
                <div className="graybox-heading">SELECTION</div>
                <div className="graybox-body">
                  <form>
                    <ul className="check-list">
                      <li>
                        <div className="form-check">
                          <label>
                            <input type="radio" name="radio" />
                            <span className="label-text ">Full range</span>
                          </label>
                        </div>
                      </li>

                      <li>
                        <div className="form-check">
                          <label>
                            <input type="radio" name="radio" />
                            <span className="label-text">
                              Our special offer
                            </span>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="form-check">
                          <label>
                            <input type="radio" name="radio" />
                            <span className="label-text">McMenü®</span>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="form-check">
                          <label>
                            <input type="radio" name="radio" />
                            <span className="label-text">
                              Sandwiches & Wraps
                            </span>
                          </label>
                        </div>
                      </li>

                      <li>
                        <div className="form-check">
                          <label>
                            <input type="radio" name="radio" />
                            <span className="label-text">
                              McMoment® & 1 + 1 menu
                            </span>
                          </label>
                        </div>
                      </li>

                      <li>
                        <div className="form-check">
                          <label>
                            <input type="radio" name="radio" />
                            <span className="label-text">Happy Meal</span>
                          </label>
                        </div>
                      </li>

                      <li>
                        <div className="form-check">
                          <label>
                            <input type="radio" name="radio" />
                            <span className="label-text">Desserts</span>
                          </label>
                        </div>
                      </li>

                      <li>
                        <div className="form-check">
                          <label>
                            <input type="radio" name="radio" />
                            <span className="label-text">Fries & Snacks</span>
                          </label>
                        </div>
                      </li>

                      <li>
                        <div className="form-check">
                          <label>
                            <input type="radio" name="radio" />
                            <span className="label-text">
                              Sauces & dressings
                            </span>
                          </label>
                        </div>
                      </li>

                      <li>
                        <div className="form-check">
                          <label>
                            <input type="radio" name="radio" />
                            <span className="label-text">salads</span>
                          </label>
                        </div>
                      </li>

                      <li>
                        <div className="form-check">
                          <label>
                            <input type="radio" name="radio" />
                            <span className="label-text">Cold drinks</span>
                          </label>
                        </div>
                      </li>
                    </ul>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="col-md-9 product-search">
                <form className="example" action="../../action_page.php.html">
                  <button type="submit">
                    <i className="fa fa-search search-black"></i>
                  </button>
                  <input
                    type="text"
                    placeholder="Termék keresés"
                    name="search"
                    // onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="info-box">
                    <span>181 találat</span>
                  </div>
                </form>
              </div>
              <div className="page-header">
                <h2>{getHeroes()}</h2>
              </div>

              {/* dasdas????????? */}
            </div>

            {/* Cart */}
            <div className="col-md-3">
              <div className="whitebox margin-bottom-30 cart-box">
                <div className="graybox-heading">ORDER</div>
                <div className="graybox-body">
                  <p>Your cart is still empty, choose something delicious!</p>

                  <a href="#" className="btn-gray empty-car">
                    Min: 0 Ft
                  </a>
                </div>
              </div>

              <div className="whitebox margin-bottom-30 rendel-box">
                <div className="graybox-heading">RENDELESEM</div>
                <div className="graybox-body">
                  <div className="product-row">
                    <div className="product-no">1</div>
                    <div className="product-name">
                      Genorous Jack
                      <p>Lorem Ipsum Lorem Ipsum.</p>
                    </div>
                    <div className="product-size">
                      <b>1450 Ft</b>
                    </div>
                    <div className="product-close">&#10006;</div>
                    <div className="clear"></div>
                  </div>
                  <div className="product-row">
                    <div className="product-no">1</div>
                    <div className="product-name">
                      Genorous Jack
                      <p>Lorem Ipsum Lorem Ipsum.</p>
                    </div>
                    <div className="product-size">
                      <b>1450 Ft</b>
                    </div>
                    <div className="product-close">&#10006;</div>
                    <div className="clear"></div>
                  </div>
                  <div className="product-row">
                    <div className="product-no">1</div>
                    <div className="product-name">
                      Genorous Jack
                      <p>Lorem Ipsum Lorem Ipsum.</p>
                    </div>
                    <div className="product-size">
                      <b>1450 Ft</b>
                    </div>
                    <div className="product-close">&#10006;</div>
                    <div className="clear"></div>
                  </div>
                </div>
                <div className="fizetendo">
                  <div className="graybox-heading">FIZETENDO</div>
                  <div className="graybox-body">
                    <div className="product-row">
                      <div className="product-name">
                        <b>Genorous Jack</b>
                      </div>
                      <div className="product-size">
                        <b>1450 Ft</b>
                      </div>

                      <div className="clear"></div>
                    </div>
                    <div className="product-row">
                      <div className="product-name">
                        <b>Genorous Jack</b>
                      </div>
                      <div className="product-size">
                        <b>1450 Ft</b>
                      </div>

                      <div className="clear"></div>
                    </div>
                    <div className="product-row">
                      <div className="product-name">
                        <b>Genorous Jack</b>
                      </div>
                      <div className="product-size">
                        <b>1450 Ft</b>
                      </div>

                      <div className="clear"></div>
                    </div>
                    <div className="product-row">
                      <a href="#" className="btn-green order-button">
                        MEGRENDELEM
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnerPage;
