import React, { useState } from "react";
import "../css/PartnersPage.css";
import { FoodDialog } from "./FoodDialog/FoodDialog";
function PartnerPage() {
  const [openFood, setOpenFood] = useState();

  return (
    <div>
      <FoodDialog />
      <div class="main-container">
        <div class="container">
          <div class="row">
            <div class="col-md-3">
              <div class="graybox margin-bottom-30">
                <div class="graybox-body">
                  <div id="custom-search-input">
                    <div class="input-group">
                      <span class="input-group-btn">
                        <button class="btn btn-danger" type="button">
                          <span class="fa fa-search"></span>
                        </button>
                      </span>
                      <input
                        type="text"
                        class="search-query form-control"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="graybox margin-bottom-30 mobi-hide">
                <div class="graybox-heading">SELECTION</div>
                <div class="graybox-body">
                  <form>
                    <ul class="check-list">
                      <li>
                        <div class="form-check">
                          <label>
                            <input type="radio" name="radio" checked />
                            <span class="label-text">Full range</span>
                          </label>
                        </div>
                      </li>

                      <li>
                        <div class="form-check">
                          <label>
                            <input type="radio" name="radio" />
                            <span class="label-text">Our special offer</span>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="form-check">
                          <label>
                            <input type="radio" name="radio" />
                            <span class="label-text">McMenü®</span>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="form-check">
                          <label>
                            <input type="radio" name="radio" />
                            <span class="label-text">Sandwiches & Wraps</span>
                          </label>
                        </div>
                      </li>

                      <li>
                        <div class="form-check">
                          <label>
                            <input type="radio" name="radio" />
                            <span class="label-text">
                              McMoment® & 1 + 1 menu
                            </span>
                          </label>
                        </div>
                      </li>

                      <li>
                        <div class="form-check">
                          <label>
                            <input type="radio" name="radio" />
                            <span class="label-text">Happy Meal</span>
                          </label>
                        </div>
                      </li>

                      <li>
                        <div class="form-check">
                          <label>
                            <input type="radio" name="radio" />
                            <span class="label-text">Desserts</span>
                          </label>
                        </div>
                      </li>

                      <li>
                        <div class="form-check">
                          <label>
                            <input type="radio" name="radio" />
                            <span class="label-text">Fries & Snacks</span>
                          </label>
                        </div>
                      </li>

                      <li>
                        <div class="form-check">
                          <label>
                            <input type="radio" name="radio" />
                            <span class="label-text">Sauces & dressings</span>
                          </label>
                        </div>
                      </li>

                      <li>
                        <div class="form-check">
                          <label>
                            <input type="radio" name="radio" />
                            <span class="label-text">salads</span>
                          </label>
                        </div>
                      </li>

                      <li>
                        <div class="form-check">
                          <label>
                            <input type="radio" name="radio" />
                            <span class="label-text">Cold drinks</span>
                          </label>
                        </div>
                      </li>
                    </ul>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="page-header">
                <h2>OUR SPECIAL OFFER</h2>
              </div>

              <div class="product-infobx">
                <a href="#" data-toggle="modal" data-target="#myModal">
                  <h4>Duo Food Bar Pizzeria</h4>
                  <div class="product-infoleft">
                    <img src="images/item.png" />
                  </div>
                  <div class="product-infocenter">
                    <p>
                      Beef patty 2 pieces, bacon, Maredsous cheese slices,
                      tomatoes, sliced &#8203;&#8203;sweet potato salad, red
                      onion, lemon sandwich sauce, hamburger buns with sesame
                      and poppy seeds sprinkled.
                    </p>
                  </div>
                  <div class="product-inforight">
                    <div class="incre-box">
                      <div class="incre-left">33,56</div>
                      <div class="incre-right" onClick={() => setOpenFood()}>
                        +
                      </div>
                      <div class="clear"></div>
                    </div>

                    <div class="extra-optional">extras are optional</div>
                  </div>
                  <div class="clear"></div>
                </a>
              </div>

              <div class="product-infobx">
                <a href="#">
                  <h4>Duo Food Bar Pizzeria</h4>
                  <div class="product-infoleft">
                    <img src="images/item2.png" />
                  </div>
                  <div class="product-infocenter">
                    <p>
                      Beef patty 2 pieces, bacon, Maredsous cheese slices,
                      tomatoes, sliced &#8203;&#8203;sweet potato salad, red
                      onion, lemon sandwich sauce, hamburger buns with sesame
                      and poppy seeds sprinkled.
                    </p>
                  </div>
                  <div class="product-inforight">
                    <div class="incre-box">
                      <div class="incre-left">100,34</div>
                      <div class="incre-right">+</div>
                      <div class="clear"></div>
                    </div>

                    <div class="extra-optional">extras are optional</div>
                  </div>
                  <div class="clear"></div>
                </a>
              </div>

              <div class="product-infobx">
                <a href="#">
                  <h4>Duo Food Bar Pizzeria</h4>
                  <div class="product-infoleft">
                    <img src="images/item3.png" />
                  </div>
                  <div class="product-infocenter">
                    <p>
                      Beef patty 2 pieces, bacon, Maredsous cheese slices,
                      tomatoes, sliced &#8203;&#8203;sweet potato salad, red
                      onion, lemon sandwich sauce, hamburger buns with sesame
                      and poppy seeds sprinkled.
                    </p>
                  </div>
                  <div class="product-inforight">
                    <div class="incre-box">
                      <div class="incre-left">uuuuuuuuuuuu</div>
                      <div class="incre-right">+</div>
                      <div class="clear"></div>
                    </div>

                    <div class="extra-optional">extras are optional</div>
                  </div>
                  <div class="clear"></div>
                </a>
              </div>

              <div class="product-infobx">
                <a href="#">
                  <h4>Duo Food Bar Pizzeria</h4>
                  <div class="product-infoleft">
                    <img src="images/item.png" />
                  </div>
                  <div class="product-infocenter">
                    <p>
                      Beef patty 2 pieces, bacon, Maredsous cheese slices,
                      tomatoes, sliced &#8203;&#8203;sweet potato salad, red
                      onion, lemon sandwich sauce, hamburger buns with sesame
                      and poppy seeds sprinkled.
                    </p>
                  </div>
                  <div class="product-inforight">
                    <div class="incre-box">
                      <div class="incre-left">uuuuuuuuuuuu</div>
                      <div class="incre-right">+</div>
                      <div class="clear"></div>
                    </div>

                    <div class="extra-optional">extras are optional</div>
                  </div>
                  <div class="clear"></div>
                </a>
              </div>

              <div class="product-infobx">
                <a href="#">
                  <h4>Duo Food Bar Pizzeria</h4>
                  <div class="product-infoleft">
                    <img src="images/item2.png" />
                  </div>
                  <div class="product-infocenter">
                    <p>
                      Beef patty 2 pieces, bacon, Maredsous cheese slices,
                      tomatoes, sliced &#8203;&#8203;sweet potato salad, red
                      onion, lemon sandwich sauce, hamburger buns with sesame
                      and poppy seeds sprinkled.
                    </p>
                  </div>
                  <div class="product-inforight">
                    <div class="incre-box">
                      <div class="incre-left">uuuuuuuuuuuu</div>
                      <div class="incre-right">+</div>
                      <div class="clear"></div>
                    </div>

                    <div class="extra-optional">extras are optional</div>
                  </div>
                  <div class="clear"></div>
                </a>
              </div>

              <div class="product-infobx">
                <a href="#">
                  <h4>Duo Food Bar Pizzeria</h4>
                  <div class="product-infoleft">
                    <img src="images/item3.png" />
                  </div>
                  <div class="product-infocenter">
                    <p>
                      Beef patty 2 pieces, bacon, Maredsous cheese slices,
                      tomatoes, sliced &#8203;&#8203;sweet potato salad, red
                      onion, lemon sandwich sauce, hamburger buns with sesame
                      and poppy seeds sprinkled.
                    </p>
                  </div>
                  <div class="product-inforight">
                    <div class="incre-box">
                      <div class="incre-left">uuuuuuuuuuuu</div>
                      <div class="incre-right">+</div>
                      <div class="clear"></div>
                    </div>

                    <div class="extra-optional">extras are optional</div>
                  </div>
                  <div class="clear"></div>
                </a>
              </div>
            </div>
            <div class="col-md-3">
              <div class="whitebox margin-bottom-30 cart-box">
                <div class="graybox-heading">ORDER</div>
                <div class="graybox-body">
                  <p>Your cart is still empty, choose something delicious!</p>

                  <a href="#" class="btn-gray">
                    Min: 0 Ft
                  </a>
                </div>
              </div>

              <div class="whitebox margin-bottom-30 rendel-box">
                <div class="graybox-heading">RENDELESEM</div>
                <div class="graybox-body">
                  <div class="product-row">
                    <div class="product-no">1</div>
                    <div class="product-name">
                      Genorous Jack
                      <p>Lorem Ipsum Lorem Ipsum.</p>
                    </div>
                    <div class="product-size">
                      <b>1450 Ft</b>
                    </div>
                    <div class="product-close">&#10006;</div>
                    <div class="clear"></div>
                  </div>
                  <div class="product-row">
                    <div class="product-no">1</div>
                    <div class="product-name">
                      Genorous Jack
                      <p>Lorem Ipsum Lorem Ipsum.</p>
                    </div>
                    <div class="product-size">
                      <b>1450 Ft</b>
                    </div>
                    <div class="product-close">&#10006;</div>
                    <div class="clear"></div>
                  </div>
                  <div class="product-row">
                    <div class="product-no">1</div>
                    <div class="product-name">
                      Genorous Jack
                      <p>Lorem Ipsum Lorem Ipsum.</p>
                    </div>
                    <div class="product-size">
                      <b>1450 Ft</b>
                    </div>
                    <div class="product-close">&#10006;</div>
                    <div class="clear"></div>
                  </div>
                </div>
                <div class="fizetendo">
                  <div class="graybox-heading">FIZETENDO</div>
                  <div class="graybox-body">
                    <div class="product-row">
                      <div class="product-name">
                        <b>Genorous Jack</b>
                      </div>
                      <div class="product-size">
                        <b>1450 Ft</b>
                      </div>

                      <div class="clear"></div>
                    </div>
                    <div class="product-row">
                      <div class="product-name">
                        <b>Genorous Jack</b>
                      </div>
                      <div class="product-size">
                        <b>1450 Ft</b>
                      </div>

                      <div class="clear"></div>
                    </div>
                    <div class="product-row">
                      <div class="product-name">
                        <b>Genorous Jack</b>
                      </div>
                      <div class="product-size">
                        <b>1450 Ft</b>
                      </div>

                      <div class="clear"></div>
                    </div>
                    <div class="product-row">
                      <a href="#" class="btn-green">
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
