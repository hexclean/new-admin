import React, { useEffect, useState } from "react";
import "../css/PartnersPage.css";
import { FoodDialog } from "./FoodDialog/FoodDialog";
import Banner from "./PartnerBanner";
import ProductItem from "./Product/ProductItem";
import api from "./utils/api";
import { useParams, Link } from "react-router-dom";

function PartnerPage() {
  const [category, setCategory] = useState([]);
  const partnerId = useParams().partnerId;
  const [openFood, setOpenFood] = useState();
  useEffect(() => {
    setCategory([]);
    api
      .get(`/category/:locationName/${partnerId}`)
      .then((response) => {
        console.log("category", response);
        if (response.data) {
          setCategory(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getHeroes = () => {
    const categoryList = [];
    category.map((cat) =>
      categoryList.push(
        <div className="graybox-body">
          <ul className="check-list">
            <li>
              <div className="form-check">
                <label>
                  <input type="radio" name="radio" />
                  <span className="label-text ">
                    {cat.categoryTranslationName}
                  </span>
                </label>
              </div>
            </li>
          </ul>
        </div>
      )
    );
    return categoryList;
  };

  return (
    <div>
      <div>hello:::::------{openFood}------:::::::</div>
      <FoodDialog openFood={openFood} setOpenFood={setOpenFood} />
      {/* <ProductItem openFood={openFood} /> */}
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
                {/* <div>{openFood}</div> */}
                <div className="graybox-heading">SELECfgdgfdfgdgfdTION</div>
                {getHeroes()}
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
