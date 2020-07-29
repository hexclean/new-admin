import React, { useState, useEffect } from "react";
import "../css/PartnersPage.css";
import { FoodDialog } from "./FoodDialog/FoodDialog";
import Banner from "./PartnerBanner";
import ProductItem from "./Product/ProductItem";

function PartnerPage() {
  const [openFood, setOpenFood] = useState();

  return (
    <div>
      <FoodDialog openFood={openFood} />
      <div className="main-container">
        <div className="container">
          <Banner />
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
                <ProductItem setOpenFood={setOpenFood} />
              </div>
            </div>

            <div className="col-md-3">{/* <Cart /> */}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnerPage;
