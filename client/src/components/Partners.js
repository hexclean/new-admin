import "../css/Partners.css";
import React, { useEffect, useContext, useState } from "react";
import { useImmerReducer } from "use-immer";

import { useParams, Link, withRouter } from "react-router-dom";
import axios from "axios";
import ShopMenu from "../components/Shared/ShopMenu";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import api from "./utils/api";

function Partners(props) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [heroes, setHeroes] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPartners, setFilteredPartners] = useState([]);
  const originalState = {
    street: {
      value: "",
      hasErrors: false,
      message: "",
    },
    name: {
      value: "",
      hasErrors: false,
      message: "",
    },
    doorBell: {
      value: "",
      hasErrors: false,
      message: "",
    },
    doorNumber: {
      value: "",
      hasErrors: false,
      message: "",
    },
    floor: {
      value: "",
      hasErrors: false,
      message: "",
    },
    city: {
      value: "",
      hasErrors: false,
      message: "",
    },
    houseNumber: {
      value: "",
      hasErrors: false,
      message: "",
    },
    isFetching: true,
    isSaving: false,
    locationName: useParams().locationName,
    sendCount: 0,
    notFound: false,
  };
  const [state, dispatch] = useImmerReducer(ourReducer, originalState);
  function ourReducer(draft, action) {
    switch (action.type) {
      case "fetchComplete":
        draft.street.value = action.value.street;
        draft.city.value = action.value.city;
        draft.name.value = action.value.name;
        draft.doorBell.value = action.value.doorBell;
        draft.doorNumber.value = action.value.doorNumber;
        draft.floor.value = action.value.floor;
        draft.houseNumber.value = action.value.houseNumber;
        draft.isFetching = false;
        return;
      case "nameChange":
        draft.name.hasErrors = false;
        draft.name.value = action.value;
        return;
      case "streetChange":
        draft.street.value = action.value;
        return;
      case "cityChange":
        draft.city.hasErrors = false;
        draft.city.value = action.value;
        return;
      case "doorBellChange":
        draft.doorBell.value = action.value;
        return;
      case "doorNumberChange":
        draft.doorNumber.value = action.value;
        return;
      case "floorChange":
        draft.floor.value = action.value;
        return;
      case "houseNumberChange":
        draft.houseNumber.value = action.value;
        return;
      case "submitRequest":
        if (!draft.name.hasErrors && !draft.city.hasErrors) {
          draft.sendCount++;
        }
        return;
      case "saveRequestStarted":
        draft.isSaving = true;
        return;
      case "saveRequestFinished":
        draft.isSaving = false;
        return;
      case "nameRules":
        if (!action.value.trim()) {
          draft.name.hasErrors = true;
          draft.name.message = "Nem lehet ures";
        }
        return;
      case "cityRules":
        if (!action.value.trim()) {
          draft.city.hasErrors = true;
          draft.city.message = "Nem lehet ures";
        }
        return;
      case "notFound":
        draft.notFound = true;
        return;
    }
  }
  // let { adminFullName } = useParams();
  useEffect(() => {
    setHeroes([]);
    api
      .get(`/restaurants/test/${state.locationName}`)
      .then((response) => {
        console.log("${state.locationName}", state.locationName);
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
    setFilteredPartners(
      heroes.filter((hero) => {
        return hero.adminFullName.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, heroes]);

  const getHeroes = () => {
    // setLoading(true);
    const heroesList = [];
    filteredPartners.map((hero) =>
      heroesList.push(
        <div key={hero.id} className="product-infobx">
          <div className="product-infoleft">
            <img src={hero.imageUrl} />
          </div>
          <div className="product-infocenter">
            <h4>{hero.adminFullName}</h4>
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
              to={"/products/" + hero.adminFullName.replace(/%20/g, "-")}
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
    return heroesList;
  };

  return (
    <div>
      <ShopMenu />
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
                <div className="graybox-heading">USEFUL</div>
                <div className="graybox-body">
                  <ul className="check-list">
                    <li>
                      {" "}
                      <div className="checkbox">
                        <input id="checkbox1" type="checkbox" />
                        <label htmlFor="checkbox1">No shipping cost (40)</label>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <div className="checkbox">
                        <input id="checkbox2" type="checkbox" />
                        <label htmlFor="checkbox2">
                          Within 35 minutes (47)
                        </label>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <div className="checkbox">
                        <input id="checkbox3" type="checkbox" />
                        <label htmlFor="checkbox3">Photo menu (67)</label>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <div className="checkbox">
                        <input id="checkbox4" type="checkbox" />
                        <label htmlFor="checkbox4">Food (12)</label>
                      </div>
                    </li>
                    <li>
                      <div className="checkbox">
                        <input id="checkbox5" type="checkbox" />
                        <label htmlFor="checkbox5">News (16)</label>
                      </div>{" "}
                    </li>
                    <li>
                      <div className="checkbox">
                        <input id="checkbox6" type="checkbox" />
                        <label htmlFor="checkbox6">NetWaiter GO (38)</label>
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
                        <label htmlFor="checkbox1">Hamburger (57)</label>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <div className="checkbox">
                        <input id="checkbox2" type="checkbox" />
                        <label htmlFor="checkbox2">Pizza (59)</label>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <div className="checkbox">
                        <input id="checkbox3" type="checkbox" />
                        <label htmlFor="checkbox3">Algida (10)</label>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <div className="checkbox">
                        <input id="checkbox4" type="checkbox" />
                        <label htmlFor="checkbox4">Hungarian (65)</label>
                      </div>
                    </li>
                    <li>
                      <div className="checkbox">
                        <input id="checkbox5" type="checkbox" />
                        <label htmlFor="checkbox5">Thai (7)</label>
                      </div>{" "}
                    </li>
                    <li>
                      <div className="checkbox">
                        <input id="checkbox6" type="checkbox" />
                        <label htmlFor="checkbox6">Italian (32)</label>
                      </div>
                    </li>

                    <li>
                      <div className="checkbox">
                        <input id="checkbox6" type="checkbox" />
                        <label htmlFor="checkbox6">Mexican (12)</label>
                      </div>
                    </li>

                    <li>
                      <div className="checkbox">
                        <input id="checkbox6" type="checkbox" />
                        <label htmlFor="checkbox6">Indian (3)</label>
                      </div>
                    </li>

                    <li>
                      <div className="checkbox">
                        <input id="checkbox6" type="checkbox" />
                        <label htmlFor="checkbox6">Chinese (5)</label>
                      </div>
                    </li>

                    <li>
                      <div className="checkbox">
                        <input id="checkbox6" type="checkbox" />
                        <label htmlFor="checkbox6">Japan (5)</label>
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
                        <label htmlFor="checkbox1">Cash (138)</label>
                      </div>
                    </li>

                    <li>
                      {" "}
                      <div className="checkbox">
                        <input id="checkbox1" type="checkbox" />
                        <label htmlFor="checkbox1">
                          Credit card (1 click payment also) - recommended (183)
                        </label>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <div className="checkbox">
                        <input id="checkbox1" type="checkbox" />
                        <label htmlFor="checkbox1">NICE card (167)</label>
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
