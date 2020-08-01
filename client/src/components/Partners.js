import "../css/Partners.css";
import React, { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ShopMenu from "../components/Shared/ShopMenu";
import api from "./utils/api";
import HamburgerLoading from "./Shared/HamburgerLoading";
import Checkbox from "./Checkbox";
function Partners() {
  const [heroes, setHeroes] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [categories, setCategories] = useState([]);

  const locationName = useParams().locationName;
  useEffect(() => {
    setHeroes([]);
    api
      .get(`/restaurants/test/${locationName}`)
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

  useEffect(() => {
    setCategories([]);
    api
      .get("/restaurants/search")
      .then((response) => {
        console.log("response", response);
        if (response.data) {
          setCategories(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredPartners(
      heroes.filter((restaurant) => {
        return restaurant.adminFullName
          .toLowerCase()
          .includes(search.toLowerCase());
      })
    );
  }, [search, heroes]);

  // const getCategories = () => {
  //   const categoryList = [];
  //   categories.map((cat) =>
  //     categoryList.push(
  //       <ul className="check-list">
  //         <li>
  //           <div className="checkbox">
  //             <input id="checkbox1" type="checkbox" />
  //             <label htmlFor="checkbox1">{cat.searchName}</label>
  //           </div>
  //         </li>
  //       </ul>
  //     )
  //   );
  //   return categoryList;
  // };

  const getHeroes = () => {
    const restaurantList = [];
    filteredPartners.map((restaurant) =>
      restaurantList.push(
        <div key={restaurant.adminId} className="product-infobx">
          <div className="product-infoleft">
            <img src={restaurant.adminImageUrl} />
          </div>
          <div className="product-infocenter">
            <h4>{restaurant.adminFullName}</h4>
            <p className="short-desc-comp">
              9 years with us pizza, hamburger, hungarian, italian, american,
              algida
            </p>
            <ul className="info-list info-panel">
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
              <div className="clear"></div>
            </ul>
          </div>
          <div className="product-inforight">
            <Link
              to={
                `/${locationName}/` +
                restaurant.adminFullName.split(" ").join("-")
              }
              className="menu-btn text-menu"
            >
              Étlap
            </Link>
            <div className="discount">-&nbsp;8 lej</div>
          </div>
          <div className="clear"></div>
        </div>
      )
    );
    return restaurantList;
  };

  // if (isFetching) return <HamburgerLoading />;
  return (
    <div>
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

                  <Link to="/" className="more-button">
                    CLEAR ALL FILTERS
                  </Link>
                </div>
              </div>

              <div className="graybox margin-bottom-30">
                <div className="graybox-heading">Hasznos</div>
                <div className="graybox-body">
                  <ul className="check-list">
                    <Checkbox categories={categories} />
                  </ul>
                </div>
              </div>

              {/* <div className="graybox margin-bottom-30">
                <div className="graybox-heading">Konyhák</div>
                <div className="graybox-body">
                  <ul className="check-list">
                    <li>
                      <div className="checkbox">
                        <input id="checkbox1" type="checkbox" />
                        <label htmlFor="checkbox1">Pizza (57)</label>
                      </div>
                    </li>
                    <li>
                      <div className="checkbox">
                        <input id="checkbox2" type="checkbox" />
                        <label htmlFor="checkbox2">Hamburger (59)</label>
                      </div>
                    </li>
                    <li>
                      <div className="checkbox">
                        <input id="checkbox3" type="checkbox" />
                        <label htmlFor="checkbox3">Vegán (10)</label>
                      </div>
                    </li>
                    <li>
                      <div className="checkbox">
                        <input id="checkbox4" type="checkbox" />
                        <label htmlFor="checkbox4">Vegetáriánus (65)</label>
                      </div>
                    </li>
                    <li>
                      <div className="checkbox">
                        <input id="checkbox5" type="checkbox" />
                        <label htmlFor="checkbox5">Szendvics (7)</label>
                      </div>{" "}
                    </li>
                    <li>
                      <div className="checkbox">
                        <input id="checkbox6" type="checkbox" />
                        <label htmlFor="checkbox6">Saláta (32)</label>
                      </div>
                    </li>

                    <li>
                      <div className="checkbox">
                        <input id="checkbox6" type="checkbox" />
                        <label htmlFor="checkbox6">Halétel (12)</label>
                      </div>
                    </li>

                    <li>
                      <div className="checkbox">
                        <input id="checkbox6" type="checkbox" />
                        <label htmlFor="checkbox6">Grill (3)</label>
                      </div>
                    </li>

                    <li>
                      <div className="checkbox">
                        <input id="checkbox6" type="checkbox" />
                        <label htmlFor="checkbox6">Gyros (5)</label>
                      </div>
                    </li>

                    <li>
                      <div className="checkbox">
                        <input id="checkbox6" type="checkbox" />
                        <label htmlFor="checkbox6">Reggelizőhely (5)</label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="graybox margin-bottom-30">
                <div className="graybox-heading">Fizetési lehetőségek</div>
                <div className="graybox-body">
                  <ul className="check-list">
                    <li>
                      <div className="checkbox">
                        <input id="checkbox1" type="checkbox" />
                        <label htmlFor="checkbox1">Készpénz (138)</label>
                      </div>
                    </li>

                    <li>
                      <div className="checkbox">
                        <input id="checkbox1" type="checkbox" />
                        <label htmlFor="checkbox1">Bankkártya (183)</label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
            <div className="col-md-9">
              <div className="tab-menu">
                <ul>
                  <li>
                    <Link to="/">
                      <img src="images/photo-line.png" />
                      <p>Photo menu</p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <img src="images/hamburger-line.png" />
                      <p>Hamburger</p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <img src="images/pizza-line.png" />
                      <p>Pizza</p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <img src="images/ice-cream-line.png" />
                      <p>Algida</p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <img src="images/food-line.png" />
                      <p>Food</p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <img src="images/hungarian-line.png" />
                      <p>Hungarian</p>
                    </Link>
                  </li>

                  <li>
                    <Link to="/">
                      <img src="images/thai-line.png" />
                      <p>Thai</p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <img src="images/italian-line.png" />
                      <p>Italian</p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <img src="images/shop-list-cuisines-more.min.png" />
                      <p>More kitchens</p>
                    </Link>
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
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="info-box">
                          <span>{heroes.id} találat</span>
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
                            <Link to="/">By name</Link>
                          </li>
                          <li>
                            <Link to="/">According to evaluation</Link>
                          </li>
                          <li>
                            <Link to="/">By price category</Link>
                          </li>
                          <li>
                            <Link to="/">According to shipping cost</Link>
                          </li>
                          <li>
                            <Link to="/">By delivery time</Link>
                          </li>
                          <li>
                            <Link to="/">Default</Link>
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
