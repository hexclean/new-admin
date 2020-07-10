import React, { useState, useEffect } from "react";
import "../css/PartnersPage.css";
import { FoodDialog } from "./FoodDialog/FoodDialog";

import Cart from "./Order/Order";
import { useOrders } from "./Hooks/useOrders";
import { useOpenFood } from "./Hooks/useOpenFood";
import ProductItem from "./Product/ProductItem";
import { useProducts } from "./Hooks/useProducts";
function PartnerPage() {
  const openFood = useOpenFood();
  const orders = useOrders();
  const products = useProducts();

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

      <FoodDialog {...openFood} {...orders} />
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
                <ProductItem {...openFood} {...products} />
              </div>
            </div>

            <div className="col-md-3">
              <Cart {...orders} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnerPage;
