import React, { useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import "../../css/UserProfile/DeliveryAdressList.css";
import api from "../utils/api";
import Menu from "../Shared/Menu";
import HamburgerLoading from "../Shared/HamburgerLoading";
function DeliveryAdressList() {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setAddresses([]);
    api
      .get("/deliveryadress")
      .then((response) => {
        setIsLoading(false);
        console.log("response", response);
        if (response.data) {
          setAddresses(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getAddresses = () => {
    const addressesList = [];
    addresses.map((adress) =>
      addressesList.push(
        <div key={adress.id} className="col-6">
          <div className="contact-box text-center">
            <Link to="/" className="radius-50 custom-address">
              <i className="fa fa-home" aria-hidden="true"></i>
            </Link>
            <h4>{adress.name}</h4>
            <p>
              {adress.city} - {adress.street}
            </p>
            <p>
              <Link to={`/delivery-adress/${adress.id}/edit`}>Edit</Link>
              <Link onClick={deleteHandler} to="/">
                Delete
              </Link>
            </p>
          </div>
        </div>
      )
    );
    return addressesList;
  };

  function deleteHandler() {
    const areYouSure = window.confirm(
      "Do you really want to delete this post?"
    );
    if (areYouSure) {
      try {
        //  const response = api.delete(`/deliveryadress/${id}`, {data: {token: useRe}})
      } catch (error) {
        console.log(error);
      }
    }
  }
  if (isLoading) return <HamburgerLoading />;
  return (
    <div>
      <div className="main-content cimet-page">
        <div className="container">
          <div className="row">
            <Menu />
            <div className="col-md-8">
              <div className="white-box">
                <form action="">
                  <h2 className="text-center">Title Goes Here</h2>

                  <div className="row">{getAddresses()}</div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group text-center">
                        <Link to={"/new-adress"}>
                          <button type="submit" className="btn-green">
                            This is a button
                          </button>
                        </Link>
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
}

export default DeliveryAdressList;
