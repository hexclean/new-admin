import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../../css/UserProfile/AddDeliveryAdress.css";
import { withRouter } from "react-router-dom";
import Menu from "../Shared/Menu";
import api from "../utils/api";
import DispatchContext from "../../DispatchContext";

const AddDeliveryAdress = (props) => {
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [street, setStreet] = useState();
  const [houseNumber, setHouseNuber] = useState();
  const [floor, setFloor] = useState();
  const [doorNumber, setDoorNumber] = useState();
  const [doorBell, setDoorBell] = useState();
  const appDispatch = useContext(DispatchContext);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/deliveryadress", {
        name: name,
        city: city,
        street: street,
        houseNumber: houseNumber,
        floor: floor,
        doorBell: doorBell,
        doorNumber: doorNumber,
        token: localStorage.getItem("token"),
      });

      appDispatch({ type: "flashMessage", value: "Sikeresen letrejott" });
      // Redirect to another page
      props.history.push("/my-adress");
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
                          Cím neve <span>*</span>:
                        </label>
                        <input
                          onChange={(e) => setName(e.target.value)}
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
                          Település <span>*</span>:
                        </label>
                        <input
                          onChange={(e) => setCity(e.target.value)}
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
                          Utca, közterület <span>*</span>:
                        </label>
                        <input
                          onChange={(e) => setStreet(e.target.value)}
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
                          Cím részletek <span>*</span>:
                        </label>
                        <div className="row">
                          <div className="col-md-4">
                            <label htmlFor="house-number">
                              Házszám <span>*</span>:
                            </label>
                            <input
                              onChange={(e) => setHouseNuber(e.target.value)}
                              type="text"
                              className="form-control"
                              id="house-number"
                            />
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="floor">
                              {" "}
                              Emelet <span>*</span>:
                            </label>
                            <input
                              onChange={(e) => setFloor(e.target.value)}
                              type="text"
                              className="form-control"
                              id="floor"
                            />
                          </div>

                          <div className="col-md-4">
                            <label htmlFor="door">
                              {" "}
                              Ajtó <span>*</span>:
                            </label>
                            <input
                              onChange={(e) => setDoorNumber(e.target.value)}
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
                          Kapucsengő <span>*</span>:
                        </label>
                        <input
                          onChange={(e) => setDoorBell(e.target.value)}
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

export default withRouter(AddDeliveryAdress);
