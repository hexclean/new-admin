import React, { useState, useEffect } from "react";
import "../css/PartnersPage.css";
import { FoodDialog } from "./FoodDialog/FoodDialog";
import axios from "axios";
import Cart from "./Order/Order";
import { useOpenFood } from "./Hooks/useOpenFood";
// import FoodDialog from "./FoodDialog/FoodDialog";
// {props.match.params.partnerId}
function PartnerPage() {
  const [openFood, setOpenFood] = useState();
  const [heroes, setHeroes] = useState([]);

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
                    <h1>fdsfdsf</h1>
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
                  />
                  <div className="info-box">
                    <span>181 találat</span>
                  </div>
                </form>
              </div>
              <div className="page-header">
                <h2>{getHeroes()}</h2>
              </div>
            </div>

            {/* Cart */}
            <div className="col-md-3">
              <Cart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnerPage;
