import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/UserProfile/AddDeliveryAdress.css";
import Axios from "axios";
import Menu from "../Shared/Menu";
import api from "../utils/api";
const AddDeliveryAdress = () => {
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("token", localStorage.getItem("token"));
    try {
      await api.post("/deliveryadress", {
        name: "sadsada",
        token: localStorage.getItem("token"),
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div className="main-content new-address">
        <div className="container">
          <div className="row">
            <Menu />
            <div className="col-12 col-lg-8">
              <div className="white-box">
                <form onSubmit={handleSubmit}>
                  <h2 className="text-center">NEW ADDRESS</h2>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="title">
                          Title name <span>*</span>:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="street">
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
                        <label htmlFor="street">
                          Title details <span>*</span>:
                        </label>
                        <div className="row">
                          <div className="col-md-4">
                            <label htmlFor="house-number">
                              House number <span>*</span>:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="house-number"
                            />
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="floor">
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
                            <label htmlFor="door">
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
                        <label htmlFor="door-bell">
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
