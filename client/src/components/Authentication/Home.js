import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";

function Home() {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   const locations = [];
  //   const promises = new Array(10)
  //     .fill()
  //     .map((v, i) => fetch("http://localhost:5000/api/locations"));

  //   Promise.all(promises).then((locationsArr) => {
  //     return locationsArr.map((value) =>
  //       value.json().then(({ name }) => locations.push({ name }))
  //     );
  //   });
  //   console.log("locations", locations);
  //   setOptions(locations);
  // }, []);
  const [location, setLocations] = useState([]);
  useEffect(() => {
    setLocations([]);
    api
      .get("/locations")
      .then((response) => {
        console.log("response", response);
        if (response.data) {
          setLocations(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getHeroes = () => {
    const heroesList = [];
    location.map((loc) =>
      heroesList.push(
        <Link key={loc.id} to={`/${loc.email}`}>
          <div>{loc.email}</div>
        </Link>
      )
    );
    return heroesList;
  };

  return (
    <div>
      {getHeroes()}

      <div className="banner-section">
        <div className="container">
          <div className="row">
            <div className="col-md-9 mx-auto text-center">
              <h2>Are you hungry? Where is this?</h2>
              <h3>Choose from 2000+ restaurants!</h3>
              <div className="search-box">
                <section className="search-sec">
                  <form>
                    <div className="row">
                      <div className="col-sm-9 p-0">
                        <input
                          onClick={() => setDisplay(!display)}
                          type="text"
                          className="form-control search-slt"
                          placeholder="Town or Postcode"
                        />
                        {display && getHeroes()}
                      </div>
                      <div className="col-sm-3 p-0">
                        <button
                          type="button"
                          className="btn btn-danger wrn-btn"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div className="banner-bottom">
          <div className="container">
            <div className="row">
              <div className="col-6 col-md-3">
                <div className="icon-grid">
                  <div className="icon-img icon-1"></div>
                  <h4>FIND A RESTAURANT!</h4>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="icon-grid">
                  <div className="icon-img icon-2"></div>
                  <h4>ORDER IT!</h4>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="icon-grid">
                  <div className="icon-img icon-3"></div>
                  <h4>PAY IT OFF!</h4>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="icon-grid">
                  <div className="icon-img icon-4"></div>
                  <h4>ENJOY YOUR MEAL!</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
