import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";
import axios from "axios";
const Home = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [heroes, setHeroes] = useState([]);

  // useEffect(() => {
  //   const pokemon = [];
  //   const promises = new Array(20)
  //     .fill()
  //     .map((v, i) => fetch("/api/restaurants"));
  //   Promise.all(promises).then((pokemonArr) => {
  //     console.log("value", pokemonArr);
  //     return pokemonArr.map((value) =>
  //       value.json().then(({ fullName }) => pokemon.push({ fullName }))
  //     );
  //   });
  //   setOptions(pokemon);
  // }, []);

  // useEffect(() => {
  //   setOptions([]);
  //   axios
  //     .get("/api/restaurants")
  //     .then((response) => {
  //       if (response.data) {
  //         setOptions(response.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    setHeroes([]);
    axios
      .get("/api/restaurants")
      .then((response) => {
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
        <div>
          <Link to={`/partners/${hero.fullName}`} key={hero.id}>
            <div>
              <span key={hero.id}>{hero.fullName}</span>
            </div>
          </Link>
        </div>
      )
    );
    return heroesList;
  };
  // .replace(/\s+/g, "-")
  return (
    <div>
      <div className="mainnv">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#collapsibleNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0 col-md-5 col-lg-4">
                <li className="nav-item active">
                  <a className="nav-link" href="#">
                    Blog
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Be my partner
                  </a>
                </li>
              </ul>

              <div className="mx-auto col-md-4 col-lg-4 text-center">
                <a href="#" className="navbar-brand">
                  <img src="/images/logo.png" />
                </a>
              </div>

              <ul className="navbar-nav ml-auto col-md-3 mt-2 mt-lg-0 align-right col-lg-4">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Sign Up
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link login-button" href="#">
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className="orage-info">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              Pay now with an online credit card or NICE card and ask for your
              order at your door - so you will only encounter the delicacies,
              not the courier!
            </div>
          </div>
        </div>
      </div>
      <div className="banner-section">
        <div className="container">
          <div className="row">
            <div className="col-md-9 mx-auto text-center">
              <h2>Are you hungry? Where is this?</h2>
              <h3>Choose from 2000+ restaurants!</h3>
              <div className="search-box">
                <section className="search-sec">
                  <div className="row">
                    <div className="col-sm-9 p-0">
                      <input
                        type="text"
                        className="form-control search-slt"
                        placeholder="Town or Postcode"
                        onClick={() => setDisplay(!display)}
                      />
                      {display && getHeroes()}
                    </div>

                    <div className="col-sm-3 p-0">
                      <button type="button" className="btn btn-danger wrn-btn">
                        Search
                      </button>
                    </div>
                  </div>
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
};

export default Home;
