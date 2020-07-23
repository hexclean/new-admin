import React, { useEffect, useState } from "react";

function Home() {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");

  // ${i+1}
  useEffect(() => {
    const locations = [];
    const proises = new Array(20).fill().map((v, i) => fetch("dfsfd"));
  });

  return (
    <div>
      <div class="banner-section">
        <div class="container">
          <div class="row">
            <div class="col-md-9 mx-auto text-center">
              <h2>Are you hungry? Where is this?</h2>
              <h3>Choose from 2000+ restaurants!</h3>
              <div class="search-box">
                <section class="search-sec">
                  <form action="#" method="post" novalidate="novalidate">
                    <div class="row">
                      <div class="col-sm-9 p-0">
                        <input
                          type="text"
                          class="form-control search-slt"
                          placeholder="Town or Postcode"
                        />
                      </div>
                      <div class="col-sm-3 p-0">
                        <button type="button" class="btn btn-danger wrn-btn">
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
        <div class="banner-bottom">
          <div class="container">
            <div class="row">
              <div class="col-6 col-md-3">
                <div class="icon-grid">
                  <div class="icon-img icon-1"></div>
                  <h4>FIND A RESTAURANT!</h4>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="icon-grid">
                  <div class="icon-img icon-2"></div>
                  <h4>ORDER IT!</h4>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="icon-grid">
                  <div class="icon-img icon-3"></div>
                  <h4>PAY IT OFF!</h4>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="icon-grid">
                  <div class="icon-img icon-4"></div>
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
