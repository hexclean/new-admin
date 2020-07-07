import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/UserProfile/AddDeliveryAdress.css";
import axios from "axios";
import Menu from "../Shared/Menu";

const AddDeliveryAdress = () => {
  return (
    <div>
      <div className="main-content new-address">
        <div className="container">
          <div className="row">
            <Menu />
            <div className="col-12 col-lg-8">
              <div className="white-box">
                <form action="">
                  <h2 className="text-center">NEW ADDRESS</h2>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label for="title">
                          Title name <span>*</span>:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label for="settlement">
                          settlement <span>*</span>:
                        </label>
                        <select className="form-control" id="settlement">
                          <option>Budapest - I. (1010)</option>
                          <option>Budapest - I. (1010)</option>
                          <option>Budapest - I. (1010)</option>
                          <option>Budapest - I. (1010)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label for="street">
                          Street, public area <span>*</span>:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="street"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label for="street">
                          Title details <span>*</span>:
                        </label>
                        <div className="row">
                          <div className="col-md-4">
                            <label for="house-number">
                              House number <span>*</span>:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="house-number"
                            />
                          </div>
                          <div className="col-md-4">
                            <label for="floor">
                              {" "}
                              Floor <span>*</span>:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="floor"
                            />
                          </div>

                          <div className="col-md-4">
                            <label for="door">
                              {" "}
                              Door <span>*</span>:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="door"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label for="door-bell">
                          door bell <span>*</span>:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="door-bell"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group text-center">
                        <button type="submit" className="btn-green">
                          Fixing
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDeliveryAdress;
