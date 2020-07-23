import React, { useEffect, useState, useContext } from "react";
import { Link, withRouter, useParams } from "react-router-dom";
import "../../css/UserProfile/DeliveryAdressList.css";
import api from "../utils/api";
import Menu from "../Shared/Menu";
import HamburgerLoading from "../Shared/HamburgerLoading";
import DispatchContext from "../../DispatchContext";
import StateContext from "../../StateContext";
import Axios from "axios";

function DeliveryAdressList(props) {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const { id } = useParams();

  useEffect(() => {
    setAddresses([]);
    api
      .get("/deliveryadress")
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        if (response.data) {
          setAddresses(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function deleteHandler() {
    const areYouSure = window.confirm(
      "Do you really want to delete this post?"
    );
    if (areYouSure) {
      try {
        const response = await api.delete(`/deliveryadress/${id}`, {
          data: { token: appState.user.token },
        });
        console.log("response.data", response.data);
        if (true) {
          // 1. display a flash message
          appDispatch({
            type: "flashMessage",
            value: "Post was successfully deleted.",
          });

          // 2. redirect back to the current user's profile
          props.history.push("/my-profile");
        }
      } catch (e) {
        console.log("There was a problem.");
      }
    }
  }

  const getAddresses = () => {
    const addressesList = [];
    addresses.map((adress) =>
      addressesList.push(
        <div key={adress.id} className="col-6">
          <div className="contact-box text-center">
            <Link
              to={`/delivery-adress/${adress.id}/edit`}
              className="radius-50 custom-address"
            >
              <i className="fa fa-home" aria-hidden="true"></i>
            </Link>
            <h4>{adress.name}</h4>
            <p>
              {adress.city} - {adress.street}
            </p>
            <p>
              <Link to={`/delivery-adress/${adress.id}/edit`}>Edit</Link>
              <a onClick={deleteHandler}>Delete</a>
            </p>
          </div>
        </div>
      )
    );
    return addressesList;
  };

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
                            Create new delivery adress
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

export default withRouter(DeliveryAdressList);
